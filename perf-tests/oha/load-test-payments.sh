#!/bin/bash
echo "💳 Payment Service Load Test (400 concurrent users, 2 mins)"

oha -z 2m -c 400 --insecure \
  -H "Host: ticketing.dev" \
  -m POST \
  -H "Content-Type: application/json" \
  -d '{"orderId":"5ec6c93f6c627e0023725faf", "token": "tok_visa"}' \
  https://127.0.0.1/api/payments/
