import { redisBroker } from "./redisBrokerEmitter.js";

export const startRedisBroker = async () => {
    try {
        await redisBroker.connect();
        console.log("Redis broker connected successfully");
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }

}