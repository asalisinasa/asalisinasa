# Workflow

## Default Agent Flow

1. Read `AGENTS.md`.
2. Inspect the current repository state before changing files.
3. Keep changes scoped to the requested step.
4. Do not commit unless the user explicitly asks.
5. Report the verification performed and provide a commit message for the user.

## Repomix

- Config: `repomix.config.ts`.
- Instruction file: `repomix-instruction.md`.
- Generate snapshot: `npm run repomix:generate`.
- Output: `.repomix/repomix-output.xml`, ignored by git.
- Treat generated snapshots as orientation aids. Verify against the repository before relying on stale output.

## Planning Rules

- Use `.agents/plans/` for large architecture, product, or migration changes.
- A plan should be decision-complete before implementation starts.
- Keep plans concise but explicit about scope, interfaces, test coverage, and assumptions.

## Editing Rules

- Preserve unrelated user changes.
- Do not rewrite the legacy archive unless the task explicitly targets it.
- Do not duplicate detailed instructions outside `.agents/`.
- Keep public content and implementation separated where practical.

## Verification Rules

- For docs-only changes, run `git diff --check`.
- For application changes, run the narrowest relevant command first.
- Before handoff on application work, prefer `npm run lint` and `npm run build`.
- For agent/Repomix changes, run `git diff --check`, `npm run repomix:generate`, and confirm `.repomix/` output is untracked.
- If a command cannot be run, state why and what should be checked manually.
