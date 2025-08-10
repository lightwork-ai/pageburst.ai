"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type PlanId = "preview" | "deploy" | "pro";
type AddonKey =
  | "advSeo"
  | "trust"
  | "contact"
  | "hero"
  | "stripe"
  | "maps"
  | "images"
  | "analytics";

export default function GeneratingPage() {
  const params = useSearchParams();
  const mode = params.get("mode") || "generate";

  const [showPricing, setShowPricing] = useState(false);

  // Intake
  const [identity, setIdentity] = useState({
    name: "",
    tagline: "",
    category: "",
    location: "",
  });
  const [brand, setBrand] = useState({
    style: "",
    font: "",
    primaryHex: "#8b5cf6",
    secondaryHex: "#22d3ee",
    logoFile: null as File | null,
  });

  // Plans/Addons
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("preview");
  const basePrices: Record<PlanId, number> = { preview: 0, deploy: 15, pro: 29 };

  const [addons, setAddons] = useState<Record<AddonKey, boolean>>({
    advSeo: false,
    trust: false,
    contact: false,
    hero: false,
    stripe: false,
    maps: false,
    images: false,
    analytics: false,
  });
  const addonPrices: Record<AddonKey, number> = {
    advSeo: 9,
    trust: 3,
    contact: 4,
    hero: 6,
    stripe: 5,
    maps: 3,
    images: 7,
    analytics: 3,
  };

  const total = useMemo(() => {
    const base = basePrices[selectedPlan];
    const extras = Object.entries(addons).reduce((sum, [k, v]) => {
      return v ? sum + addonPrices[k as AddonKey] : sum;
    }, 0);
    return base + extras;
  }, [addons, selectedPlan]);

  useEffect(() => {
    const t = setTimeout(() => setShowPricing(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const planFeatures: Record<PlanId, string[]> = {
    preview: [
      "Homepage generation",
      "Brand intake support",
      "Non-deploy preview",
    ],
    deploy: [
      "All Preview features",
      "Multi-page site build",
      "One-click deploy",
    ],
    pro: [
      "All Deploy features",
      "Priority build queue",
      "2× compute for build",
      "2× memory capacity",
      "Extended customization",
    ],
  };

  const planMeta: Record<
    PlanId,
    { name: string; priceLabel: string; ribbon?: string; ribbonTone?: "pink" | "blue" }
  > = {
    preview: { name: "Preview", priceLabel: "$0" },
    deploy: {
      name: "Deploy",
      priceLabel: "$15/mo",
      ribbon: "Most popular",
      ribbonTone: "blue",
    },
    pro: {
      name: "Pro",
      priceLabel: "$29/mo",
      ribbon: "Best value",
      ribbonTone: "pink",
    },
  };

  const PlanCard = ({ id }: { id: PlanId }) => {
    const meta = planMeta[id];
    const active = selectedPlan === id;
    return (
      <button
        type="button"
        onClick={() => setSelectedPlan(id)}
        aria-pressed={active}
        className={`relative text-left rounded-xl border p-6 transition
          ${active ? "border-[--burst] ring-2 ring-[--burst]/30 bg-[--surface]" : "border-border bg-[--surface] hover:shadow-lg"}`}
      >
        {meta.ribbon && (
          <span
            className={`absolute -top-3 right-3 text-xs rounded-full px-2 py-1 shadow
            ${meta.ribbonTone === "pink" ? "bg-[--burst-pink] text-white" : "bg-[--color-burst-blue] text-white"}`}
          >
            {meta.ribbon}
          </span>
        )}
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-semibold">{meta.name}</h3>
          <div className="text-2xl font-bold">{meta.priceLabel}</div>
        </div>
        {id === "preview" && (
          <div className="mt-1 text-xs text-red-500">No deploy</div>
        )}
        <ul className="mt-4 space-y-2 text-sm">
          {planFeatures[id].map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[--burst]" />
              <span className="text-foreground/80">{f}</span>
            </li>
          ))}
        </ul>
      </button>
    );
  };

  return (
    <div className="container-page py-10">
      {showPricing && (
        <div className="mb-6 rounded-lg bg-emerald-100 text-emerald-800 px-4 py-3 text-center font-medium">
          ✅ Your Site Is Approved and Ready for Building
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[65%_35%]">
        {/* LEFT */}
        <div className="space-y-8">
          {!showPricing && (
            <div className="text-center space-y-6">
              <div className="relative w-full h-[42vh] rounded-lg overflow-hidden flex items-center justify-center bg-[--surface] border border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-[--burst]/15 via-[--color-burst-blue]/15 to-[--color-burst-pink]/15 animate-pulse" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-4 border-foreground/20 border-t-[--burst] animate-spin" />
                  <p className="mt-4 text-foreground/80">
                    {mode === "rebuild"
                      ? "Validating your URL..."
                      : "Validating and screening your prompt..."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {showPricing && (
            <>
              {/* Prerequisites */}
              <section className="bg-[--surface] border border-border rounded-xl p-6">
                <h2 className="text-lg font-semibold">Prerequisites (Highly Recommended)</h2>

                <div className="mt-6 grid gap-8 md:grid-cols-2">
                  {/* Core Identity */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Core Identity</h3>

                    <div className="flex items-center gap-4">
                      <label className="w-40 text-sm opacity-80">Website / Company Name</label>
                      <input
                        className="input-burst flex-1"
                        value={identity.name}
                        onChange={(e) =>
                          setIdentity((s) => ({ ...s, name: e.target.value }))
                        }
                        placeholder="Exact spelling, casing & punctuation"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="w-40 text-sm opacity-80">Tagline / Slogan</label>
                      <input
                        className="input-burst flex-1"
                        value={identity.tagline}
                        onChange={(e) =>
                          setIdentity((s) => ({ ...s, tagline: e.target.value }))
                        }
                        placeholder="Optional but great for the hero"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="w-40 text-sm opacity-80">Business Type</label>
                      <input
                        className="input-burst flex-1"
                        value={identity.category}
                        onChange={(e) =>
                          setIdentity((s) => ({ ...s, category: e.target.value }))
                        }
                        placeholder="Category used for schema & template"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="w-40 text-sm opacity-80">Location</label>
                      <input
                        className="input-burst flex-1"
                        value={identity.location}
                        onChange={(e) =>
                          setIdentity((s) => ({ ...s, location: e.target.value }))
                        }
                        placeholder="City, Region, Country"
                      />
                    </div>
                  </div>

                  {/* Brand Look & Feel */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Brand Look &amp; Feel</h3>

                    <div className="flex items-center gap-4">
                      <label className="w-40 text-sm opacity-80">Primary Colour</label>
                      <input
                        type="color"
                        aria-label="Primary color"
                        className="h-9 w-14 rounded-md border border-border bg-[--surface]"
                        value={brand.primaryHex}
                        onChange={(e) =>
                          setBrand((s) => ({ ...s, primaryHex: e.target.value }))
                        }
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="w-40 text-sm opacity-80">Secondary Colour</label>
                      <input
                        type="color"
                        aria-label="Secondary color"
                        className="h-9 w-14 rounded-md border border-border bg-[--surface]"
                        value={brand.secondaryHex}
                        onChange={(e) =>
                          setBrand((s) => ({ ...s, secondaryHex: e.target.value }))
                        }
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="w-40 text-sm opacity-80">Style Keywords</label>
                      <input
                        className="input-burst flex-1"
                        value={brand.style}
                        onChange={(e) =>
                          setBrand((s) => ({ ...s, style: e.target.value }))
                        }
                        placeholder="modern, playful, elegant, minimal…"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="w-40 text-sm opacity-80">Upload Logo</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="input-burst flex-1"
                        onChange={(e) =>
                          setBrand((s) => ({
                            ...s,
                            logoFile: e.target.files?.[0] ?? null,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="w-40 text-sm opacity-80">Font Preference</label>
                      <input
                        className="input-burst flex-1"
                        value={brand.font}
                        onChange={(e) =>
                          setBrand((s) => ({ ...s, font: e.target.value }))
                        }
                        placeholder="sans-serif, serif, handwritten (optional)"
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-sm text-foreground/70">
                  Not mandatory, but these dramatically improve first-pass quality and SEO alignment.
                </p>
              </section>

              {/* Plans */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold">Choose a plan</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <PlanCard id="preview" />
                  <PlanCard id="deploy" />
                  <PlanCard id="pro" />
                </div>
              </section>

              {/* Add-ons */}
              <section className="bg-[--surface] border border-border rounded-xl p-6">
                <h2 className="text-lg font-semibold">Optional Add-Ons</h2>
                <p className="text-sm text-foreground/70 mt-1">
                  Supercharge results. Toggle what you need—cancel anytime.
                </p>

                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  {([
                    { k: "advSeo", name: "Advanced SEO", desc: "Metadata, schema, sitemap, robots, tuned headings." },
                    { k: "trust", name: "TrustPilot Integration", desc: "Embed badges & reviews on key sections." },
                    { k: "contact", name: "Contact Form", desc: "Validated form w/ spam protection & email delivery." },
                    { k: "hero", name: "Animated Hero Banner", desc: "Subtle motion for a premium first impression." },
                    { k: "stripe", name: "Stripe Payments", desc: "Checkout & subscriptions (requires Stripe account)." },
                    { k: "maps", name: "Google Maps", desc: "Business map & address block for local SEO." },
                    { k: "images", name: "Image Plus", desc: "Extra on-brand visuals for hero & sections." },
                    { k: "analytics", name: "Advanced Analytics", desc: "Events & funnels for what matters." },
                  ] as { k: AddonKey; name: string; desc: string }[]).map((a) => (
                    <label
                      key={a.k}
                      className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg border border-border p-4 hover:shadow-sm cursor-pointer"
                      title={`+$${addonPrices[a.k]}/mo`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <div className="font-medium truncate">{a.name}</div>
                          <div className="text-sm text-foreground/70 shrink-0">
                            +${addonPrices[a.k]}/mo
                          </div>
                        </div>
                        <div className="text-sm text-foreground/70 mt-1">
                          {a.desc}
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="h-5 w-5"
                          checked={addons[a.k]}
                          onChange={(e) =>
                            setAddons((s) => ({ ...s, [a.k]: e.target.checked }))
                          }
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              {/* Sticky order summary */}
              <section className="sticky bottom-4 z-10">
                <div className="flex items-center justify-between rounded-xl border border-border bg-[--surface] px-4 py-3 shadow-lg">
                  <div className="text-sm">
                    <div className="font-medium">
                      {planMeta[selectedPlan].name} plan
                      <span className="ml-2 text-foreground/70">
                        ({planMeta[selectedPlan].priceLabel})
                      </span>
                    </div>
                    <div className="text-foreground/70">
                      Add-ons: {Object.values(addons).filter(Boolean).length} • Total:{" "}
                      <span className="font-semibold">${total}/mo</span>
                    </div>
                  </div>
                  <button className="btn btn-primary px-6 py-3 rounded-lg shadow">
                    Pay with Stripe
                  </button>
                </div>
              </section>
            </>
          )}
        </div>

        {/* RIGHT: Preview */}
        <aside className="space-y-4">
          <div className="sticky top-20">
            <div className="border border-border rounded-2xl bg-[--surface] p-4">
              <div className="text-sm font-medium mb-3">Preview</div>

              {/* Tablet */}
              <div className="relative rounded-xl overflow-hidden border border-border bg-gradient-to-br from-[--burst]/20 via-[--color-burst-blue]/20 to-[--color-burst-pink]/20 h-64">
                <div className="absolute inset-0 grid place-items-center text-foreground/80">
                  <div className="text-center">
                    <div className="text-sm opacity-80">Tablet View</div>
                    <div className="text-xs opacity-60">
                      Sample template preview (dynamic mapping soon)
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone overlay */}
              <div className="relative -mt-10 ml-auto w-36">
                <div className="rounded-2xl overflow-hidden border border-border bg-[--surface] h-64">
                  <div className="grid place-items-center h-full text-foreground/80">
                    <div className="text-center">
                      <div className="text-sm opacity-80">Mobile</div>
                      <div className="text-xs opacity-60">Responsive preview</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color chips */}
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="h-6 w-6 rounded-md border border-border"
                  style={{ backgroundColor: brand.primaryHex }}
                  title="Primary"
                />
                <div
                  className="h-6 w-6 rounded-md border border-border"
                  style={{ backgroundColor: brand.secondaryHex }}
                  title="Secondary"
                />
                <span className="text-xs text-foreground/70">
                  Brand swatches preview
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}


