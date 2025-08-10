"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function HeaderActions() {
  const [showSearch, setShowSearch] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const loginRef = useRef<HTMLDivElement | null>(null);

  // Close login on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!loginRef.current) return;
      if (!loginRef.current.contains(e.target as Node)) setLoginOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="flex items-center gap-2 relative">
      {/* Expandable search */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="btn-outline px-2 py-1.5 text-sm hover:bg-surface"
          aria-label="Search"
          title="Search"
          onClick={() => setShowSearch(v => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className={`overflow-hidden transition-all duration-200 ${showSearch ? "w-48 sm:w-64" : "w-0"}`}>
          <input
            className="input-burst w-full"
            placeholder="Search (not active)"
            onBlur={() => setShowSearch(false)}
          />
        </div>
      </div>

      {/* Login dropdown */}
      <div className="relative" ref={loginRef}>
        <button
          type="button"
          className="btn btn-primary px-3 py-1.5 text-sm"
          onClick={() => setLoginOpen(v => !v)}
          aria-expanded={loginOpen}
          aria-haspopup="dialog"
        >
          Log in
        </button>

        {loginOpen && (
          <div className="absolute right-0 mt-2 w-72 card-glass p-4 z-50">
            <div className="text-sm font-semibold mb-2">Log in</div>
            <form className="space-y-3" onSubmit={async (e) => { e.preventDefault(); const form = e.currentTarget as HTMLFormElement; const email = (form.querySelector("input[type=email]") as HTMLInputElement)?.value; if(!email) return; await fetch("/api/auth/otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); alert("Check your inbox for the login link."); }}>
              <input type="email" placeholder="Email address" className="input-burst w-full" />
              <button className="btn btn-primary w-full py-2">Continue</button>
              <div className="text-xs text-foreground/60 text-center">
                <a href="/reset-password" className="hover:underline">Forgot password?</a>
              </div>
            </form>
          </div>
        )}
      </div>

      <ThemeToggle />
    </div>
  );
}


