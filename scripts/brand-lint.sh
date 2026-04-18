#!/usr/bin/env bash
set -euo pipefail

# Block any bare "Techyard" reference that is not immediately followed by
# "Systems". Comment `allow-techyard-short` on the same line exempts a match.

echo "Checking for bare 'Techyard' references (must use 'Techyard Systems')..."

matches=$(rg -n '\bTechyard\b(?!\s+Systems)' \
  --glob '!docs/**' \
  --glob '!*.md' \
  --glob '!**/node_modules/**' \
  --glob '!**/.next/**' \
  --glob '!**/.velite/**' \
  --glob '!scripts/brand-lint.sh' \
  --pcre2 \
  app/ components/ content/ public/ lib/ styles/ 2>/dev/null | grep -v 'allow-techyard-short' || true)

if [ -n "$matches" ]; then
  echo ""
  echo "ERROR: Bare 'Techyard' found. Must be 'Techyard Systems' or add"
  echo "  # allow-techyard-short comment on the line."
  echo ""
  echo "$matches"
  exit 1
fi

echo "OK: no bare 'Techyard' references."
