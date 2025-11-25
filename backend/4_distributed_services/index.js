import express from "express";
import cors from "cors";
import 'dotenv/config';
import { authMiddleware } from "./middleware/auth.js";
import { createOrder, logAnalytics, pay, sendEmail } from "./monolith-services/db.js";
import { analyticsEvents } from "./shared-utils/events.js";
import { payDistributed } from "./distributed-services/payment-service/index.js";
import { startRedisBroker } from "./distributed-services/redis/brokerStarter.js";
import { redisBroker } from "./distributed-services/redis/redisBrokerEmitter.js";
import { orderDistributed } from "./distributed-services/order-service/index.js";
import { analyticDistributed } from "./distributed-services/analytic-service/index.js";
import { emailDistributed } from "./distributed-services/email-service/index.js";

const app = express();
const allowedOrigins = [
  "http://192.168.0.102:3000", 
  "http://localhost:3000", 
  "https://microservices-architec-shop-z.vercel.app" 
];

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  } 
}));
app.use(express.json());

app.post("/order-monolith", authMiddleware, async(req, res) => {
  const { cart } = req.body;
  const userId = req.userId;
  const paymentResult = await pay(cart, userId);
    await logAnalytics({ cart, userId }, paymentResult, "Payment data");
    const orderResult = await createOrder(cart, userId);
    await logAnalytics({ userId }, orderResult.message, "Order data");
    const emailResult = await sendEmail(orderResult.orderId, userId);
    await logAnalytics({ orderResult, userId }, emailResult, "Email data");
  
    return res.json({ orderId: orderResult.orderId, paymentResult, emailResult });
});

app.post("/order-distributed", authMiddleware, async(req, res) => {
  const { cart } = req.body;
  const userId = req.userId;
  const paymentResult = await payDistributed(cart, userId);
  return res.status(200).send("payment successful.");
});

app.get('/events', (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const onLog = (msg) => {
      res.write(`data: ${JSON.stringify(msg)}\n\n`);
    };

    analyticsEvents.on('log', onLog);

    req.on('close', () => {
      analyticsEvents.off('log', onLog);
    });
  } catch (err) {
    console.error('SSE error:', err);
    res.status(500).send('SSE failed');
  }
});

app.get('/test', async (req, res) => {
  return res.status(200).send("test successful.");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

await startRedisBroker();

await redisBroker.subscribe("payment-success", async (data) => {
  analyticDistributed(data);
  orderDistributed(data);
});

await redisBroker.subscribe("order-success", async (data) => {
  analyticDistributed(data);
  emailDistributed(data);
});

await redisBroker.subscribe("email-success", async (data) => {
  analyticDistributed(data);
});

app.listen(7001, () => {
  console.log("Payment service running on port 7001");
});
