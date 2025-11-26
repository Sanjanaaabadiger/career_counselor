"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const subjects = ["Math", "Science", "Biology", "Commerce", "Arts", "Computers"];
const interests = ["Tech", "Design", "Business", "People", "Research", "Teaching"];
const hobbies = ["Coding", "Drawing", "Gaming", "Sports", "Speaking", "Editing"];
const levels = ["10th", "PUC", "Degree", "Other"];

interface ProfileData {
  name: string;
  email: string;
  level: string;
  city: string;
  tenthPercent: string;
  pucPercent: string;
  degreeCGPA: string;
  favouriteSubjects: string[];
  selectedInterests: string[];
  selectedHobbies: string[];
}

const defaultProfileData: ProfileData = {
  name: "",
  email: "",
  level: "",
  city: "",
  tenthPercent: "",
  pucPercent: "",
  degreeCGPA: "",
  favouriteSubjects: [],
  selectedInterests: [],
  selectedHobbies: [],
};

function loadProfileData(): ProfileData {
  if (typeof window === "undefined") return { ...defaultProfileData };

  try {
    const stored = localStorage.getItem("profileData");
    return stored ? { ...defaultProfileData, ...(JSON.parse(stored) as ProfileData) } : defaultProfileData;
  } catch {
    return defaultProfileData;
  }
}

interface SavedCareerReport {
  id: string;
  suggestions: any[];
  missingSkills: string[];
  startupIdea: any;
  timestamp: string;
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>(() => loadProfileData());
  const [savedReports, setSavedReports] = useState<SavedCareerReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const saveProfileData = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
  };

  useEffect(() => {
    fetch("/api/profile/career-reports")
      .then((res) => res.json())
      .then((data) => {
        if (data.reports) {
          setSavedReports(data.reports);
        }
        setLoadingReports(false);
      })
      .catch(() => {
        setLoadingReports(false);
      });
  }, []);

  const getInitial = (name: string) => (name ? name.charAt(0).toUpperCase() : "U");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* 🔗 Normal Navigation (no overlapping) */}
        <div className="flex justify-between text-xs text-slate-300 mb-8">
          <Link href="/" className="underline hover:text-white">
            ⬅ Back to Home
          </Link>

          <div className="flex gap-4">
            <Link href="/career-input" className="underline hover:text-white">
              Career Quiz
            </Link>
            <Link href="/career-result" className="underline hover:text-white">
              Career Result
            </Link>
            <Link href="/auth" className="underline hover:text-white">
              Login / Sign up
            </Link>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col gap-8 lg:flex-row">
          
          {/* LEFT PROFILE CARD */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-8 shadow-lg lg:w-1/3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-sky-500 text-4xl text-white font-bold">
                {getInitial(profileData.name)}
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">
                {profileData.name || "User"}
              </h2>

              {profileData.level && (
                <span className="mt-2 px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/40 text-sm">
                  {profileData.level}
                </span>
              )}

              {/* Interests */}
              {profileData.selectedInterests.length > 0 && (
                <div className="mt-5 w-full">
                  <p className="text-sm font-semibold text-slate-300 mb-2">Interests</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {profileData.selectedInterests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-slate-300"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="flex-1 space-y-6">
            
            {/* BASIC INFO */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Basic Info</h3>

              <div className="space-y-4">
                {/* Name */}
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white focus:border-emerald-400 border border-white/10 outline-none"
                />

                {/* Email — now editable */}
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  placeholder="Your Email"
                  className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white border border-white/10 outline-none"
                />

                {/* Level */}
                <select
                  value={profileData.level}
                  onChange={(e) => setProfileData({ ...profileData, level: e.target.value })}
                  className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white border border-white/10 outline-none"
                >
                  <option value="">Select Level</option>
                  {levels.map((level) => (
                    <option key={level} value={level} className="text-black">
                      {level}
                    </option>
                  ))}
                </select>

                {/* City */}
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  placeholder="City"
                  className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white border border-white/10 outline-none"
                />

                <button
                  onClick={saveProfileData}
                  className="w-full mt-2 rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 py-3 text-sm font-semibold text-white"
                >
                  Save
                </button>
              </div>
            </div>

            {/* ACADEMIC DETAILS */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Academic Details</h3>

              <div className="space-y-4">
                <input
                  value={profileData.tenthPercent}
                  onChange={(e) =>
                    setProfileData({ ...profileData, tenthPercent: e.target.value })
                  }
                  placeholder="10th Percentage"
                  className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white border border-white/10"
                />

                <input
                  value={profileData.pucPercent}
                  onChange={(e) =>
                    setProfileData({ ...profileData, pucPercent: e.target.value })
                  }
                  placeholder="PUC Percentage"
                  className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white border border-white/10"
                />

                <input
                  value={profileData.degreeCGPA}
                  onChange={(e) =>
                    setProfileData({ ...profileData, degreeCGPA: e.target.value })
                  }
                  placeholder="CGPA"
                  className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white border border-white/10"
                />

                {/* Favourite Subjects */}
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => {
                        const exists = profileData.favouriteSubjects.includes(subject);
                        const updated = exists
                          ? profileData.favouriteSubjects.filter((s) => s !== subject)
                          : [...profileData.favouriteSubjects, subject];
                        setProfileData({ ...profileData, favouriteSubjects: updated });
                      }}
                      className={`px-4 py-2 text-xs rounded-full border transition ${
                        profileData.favouriteSubjects.includes(subject)
                          ? "bg-gradient-to-r from-violet-500 to-sky-500 text-white border-transparent"
                          : "bg-white/10 text-slate-300 border-white/20"
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>

                <button
                  onClick={saveProfileData}
                  className="w-full mt-2 rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 py-3 text-sm font-semibold text-white"
                >
                  Save
                </button>
              </div>
            </div>

            {/* INTERESTS & HOBBIES */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Interests & Hobbies</h3>

              <div className="space-y-6">
                {/* INTERESTS */}
                <div>
                  <p className="text-sm font-semibold mb-2">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => {
                          const exists = profileData.selectedInterests.includes(interest);
                          const updated = exists
                            ? profileData.selectedInterests.filter((i) => i !== interest)
                            : [...profileData.selectedInterests, interest];
                          setProfileData({ ...profileData, selectedInterests: updated });
                        }}
                        className={`px-4 py-2 text-xs rounded-full border transition ${
                          profileData.selectedInterests.includes(interest)
                            ? "bg-gradient-to-r from-violet-500 to-sky-500 text-white"
                            : "bg-white/10 text-slate-300 border-white/20"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* HOBBIES */}
                <div>
                  <p className="text-sm font-semibold mb-2">Hobbies</p>
                  <div className="flex flex-wrap gap-2">
                    {hobbies.map((hobby) => (
                      <button
                        key={hobby}
                        onClick={() => {
                          const exists = profileData.selectedHobbies.includes(hobby);
                          const updated = exists
                            ? profileData.selectedHobbies.filter((h) => h !== hobby)
                            : [...profileData.selectedHobbies, hobby];
                          setProfileData({ ...profileData, selectedHobbies: updated });
                        }}
                        className={`px-4 py-2 text-xs rounded-full border transition ${
                          profileData.selectedHobbies.includes(hobby)
                            ? "bg-gradient-to-r from-violet-500 to-sky-500 text-white"
                            : "bg-white/10 text-slate-300 border-white/20"
                        }`}
                      >
                        {hobby}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={saveProfileData}
                  className="w-full mt-2 rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 py-3 text-sm font-semibold text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE QUICK LINKS (DESKTOP ONLY) */}
          <div className="hidden lg:flex flex-col gap-2 w-40">
            <Link
              href="/career-input"
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-4 py-2 text-xs text-center"
            >
              Take Career Quiz Again
            </Link>

            <Link
              href="/career-result"
              className="border border-slate-600 hover:bg-slate-800 text-slate-200 rounded-full px-4 py-2 text-xs text-center"
            >
              View Career Results
            </Link>
          </div>

        </div>

        {/* Saved Career Reports Section */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <h2 className="mb-4 text-2xl font-bold text-white">📋 Saved Career Reports</h2>
          
          {loadingReports ? (
            <p className="text-slate-300">Loading reports...</p>
          ) : savedReports.length === 0 ? (
            <p className="text-slate-300">No saved career reports yet. Complete the career quiz and save your results!</p>
          ) : (
            <div className="space-y-4">
              {savedReports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <button
                    onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div>
                      <h3 className="font-semibold text-white">
                        Career Report - {new Date(report.timestamp).toLocaleDateString()}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {report.suggestions?.length || 0} career suggestions
                      </p>
                    </div>
                    <span className="text-slate-400">
                      {expandedReport === report.id ? "▼" : "▶"}
                    </span>
                  </button>
                  
                  {expandedReport === report.id && (
                    <div className="mt-4 space-y-4 pt-4 border-t border-white/10">
                      {/* Suggestions */}
                      <div>
                        <h4 className="mb-2 font-semibold text-emerald-300">Career Suggestions:</h4>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {report.suggestions?.map((suggestion: any, idx: number) => (
                            <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-3">
                              <p className="font-semibold text-white">{suggestion.title}</p>
                              <p className="text-xs text-slate-300 mt-1">{suggestion.why}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Missing Skills */}
                      {report.missingSkills && report.missingSkills.length > 0 && (
                        <div>
                          <h4 className="mb-2 font-semibold text-rose-300">Missing Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {report.missingSkills.map((skill: string, idx: number) => (
                              <span key={idx} className="rounded-full bg-rose-500/20 px-3 py-1 text-xs text-rose-300 border border-rose-400/40">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Startup Idea */}
                      {report.startupIdea && (
                        <div>
                          <h4 className="mb-2 font-semibold text-purple-300">Startup Idea:</h4>
                          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <p className="font-semibold text-white">{report.startupIdea.idea}</p>
                            <p className="text-sm text-slate-300 mt-1">{report.startupIdea.whySuitable}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
