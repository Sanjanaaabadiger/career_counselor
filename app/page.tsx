import Link from "next/link";

const levels = ["10th", "PUC / 11-12", "Degree", "Others"];
const careers = ["Engineer", "Doctor", "Designer", "Entrepreneur"];
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/career-input", label: "Career Quiz" },
  { href: "/career-result", label: "Career Results" },
  { href: "/profile", label: "Profile" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-6 py-4 backdrop-blur">
          <div className="text-lg font-semibold tracking-tight text-white">
            AI Career Council
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-medium text-slate-300">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1 transition hover:bg-slate-800 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-sm font-medium text-emerald-300">
              Guided by AI mentors
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Discover Your Future Career Path
            </h1>
            <p className="text-lg text-slate-300">
              Personalized insights, tailored growth plans, and startup ideas designed for ambitious students ready to shape the future.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/career-input"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Start Career Quiz
              </Link>
              <Link
                href="/career-result"
                className="inline-flex items-center justify-center rounded-full border border-emerald-400/40 px-6 py-3 text-base font-semibold text-emerald-300 transition hover:border-emerald-400 hover:text-white"
              >
                View My Results
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-600/40 via-purple-700/40 to-slate-900/60 p-6 shadow-2xl shadow-purple-900/40">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-200">
              Top Paths
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {careers.map((career) => (
                <div
                  key={career}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center shadow-lg shadow-indigo-900/40 transition hover:-translate-y-1 hover:border-white/30"
                >
                  <p className="text-lg font-semibold text-white">{career}</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Explore skills, mentors & growth roadmap.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/5 bg-white/5 p-6 shadow-2xl shadow-indigo-900/40 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              How it works
            </p>
            <h2 className="text-3xl font-bold text-white">
              Built for students from 10th to degree level
            </h2>
            <p className="text-slate-300">
              Share your interests, marks, and goals. Our AI crafts a personalized learning path, suggests mentors, and gives startup/project ideas that match your strengths.
            </p>
            <div className="flex flex-wrap gap-3">
              {levels.map((level) => (
                <span
                  key={level}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  {level}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-200">Career Quiz Progress</p>
              <p className="text-xs text-slate-400">14 questions</p>
            </div>
            <div className="h-2 rounded-full bg-slate-800">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500" />
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Map your interests & activities
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                Match with mentors and resources
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                Unlock college & startup guidance
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
