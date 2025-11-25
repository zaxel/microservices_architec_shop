import { delay } from "../../shared-utils/delay.js";
import { analyticsEvents } from "../../shared-utils/events.js";

export const analyticDistributed = async (data) => {
    await delay(1500);
    const { message } = data;
    console.log("Analytics log created for: ", message);

    analyticsEvents.emit('log', { data, message: { title: "Analytics consumer:", text: message }, timestamp: Date.now() });

    return "analytic success.";
}



