"use client";

import { useState } from "react";

export default function PricingPage() {
  const [addons, setAddons] = useState({
    seo: false,
    images: false,
    analytics: false
  });

  const basePrices = {
    preview: 0,
    deploy: 15,
    pro: 29
  };

  const addonPrices = {
    seo: 5,
    images: 7,
    analytics: 3
  };

  const [selectedPlan, setSelectedPlan] = useState("preview");

  const total = basePrices[selectedPlan] +
    Object.entries(addons)
      .reduce((sum, [key, value]) => value ? sum + addonPrices[key] : sum, 0);

  return (
    <div className="container-page py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center">Choose Your Plan</h1>
      <p className="text-center text-foreground/70 max-w-prose mx-auto">
        Select the plan that suits your needs, and customise it with optional add-ons.
      </p>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { id: "preview", name: "Preview", desc: "Generate homepage only", price: "$0", note: "No deploy" },
          { id: "deploy", name: "Deploy", desc: "Full site + deploy", price: "$15/mo", note: "" },
          { id: "pro", name: "Pro", desc: "Full site + deploy + extras", price: "$29/mo", note: "" }
        ].map(plan => (
          <div
            key={plan.id}
            className={`border rounded-lg p-6 cursor-pointer transition hover:shadow-lg ${
              selectedPlan === plan.id ? "border-purple-500 ring-2 ring-purple-300" : "border-border"
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-foreground/70 mt-1">{plan.desc}</p>
            <p className="text-2xl font-bold mt-4">{plan.price}</p>
            {plan.note && <p className="text-sm text-red-500 mt-1">{plan.note}</p>}
          </div>
        ))}
      </div>

      {/* Add-Ons */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h4 className="text-lg font-semibold">Optional Add-Ons</h4>
        {[
          { id: "seo", label: "SEO Pack", price: addonPrices.seo },
          { id: "images", label: "Image Plus", price: addonPrices.images },
          { id: "analytics", label: "Advanced Analytics", price: addonPrices.analytics }
        ].map(addon => (
          <label key={addon.id} className="flex items-center justify-between cursor-pointer">
            <span>{addon.label}</span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground/70">+${addon.price}/mo</span>
              <input
                type="checkbox"
                checked={addons[addon.id]}
                onChange={e => setAddons(prev => ({
                  ...prev,
                  [addon.id]: e.target.checked
                }))}
              />
            </div>
          </label>
        ))}
      </div>

      {/* Total + Payment */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-lg font-semibold">Total: ${total}/mo</span>
        <button className="btn btn-primary px-6 py-3 rounded-lg shadow-lg">
          Pay with Stripe
        </button>
      </div>
    </div>
  );
}


