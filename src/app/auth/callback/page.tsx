import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/clients";

export default async function AuthCallback() {
  const supabase = getSupabaseServer();
  // Supabase handles token exchange via middleware cookie updates on this page load
  const { data } = await supabase.auth.getUser();
  // If user exists, go dashboard; else home
  redirect(data.user ? "/dashboard" : "/");
}


