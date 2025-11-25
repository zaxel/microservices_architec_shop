import { v4 as uuidv4 } from "uuid";
import { analyticsEvents } from '../shared-utils/events.js';
import { delay } from "../shared-utils/delay.js";

export const pay = async (cart, userId) => {
  await delay(1500);
  const total = cart.reduce((acc, next) => acc+next.price, 0);
  const message = `User ${userId} paid $${total.toFixed(2)}.`;
  console.log("payment provider ", message);
  analyticsEvents.emit('log', { data: cart, message: {title: "Payment provider:", text: message}, timestamp: Date.now() });

  return message;
};

export const createOrder = async (cart, userId) => {
  await delay(1500);
  const id = uuidv4();
  const message = `Order ${id} successfully created.`;
  console.log("order provider ", message);
  analyticsEvents.emit('log', { data: userId, message: {title: "Order provider:", text: message}, timestamp: Date.now() });
  return { orderId: id, message };
};

export const sendEmail = async (orderId, userId, emailResult) => {
  await delay(1500);
  const message = "eMail successfully sent.";
  console.log("eMail provider ", message);
  analyticsEvents.emit('log', { data: userId, message: {title: "eMail provider:", text: message}, timestamp: Date.now() });
  return message;
};

export const logAnalytics = async (data, message, provider) => {
  await delay(1500);
  console.log("Analytics log created for: ", message);
  analyticsEvents.emit('log', { data, message: {title: "Analytics consumer:", text: message}, timestamp: Date.now() });
  return "analytic success.";
};