export default function AboutPage() {
  return (
    <div className="container-page space-y-12">
      <section>
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4 text-foreground/75 max-w-prose">
          We&apos;re a small local team of top developers using modern tools responsibly, with human review at the core.
          The web moves fast, and our job is to make it safer, faster, and more flexible for everyone.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Meet the Team</h2>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card-glass p-4 text-center">
              <div className="aspect-square bg-surface-2 rounded-full mb-4" />
              <div className="font-semibold">Name {i + 1}</div>
              <div className="text-sm text-foreground/60">Role</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


