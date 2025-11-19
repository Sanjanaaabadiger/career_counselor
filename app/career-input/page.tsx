"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const marksOptions = ["below 60", "60-80", "80+"];
const subjects = ["Math", "Science", "Biology", "Commerce", "Arts", "Computers"];
const interests = ["Tech", "Design", "Business", "People", "Research", "Teaching"];
const hobbies = ["Coding", "Drawing", "Gaming", "Sports", "Speaking", "Editing"];

export default function CareerInputPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get("level");

  const [marks, setMarks] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const toggleChip = (
    item: string,
    selected: string[],
    setSelected: (items: string[]) => void
  ) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      level: level || "",
      marks,
      subjects: selectedSubjects,
      interests: selectedInterests,
      hobbies: selectedHobbies,
    };
    localStorage.setItem("careerInput", JSON.stringify(formData));
    router.push("/career-result");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Tell us about you
          </h1>

          {level === "10th" && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
              You selected 10th
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Marks
              </label>
              <select
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
              >
                <option value="" disabled className="text-slate-900">
                  Select your marks range
                </option>
                {marksOptions.map((option) => (
                  <option key={option} value={option} className="text-slate-900">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Favourite Subjects
              </label>
              <div className="flex flex-wrap gap-3">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() =>
                      toggleChip(subject, selectedSubjects, setSelectedSubjects)
                    }
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      selectedSubjects.includes(subject)
                        ? "bg-gradient-to-r from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-900/30"
                        : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Interests
              </label>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() =>
                      toggleChip(interest, selectedInterests, setSelectedInterests)
                    }
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      selectedInterests.includes(interest)
                        ? "bg-gradient-to-r from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-900/30"
                        : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Hobbies
              </label>
              <div className="flex flex-wrap gap-3">
                {hobbies.map((hobby) => (
                  <button
                    key={hobby}
                    type="button"
                    onClick={() =>
                      toggleChip(hobby, selectedHobbies, setSelectedHobbies)
                    }
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      selectedHobbies.includes(hobby)
                        ? "bg-gradient-to-r from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-900/30"
                        : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {hobby}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110"
            >
              Get Career Recommendations
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

