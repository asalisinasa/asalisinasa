# REPOSITORY INSTRUCTIONS

This file is the instruction source used by Repomix snapshots for AI assistants working on this portfolio repository.

## Runtime And Commands

- Package manager: npm. Runtime: system Node.
- Install: `npm install`.
- Development: `npm run dev`.
- Lint: `npm run lint`.
- Type-check: `npm run type-check`.
- Build: `npm run build`.
- Repomix snapshot: `npm run repomix:generate`.

## Repository Shape

- `AGENTS.md` is the short agent entrypoint and map.
- `.agents/` is the canonical source for agent docs, rules, skills, tasks, templates, and wiki context.
- `src/app` contains the Next.js App Router app.
- `src/components/ui` contains reusable local UI primitives.
- `src/styles` contains global tokens and shared styling primitives.
- `.repomix/` contains generated Repomix output and is ignored.

## Agent Resources

- Docs: `.agents/docs/`.
- Skills: `.agents/skills/*/`.
- Plans: `.agents/plans/`.
- Tasks: `.agents/tasks/`.
- Project readmes: `src/app/README.md`, `src/components/README.md`

When agent guidance changes, keep `AGENTS.md`, and this file aligned.

## Current Constraints

- Keep the project a Bun-first single Next.js App Router app.
- Do not introduce npm/workspaces, GraphQL, Sanity, CMS, API routes, or backend contracts.
- Keep content directly in the repository unless a later plan explicitly changes this.

## Verification Defaults

- Docs-only changes: `git diff --check`.
- Application changes: `npm run lint` and `npm run build`.
- Agent/Repomix changes: `git diff --check`, `npm run repomix:generate`, and confirm `.repomix/` output remains untracked.
