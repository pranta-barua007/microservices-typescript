#!/bin/bash
echo "📦 Order Service Load Test (500 concurrent users, 2 mins)"

# Create order
oha -z 2m -c 500 --insecure \
  -H "Host: ticketing.dev" \
  -m POST \
  -H "Content-Type: application/json" \
  -d '{"ticketId":"604150ce9a43b7001a54b720"}' \
  https://127.0.0.1/api/orders

# Get orders
oha -z 2m -c 500 --insecure \
  -H "Host: ticketing.dev" \
  https://127.0.0.1/api/orders
