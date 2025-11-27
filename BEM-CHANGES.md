BEM Changes — Changelog

Overview
- This file summarizes BEM-related changes applied to the theme and the rationale. Use it to track batches and rollback if needed.

Applied Batches

Batch 1 — Drawer header + products panel
- Files changed:
  - `templates/menu-simple.php` — added `mobile-drawer__header`, `mobile-drawer__logo`, moved back/close button into header.
  - `assets/css/menu-products-mobile.css` — styles moved to `mobile-drawer__*` namespace.
  - `assets/js/menu-products-mobile.js` — updated selectors to use `mobile-drawer__products-panel` and `mobile-menu__chev`.
- Commit: `c1eece7`, `9a484ce`.
- Rationale: Group drawer-related classes under `mobile-drawer` block for clarity.

Batch 2 — Accessibility utility + chevrons
- Files changed:
  - `templates/menu-simple.php`, `header.php` — replaced `screen-reader-text` with `u-visually-hidden`.
  - `assets/js/menu-products-mobile.js` — removed legacy `chev` detection; relies on `mobile-menu__chev` / `products-chevron`.
  - `assets/css/main.css` — compatibility aliases added for `.screen-reader-text` and `.chev`.
- Commit: `08caeab`, `0d5feb3`.
- Rationale: Consolidate accessibility utilities and clean chevron naming under `mobile-menu` block.

Flattened element names in `models` block
- Files changed:
  - `assets/css/models-mobile.css`, `templates/models-mobile.php` — flattened nested elements `models__item-media-shade`, `models__item-media-overlay`.
- Commit: `d315bd6`.
- Rationale: Keep `__` usage to one per element and avoid deep chaining.

Compatibility & Rollback Notes
- Transitional aliases were added to `assets/css/main.css` (selectors: `.screen-reader-text`, `.chev`, `.footer-logo`). Remove these aliases after a successful verification window.
- IDs used in JS (e.g., `#productsPanel`) were preserved intentionally to avoid breaking behavior; classes were changed alongside JS where safe.

Next Planned Batches
- Normalize block names for `product-card`, `discover`, and `hero` blocks if needed (these already follow BEM largely).
- Review global utilities and add explicit whitelist entries in `STYLEGUIDE.md`.

How to revert a batch
- Identify the commit(s) for the batch and run `git revert <commit>` or create a revert PR. For multi-file renames, revert in reverse order: JS → CSS → templates.

