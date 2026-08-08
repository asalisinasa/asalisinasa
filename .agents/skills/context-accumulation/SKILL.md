---
name: context-accumulation
description: Site context goes through three stages: raw notes, wiki pages, then decision-ready plans.
---

## Steps

1. Add new user-provided context to `.agents/docs/wiki/portfolio-context.md` or a more specific wiki page if the topic grows.
2. Preserve uncertainty and open questions instead of resolving them too early.
3. Do not propose design, architecture, stack, SEO, animation, or implementation directions unless the user asks.
4. When the user asks to plan, synthesize the relevant wiki context into a focused `.agents/plans/*.plan.md` file.
5. Keep plans verifiable: include scope, assumptions, success criteria, and verification where practical.
6. After implementation, write back the useful outcome and lessons into the wiki before considering the work complete.

## Boundaries

- Store accumulated notes in `.agents/docs/wiki/`.
- Store decision-complete implementation or planning documents in `.agents/plans/`.
- Keep raw context separate from final product, design, or technical decisions.

## Success Criteria

- New context is easy to find by topic.
- Plans stay separate from raw notes.
- Future design and implementation work can cite the accumulated wiki context.
- The assistant does not prematurely convert loose notes into unsolicited decisions.

## Verification Defaults

- Docs-only changes: `git diff --check`.