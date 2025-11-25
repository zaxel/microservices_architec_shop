import express from "express";
import cors from "cors";
import { createOrder, pay, sendEmail, logAnalytics } from "./db.js";
import { authMiddleware } from "./middleware/auth.js";
import { analyticsEvents } from './events.js';

const app = express();

app.use(
  cors({
    origin: "http://192.168.0.102:3000",
  })
);
app.use(express.json());

app.post("/order", authMiddleware, async (req, res) => {
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
  await logAnalytics({ test: true }, 'Test message');
  res.send('Event sent');
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message);
});

app.listen(7001, () => {
  console.log(`Server is running on port 7001`);
});