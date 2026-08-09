# Styles

Global styling primitives live here.

- Keep design tokens in `variables/` (`breakpoints.css`, `color-palette.css`, `number-tokens.css`, `typography.css`).
- `index.css` only re-exports those files.
- Breakpoints are `@custom-media` in `breakpoints.css` (`--sm`, `--md`, `--lg`). PostCSS injects them into every stylesheet via `postcss.config.mjs`.
- Prefer `var(--spacing-*)`, `var(--radius*)`, and `@media (--sm)` / `--md` over raw numbers in CSS Modules.
