import { ensureUserExists, loginUser } from "../lib/auth.js";
import { createTicket, getAllTickets } from "../lib/tickets.js";

export const options = {
  vus: 1,
  duration: "20s",
  insecureSkipTLSVerify: true,
};

export function setup() {
  ensureUserExists();
  const cookie = loginUser();
  return { cookie };
}

export default function (data) {
  createTicket(data.cookie, "Smoke Ticket", 10);
  getAllTickets(data.cookie);
}
