#!/usr/bin/env bash
set -euo pipefail

echo "🚦 Smoke Test: Basic Health Check"

oha -z 30s -c 10 --insecure \
  --disable-keepalive \
  -H "Host: ticketing.dev" \
  https://127.0.0.1/
