---
name: git-workflow
description: Safe git operations, conventional commits, branching, pull requests, and release hygiene
---

# Git Workflow

Safe, reviewable git usage for coding-agent sessions. Original in-house content,
inspired by the netresearch/git-workflow-skill (see provenance notes).

## Principles

- Inspect before mutating: `git status`, `git diff`, `git log` come before any
  write operation.
- Never force-push, rewrite shared history, or run destructive operations
  without explicit user confirmation.
- Commit focused, atomic changes with clear messages that explain the why.

## When to ask

- Before `git commit`, `git push`, `git reset --hard`, `git clean`, or any
  branch deletion — wait for explicit user permission.
- When the worktree is dirty in ways you did not cause.

## Conventional Commits

When the repository uses conventional commits (or has no convention at all),
follow this format:

```
<type>[scope]: <subject>
```

- `feat` — new capability (semver MINOR)
- `fix` — bug fix (semver PATCH)
- `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- Breaking change: add `!` after the type or a `BREAKING CHANGE:` footer.

Subject: imperative, lowercase, under ~72 characters.

## Branch naming

Match the repository's existing pattern. Common convention:

```bash
feature/TICKET-123-description
fix/TICKET-456-bug-name
release/1.2.0
```

Never commit directly to `main` unless the repository's own workflow does.

## Pull request workflow

- Keep the PR small and focused on one concern; reference the issue it closes.
- Rebase onto the base branch before pushing; avoid merge commits from `main`
  unless the project uses them deliberately.
- After review feedback, respond to each thread (fix or explain), then re-request
  review; never dismiss reviewer concerns silently.
- Merging: prefer squash merges for feature branches unless the project uses
  merge commits or signed linear history by policy.

## Releases

- Never delete a published release/tag: in most hosts the tag name becomes
  permanently blocked in that repository. Recover by fixing forward and cutting
  the next version (e.g. `v1.2.4` instead of retrying `v1.2.3`).
- If the project signs releases, keep signing keys out of agent sessions.

## Conflicts and advanced operations

- For merge conflicts, read both sides before resolving; never "accept theirs"
  blindly.
- Use `git log --oneline --follow -- <file>` to trace history before refactors.
- Prefer `git rebase` for local cleanup and `git merge --no-ff` for public
  integration, unless the project specifies otherwise.

## After committing

- Verify the commit contents with `git show --stat HEAD` before notifying the
  user.
- Do not assume a push happened unless the user asked for one.
