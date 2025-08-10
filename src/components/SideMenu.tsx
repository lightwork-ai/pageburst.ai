"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#builder", label: "Builder UI" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/engine", label: "Engine" },
  { href: "/ethics", label: "Ethics" },
  { href: "/releases", label: "Release notes" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
  { href: "/pricing", label: "Pricing" },{ href: "/create-account", label: "Create account" },{ href: "/login", label: "Log in" },
];

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 h-9 w-9 rounded-full border border-border bg-surface-2 text-foreground/80 shadow hover:bg-surface transition"
      >
        ☰
      </button>

      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/30" />
      )}

      <aside
        className={`fixed z-50 top-0 left-0 h-full w-72 border-r border-border bg-surface-2 shadow transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="font-semibold">PageBurst</div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="rounded-md border border-border px-2 py-1 hover:bg-surface"
          >
            ✕
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {links.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 hover:bg-surface text-foreground/90"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto p-3 text-xs text-foreground/60">
          <div className="hr my-3"></div>
          <div>v1.0 • View-only menu</div>
        </div>
      </aside>
    </>
  );
}


