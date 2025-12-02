import { ensureUserExists, loginUser } from "../lib/auth.js";
import { createTicket } from "../lib/tickets.js";

export const options = {
  stages: [
    { duration: "5s", target: 10 },
    { duration: "10s", target: 200 },
    { duration: "15s", target: 1000 },
    { duration: "20s", target: 200 },
    { duration: "10s", target: 10 },
  ],
  insecureSkipTLSVerify: true,
};

export function setup() {
  ensureUserExists();
  const cookie = loginUser();
  return { cookie };
}

export default function (data) {
  createTicket(data.cookie, "Spike Ticket", 25);
}
