import { ensureUserExists, loginUser } from "../lib/auth.js";
import { createTicket } from "../lib/tickets.js";
import { createOrder, getOrders } from "../lib/orders.js";
import { payOrder } from "../lib/payments.js";

export const options = {
  vus: 20,
  duration: "2m",
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
  const ticket = createTicket(cookie, "Journey Ticket", 40);
  const ticketId = ticket.json().id;

  // 2. Create Order
  const order = createOrder(cookie, ticketId);
  const orderId = order.json().id;

  // 3. Pay Order
  payOrder(cookie, orderId);

  // 4. Get all orders
  getOrders(cookie);
}
