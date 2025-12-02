import { sleep, check } from "k6";

export function randomSleep() {
  sleep(Math.random() * 2 + 1);
}

export function validateResponse(res, expectedStatus = 200) {
  check(res, {
    "status is expected": (r) => r.status === expectedStatus
  });
}
