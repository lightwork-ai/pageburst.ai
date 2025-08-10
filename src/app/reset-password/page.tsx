export default function ResetPasswordPage() {
  return (
    <div className="container-page flex items-center justify-center min-h-[60vh]">
      <div className="card-glass p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Reset password</h1>
        <form className="space-y-4">
          <input type="email" placeholder="Email address" className="input-burst w-full" />
          <button className="btn btn-primary w-full py-2">Send reset link</button>
        </form>
      </div>
    </div>
  );
}


