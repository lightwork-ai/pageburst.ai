export default function CreateAccountPage() {
  return (
    <div className="container-page flex items-center justify-center min-h-[70vh]">
      <div className="card-glass p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="mt-2 text-sm text-foreground/70">
          Enter your email and we’ll send you a sign-up link.
        </p>
        <form
          className="space-y-4 mt-6"
          onSubmit={async (e) => {
            e.preventDefault();
            const email = (e.currentTarget.querySelector("input[type=email]") as HTMLInputElement)?.value;
            if (!email) return;
            await fetch("/api/auth/otp", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
            alert("Check your inbox for the sign-up link.");
          }}
        >
          <input type="email" placeholder="you@company.com" className="input-burst w-full" />
          <button className="btn btn-primary w-full py-2">Send sign-up link</button>
        </form>

        <div className="mt-4 text-sm text-foreground/70 text-center">
          Already have an account? <a className="hover:underline" href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
}


