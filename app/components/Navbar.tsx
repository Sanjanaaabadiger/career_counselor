"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/hooks/useSession";

export default function Navbar() {
  const { user, loading } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth");
    router.refresh();
  };

  const getInitial = (name: string) => (name ? name.charAt(0).toUpperCase() : "U");

  return (
    <nav className="w-full border-b border-white/10 bg-slate-900/60 px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between text-sm">
        <Link href="/" className="text-lg font-semibold text-white">
          AI Career Council
        </Link>
        <div className="flex items-center gap-4 text-slate-300">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/career-input" className="hover:text-white">
            Career Quiz
          </Link>
          <Link href="/career-result" className="hover:text-white">
            Results
          </Link>
          <Link href="/resume-analyser" className="hover:text-white">
            Resume Analyzer
          </Link>
          <Link href="/profile" className="hover:text-white">
            Profile
          </Link>
          {loading ? (
            <span className="text-slate-400">Loading...</span>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-sky-500 text-xs font-bold text-white">
                  {getInitial(user.name)}
                </div>
                <span className="text-white">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth" className="hover:text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

