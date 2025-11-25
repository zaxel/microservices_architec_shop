import { v4 as uuidv4 } from "uuid";
import { delay } from "../../shared-utils/delay.js";
import { redisBroker } from "../redis/redisBrokerEmitter.js";
import { analyticsEvents } from "../../shared-utils/events.js";

export const emailDistributed = async (data) => {
    await delay(1500);
    const { userId, cart } = data;
    const message = `eMail successfully sent to user ${userId}.`;

    console.log("email provider: ", message);
    analyticsEvents.emit('log', { data: userId, message: {title: "Email provider:", text: message}, timestamp: Date.now() });
    await redisBroker.publish("email-success", {
        userId,
        cart,
        message
    });
}

