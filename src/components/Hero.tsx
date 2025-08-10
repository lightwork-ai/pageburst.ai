"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Tab = "generate" | "rebuild";

const promptSamples = [
  "Portfolio for a UX designer with case studies",
  "Local bakery site with menu + ordering",
  "Landing page for a SaaS analytics dashboard",
  "Event page with schedule and speakers",
  "E-commerce site for a streetwear brand",
  "Agency site with services and contact",
  "Real estate listings with search and filters",
];

const suggestionFillers: Record<string,string> = {
  "SaaS": "A modern SaaS homepage for a metrics dashboard, with pricing tiers and a signup CTA",
  "Portfolio": "A clean personal portfolio for a product designer with case studies and contact",
  "Local Business": "A local business specialising in domestic cleaning with services, pricing and booking",
  "Event": "A one-page event site with schedule, speakers, venue map and registration",
  "E-commerce": "A minimalist e-commerce storefront for streetwear with homepage, PLP and PDP",
};

export default function Hero(){
  const [tab, setTab] = useState<Tab>("generate");
  const [idx, setIdx] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  const promptRef = useRef<HTMLInputElement>(null);

  // rotate placeholder with fade using CSS var --ph
  useEffect(() => {
    const el = promptRef.current;
    const tick = () => {
      // fade out
      el?.style.setProperty("--ph","0");
      setTimeout(() => {
        setIdx((i) => (i + 1) % promptSamples.length);
        // fade in
        requestAnimationFrame(() => el?.style.setProperty("--ph","1"));
      }, 180);
    };
    const id = setInterval(tick, 2600);
    return () => clearInterval(id);
  }, []);

  // switcher bounce flag
  const handleTab = (next: Tab) => {
    setIsSwitching(true);
    setTab(next);
    setTimeout(() => setIsSwitching(false), 260);
  };

  const suggestions = useMemo(() => ["SaaS","Portfolio","Local Business","Event","E-commerce"], []);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const qInput = promptRef.current?.value?.trim();
    if (tab === "generate") {
      const q = "?mode=generate" + (qInput ? "&prompt=" + encodeURIComponent(qInput) : "");
      window.location.href = "/generating" + q;
    } else {
      const url = (document.getElementById("rebuild-url") as HTMLInputElement | null)?.value?.trim();
      const q = "?mode=rebuild" + (url ? "&url=" + encodeURIComponent(url) : "");
      window.location.href = "/generating" + q;
    }
  };

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden rounded-2xl border border-border bg-surface hero-animation">
      {/* animated gradient backdrop */}
      <div
        className="absolute inset-0 hero-gradient bg-fixed rounded-2xl"
        style={{
          backgroundImage:
            "radial-gradient(80% 60% at 50% 35%, rgba(255,255,255,0.18), rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.35) 100%), linear-gradient(135deg,#8B5CF6 0%,#EC4899 35%,#3B82F6 70%,#8B5CF6 100%)",
          backgroundBlendMode: "overlay, normal",
          backgroundSize: "cover, 200% 200%",
        }}
      />

      <div className="relative container-page text-white">
        <div className="mx-auto max-w-4xl text-center">
          {/* headline with shooting star (uses . overrides) */}
          <h1 className=" text-4xl md:text-6xl font-extrabold tracking-tight">
            Your Website.{" "}
            Just a Click Away.
          </h1>
          <p className="mt-4 text-lg text-white/85 text-shadow-lg">
            Describe it. Well build it. <strong>From idea to live site in</strong> under 2 minutes.
          </p>

          {/* unified panel */}
          <div className="mt-8 mx-auto max-w-3xl rounded-2xl border border-white/25 bg-white/10 backdrop-blur-[3px] p-4">
            {/* tabs */}
            <div className="flex justify-center mb-3">
              <div className={`tabbar ${isSwitching ? "is-switching" : ""}`} role="tablist" aria-label="Mode">
                <span
                  className="seg-thumb"
                  style={{ transform: tab === "generate" ? "translateX(0)" : "translateX(100%)" }}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "generate"}
                  className={`seg-btn ${tab === "generate" ? "tab-active" : ""}`}
                  onClick={() => handleTab("generate")}
                >
                  Generate
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "rebuild"}
                  className={`seg-btn ${tab === "rebuild" ? "tab-active" : ""}`}
                  onClick={() => handleTab("rebuild")}
                >
                  Redesign
                </button>
              </div>
            </div>

            {/* content */}
            {tab === "generate" ? (
              <form onSubmit={go} className="flex gap-2 items-center">
                <input
                  ref={promptRef}
                  className="input-white placeholder-rainbow placeholder-fader flex-1 rounded-md"
                  placeholder={promptSamples[idx]}
                  aria-label="Describe the website you want to generate"
                  // default CSS var value for fade
                  style={{ ["--ph" as any]: 1 }}
                />
                <button className="btn-generate" type="submit">Generate Site</button>
              </form>
            ) : (
              <form onSubmit={go} className="flex gap-2 items-center">
                <input
                  id="rebuild-url" className="input-white placeholder-rainbow placeholder-rainbow flex-1 rounded-md placeholder:text-black/55"
                  placeholder="https://example.com"
                  inputMode="url"
                  aria-label="URL to redesign"
                />
                <button className="btn-generate" type="submit">Redesign from URL</button>
              </form>
            )}

            {/* trust bar */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[13px]">
              {[
                { t: "SEO-ready", i: "M10 4h4M4 12h16M6 8h12M8 16h8" },
                { t: "Responsive", i: "M4 6h16v10H4zM8 18h8" },
                { t: "1-click deploy", i: "M12 3v10m0 0l-3-3m3 3l3-3M5 20h14" },
                { t: "Templates", i: "M4 7h16M7 4v16" },
              ].map(({ t, i }) => (
                <div key={t} className="flex items-center justify-center gap-2 rounded-md bg-white/8 border border-white/20 py-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d={i} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-white/90">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions  fill prompt, do not navigate */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {suggestions.map((x) => (
              <span
                key={x}
                className="badge-contrast is-clickable"
                onClick={() => {
                  const txt = suggestionFillers[x] || x;
                  if (promptRef.current){
                    promptRef.current.value = txt;
                    promptRef.current.focus();
                  } else {
                    // if user is on Redesign tab, switch to Generate so input is visible
                    handleTab("generate");
                    setTimeout(() => {
                      if (promptRef.current) { promptRef.current.value = txt; promptRef.current.focus(); }
                    }, 60);
                  }
                }}
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


