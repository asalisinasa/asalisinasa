# Next.js Security Checklist

Generic guidance for React/Next.js projects. Product-specific requirements live in the project overlay.

## Secrets and environment

- Anything prefixed `NEXT_PUBLIC_*` is shipped to the browser: never put secrets, tokens, or internal URLs there.
- Server-only values (DB credentials, API keys, private endpoints) must never reach client components: keep them in server components, route handlers, server actions, or `server-only` modules. Check the client bundle for leaks (`NEXT_PUBLIC_*` usage, serialized props).
- Use per-environment variables; never commit `.env*` files.

## Data handling

- Validate and bound all user input (query params, headers, bodies) in route handlers, server actions, and API routes.
- SSRF: when the server fetches a user-supplied URL, validate the scheme/host, block internal ranges and localhost, and add timeouts.
- Prevent SQL/NoSQL injection in server code: use parameterized queries, not string interpolation.
- Server-side errors must not leak stack traces, file paths, or internal state to responses.
- Escape or sanitize anything rendered via `dangerouslySetInnerHTML`; prefer safe rendering (React escapes by default).
- Sanitize user-uploaded SVG/HTML and validate image sources.

## Headers and cookies

- Set security headers (CSP, `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, `Strict-Transport-Security`) via `next.config` headers or middleware; keep CSP strict enough to block inline script.
- Remove the default `X-Powered-By` header.
- Cookies: `HttpOnly`, `Secure`, `SameSite` per context; never store auth tokens in `localStorage`.

## Auth and CSRF

- Validate sessions server-side on every protected request; never trust client-supplied identity.
- Protect state-changing endpoints (server actions, POST routes) against CSRF: SameSite cookies plus origin/host checks where applicable.
- Rate-limit public endpoints that hit expensive or mutating operations.

## Dependencies

- Keep Next.js and React patched; subscribe to security advisories.
- Run a dependency audit as part of the release flow and fix known-vulnerability findings before publishing.
