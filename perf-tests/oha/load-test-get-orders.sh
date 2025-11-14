#!/usr/bin/env bash
set -euo pipefail

BASE="https://127.0.0.1"
HOST_HEADER="ticketing.dev"

# prepare user + cookie (makes user and saves cookie, but for signin load test we reuse credentials)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common_prep.sh"

COOKIE_VAL=$(grep -i "session=" /tmp/ticketing_test_cookie.txt | sed 's/^set-cookie:[ ]*//I' | cut -d';' -f1)
COOKIE_HEADER="Cookie: ${COOKIE_VAL}"

echo "📦 Order Service Load Test (500 concurrent users)"

# Get orders (safe authenticated endpoint)
oha -z 2m -c 500 --insecure \
  --disable-keepalive \
  --latency-correction \
  -H "Host: ${HOST_HEADER}" \
  -H "${COOKIE_HEADER}" \
  "${BASE}/api/orders"
