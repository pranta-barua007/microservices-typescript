#!/bin/bash
echo "⚡ Spike Test: Sudden Traffic Surge to 1000 Users"

oha -z 1m -c 1000 --insecure \
  -H "Host: ticketing.dev" \
  https://127.0.0.1/api/tickets
