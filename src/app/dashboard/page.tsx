import { getSupabaseServer } from "@/lib/supabase/clients";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = getSupabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  return (
    <div className="container-page space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="card-glass p-6">
        <div className="text-sm text-foreground/80">Signed in as</div>
        <div className="text-lg font-semibold">{data.user.email}</div>
      </div>
    </div>
  );
}

      <form action="/api/auth/signout" method="post" className="mt-4">
        <button className="btn-outline px-3 py-2" formMethod="post" onClick={async (e)=>{e.preventDefault(); await fetch("/api/auth/signout",{method:"POST"}); window.location.href="/";}}>Sign out</button>
      </form>



