import { ensureUserExists, loginUser } from "../lib/auth.js";
import { createTicket } from "../lib/tickets.js";

export const options = {
  vus: 50,
  duration: "1m",
  insecureSkipTLSVerify: true,
};

export function setup() {
  try {
    ensureUserExists();
  } catch (err) {
    console.error(err)
  }
  const cookie = loginUser();
  return { cookie };
}

export default function (data) {
  createTicket(data.cookie, "Load Ticket", 20);
}
