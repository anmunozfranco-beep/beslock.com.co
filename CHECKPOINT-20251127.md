# Checkpoint — 2025-11-27

Commit: `977996f` (HEAD -> main)

Summary:
- Cleaned development instrumentation from frontend JS.
  - Removed unconditional `console.log` statements from `assets/js/main.js` and `assets/js/menu-products-mobile.js`.
  - Converted `dbgLog` / `dbgWarn` into no-ops in `menu-products-mobile.js`.
  - Left `console.warn` and `console.error` where they indicate real runtime problems.
- Fixed a SyntaxError in `assets/js/menu-products-mobile.js` (missing closing tokens in nested `requestAnimationFrame`), committed earlier.
- Added an asset bump token in `functions.php` (`$BESLOCK_ASSET_BUMP = '20251127.1'`) and appended it to mobile menu/models CSS & JS versions to force cache-bust when needed.

Files changed (high level):
- `assets/js/menu-products-mobile.js` — cleanup + bugfixes + idempotent init + delegated fallback (finalized)
- `assets/js/main.js` — removed dev logs, small housekeeping
- `functions.php` — added `$BESLOCK_ASSET_BUMP` and appended to enqueued mobile asset versions

Notes / Next actions:
- To force clients to pick up the updated assets, either:
  - Reload pages with cache disabled in DevTools (Network → Disable cache → reload), or
  - Increment `$BESLOCK_ASSET_BUMP` in `functions.php` and deploy.
- If you want me to remove the bump token and instead derive it from CI (e.g., build timestamp), I can change that.

Tag created: `checkpoint/clean-menu-20251127`

If you need a different tag name or a conventional changelog entry, tell me and I can update it.