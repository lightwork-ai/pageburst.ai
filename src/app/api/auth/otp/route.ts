import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/clients";

export async function POST(req: Request) {
  const { email, redirectTo } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const supabase = getSupabaseServer();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo || `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
