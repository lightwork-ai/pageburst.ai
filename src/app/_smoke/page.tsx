export default function Smoke() {
  return (
    <div className="container-page space-y-4 py-10">
      <h1 className="text-3xl font-bold">Tailwind v4 Smoke Test</h1>
      <div className="test-red">If this is red, Tailwind is working.</div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="h-10 bg-[--color-burst] rounded"></div>
        <div className="h-10 bg-[--color-burst-pink] rounded"></div>
        <div className="h-10 bg-[--color-burst-blue] rounded"></div>
      </div>
    </div>
  );
}


