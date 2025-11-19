"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const levels = ["10th", "PUC / 11-12", "Degree", "Others"];
const marks = ["Above 90%", "80% - 90%", "70% - 80%", "Below 70%"];
const subjectOptions = ["Math", "Science", "Biology", "Commerce", "Arts", "Computers"];
const interestOptions = ["Tech", "Design", "Business", "People", "Research", "Teaching"];
const hobbyOptions = ["Coding", "Drawing", "Sports", "Gaming", "Speaking", "Music"];

interface CareerInputData {
  level: string;
  marks: string;
  subjects: string[];
  interests: string[];
  hobbies: string[];
}

const defaultFormState: CareerInputData = {
  level: "",
  marks: "",
  subjects: [],
  interests: [],
  hobbies: [],
};

function loadStoredCareerInput(): CareerInputData {
  if (typeof window === "undefined") {
    return { ...defaultFormState };
  }

  const stored = localStorage.getItem("careerInput");
  if (!stored) {
    return { ...defaultFormState };
  }

  try {
    return { ...defaultFormState, ...(JSON.parse(stored) as CareerInputData) };
  } catch {
    return { ...defaultFormState };
  }
}

export default function CareerInputPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CareerInputData>(() => loadStoredCareerInput());
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const handleToggle = (field: "subjects" | "interests" | "hobbies", value: string) => {
    setFormData((prev) => {
      const current = prev[field];
      const exists = current.includes(value);
      const updatedList = exists ? current.filter((item) => item !== value) : [...current, value];
      return { ...prev, [field]: updatedList };
    });
    setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("careerInput", JSON.stringify(formData));
      }
      setStatus("saved");
      router.push("/career-result");
    } catch (error) {
      console.error("Failed to save career input:", error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">AI powered</p>
            <h1 className="text-3xl font-semibold text-white">Tell us about your journey</h1>
            <p className="text-sm text-slate-300">We&apos;ll generate career paths tailored for you.</p>
          </div>
          <Link
            href="/career-result"
            className="rounded-full border border-slate-500/60 px-4 py-2 text-sm text-slate-200 transition hover:border-white hover:text-white"
          >
            View last results
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Primary selections */}
          <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">Core Details</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Current level</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {levels.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, level }));
                        setStatus("idle");
                      }}
                      className={`rounded-2xl border px-3 py-2 text-sm transition ${
                        formData.level === level
                          ? "border-emerald-400/70 bg-emerald-400/20 text-white"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-white/40"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Average marks</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {marks.map((mark) => (
                    <button
                      key={mark}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, marks: mark }));
                        setStatus("idle");
                      }}
                      className={`rounded-2xl border px-3 py-2 text-sm transition ${
                        formData.marks === mark
                          ? "border-sky-400/70 bg-sky-400/20 text-white"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-white/40"
                      }`}
                    >
                      {mark}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-300">Subjects you enjoy</label>
              <div className="flex flex-wrap gap-3">
                {subjectOptions.map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => handleToggle("subjects", subject)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      formData.subjects.includes(subject)
                        ? "bg-gradient-to-r from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-900/30"
                        : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Interests & hobbies */}
          <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
            <div>
              <h2 className="mb-2 text-xl font-semibold text-white">Interests</h2>
              <p className="text-sm text-slate-400">Pick at least one area you&apos;re curious about.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleToggle("interests", interest)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      formData.interests.includes(interest)
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-900/30"
                        : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold text-white">Hobbies</h2>
              <p className="text-sm text-slate-400">What do you enjoy doing outside class?</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {hobbyOptions.map((hobby) => (
                  <button
                    key={hobby}
                    type="button"
                    onClick={() => handleToggle("hobbies", hobby)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      formData.hobbies.includes(hobby)
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-rose-900/30"
                        : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    {hobby}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">
                We use this data to tailor recommendations and it stays on your device unless you save it in your profile.
              </p>
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-900/30 transition hover:brightness-110"
                disabled={!formData.level || !formData.marks || formData.subjects.length === 0}
              >
                Generate my career paths
              </button>
              {status === "saved" && <p className="text-center text-sm text-emerald-300">Saved! Redirecting...</p>}
              {status === "error" && (
                <p className="text-center text-sm text-rose-400">Could not save. Please try again.</p>
              )}
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}
