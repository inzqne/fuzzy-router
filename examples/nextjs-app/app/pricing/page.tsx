import Link from "next/link";

export default function PricingPage() {
  return (
    <main>
      <h1>Pricing</h1>
      <p>
        fuzzy-router is open-source and MIT licensed. Redirect confidence comes
        free, but this page exists so you can see middleware send{" "}
        <code>/pricingg</code> or <code>/price</code> back here.
      </p>
      <p>
        <Link href="/">Back home</Link>
      </p>
    </main>
  );
}
