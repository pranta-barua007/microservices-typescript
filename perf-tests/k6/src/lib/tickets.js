import { BASE_URL } from "../config.js";
import { apiPost, apiGet } from "./http.js";

export function createTicket(auth, title, price) {
  const params = typeof auth === "string" ? { headers: { "Cookie": auth } } : {};
  const jar = typeof auth === "object" ? auth : null;
  return apiPost(`${BASE_URL}/api/tickets`, { title, price }, jar, params);
}

export function getAllTickets(auth) {
  const params = typeof auth === "string" ? { headers: { "Cookie": auth } } : {};
  const jar = typeof auth === "object" ? auth : null;
  return apiGet(`${BASE_URL}/api/tickets`, jar, params);
}
