---
name: intelligent-routing
description: Automatic agent selection and intelligent task routing. Analyzes user requests and automatically selects the best specialist agent(s) without requiring explicit user mentions.
version: 1.0.0
---

# Intelligent Routing

**Purpose**: Automatically analyze user requests and route them to the most appropriate specialist agent(s) without requiring explicit user mentions.

## Core Principle

> **The AI should act as an intelligent Project Manager**, analyzing each request and automatically selecting the best specialist(s) for the job.

## How It Works

### 1. Request Analysis

Before responding to ANY user request, perform automatic analysis:

- **Keywords** → Detect domain
- **Domains** → Map to agent(s)
- **Complexity** → Single agent vs multi-agent

Map each domain to the specialist whose native description matches. Do not maintain a domain-to-agent catalog here: the toolchain owns agent discovery, and a hand-maintained list is guaranteed to drift.

### 2. Response Format

**When auto-selecting an agent, inform the user concisely:**

```markdown
**Applying knowledge of `@typescript-pro`...**

[Proceed with specialized response]
```

**Benefits:**

- User sees which expertise is being applied
- Transparent decision-making
- Still automatic (no commands needed)

## Complexity Assessment

### SIMPLE (Direct agent invocation)

- Single file edit
- Clear, specific task
- One domain only
- Example: "Fix the login button style"

**Action**: Apply respective agent knowledge

### MODERATE (2 agents)

- 2-3 files affected
- Clear requirements
- 2 domains max
- Example: "Add API endpoint and write tests for it"

**Action**: Apply relevant agents sequentially

### COMPLEX (Clarify first)

- Multiple files/domains
- Architectural decisions needed
- Unclear requirements
- Example: "Build a social media app"

**Action**: Ask clarifying questions first, then route

## Implementation Rules

### Rule 1: Silent Analysis

- Analyze silently
- Inform which agent is being applied
- Avoid verbose meta-commentary

### Rule 2: Inform Agent Selection

**DO inform which expertise is being applied:**

```markdown
**Applying knowledge of `@performance-engineer`...**

I will optimize with the following approach:
[Continue with specialized response]
```

### Rule 3: Seamless Experience

**The user should not notice a difference from talking to the right specialist directly.**

### Rule 4: Override Capability

**User can still explicitly mention agents:**

```text
User: "Use @reviewer to review this PR"
→ Override auto-selection
→ Use explicitly mentioned agent
```

## Edge Cases

### Case 1: Generic Question

```text
User: "How does React work?"
→ Type: QUESTION
→ No agent needed
→ Respond directly with explanation
```

### Case 2: Extremely Vague Request

```text
User: "Make it better"
→ Complexity: UNCLEAR
→ Action: Ask clarifying questions first
→ Then route to appropriate agent
```

### Case 3: No Matching Agent

```text
User: "Create a dark mode toggle"
→ No agent in the vault matches
→ Respond with general best practices
→ Follow project conventions from AGENTS.md
```

## Topic skills (load before implementing)

Core ships these skills; load the one that matches the request before coding. Opt-in presets ship their own skills and docs — see each preset's `AGENTS.md` Map, not here. Prefer one targeted load over bulk-reading `.agents/`.

| Topic                      | Triggers                                                                                                                        | Skill                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Git workflow**           | branching, conventional commits, PR merge, conflicts, rebase, releases                                                          | `.agents/skills/git-workflow/SKILL.md`                                                         |
| **Premortem**              | premortem, what could kill this, blind spots, stress-test the plan, devil's advocate on a high-stakes plan                      | `.agents/skills/premortem/SKILL.md`                                                            |
| **Project status handoff** | end stage, session too long, compress context, save context, transfer project, handoff, new session, continue where we left off | `.agents/skills/project-status-handoff/SKILL.md` · generates `.agents/docs/project-status.md`  |
| **Code simplification**    | simplify code, reduce complexity, clarity pass on recently modified code                                                       | `.agents/skills/code-simplifier/SKILL.md`                                                      |

Routing itself is this file: `.agents/skills/intelligent-routing/SKILL.md`.

## Integration with AGENTS.md

- **Priority**: AGENTS.md rules > intelligent-routing
- If AGENTS.md specifies explicit routing, follow it
- Intelligent routing is the DEFAULT when no explicit rule exists

## Summary

**intelligent-routing skill enables:**

- Zero-command operation (no need for explicit agent mentions)
- Automatic specialist selection based on request analysis
- Transparent communication of which expertise is being applied
- Seamless integration with existing workflows
- Override capability for explicit agent mentions

**Result**: User gets specialist-level responses without needing to know the system architecture.
