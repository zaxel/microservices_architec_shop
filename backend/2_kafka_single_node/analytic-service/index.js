import { Kafka } from "kafkajs";
import { EventEmitter } from 'events';
import cors from "cors";
import express from "express";
const app = express();

const kafka = new Kafka({
    clientId: "analytic-service",
    brokers: ["localhost:9094"]
});

const consumer = kafka.consumer({ groupId: "analytic-service" });

app.use(cors({ origin: "http://192.168.0.102:3000" }));
app.use(express.json());

const analyticsEvents = new EventEmitter();
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

const runAnalytic = async () => {
    const topics = ["payment-success", "order-success", "email-success"];
    try {
        await consumer.connect();
        await consumer.subscribe({
            topics,
            fromBeginning: false
        })
        console.log(`Analytics service subscribed to: ${topics.join(", ")}`);

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const val = message.value.toString();
                const data = JSON.parse(val);
                analyticsEvents.emit('log', { data, message: { title: topic.split("-")[0] + " provider:", text: data.message }, timestamp: Date.now() });
                await new Promise((res) => setTimeout(res, 1500));
                console.log(`Analytics log created for: ${topic}`, data.message);
                analyticsEvents.emit('log', { data, message: { title: "analytic consumer:", text: data.message }, timestamp: Date.now() });
            }
        })
    } catch (err) {
        console.log(err);
    }
}

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
});

app.listen(7012, () => {
    runAnalytic();
    console.log("Analytic service running on port 7012");
});
