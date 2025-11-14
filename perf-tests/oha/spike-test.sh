#!/usr/bin/env bash
set -euo pipefail

BASE="https://127.0.0.1"
HOST_HEADER="ticketing.dev"

echo "⚡ Spike Test: Sudden Traffic Surge to 1000 Users for 1 minute -> /api/tickets (public GET)"

oha -z 1m -c 1000 --insecure \
  --disable-keepalive \
  --latency-correction \
  -H "Host: ${HOST_HEADER}" \
  "${BASE}/api/tickets"
