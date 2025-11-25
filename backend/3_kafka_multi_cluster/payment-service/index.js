import express from "express";
import cors from "cors";
import { Kafka } from "kafkajs";

const app = express();

app.use(cors({ origin: "http://192.168.0.102:3000" }));
app.use(express.json());

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9094", "localhost:10095", "localhost:11096"] 
});

const producer = kafka.producer();

const connectToKafka = async () => {
  try{
    await producer.connect();
    console.log("payment producer connected.");
  }catch(err){
    console.log("Error connecting to Kafka.", err);
  }
}

app.post("/order", async(req, res) => {
  const { cart } = req.body;
  //dummy userId
  const userId = "999";
  
  await new Promise((res)=>setTimeout(res, 1500));
  const total = cart.reduce((acc, next) => acc+next.price, 0);
  const paymentMessage = `User ${userId} paid $${total.toFixed(2)}.`;
  console.log("payment provider ", paymentMessage);
  await producer.send({
    topic: "payment-success",
    messages: [{value: JSON.stringify({userId, cart, message: paymentMessage})}]
  })
  return res.status(200).send("payment successful.");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

app.listen(7002, () => {
  connectToKafka();
  console.log("Payment service running on port 7002");
});
