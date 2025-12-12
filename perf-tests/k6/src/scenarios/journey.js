import { sleep } from 'k6';
import { ensureUserExists, loginUser } from "../lib/auth.js";
import { createTicket } from "../lib/tickets.js";
import { createOrder, getOrders } from "../lib/orders.js";
import { payOrder } from "../lib/payments.js";

export const options = {
  vus: 100,
  duration: "1m",
  insecureSkipTLSVerify: true,
};

export function setup() {
  ensureUserExists();
  const cookie = loginUser();
  return { cookie };
}

export default function (data) {
  const cookie = data.cookie;

  // 1. Create Ticket
  const ticketName = `Journey Ticket ${__ITER}`;
  const ticketPrice = Number(40 + __ITER);
  const ticket = createTicket(cookie, ticketName, ticketPrice);
  const ticketId = ticket.json().id;

  sleep(0.5);

  // 2. Create Order
  const order = createOrder(cookie, ticketId);
  const orderId = order.json().id;

  sleep(0.5);

  // 3. Pay Order
  payOrder(cookie, orderId);

  sleep(0.5);
  // 4. Get all orders
  getOrders(cookie);
}
