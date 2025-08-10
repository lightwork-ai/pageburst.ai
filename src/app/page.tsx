"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import BottomCTA from "../components/BottomCTA";

type Tab = "generate" | "rebuild";

const prompts = [
  "Charity campaign page with donation integration...",
  "Portfolio for a UX designer with case studies...",
  "Landing page for a SaaS analytics dashboard...",
  "E-commerce site for a streetwear brand...",
  "Local bakery site with menu + ordering...",
  "Event page with schedule and speakers...",
  "Startup pitch site with demo and investor info...",
  "Real estate listings with search and filters...",
  "Personal blog for a travel photographer...",
  "Agency site with services and contact...",
];

export default function Home() {
  const [placeholder, setPlaceholder] = useState(prompts[0]);
  const [focusLock, setFocusLock] = useState(false);
  const [tab, setTab] = useState<Tab>("generate");
  const promptRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (focusLock || tab !== "generate") return;
      i = (i + 1) % prompts.length;
      setPlaceholder(prompts[i]);
    }, 3000);
    return () => clearInterval(id);
  }, [focusLock, tab]);

  return (
    <div className="space-y-24">
      <Hero />

      {/* HOW IT WORKS */}
      <section id="how" className="container-page">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">
          How it works
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { t: "Your Idea", d: "Tell us what you want in plain English." },
            {
              t: "Build",
              d: "We assemble pages, styles, and content instantly.",
            },
            {
              t: "Edit & Deploy",
              d: "Tweak details, then one-click deploy to your domain.",
            },
          ].map((x) => (
            <div key={x.t} className="card-glass p-6 hover-lift">
              <div className="text-sm text-foreground/60">Step</div>
              <div className="mt-1 text-xl font-semibold">{x.t}</div>
              <p className="mt-2 text-foreground/75">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POSSIBILITIES SHOWCASE (gradient panel) */}
      <section className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-border p-8 md:p-12">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 70% at 10% 10%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(50% 60% at 90% 20%, rgba(236,72,153,0.16), transparent 60%), radial-gradient(70% 80% at 50% 120%, rgba(59,130,246,0.12), transparent 60%)",
            }}
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Built for high standards.
              </h2>
              <p className="mt-4 text-foreground/75 max-w-prose">
                Refine every detail — adjust design, text, layouts, and more
                until your site matches your vision.
              </p>
              <div className="mt-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-burst">→</span>
                    <span className="font-semibold">Change site themes</span>
                  </div>
                  <p className="text-foreground/75 text-sm mt-1">
                    Pick the fonts and colors that shape your site&apos;s
                    visual style.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-burst">→</span>
                    <span className="font-semibold">Shuffle layouts</span>
                  </div>
                  <p className="text-foreground/75 text-sm mt-1">
                    Explore different structures for your pages in seconds.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-burst">→</span>
                    <span className="font-semibold">Update site content</span>
                  </div>
                  <p className="text-foreground/75 text-sm mt-1">
                    Refresh headlines and copy to keep everything on-brand.
                  </p>
                </div>
              </div>
              <button className="btn-cta rounded-md mt-8">Start Building</button>
            </div>
            <div className="grid gap-6">
              <div className="rounded-2xl border border-border bg-surface/70 backdrop-blur grid place-items-center aspect-[16/10] text-foreground/60 text-sm shadow-sm">
                Theme editor preview (placeholder)
              </div>
              <div className="rounded-2xl border border-border bg-surface/70 backdrop-blur grid place-items-center aspect-[16/10] text-foreground/60 text-sm shadow-sm">
                Website layout preview (placeholder)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="container-page">
        <h2 className="text-2xl md:text-3xl font-semibold">Features & Add-Ons</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            [
              "Modular content generation",
              "Mix and match sections and components.",
            ],
            [
              "SEO packs & content bundles",
              "Search-ready content tuned for your niche.",
            ],
            ["Image generation", "On-brand visuals and hero art in a click."],
            [
              "Template & prompt library",
              "Kickstart with proven layouts and prompts.",
            ],
            [
              "Human review",
              "Optional legal/quality review before go-live.",
            ],
            ["Stripe-ready billing", "Built to scale with subscriptions and add-ons."],
          ].map(([title, desc]) => (
            <div key={title} className="card-glass p-6 hover-lift">
              <div className="text-lg font-semibold">{title}</div>
              <p className="mt-2 text-foreground/75">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BUILDER UI */}
      <section id="builder" className="container-page">
        <div className="rounded-2xl border border-border p-6 md:p-10 relative overflow-hidden">
          <div className="absolute -z-10 inset-0 bg-[radial-gradient(60%_50%_at_30%_10%,rgba(139,92,246,.15),transparent_60%),radial-gradient(40%_40%_at_80%_20%,rgba(236,72,153,.12),transparent_60%)]" />
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Visual builder, drag & drop simplicity
            </h2>
            <p className="mt-2 text-foreground/75">
              Rearrange sections, tweak styles, and drop in modules - no code
              required. Everything is modular and versioned.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Drag & drop",
                "Sections library",
                "Live preview",
                "Undo history",
              ].map((b) => (
                <span key={b} className="badge-contrast">
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-surface-2 aspect-[16/10] grid place-items-center text-sm text-foreground/70">
              Builder canvas preview (placeholder)
            </div>
            <div className="grid gap-4">
              <div className="rounded-xl border border-border bg-surface-2 aspect-[16/10] grid place-items-center text-sm text-foreground/70">
                Components panel (placeholder)
              </div>
              <div className="rounded-xl border border-border bg-surface-2 aspect-[16/10] grid place-items-center text-sm text-foreground/70">
                Style controls (placeholder)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ETHICS */}
      <section id="ethics" className="container-page">
        <div className="card-glass p-6">
          <h3 className="text-xl font-semibold">Ethics & Responsibility</h3>
          <p className="mt-2 text-foreground/75">
            Privacy-first, copyright screening, and transparent usage.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="container-page text-center">
        <div className="mx-auto max-w-3xl card-glass p-8">
          <h3 className="text-2xl md:text-3xl font-semibold">
            Ready to launch?
          </h3>
          <div className="mt-4 flex gap-2">
            <input
              className="input-white placeholder-rainbow flex-1 rounded-md"
              placeholder="Portfolio site for a freelance designer..."
            />
            <button className="btn-cta rounded-md burst-cta burst-cta">
              Generate Site
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}




