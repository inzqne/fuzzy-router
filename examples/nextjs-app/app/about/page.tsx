import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <h1>About fuzzy-router</h1>
      <p>
        This demo shows how the router can gently correct common typos or path
        variations instead of throwing a 404. Try navigating to{" "}
        <code>/abotu</code> or <code>/abou</code> to see it snap back here.
      </p>
      <p>
        <Link href="/">Back home</Link>
      </p>
    </main>
  );
}
