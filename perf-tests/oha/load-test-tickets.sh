#!/bin/bash
echo "🎟 Ticket Service Load Test (700 concurrent users, 2 mins)"

# Create ticket
oha -z 2m -c 700 --insecure \
  -H "Host: ticketing.dev" \
  -m POST \
  -H "Content-Type: application/json" \
  -d '{"title":"concert-{{i}}","price":{{i}}}' \
  https://127.0.0.1/api/tickets

# Get tickets
oha -z 2m -c 700 --insecure \
  -H "Host: ticketing.dev" \
  https://127.0.0.1/api/tickets
