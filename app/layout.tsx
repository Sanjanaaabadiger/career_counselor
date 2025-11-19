import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Career Council",
  description: "Your personalized career guidance platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-100`}>
        <nav className="w-full border-b border-white/10 bg-slate-900/60 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between text-sm">
            <Link href="/" className="text-lg font-semibold text-white">
              AI Career Council
            </Link>
            <div className="flex gap-4 text-slate-300">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <Link href="/career-input" className="hover:text-white">
                Career Quiz
              </Link>
              <Link href="/career-result" className="hover:text-white">
                Results
              </Link>
              <Link href="/profile" className="hover:text-white">
                Profile
              </Link>
              <Link href="/auth" className="hover:text-white">
                Login
              </Link>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
