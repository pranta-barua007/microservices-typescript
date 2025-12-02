import { BASE_URL } from "../config.js";
import { apiPost } from "./http.js";

export function payOrder(auth, orderId) {
  const params = typeof auth === "string" ? { headers: { "Cookie": auth } } : {};
  const jar = typeof auth === "object" ? auth : null;
  return apiPost(`${BASE_URL}/api/payments`, { orderId, token: "tok_visa" }, jar, params);
}
