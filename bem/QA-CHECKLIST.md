QA Checklist — BEM Migration (quick)

Purpose: manual checklist and quick verification steps to confirm BEM migration didn't cause regressions.

Pre-conditions
- Pull latest `main` and clear caches on staging if applicable.
- If possible, test against a staging site URL. If not, run checks locally.

Manual visual checks (mobile + desktop)
- Open site on mobile viewport (or use Chrome devtools) and:
  - Open the mobile drawer (`menu` button). Confirm header shows logo and back/close button aligned.
  - Tap `Products` — the Products panel should slide in smoothly; Back arrow should immediately close it without flash.
  - While Products panel open, main menu should be visually hidden but accessible to screen readers if implemented.
  - Tap product card links — drawer should close and navigate to product page.
  - Confirm header and footer logos display at expected sizes.
- Desktop viewport:
  - Confirm header layout unchanged and product grid displays correctly.

Automated smoke checks (run `scripts/run-smoke-checks.sh`)
- Checks performed:
  - Ensure no legacy classes remain: `chev`, `screen-reader-text`, `footer-logo`, `mobile-products-panel`.
  - Ensure key BEM classes exist in files: `mobile-drawer__products-panel`, `mobile-drawer__header`, `product-card__title`, `models__item`.
  - Optional: pass a staging URL to the script to verify HTTP 200 and check presence of drawer element by id `#mobileDrawer`.

If issues found
- If CSS/layout regressions: revert last BEM commit or re-add compatibility alias temporarily and open issue.
- If behavioral regressions: check JS console for errors (use devtools) and report failing selector names.

Sign-off
- Tester: __________________
- Date: __________________
- Notes: __________________________________________
