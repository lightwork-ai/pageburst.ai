export default function EnginePage() {
  return (
    <div className="container-page space-y-8">
      <h1 className="text-3xl font-bold">The Engine</h1>
      <p className="text-foreground/75 max-w-prose">
        Under the hood, we use state-of-the-art, stable builds from multiple providers.
        Each instruction is cross-checked to combine strengths and improve consistency, producing a single pooled response.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {["Multi-provider stack","Stability-first builds","Cross-checked prompts"].map((x) => (
          <div key={x} className="card-glass p-4">{x}</div>
        ))}
      </div>
    </div>
  );
}


