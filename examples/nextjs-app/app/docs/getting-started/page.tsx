import Link from "next/link";

export default function GettingStartedPage() {
  return (
    <main>
      <h1>Getting started</h1>
      <ol>
        <li>Install `fuzzy-router`.</li>
        <li>Feed it your canonical route list.</li>
        <li>Redirect users when they wander off-path.</li>
      </ol>
      <p>
        To test the middleware, try opening <code>/docs/gettingstarted</code> or{" "}
        <code>/docs/getting-startedd</code>. They should land right back here.
      </p>
      <p>
        <Link href="/docs">Back to docs</Link>
      </p>
    </main>
  );
}
