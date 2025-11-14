#!/usr/bin/env bash
set -euo pipefail
# Auth signin load test: reuse the same credentials and hit signin endpoint concurrently
# Duration: 2m, Concurrency: 500 (adjust as needed)

BASE="https://127.0.0.1"
HOST_HEADER="ticketing.dev"

# prepare user + cookie (makes user and saves cookie, but for signin load test we reuse credentials)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common_prep.sh"

echo "🔐 Auth Service Load Test (500 concurrent users, 2 minutes)"

# run oha against signin endpoint (this simulates repeated sign-ins for same credentials)
oha -z 2m -c 500 --insecure \
  --disable-keepalive \
  --latency-correction \
  -H "Host: ${HOST_HEADER}" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${TEST_EMAIL}\",\"password\":\"${TEST_PASS}\"}" \
  -m POST \
  "${BASE}/api/users/signin"
