#!/bin/bash
echo "🔐 Auth Service Load Test (500 concurrent users, 2 mins)"

# Sign up test
oha -z 2m -c 500 --insecure \
  -H "Host: ticketing.dev" \
  -m POST \
  -H "Content-Type: application/json" \
  -d '{"email":"user{{i}}@loadtest.com","password":"strongpass123"}' \
  https://127.0.0.1/api/users/signup

# Sign in test
oha -z 2m -c 500 --insecure \
  -H "Host: ticketing.dev" \
  -m POST \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@loadtest.com","password":"strongpass123"}' \
  https://127.0.0.1/api/users/signin
