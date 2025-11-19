"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const levels = ["10th", "PUC", "Degree", "Other"];
const tabs = ["Login", "Sign Up"] as const;
type Tab = (typeof tabs)[number];

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Login");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-slate-100 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
        <div className="mb-8 flex gap-4 rounded-full bg-white/5 p-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-full px-6 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-gradient-to-r from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-900/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {activeTab === "Sign Up" && (
            <div>
              <label className="text-sm text-slate-300">Name</label>
              <input
                type="text"
                required
                placeholder="Your full name"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-violet-400"
              />
            </div>
          )}

          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-violet-400"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-violet-400"
            />
          </div>

          {activeTab === "Sign Up" && (
            <div>
              <label className="text-sm text-slate-300">Current level</label>
              <select
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                defaultValue=""
              >
                <option value="" disabled className="text-slate-900">
                  Select level
                </option>
                {levels.map((level) => (
                  <option key={level} value={level} className="text-slate-900">
                    {level}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110"
          >
            {activeTab === "Login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Protected by AI-powered security. Trusted by ambitious students.
        </p>
      </div>
    </main>
  );
}