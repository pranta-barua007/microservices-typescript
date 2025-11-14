#!/usr/bin/env bash
set -euo pipefail

SCRIPTS=(
  smoke-test.sh
  load-test-auth-signin.sh
  load-test-create-tickets.sh
  load-test-get-tickets.sh
  load-test-get-orders.sh
  spike-test.sh
  soak-test.sh
)

for s in "${SCRIPTS[@]}"; do
  echo ">>> Running $s"
  bash "./$s"
  echo ">>> Done $s"
  sleep 5
done
