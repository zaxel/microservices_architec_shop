import redis from "redis";

class MessageBroker {
  constructor(redisUrl = 'redis://redis:6379') {
    this.publisher = redis.createClient({ url: redisUrl });
    this.subscriber = redis.createClient({ url: redisUrl });
    this.isConnected = false;
  }

  async connect() {
    if (this.isConnected) return;
    
    await this.publisher.connect();
    await this.subscriber.connect();
    this.isConnected = true;
    console.log('[BROKER] Connected to Redis');
  }

  // Producer: publish a message to a topic
  async publish(topic, message) {
    if (!this.isConnected) await this.connect();
    
    const payload = JSON.stringify(message);
    await this.publisher.publish(topic, payload);
    console.log(`[PUBLISH] Topic: ${topic}`, message.message ?? "");
  }

  // Consumer: subscribe to a topic
  async subscribe(topic, callback) {
    if (!this.isConnected) await this.connect();
    
    await this.subscriber.subscribe(topic, (message) => {
      const data = JSON.parse(message);
      callback(data);
    });
    console.log(`[SUBSCRIBE] Listening to topic: ${topic}`);
  }

  async disconnect() {
    await this.publisher.quit();
    await this.subscriber.quit();
  }
}

export default MessageBroker;