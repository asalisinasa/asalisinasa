# TypeScript Conventions

Generic conventions for TypeScript projects. Stack-specific rules (aliases, imports, exports) live in the project overlay or `component-library` conventions.

## Language level

- `strict: true`; keep `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` enabled where the codebase tolerates them.
- No `any`. For unknown input use `unknown` and narrow; use `satisfies` for literal-preserving checks.
- `type` for unions, intersections, and mapped types; `interface` for object shapes that are extended or merged.
- Prefer `as const` over enums for literal unions unless runtime iteration is needed.
- Never use non-null assertions (`!`) to silence a check; narrow properly or handle the undefined case.

## Structure

- Explicit return types on exported functions and components.
- Type-only imports (`import type`) so the bundler can drop them; no runtime import of types.
- One public export per module where practical; keep barrel files for package API surfaces only.
- Name types after what they model; suffix `Props` for component props.
- Handle `undefined` explicitly in props and optionals; avoid `null`/`undefined` mixing.

## Verification

- The project's typecheck script must pass before you report completion.
- Prefer small, typed helpers over inline casts; if a cast is unavoidable, add a comment explaining the invariant.
