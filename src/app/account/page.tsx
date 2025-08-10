import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="container-page space-y-4">
      <h1 className="text-2xl font-semibold">Account</h1>
      <pre className="text-sm opacity-80">{JSON.stringify(user, null, 2)}</pre>
      <form action="/api/auth/signout" method="POST">
        <button className="btn px-4 py-2 border border-border">Log out</button>
      </form>
    </div>
  );
}


