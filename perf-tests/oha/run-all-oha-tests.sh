#!/bin/bash
set -e

echo "🚀 Starting Full OHA Performance Suite (500–1000 users)"
echo "---------------------------------------------------------"

scripts=(
  "smoke-test.sh"
  "load-test-auth.sh"
  "load-test-tickets.sh"
  "load-test-orders.sh"
  "load-test-payments.sh"
  "spike-test.sh"
  "soak-test.sh"
)

for script in "${scripts[@]}"; do
  echo -e "\n▶️  Running $script..."
  bash "./$script"
  echo -e "✅ Completed $script\n----------------------------------------"
  sleep 10
done

echo "🎯 All OHA Tests Completed!"
