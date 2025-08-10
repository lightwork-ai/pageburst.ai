"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BottomCTA(){
  const router = useRouter();
  const [p,setP] = useState("“Portfolio site for a freelance designer…”");

  return (
    <section className="container-page my-16">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Ready to launch?</h2>
        <div className="mx-auto max-w-2xl flex items-center gap-2">
          <input
            className="flex-1 rounded-xl bg-black/40 px-4 py-3 outline-none border border-white/10 focus:border-white/25"
            value={p}
            onChange={(e)=>setP(e.target.value)}
          />
          <button
            onClick={()=>router.push(`/generating?mode=generate&prompt=${encodeURIComponent(p)}`)}
            className="pill-gradient pill-hover text-white px-5 py-3 rounded-full font-semibold shadow"
          >
            Generate Site
          </button>
        </div>
      </div>
    </section>
  );
}
