"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";

const tabs = ["Login", "Sign Up"] as const;
type AuthTab = (typeof tabs)[number];

interface AuthFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultFormState: AuthFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const benefits = [
  {
    title: "Personalized career paths",
    detail: "Save quiz data and revisit smart recommendations tailored to you.",
  },
  {
    title: "Progress sync",
    detail: "Track inputs across devices once you sign back in.",
  },
  {
    title: "Early feature access",
    detail: "Unlock upcoming mentorship tools and startup challenges.",
  },
];

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AuthTab>("Login");
  const [formState, setFormState] = useState<AuthFormState>({ ...defaultFormState });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");

  const isSignup = activeTab === "Sign Up";

  const ctaLabel = useMemo(() => (isSignup ? "Create account" : "Log in"), [isSignup]);

  const validateForm = (): string => {
    if (!formState.email.trim()) {
      return "Please enter your email.";
    }
    if (!formState.password.trim()) {
      return "Please enter your password.";
    }
    if (isSignup) {
      if (!formState.name.trim()) {
        return "Please tell us your name.";
      }
      if (formState.password.length < 6) {
        return "Password should be at least 6 characters.";
      }
      if (formState.password !== formState.confirmPassword) {
        return "Passwords do not match.";
      }
    }
    return "";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const validationMessage = validateForm();
    if (validationMessage) {
      setStatus("idle");
      setError(validationMessage);
      return;
    }

    // Simulate auth success and route to profile
    setStatus("success");
    router.push("/profile");
  };

  const handleFieldChange = (field: keyof AuthFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setStatus("idle");
    setError("");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8 lg:flex-row">
        <div className="lg:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-sm font-medium text-emerald-300">
            Secure & fast sign in
          </div>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            Access your personalized career hub
          </h1>
          <p className="text-lg text-slate-300">
            Log in to continue refining your roadmap, save the quiz progress, and unlock curated guidance from AI mentors.
          </p>
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-indigo-900/30"
              >
                <p className="text-sm font-semibold text-white">{benefit.title}</p>
                <p className="text-sm text-slate-300">{benefit.detail}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <Link href="/career-input" className="underline hover:text-white">
              Take career quiz
            </Link>
            <Link href="/career-result" className="underline hover:text-white">
              View recommendations
            </Link>
          </div>
        </div>

        <div className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
          <div className="mb-6 flex gap-3 rounded-2xl bg-white/5 p-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setFormState({ ...defaultFormState, email: formState.email });
                  setStatus("idle");
                  setError("");
                }}
                className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-900/30"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-300">Full name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) => handleFieldChange("name", event.target.value)}
                  placeholder="E.g., Aarav Sharma"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-300">Email</label>
              <input
                type="email"
                value={formState.email}
                onChange={(event) => handleFieldChange("email", event.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-300">Password</label>
              <input
                type="password"
                value={formState.password}
                onChange={(event) => handleFieldChange("password", event.target.value)}
                placeholder="••••••"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
              />
            </div>

            {isSignup && (
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-300">Confirm password</label>
                <input
                  type="password"
                  value={formState.confirmPassword}
                  onChange={(event) => handleFieldChange("confirmPassword", event.target.value)}
                  placeholder="Re-enter password"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                />
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-rose-500/50 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-900/30 transition hover:brightness-110 disabled:opacity-60"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Processing..." : ctaLabel}
            </button>

            <p className="text-center text-xs text-slate-400">
              By continuing you agree to our{" "}
              <Link href="/terms" className="underline hover:text-white">
                Terms
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
