const levels = ["10th", "PUC / 11-12", "Degree", "Others"];
const careers = ["Engineer", "Doctor", "Designer", "Entrepreneur"];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-6 py-4 backdrop-blur">
          <div className="text-lg font-semibold tracking-tight text-white">
            AI Career Council
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-300">
            {["Home", "Career Path", "Startup Ideas", "Profile"].map((link) => (
              <a
                key={link}
                className="transition hover:text-white"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
        </nav>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-sm font-medium text-emerald-300">
              Guided by AI mentors
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Discover Your Future Career Path
            </h1>
            <p className="text-lg text-slate-300">
              Personalized insights, tailored growth plans, and startup ideas
              designed for ambitious students ready to shape the future.
            </p>
            <button className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400">
              Start Career Quiz
            </button>
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

        <section className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
              Levels
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white">Choose Your Level</h2>
            <p className="text-slate-300">
              Tailored guidance no matter where you are in your learning journey.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((level) => (
              <div
                key={level}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5 shadow-lg shadow-slate-900/50 transition hover:-translate-y-1 hover:border-emerald-400/60"
              >
                <p className="text-xl font-semibold text-white">{level}</p>
                <p className="mt-3 text-sm text-slate-300">
                  Discover curated resources, projects, and mentors for {level.toLowerCase()} students.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

