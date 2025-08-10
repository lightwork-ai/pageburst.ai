export default function TermsPage() {
  return (
    <div className="container-page space-y-6">
      <h1 className="text-3xl font-bold">Terms &amp; Conditions</h1>
      <div className="card-glass p-6 space-y-3">
        <h2 className="font-semibold">Use of Service</h2>
        <ul className="list-disc pl-5 text-foreground/75 space-y-1">
          <li>Don&apos;t upload illegal, harmful, or infringing content.</li>
          <li>Respect applicable laws and third-party rights.</li>
          <li>No abuse, reverse engineering, or service disruption attempts.</li>
        </ul>
        <h2 className="font-semibold">Content</h2>
        <p className="text-foreground/75">
          You are responsible for the content you create and publish. Verify legal compliance, accuracy,
          and permissions for any assets you use.
        </p>
        <h2 className="font-semibold">Availability</h2>
        <p className="text-foreground/75">
          We aim for high availability but do not guarantee uninterrupted service. Features may change over time.
        </p>
      </div>
    </div>
  );
}


