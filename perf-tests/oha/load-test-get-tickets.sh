#!/usr/bin/env bash
set -euo pipefail
# Ticket read load test. Creates session cookie then runs test:
#  - list tickets (GET)
# Concurrency and durations can be tuned per call.

BASE="https://127.0.0.1"
HOST_HEADER="ticketing.dev"

# prepare user + cookie (makes user and saves cookie, but for signin load test we reuse credentials)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common_prep.sh"

COOKIE_VAL=$(grep -i "session=" /tmp/ticketing_test_cookie.txt | sed 's/^set-cookie:[ ]*//I' | cut -d';' -f1)
COOKIE_HEADER="Cookie: ${COOKIE_VAL}"

echo "🎟 Ticket Service Load Test: GET"

# Get tickets (GET)
oha -z 1m -c 700 --insecure \
  --disable-keepalive \
  --latency-correction \
  -H "Host: ${HOST_HEADER}" \
  -H "${COOKIE_HEADER}" \
  "${BASE}/api/tickets"
