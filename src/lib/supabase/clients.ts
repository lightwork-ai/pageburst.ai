import { cookies, headers } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server client (uses Next cookies)
export function getSupabaseServer() {
  return createServerClient(
    supabaseUrl,
    supabaseAnon,
    { cookies: () => cookies() as any, headers: () => headers() as any }
  );
}

// Browser client (for client components if needed)
export function getSupabaseBrowser() {
  return createClient(supabaseUrl, supabaseAnon);
}
