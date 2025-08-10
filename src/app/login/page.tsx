"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createSupabaseBrowser();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/` : undefined,
      },
    });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    setSent(true);
  }

  return (
    <div className="container-page flex items-center justify-center min-h-[70vh]">
      <div className="card-glass p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        {sent ? (
          <p className="text-foreground/80">Check your email for a magic link to sign in.</p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="input-burst w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {err && <p className="text-sm text-red-500">{err}</p>}
            <button className="btn btn-primary w-full py-2" disabled={loading}>
              {loading ? "Sending..." : "Send Magic Link"}
            </button>
            <div className="text-xs text-foreground/60 text-center">
              No social logins — email link only.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


