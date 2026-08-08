# Agent Guide

Entry point for agents. Keep this file short: detailed guidance lives under `.agents/docs/`. When you add or change process rules, update the relevant doc there.

## Map

- Project overview and architecture: `.agents/docs/project.md`
- Automatic agent selection and intelligent task routing: `.agents/skills/intelligent-routing`
- Development workflow and verification: `.agents/docs/workflow.md`
- Deferred agent tasks: `.agents/tasks/`
- Durable plans: `.agents/plans/`
- Repomix context packaging: `repomix.config.ts` and `repomix-instruction.md`

## Agent operating principles

### 0. Non-negotiables

These rules override everything else in this file when in conflict:

- **No flattery, no filler.** Skip openers like "Great question", "You're absolutely right", "Excellent idea", "I'd be happy to". Start with the answer or the action.
- **Disagree when you disagree.** If the user's premise is wrong, say so before doing the work. Agreeing with false premises to be polite is the single worst failure mode in coding agents.
- **Never fabricate.** Not file paths, not commit hashes, not API names, not test results, not library functions. If you don't know, read the file, run the command, or say "I don't know, let me check."
- **Stop when confused.** If the task has two plausible interpretations, ask. Do not pick silently and proceed.
- **Touch only what you must.** Every changed line must trace directly to the user's request. No drive-by refactors, reformatting, or "while I was in there" cleanups.

### 1. Before writing code

Goal: understand the problem and the codebase before producing a diff.

- State your plan in one or two sentences before editing. For anything non-trivial, produce a numbered list of steps with a verification check for each.
- Read the files you will touch. Read the files that call the files you will touch. Codex: use subagents for exploration so the main context stays clean.
- Match existing patterns in the codebase. If the project uses pattern X, use pattern X, even if you'd do it differently in a greenfield repo.
- Surface assumptions out loud: "I'm assuming you want X, Y, Z. If that's wrong, say so." Do not bury assumptions inside the implementation.
- If two approaches exist, present both with tradeoffs. Do not pick one silently. Exception: trivial tasks (typo, rename, log line) where the diff fits in one sentence.

### 2. Writing code: simplicity first

Goal: the minimum code that solves the stated problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code. No configurability, flexibility, or hooks that were not requested.
- No error handling for impossible scenarios. Handle the failures that can actually happen.
- If the solution runs 200 lines and could be 50, rewrite it before showing it.
- If you find yourself adding "for future extensibility", stop. Future extensibility is a future decision.
- Bias toward deleting code over adding code. Shipping less is almost always better.
- The test: would a senior engineer reading the diff call this overcomplicated? If yes, simplify.

### 3. Surgical changes

Goal: clean, reviewable diffs. Change only what the request requires.

- Do not "improve" adjacent code, comments, formatting, or imports that are not part of the task.
- Do not refactor code that works just because you are in the file.
- Do not delete pre-existing dead code unless asked. If you notice it, mention it in the summary.
- Do clean up orphans created by your own changes (unused imports, variables, functions your edit made obsolete).
- Match the project's existing style exactly: indentation, quotes, naming, file layout.
- The test: every changed line traces directly to the user's request. If a line fails that test, revert it.

### 4. Goal-driven execution

Goal: define success as something you can verify, then loop until verified.

Rewrite vague asks into verifiable goals before starting:

- "Add validation" becomes "Write tests for invalid inputs (empty, malformed, oversized), then make them pass."
- "Fix the bug" becomes "Write a failing test that reproduces the reported symptom, then make it pass."
- "Refactor X" becomes "Ensure the existing test suite passes before and after, and no public API changes."
- "Make it faster" becomes "Benchmark the current hot path, identify the bottleneck with profiling, change it, show the benchmark is faster."

For every task:

- State the success criteria before writing code.
- Write the verification (test, script, benchmark, screenshot diff) where practical.
- Run the verification. Read the output. Do not claim success without checking.
- If the verification fails, fix the cause, not the test.

### 5. Tool use and verification

- Prefer running the code to guessing about the code. If a test suite exists, run it. If a linter exists, run it. If a type checker exists, run it.
- Never report "done" based on a plausible-looking diff alone. Plausibility is not correctness.
- When debugging, address root causes, not symptoms. Suppressing the error is not fixing the error.
- For UI changes, verify visually: screenshot before, screenshot after, describe the diff.
- Use CLI tools (`gh`, `aws`, `gcloud`, `kubectl`) when they exist. They are more context-efficient than reading docs or hitting APIs unauthenticated.
- When reading logs, errors, or stack traces, read the whole thing. Half-read traces produce wrong fixes.

### 6. Session hygiene

- Context is the constraint. Long sessions with accumulated failed attempts perform worse than fresh sessions with a better prompt.
- After two failed corrections on the same issue, stop. Summarize what you learned and ask the user to reset the session with a sharper prompt.
- Before a long session wraps up, offer to compress it into `.agents/docs/project-status.md` (see `.agents/skills/project-status-handoff/SKILL.md`) so the next session starts clean.
- Use subagents (Codex: "use subagents to investigate X") for exploration tasks that would otherwise pollute the main context with dozens of file reads.
- When committing, write descriptive commit messages (subject under 72 chars, body explains the why). No "update file" or "fix bug" commits. Follow **`.agents/docs/conventional-commits/llms-full.txt`**. No "Co-Authored-By: Cursor" attribution unless the project explicitly wants it.

### 7. When to ask, when to proceed

Ask before proceeding when:

- The request has two plausible interpretations and the choice materially affects the output.
- The change touches something you've been told is load-bearing, versioned, or has a migration path.
- You need a credential, a secret, or a production resource you don't have access to.
- The user's stated goal and the literal request appear to conflict.

Proceed without asking when:

- The task is trivial and reversible (typo, rename a local variable, add a log line).
- The ambiguity can be resolved by reading the code or running a command.
- The user has already answered the question once in this session.

### 9. Project Context

Current state:

- This repository contains a Next.js App Router scaffold and the preserved legacy static resume landing.
- The `legacy-v1` tag marks the original pre-rebuild state.
- The current architecture target is Next.js App Router, TypeScript, CSS Modules, Vercel, and a later focused "Ask about me" chatbot.
- npm is the package manager. Next.js dev/build/start run on system Node.

Current verification:

- Docs-only changes: `git diff --check`.
- Application changes: `npm run lint` and `npm run build`.

Project commands:

- Install: `npm install`
- Run locally: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Repomix snapshot: `npm run repomix:generate`
- Format: `npm run format`

Do not modify without care:

- Real secrets or env files.
- Generated Repomix output under `.repomix/`.

## React and Next.js

- Performance, hydration, bundle size: `.agents/skills/react-best-practices/AGENTS.md`.
- Composition and component APIs: `.agents/skills/composition-patterns/AGENTS.md`.
- UI review and accessibility: `.agents/skills/web-design-guidelines/SKILL.md`.
- Security checklist: `.agents/docs/nextjs-security.md`.
- TypeScript conventions: `.agents/docs/typescript-conventions.md`.
- Use the project's declared scripts (lint, typecheck, test, build) via your package manager. Prefer single-file or single-test runs during iteration; full suites are for the final verification pass.

### 11. Project Learnings

Accumulated corrections. When the user corrects an approach, append a one-line concrete rule here before ending the session. Tighten an existing line instead of adding a duplicate.
