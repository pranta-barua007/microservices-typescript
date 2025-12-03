import http from "k6/http";
import { check, fail } from "k6";
import { HOST_HEADER } from "../config.js";

export function apiGet(url, jar, params = {}) {
  const headers = Object.assign({ "Host": HOST_HEADER }, params.headers || {});
  const res = http.get(url, { ...params, headers, jar });

  if (!check(res, { "status is 2xx": (r) => r.status >= 200 && r.status < 300 })) {
    fail(`GET ${url} failed → ${res.status} message → ${res.body}`);
  }

  return res;
}

export function apiPost(url, body, jar, params = {}) {
  const headers = Object.assign({ "Content-Type": "application/json", "Host": HOST_HEADER }, params.headers || {});
  const res = http.post(
    url,
    JSON.stringify(body),
    { ...params, headers, jar }
  );

  if (!check(res, { "status is 2xx/201": (r) => r.status >= 200 && r.status < 300 })) {
    fail(`POST ${url} failed → ${res.status} message → ${res.body}`);
  }

  return res;
}
