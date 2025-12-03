import http from "k6/http";
import { BASE_URL, TEST_USER, HOST_HEADER } from "../config.js";
import { apiPost } from "./http.js";
import { sleep } from "k6";

export function ensureUserExists(user=TEST_USER) {
  // Attempt signup — if already exists, it's fine
  http.post(`${BASE_URL}/api/users/signup`,
    JSON.stringify(user),
    {
      headers: { "Content-Type": "application/json", "Host": HOST_HEADER },
      insecureSkipTLSVerify: true,
    });

  sleep(1);
}

export function loginUser(user=TEST_USER) {
  const jar = http.cookieJar();

  const res = apiPost(
    `${BASE_URL}/api/users/signin`,
    {
      email: user.email,
      password: user.password,
    },
    jar
  );

  const cookie = res.headers["Set-Cookie"];
  return cookie;
}
