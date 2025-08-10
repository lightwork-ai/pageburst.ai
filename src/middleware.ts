import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  // Refresh session on navigation so SSR can read user
  const res = NextResponse.next();
  try {
    await createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (k) => req.cookies.get(k)?.value, set: (k,v,o)=>res.cookies.set(k,v,o as any), remove: (k,o)=>res.cookies.set(k,"",{...o,maxAge:0} as any) } }
    ).auth.getUser();
  } catch {}
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
