#!/bin/bash
echo "💧 Soak Test: Sustained Load for 10 Minutes (300 users)"

oha -z 10m -c 300 --insecure \
  -H "Host: ticketing.dev" \
  https://127.0.0.1/api/orders
