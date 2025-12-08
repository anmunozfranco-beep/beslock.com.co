#!/usr/bin/env bash
set -euo pipefail
# Prevent accidental commits that add/modify top-level `assets/` or `templates/`
# Keep canonical assets/templates under `beslock-custom/`.

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM || true)
if [ -z "$STAGED_FILES" ]; then
  exit 0
fi

blocked=0
for f in $STAGED_FILES; do
  case "$f" in
    assets/*|templates/*)
      echo "Error: committing changes to top-level path '$f' is blocked."
      echo "Keep assets and templates under 'beslock-custom/'."
      blocked=1
      ;;
  esac
done

if [ "$blocked" -eq 1 ]; then
  echo
  echo "If you really need to commit these changes, use: git commit --no-verify"
  exit 1
fi

exit 0
