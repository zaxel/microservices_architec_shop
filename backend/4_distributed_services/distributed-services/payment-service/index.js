import { delay } from "../../shared-utils/delay.js";
import { analyticsEvents } from "../../shared-utils/events.js";
import {redisBroker} from "../redis/redisBrokerEmitter.js";


export const payDistributed = async (cart, userId) => {
  await delay(1500);
  const total = cart.reduce((acc, next) => acc+next.price, 0);
  const message = `User ${userId} paid $${total.toFixed(2)}.`;
  console.log("payment provider: ", message);
  
  analyticsEvents.emit('log', { data: cart, message: {title: "Payment provider:", text: message}, timestamp: Date.now() });
  await redisBroker.publish("payment-success", {
    userId, 
    cart, 
    message
  });

  return message;
};

