import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka-service",
  brokers: ["localhost:9094"] 
});

const admin = kafka.admin();

const run = async () => {
  try {
    await admin.connect();
    await admin.createTopics({
      topics: [
        { topic: "payment-success" },
        { topic: "order-success" },
        { topic: "email-success" },
      ]
    });
    console.log("Topics created successfully");
  } catch (err) {
    console.error("Error creating topics:", err);
  } finally {
    await admin.disconnect();
  }
};

run();
