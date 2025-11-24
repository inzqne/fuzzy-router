# Next.js runnable demo

This folder contains a minimal Next.js App Router project that consumes the standalone snippets living in `examples/nextjs`. That keeps the cookbook-style code samples separate from the runnable app, while still letting the app re-use the exact same route table via `import { routes } from "../nextjs/routes"`.

## Setup

```bash
cd examples/nextjs-app
npm install
npm run dev
```

> The dependency `"fuzzy-router": "file:../.."` automatically links to the package in the repo root so you can test changes without publishing.

## What to try

- Visit `/docs/gettingstarted`, `/dashbord`, or `/pricingg` and watch the middleware reroute to the closest canonical path.
- Tweak `examples/nextjs/routes.ts` to add or remove routes—the app auto-imports them.
- Respect the separation-of-concerns: snippets live in `examples/nextjs`, the runnable app lives here.

## Production reminders

- Update the `matcher` in `middleware.ts` if you only want fuzzy redirects on certain path segments.
- After publishing to npm, change the dependency from `file:../..` to the real version number.
