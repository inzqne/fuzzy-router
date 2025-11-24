<div align="center">

# 🧭 fuzzy-router

Zero-dependency fuzzy-matching router that keeps users on-track by automatically rerouting near-miss URLs (e.g. typos, missing trailing slashes, pluralization mistakes) to the closest known path. Works anywhere you can read a pathname: React Router, Next.js, Remix, Angular, Vue, SvelteKit, Express, Cloudflare Workers—you name it.

[![npm version](https://img.shields.io/npm/v/fuzzy-router.svg?color=1db954)](https://www.npmjs.com/package/fuzzy-router)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/fuzzy-router?label=min+gzip)](https://bundlephobia.com/package/fuzzy-router)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

---

## Why

- **Stop 404s caused by typos or AI hallucinations (crucial for AI SEO).** Redirect `/dashbord` → `/dashboard`, `/shop/hoodie` → `/shop/hoodies`, etc.
- **Framework-agnostic.** Works with any router because it only needs a pathname string and a list of valid routes.
- **Tiny + dependency-free.** Shipping <1 KB minzipped.
- **Predictable.** Adjustable threshold + custom scoring if you need more control.

## Install

```bash
npm install fuzzy-router
# or
pnpm add fuzzy-router
# or
yarn add fuzzy-router
```

## Quick start

```js
import { createFuzzyRouter } from "fuzzy-router";

const router = createFuzzyRouter([
  "/",
  "/blog",
  "/blog/:slug",
  "/docs/getting-started",
  "/pricing",
]);

router.resolve("/blgo"); // "/blog"
router.resolve("/docs/gettingstarted"); // "/docs/getting-started"
router.resolve("/unknown"); // null (threshold not met)
```

### React Router example

```jsx
import { useLocation, Navigate } from "react-router-dom";
import { createFuzzyRouter } from "fuzzy-router";

const router = createFuzzyRouter([
  "/",
  "/pricing",
  "/docs",
  "/docs/getting-started",
]);

export const Fuzzy404 = () => {
  const { pathname } = useLocation();
  const destination = router.resolve(pathname);
  return destination ? (
    <Navigate to={destination} replace />
  ) : (
    <p>Page not found.</p>
  );
};
```

### Next.js middleware snippet

```ts
import { NextResponse } from "next/server";
import { fuzzyRedirect } from "fuzzy-router";

const routes = ["/", "/about", "/docs", "/docs/setup"];

export function middleware(request: Request) {
  const pathname = new URL(request.url).pathname;
  const match = fuzzyRedirect(pathname, routes);
  if (match && match !== pathname) {
    return NextResponse.redirect(new URL(match, request.url));
  }
  return NextResponse.next();
}
```

#### Works with every Next.js router

- **App Router (Next 13+)** – Drop the snippet above into `middleware.ts`, route handlers, or server components to normalize paths before rendering.
- **Pages Router / custom server** – Call `fuzzyRedirect` inside API routes, `getServerSideProps`, or a custom `server.js` to rewrite paths prior to handing off to classic page components.
- **Edge runtime** – Because the library is synchronous and dependency-free, it’s safe to run inside Next middleware deployed to the edge.

### Express / Node server

```js
import express from "express";
import { fuzzyRedirect } from "fuzzy-router";

const app = express();
const routes = ["/", "/pricing", "/docs", "/docs/setup"];

app.use((req, res, next) => {
  const target = fuzzyRedirect(req.path, routes);
  if (target && target !== req.path) return res.redirect(301, target);
  next();
});
```

## API

### `createFuzzyRouter(routes, options?)`

| option      | type                              | default                    | description                                                                                             |
| ----------- | --------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------- |
| `threshold` | `number`                          | `0.35`                     | Maximum normalized distance (0 = identical, 1 = totally different). Lower threshold = stricter matches. |
| `score`     | `(incoming, candidate) => number` | internal Levenshtein ratio | Provide your own scoring strategy (return 0-1).                                                         |
| `onMiss`    | `(inputPath) => string \| null`   | `undefined`                | Optional fallback that runs when nothing scores under the threshold.                                    |

Returns an object with:

- `routes`: deduped + normalized version of the routes you provided.
- `match(pathname)`: returns `{ target, score }`. `target` is `null` if nothing clears the threshold.
- `resolve(pathname)`: returns the best route (string) or `null`. Falls back to `onMiss` if provided.

### `fuzzyRedirect(pathname, routes, options?)`

Shortcut helper that creates a router on the fly and returns the resolved string (or `null`). Perfect for middleware or single-use checks.

## Tips

- Always pass normalized route definitions (include leading slash). The helper will normalize for you, but consistency makes debugging easier.
- For large route tables, pre-create the router once and reuse it instead of calling `fuzzyRedirect` per request.
- Use a stricter threshold (e.g. `0.25`) for security-sensitive areas where you only want very close matches.

## Examples

- `examples/nextjs` – ready-to-drop middleware + route list for Next.js (App Router).
- `examples/nextjs-app` – full Next.js project wired up to the snippets so you can run `next dev` immediately without mixing sample code into the runnable app.

## FAQ

**Does it work with dynamic params?**  
Yes—store the canonical template (e.g. `/blog/:slug`). The fuzzy match happens at the string level, independent of the router you ultimately use.

**Is it compatible with both Next.js App Router and Pages Router?**  
Yes! Anywhere you can read a pathname — middleware, route handlers, API routes, custom servers, server components—you can call `fuzzyRedirect` or re-use a pre-built router to reroute before the response is chosen.

**Can I handle localization?**  
Sure. Build separate route lists per locale or namespace your paths.

**How do I test it?**  
`match()` gives you raw scores, so you can snapshot test expectations per input.

## License

MIT © 2025-present
