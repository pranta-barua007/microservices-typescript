import { ensureUserExists, loginUser } from "../lib/auth.js";
import { createTicket } from "../lib/tickets.js";

export const options = {
  vus: 40,
  duration: "30m",
  insecureSkipTLSVerify: true,
};

export function setup() {
  ensureUserExists();
  const cookie = loginUser();
  return { cookie };
}

export default function (data) {
  createTicket(data.cookie, "Soak Ticket", 15);
}
