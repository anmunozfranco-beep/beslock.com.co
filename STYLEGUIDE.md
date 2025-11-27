BEM Styleguide — Beslock Theme

Purpose
- Provide a concise BEM naming convention and usage guidance for this theme.

Blocks, Elements, Modifiers
- Block: `.block` — top-level component (e.g., `.mobile-drawer`, `.models`, `.product-card`).
- Element: `.block__element` — a direct child or part of the block (e.g., `.models__item`, `.product-card__title`).
- Modifier: `.block--modifier` or `.block__element--modifier` — state or variant (e.g., `.models--hidden`, `.mobile-drawer__header--compact`).

Rules
- Use lowercase letters and hyphens only. No camelCase.
- Use double underscore `__` for elements and double dash `--` for modifiers.
- Do not chain `__` more than once: prefer flattening nested parts into `block__element-sub` instead of `block__element__sub`.
- Keep blocks small and focused. Avoid bloated selectors referencing unrelated blocks.
- Prefer composition over deep nesting in CSS; avoid descendant selectors deeper than 1 level for components.

Utilities & Whitelist
- Some classes are intentional utilities or external library classes and should NOT be renamed:
  - `u-container` (layout utility)
  - `u-visually-hidden` (accessibility utility)
  - `btn` (project button primitive)
  - `reveal` (scroll reveal helper)
  - `bi` and Bootstrap Icons selectors (third-party)
  - `lazyload` (lazyload helper)

Transition Plan
1. Create rename mapping (`bem/bem-renames.json`).
2. Apply renames in small, safe batches: templates → CSS → JS.
3. Add transitional compatibility rules where necessary (temporary aliases in `assets/css/main.css`).
4. After deployment and QA, remove aliases and cleanup CSS/JS.

Examples
- Good: `<div class="product-card product-card--featured">`
- Good: `<h3 class="product-card__title">`
- Avoid: `<div class="product_card productCard">` and nested `__` more than once.

Notes
- Keep element IDs used by JS (e.g., `#productsPanel`) stable while renaming classes to avoid breaking selectors; update JS simultaneously when safe to do so.
- Document any exceptions to the rule in `BEM-CHANGES.md` when they are made.

Contact
- If unsure about a rename, open an issue or ask in the repo before applying large-scale changes.
