import { Kafka } from "kafkajs";
import { v4 as uuidv4 } from "uuid";

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9094", "localhost:10095", "localhost:11096"] 
});

const consumer = kafka.consumer({ groupId: "order-service" });
const producer = kafka.producer();

const run = async () => {
    try {
        await consumer.connect();
        await producer.connect();
        await consumer.subscribe({
            topic: "payment-success",
            fromBeginning: true
        });
        
        console.log("Order service listening to payment-success...");
        
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                await new Promise((resolve) => setTimeout(resolve, 1500));
                const id = uuidv4();
                const orderMessage = `Order ${id} successfully created.`;
                console.log("order provider:", orderMessage);
                
                await producer.send({
                    topic: "order-success",
                    messages: [{
                        value: JSON.stringify({orderId: id, message: orderMessage})
                    }]
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
};

run();