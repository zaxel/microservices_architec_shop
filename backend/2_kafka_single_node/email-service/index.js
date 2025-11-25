import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "email-service",
    brokers: ["localhost:9094"]
});

const consumer = kafka.consumer({ groupId: "email-service" });
const producer = kafka.producer();

const run = async () => {
    try {
        await consumer.connect();
        await producer.connect();
        await consumer.subscribe({
            topic: "order-success",
            fromBeginning: true
        })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                await new Promise((res)=>setTimeout(res, 1500));
                const emailMessage = "eMail successfully sent.";
                console.log("email provider ", emailMessage);
                await producer.send({
                    topic: "email-success",
                    messages: [{value: JSON.stringify({message: emailMessage})}]
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}

run();