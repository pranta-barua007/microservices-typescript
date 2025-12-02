import { BASE_URL } from "../config.js";
import { apiPost, apiGet } from "./http.js";

export function createOrder(auth, ticketId) {
  const params = typeof auth === "string" ? { headers: { "Cookie": auth } } : {};
  const jar = typeof auth === "object" ? auth : null;
  return apiPost(`${BASE_URL}/api/orders`, { ticketId }, jar, params);
}

export function getOrders(auth) {
  const params = typeof auth === "string" ? { headers: { "Cookie": auth } } : {};
  const jar = typeof auth === "object" ? auth : null;
  return apiGet(`${BASE_URL}/api/orders`, jar, params);
}
