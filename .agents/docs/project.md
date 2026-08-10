# Project Overview and Architecture

## Stack

- **Next.js 16.3** App Router (Turbopack), React 19, TypeScript 7.
- **npm** package manager; **system Node** runtime for dev/build/start.
- **oxlint** for linting, **oxfmt** for formatting.
- CSS Modules for global styling; terminal-style design tokens in `src/ui/styles`.
- Content via **Sanity** headless CMS; site reads through `next-sanity` in React Server Components. Data fetching goes through `defineLive` (`src/sanity/lib/live.ts`), with `<SanityLive />` mounted in the root layout for live content updates.
- Studio source lives in `/sanity` (standalone, not embedded): `sanity.config.ts`, `sanity.cli.ts`, `schemaTypes/`, `structure.ts`, `env.ts`. Run `npm run studio:dev` / `npm run studio:deploy` (scripts `cd` into `sanity/` first). lint/format/tsconfig exclude it from the Next app.
- Site-side Sanity modules live in `src/sanity/`: `client.ts`, `env.ts`, `queries.ts` (`defineQuery`), `types.ts`, `lib/live.ts` (`defineLive`). TypeGen writes `src/sanity.types.ts`; run `npm run typegen` after schema/query changes.
- Deploy target: Vercel.

## Conventions

- **Content lives in Sanity** (hosted studio). Site-side client and GROQ queries are in `src/sanity/`; sections receive fetched data as props.
- **Sections** are self-contained React Server Components under `src/app/(site)/_sections/*`, each with its own CSS Module. The `LayoutWindow` shell (`src/widgets-ui/layout-window/`) wraps them in a terminal-style card.
- **Routing**: route group `(site)` keeps the group's components/lib/sections private to the home route. Closing `/` via `trailingSlash: true` in `next.config.ts`.
- **Styling**: one CSS Module per component/section; shared tokens via `@import`-ed `tokens.css`. No CSS-in-JS.
- **Path alias**: `@/*` → `./src/*` (tsconfig `paths`).
- **Type formatting**: type-only imports via `import type`.

## Configuration files

- `tsconfig.json` — strict, `moduleResolution: bundler`, `jsx: react-jsx`, `noEmit`, `incremental`.
- `.oxlintrc.json` — plugins `react`/`nextjs`; categories correctness/suspicious/perf = warn; `react-in-jsx-scope` and `jsx-max-depth` off (automatic JSX runtime).
- `.oxfmtrc.jsonc` — printWidth 100, semi, double quotes, trailingComma all; `.agents`, `.repomix`.

## Tooling scripts

| Script | Command |
| --- | --- |
| Install | `npm install` |
| Dev | `npm run dev` (`next dev`) |
| Build | `npm run build` (`next build`) |
| Start | `npm run start` (`next start`) |
| Lint / fix | `npm run lint` / `npm run lint:fix` (oxlint) |
| Type-check | `npm run type-check` (`tsc --noEmit`) |
| Format / check | `npm run format` / `npm run format:check` (oxfmt) |
| Sanity seed | `npm run sanity:seed` (writes draft content from `scripts/sanity-seed.ts` to the dataset; needs `SANITY_API_WRITE_TOKEN`) |
| Studio dev | `npm run studio:dev` (local Studio) |
| Studio deploy | `npm run studio:deploy` (deploys Studio to `<name>.sanity.studio`) |
| Repomix snapshot | `npm run repomix:generate` |
