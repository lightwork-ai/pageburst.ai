"use client";

import { useEffect, useState } from "react";

type Mode = "light" | "dark";

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("light");

  // Initialize from localStorage or system
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Mode | null);
    if (saved) {
      setMode(saved);
      document.documentElement.setAttribute("data-theme", saved);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = prefersDark ? "dark" : "light";
    setMode(initial);
    // Don't set data-theme here so system mode works by default
  }, []);

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 border border-border bg-surface-2 text-foreground/90"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="text-sm">{mode === "dark" ? "🌙 Dark" : "☀️ Light"}</span>
    </button>
  );
}


