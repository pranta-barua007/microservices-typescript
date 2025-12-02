import { ensureUserExists, loginUser } from "../lib/auth.js";
import { createTicket } from "../lib/tickets.js";

export const options = {
  stages: [
    { duration: "1m", target: 50 },
    { duration: "2m", target: 200 },
    { duration: "1m", target: 0 },
  ],
  insecureSkipTLSVerify: true,
};

export function setup() {
  ensureUserExists();
  const cookie = loginUser();
  return { cookie };
}

export default function (data) {
  createTicket(data.cookie, "Stress Ticket", 30);
}
