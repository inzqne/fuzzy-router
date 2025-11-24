# Next.js example

This demo shows how to drop `fuzzy-router` into a Next.js 13+/App Router project to gently reroute typos before they become 404s.

## Files

- `routes.ts` – single source of truth for canonical paths.
- `middleware.ts` – intercepts requests and redirects near-miss paths.

## Try it

```bash
cd examples/nextjs
pnpm install
pnpm dev
```

Then visit `/docs/gettingstarted` and notice it redirects to `/docs/getting-started`.

Want to run a full Next.js dev server without touching these snippets? Jump into `examples/nextjs-app`, which is a standalone Next project that imports the same route list via a relative dependency.

## Production notes

- Keep the route list small (top-level + SEO-critical pages) to avoid unnecessary work.
- Adjust the `threshold` for stricter or looser matches.
- You can move the middleware logic into API routes or server components if you only care about certain subpaths.
