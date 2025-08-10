import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SideMenu from "../components/SideMenu";
import HeaderActions from "../components/HeaderActions";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400","500","600","700"],
});

export const metadata: Metadata = {
  title: "PageBurst — Your Website. Just a Click Away.",
  description: "Describe it. We’ll build it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased font-sans bg-background text-foreground">
        <SideMenu />

        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
          <div className="container-page h-14 grid grid-cols-3 items-center">
            {/* LEFT: brand */}
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md" style={{ backgroundColor: "var(--burst)" }} />
                <span className="font-semibold">PageBurst</span>
              </a>
            </div>

            {/* CENTER: TrustScorer */}
            <div className="flex items-center justify-center">
              <span className="badge-contrast">
                TrustScorer ★★★★★
              </span>
            </div>

            {/* RIGHT: actions (search+login+theme) */}
            <div className="flex items-center justify-end min-w-[180px]">
              <HeaderActions />
            </div>
          </div>

          {/* Secondary nav (desktop) */}
          <div className="hidden md:block border-t border-border">
            <div className="container-page h-10 flex items-center gap-6 text-sm"><a className="opacity-80 hover:opacity-100" href="/pricing">Pricing</a><a className="opacity-80 hover:opacity-100" href="/create-account">Create account</a>
              <a className="opacity-80 hover:opacity-100" href="/#how">How it works</a>
              <a className="opacity-80 hover:opacity-100" href="/#features">Features</a>
              <a className="opacity-80 hover:opacity-100" href="/#builder">Builder UI</a>
              <a className="opacity-80 hover:opacity-100" href="/login">Log in</a>
            </div>
          </div>
        </header>

        <main className="pt-6">{children}</main>

        {/* Footer */}
        <footer className="mt-16 border-t border-border bg-background">
          <div className="container-page py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <a href="/" className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md" style={{ backgroundColor: "var(--burst)" }} />
                <span className="font-semibold">PageBurst.ai</span>
              </a>
              <p className="text-sm text-foreground/70">From prompt to production in minutes.</p>
            </div>

            <div>
              <div className="font-semibold mb-3">Product</div>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li><a href="/#features" className="hover:underline">Features</a></li><li><a href="/pricing" className="hover:underline">Pricing</a></li><li><a href="/create-account" className="hover:underline">Create account</a></li>
                <li><a href="/#how" className="hover:underline">How it works</a></li>
                <li><a href="/#builder" className="hover:underline">Builder UI</a></li>
                <li><a href="/releases" className="hover:underline">Release notes</a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-3">Company</div>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li><a href="/about" className="hover:underline">About</a></li>
                <li><a href="/careers" className="hover:underline">Careers</a></li>
                <li><a href="/engine" className="hover:underline">Engine</a></li>
                <li><a href="/ethics" className="hover:underline">Ethics</a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-3">Legal</div>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li><a href="/privacy" className="hover:underline">Privacy</a></li>
                <li><a href="/terms" className="hover:underline">Terms</a></li>
                <li><a href="/cookies" className="hover:underline">Cookies</a></li>
                <li><a href="/login" className="hover:underline">Log in</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border">
            <div className="container-page py-6 text-sm opacity-80 flex items-center justify-between">
              <span>© {new Date().getFullYear()} PageBurst.ai</span>
              <div className="flex gap-4">
                <a href="/privacy" className="hover:underline">Privacy</a>
                <a href="/terms" className="hover:underline">Terms</a>
                <a href="/releases" className="hover:underline">Status</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}


