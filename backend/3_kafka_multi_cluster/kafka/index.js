import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka-service",
  brokers: ["localhost:9094", "localhost:10095", "localhost:11096"]
});

const admin = kafka.admin();

const run = async () => {
  try {
    await admin.connect();
    await admin.createTopics({
      topics: [
        { topic: "payment-success", numPartitions: 3, replicationFactor: 3 },
        { topic: "order-success", numPartitions: 3, replicationFactor: 3 },
        { topic: "email-success", numPartitions: 3, replicationFactor: 3 }
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
