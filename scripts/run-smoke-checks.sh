#!/usr/bin/env bash
# Lightweight smoke checks for BEM migration
# Usage: ./scripts/run-smoke-checks.sh [OPTIONAL_URL]
# If OPTIONAL_URL is provided, the script will perform an HTTP check against it.

set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "Running smoke checks in $ROOT_DIR"

# 1) Check repo clean
if [[ -n "$(git status --porcelain)" ]]; then
  echo "WARN: working tree not clean. It's recommended to run checks on a clean checkout." >&2
fi

# 2) Legacy class checks
LEGACY=("chev" "screen-reader-text" "footer-logo" "mobile-products-panel")
FOUND=0
for c in "${LEGACY[@]}"; do
  matches=$(grep -RIn --exclude-dir=.git --include=\*.{php,js,css,html,scss} "\b$c\b" . || true)
  if [[ -n "$matches" ]]; then
    echo "[LEGACY] Found '$c' in files:"; echo "$matches"; FOUND=1
  else
    echo "[OK] No occurrences of legacy '$c'"
  fi
done

# 3) Required BEM classes exist
REQUIRED=("mobile-drawer__products-panel" "mobile-drawer__header" "product-card__title" "models__item")
for r in "${REQUIRED[@]}"; do
  if grep -RIn --exclude-dir=.git --include=\*.{php,js,css,html,scss} "\b$r\b" . >/dev/null; then
    echo "[OK] Found required BEM class: $r"
  else
    echo "[MISSING] Required BEM class not found: $r"; FOUND=1
  fi
done

# 4) Optional URL checks
URL="${1-}"
if [[ -n "$URL" ]]; then
  echo "Checking URL: $URL"
  http_status=$(curl -s -o /dev/null -w "%{http_code}" "$URL" || echo "000")
  if [[ "$http_status" = "200" ]]; then
    echo "[OK] $URL returned HTTP 200"
    # Check presence of mobileDrawer id on HTML
    has_drawer=$(curl -s "$URL" | grep -i "id=\"mobileDrawer\"" || true)
    if [[ -n "$has_drawer" ]]; then
      echo "[OK] mobileDrawer found in HTML at $URL"
    else
      echo "[WARN] mobileDrawer not found in HTML at $URL"
      FOUND=1
    fi
  else
    echo "[ERROR] $URL returned HTTP $http_status"; FOUND=1
  fi
fi

if [[ $FOUND -eq 0 ]]; then
  echo "Smoke checks passed (no obvious failures)."
  exit 0
else
  echo "Smoke checks found issues. See output above." >&2
  exit 2
fi
