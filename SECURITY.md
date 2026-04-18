# Security policy

## Reporting a vulnerability

Please email security reports to `security@techyardsystems.com`. We will
acknowledge receipt within one business day and aim to provide a first
assessment within five business days.

Please include:

- A description of the issue and its impact
- Steps to reproduce
- Any proof-of-concept (minimal, please)

We ask that you do not publicly disclose the issue until we have had a
reasonable opportunity to investigate and remediate.

For an overview of how we handle data, compliance, and model ownership on
client engagements, see [/security](https://techyardsystems.com/security).

## Known limitations

### CSP: `'unsafe-inline'` on `script-src`

The production Content-Security-Policy header includes `'unsafe-inline'` on
`script-src`. This is a known trade-off: Next 16's framework-injected inline
scripts (React hydration bootstrap, Plausible provider bootstrap) don't yet
ship with stable per-request nonce support. A nonce-based CSP is the target
state — we will migrate once Next's tooling stabilizes.

In development mode only, `'unsafe-eval'` is additionally present to support
React's dev-mode stack reconstruction and Turbopack HMR. Production builds
do not include `'unsafe-eval'`.

Mitigations in place today:

- Strict `frame-ancestors 'none'` and `X-Frame-Options: DENY` prevent clickjacking
- `form-action 'self'` prevents form submission hijack
- HSTS preload enforces HTTPS everywhere
- Input is sanitized at the server-action boundary via zod
