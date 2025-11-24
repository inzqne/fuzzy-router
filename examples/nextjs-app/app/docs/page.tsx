import Link from "next/link";

export default function DocsIndexPage() {
  return (
    <main>
      <h1>Docs</h1>
      <p>
        These docs are intentionally tiny. The interesting part is how requests
        like <code>/doc</code> or <code>/dosc</code> get routed back here.
      </p>
      <ul>
        <li>
          <Link href="/docs/getting-started">Getting started</Link>
        </li>
      </ul>
      <p>
        <Link href="/">Back home</Link>
      </p>
    </main>
  );
}
