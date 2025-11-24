import { createFuzzyRouter } from "fuzzy-router";
import Link from "next/link";
import { routes } from "../routes";

const router = createFuzzyRouter(routes);
const samples = ["/docs/gettingstarted", "/pricingg", "/dashbord"];

export default function Home() {
  return (
    <main>
      <h1>Fuzzy redirects in action</h1>
      <p>
        This demo pipes every request through <code>fuzzy-router</code>. Try
        adding one of the “typo” paths below to the URL—Next.js middleware will
        redirect you to the closest match before a 404 renders.
      </p>

      <section>
        <h2>Registered routes</h2>
        <ul>
          {routes.map((route) => (
            <li key={route}>
              <code>{route}</code>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Suggested typos</h2>
        <ul className="typo-list">
          {samples.map((path) => {
            const { target, score } = router.match(path);
            return (
              <li key={path}>
                <div>
                  <strong>Input</strong> <code>{path}</code>
                </div>
                <div>
                  <strong>Redirects to</strong> <code>{target ?? "404"}</code>
                </div>
                <div>
                  <strong>Score</strong> {score.toFixed(2)}
                </div>
                <Link href={path} className="typo-link">
                  Open typo
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <p>
        Want to dig into the shared snippets instead? They live in{" "}
        <code>examples/nextjs</code>, separate from this runnable app.
      </p>
    </main>
  );
}
