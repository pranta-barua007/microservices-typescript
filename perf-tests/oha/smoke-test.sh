#!/bin/bash
echo "🚦 Smoke Test: Basic Health Check"
oha -z 30s -c 10 --insecure -H "Host: ticketing.dev" https://127.0.0.1/
