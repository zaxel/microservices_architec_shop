import { v4 as uuidv4 } from "uuid";
import { delay } from "../../shared-utils/delay.js";
import { redisBroker } from "../redis/redisBrokerEmitter.js";
import { analyticsEvents } from "../../shared-utils/events.js";

export const orderDistributed = async (data) => {
    await delay(1500);
    const id = uuidv4().slice(0, 10);
    const { userId, cart } = data;
    const message = `Order ${id} for user ${userId} successfully created.`;

    console.log("order provider: ", message);
    analyticsEvents.emit('log', { data: userId, message: {title: "Order provider:", text: message}, timestamp: Date.now() });

    await redisBroker.publish("order-success", {
        userId,
        cart,
        message
    });
    return message;
};

