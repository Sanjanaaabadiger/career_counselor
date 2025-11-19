"use client";

import { useEffect, useState } from "react";

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

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "user@example.com",
    level: "",
    city: "",
    tenthPercent: "",
    pucPercent: "",
    degreeCGPA: "",
    favouriteSubjects: [],
    selectedInterests: [],
    selectedHobbies: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem("profileData");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setProfileData(data);
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    }
  }, []);

  const saveProfileData = (updates: Partial<ProfileData>) => {
    const updated = { ...profileData, ...updates };
    setProfileData(updated);
    localStorage.setItem("profileData", JSON.stringify(updated));
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8 lg:flex-row">
        {/* Left Side - Profile Card */}
        <div className="lg:w-1/3">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-sky-500 text-4xl font-bold text-white shadow-lg shadow-violet-900/30">
                {getInitial(profileData.name)}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {profileData.name || "User"}
              </h2>
              {profileData.level && (
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-sm font-medium text-emerald-300">
                  {profileData.level}
                </p>
              )}
              {profileData.selectedInterests.length > 0 && (
                <div className="mt-4 w-full">
                  <p className="mb-3 text-sm font-semibold text-slate-300">
                    Interests
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {profileData.selectedInterests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Info Cards */}
        <div className="flex-1 space-y-6">
          {/* Basic Info Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
            <h3 className="mb-6 text-xl font-bold text-white">Basic Info</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400 outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Current Level
                </label>
                <select
                  value={profileData.level}
                  onChange={(e) =>
                    setProfileData({ ...profileData, level: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                >
                  <option value="" className="text-slate-900">
                    Select level
                  </option>
                  {levels.map((level) => (
                    <option key={level} value={level} className="text-slate-900">
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  City
                </label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) =>
                    setProfileData({ ...profileData, city: e.target.value })
                  }
                  placeholder="Your city"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                />
              </div>
              <button
                onClick={() => saveProfileData(profileData)}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110"
              >
                Save
              </button>
            </div>
          </div>

          {/* Academic Details Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
            <h3 className="mb-6 text-xl font-bold text-white">
              Academic Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  10th Percentage
                </label>
                <input
                  type="text"
                  value={profileData.tenthPercent}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      tenthPercent: e.target.value,
                    })
                  }
                  placeholder="e.g., 85"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  PUC Percentage
                </label>
                <input
                  type="text"
                  value={profileData.pucPercent}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      pucPercent: e.target.value,
                    })
                  }
                  placeholder="e.g., 88"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Degree CGPA
                </label>
                <input
                  type="text"
                  value={profileData.degreeCGPA}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      degreeCGPA: e.target.value,
                    })
                  }
                  placeholder="e.g., 8.5"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                />
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
                      onClick={() => {
                        setProfileData({
                          ...profileData,
                          favouriteSubjects: profileData.favouriteSubjects.includes(
                            subject
                          )
                            ? profileData.favouriteSubjects.filter(
                                (s) => s !== subject
                              )
                            : [...profileData.favouriteSubjects, subject],
                        });
                      }}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        profileData.favouriteSubjects.includes(subject)
                          ? "bg-gradient-to-r from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-900/30"
                          : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => saveProfileData(profileData)}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110"
              >
                Save
              </button>
            </div>
          </div>

          {/* Interests & Hobbies Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
            <h3 className="mb-6 text-xl font-bold text-white">
              Interests & Hobbies
            </h3>
            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-300">
                  Interests
                </label>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => {
                        setProfileData({
                          ...profileData,
                          selectedInterests: profileData.selectedInterests.includes(
                            interest
                          )
                            ? profileData.selectedInterests.filter(
                                (i) => i !== interest
                              )
                            : [...profileData.selectedInterests, interest],
                        });
                      }}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        profileData.selectedInterests.includes(interest)
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
                      onClick={() => {
                        setProfileData({
                          ...profileData,
                          selectedHobbies: profileData.selectedHobbies.includes(
                            hobby
                          )
                            ? profileData.selectedHobbies.filter(
                                (h) => h !== hobby
                              )
                            : [...profileData.selectedHobbies, hobby],
                        });
                      }}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        profileData.selectedHobbies.includes(hobby)
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
                onClick={() => saveProfileData(profileData)}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

