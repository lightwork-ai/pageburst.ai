export default function CareersPage() {
  return (
    <div className="container-page space-y-6">
      <h1 className="text-3xl font-bold">Careers</h1>
      <p className="text-foreground/75 max-w-prose">
        We&apos;re not hiring right now, but we love hearing from talented people.
        Send us your portfolio and we&apos;ll reach out when there&apos;s a fit.
      </p>
      <div className="card-glass p-6">
        <h2 className="font-semibold">What we value</h2>
        <ul className="mt-3 list-disc pl-5 text-foreground/75 space-y-1">
          <li>Pragmatic problem solving</li>
          <li>Ownership and high standards</li>
          <li>Respect for users and their data</li>
        </ul>
      </div>
    </div>
  );
}


