#!/usr/bin/env bash
# Creates a test user and saves the returned session cookie into $COOKIE_FILE
# Usage: source common_prep.sh

set -eu

HOST_HEADER="ticketing.dev"
BASE_URL="https://127.0.0.1"
COOKIE_FILE="/tmp/ticketing_test_cookie.txt"

# generate unique test user
NOW=$(date +%s)
TEST_EMAIL="loadtest_${NOW}@example.com"
TEST_PASS="LoadTestP@ssw0rd"

# Signup user (ignore output)
curl --insecure -s -X POST \
  -H "Host: ${HOST_HEADER}" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${TEST_EMAIL}\",\"password\":\"${TEST_PASS}\"}" \
  "${BASE_URL}/api/users/signup" -o /dev/null

# Signin and capture Set-Cookie header
TMPHEADERS=$(mktemp)
curl --insecure -s -D "$TMPHEADERS" -X POST \
  -H "Host: ${HOST_HEADER}" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${TEST_EMAIL}\",\"password\":\"${TEST_PASS}\"}" \
  "${BASE_URL}/api/users/signin" -o /dev/null

# extract cookie (first Set-Cookie header, cookie value only)
grep -i '^Set-Cookie:' "$TMPHEADERS" | head -n1 | sed -E 's/Set-Cookie: ([^;]+).*/\1/' > "$COOKIE_FILE"
rm -f "$TMPHEADERS"

if [ ! -s "$COOKIE_FILE" ]; then
  echo "ERROR: cookie not found in signin response. Check signin endpoint." >&2
  exit 1
fi

echo "Created test user: ${TEST_EMAIL} (password: ${TEST_PASS})"
echo "Cookie saved to ${COOKIE_FILE}"
export COOKIE_FILE
export TEST_EMAIL
export TEST_PASS
