"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface CareerSuggestion {
  title: string;
  why: string;
  path: string;
  skills: string[];
}

interface CareerInputData {
  level: string;
  marks: string;
  subjects: string[];
  interests: string[];
  hobbies: string[];
}

// ⭐ Skill → Resource link map
const skillResourceLinks: Record<string, string> = {
  "Python": "https://www.google.com/search?q=learn+python+for+beginners",
  "Machine Learning": "https://www.google.com/search?q=machine+learning+course+for+beginners",
  "Data Science": "https://www.google.com/search?q=data+science+course+for+beginners",
  "Neural Networks": "https://www.google.com/search?q=neural+networks+basics+course",
  "Programming": "https://www.google.com/search?q=programming+for+beginners",
  "Problem Solving": "https://www.google.com/search?q=improve+problem+solving+skills",
  "Data Structures": "https://www.google.com/search?q=data+structures+and+algorithms+course",
  "Algorithms": "https://www.google.com/search?q=algorithms+course+for+beginners",
  "Design Thinking": "https://www.google.com/search?q=design+thinking+course",
  "Figma": "https://www.google.com/search?q=learn+figma+ui+design",
  "User Research": "https://www.google.com/search?q=user+research+ux+course",
  "Prototyping": "https://www.google.com/search?q=ui+ux+prototyping+course",
  "Adobe Creative Suite": "https://www.google.com/search?q=learn+adobe+creative+suite",
  "Typography": "https://www.google.com/search?q=typography+basics",
  "Color Theory": "https://www.google.com/search?q=color+theory+for+designers",
  "Layout Design": "https://www.google.com/search?q=layout+design+principles",
  "Digital Marketing": "https://www.google.com/search?q=digital+marketing+course+for+beginners",
  "Communication": "https://www.google.com/search?q=improve+communication+skills",
  "Analytics": "https://www.google.com/search?q=marketing+analytics+course",
  "Strategy": "https://www.google.com/search?q=business+strategy+basics",
  "People Management": "https://www.google.com/search?q=people+management+skills",
  "Recruitment": "https://www.google.com/search?q=recruitment+training+course",
  "Organizational Psychology": "https://www.google.com/search?q=organizational+psychology+basics",
  "Biology": "https://www.google.com/search?q=learn+biology+online",
  "Chemistry": "https://www.google.com/search?q=basic+chemistry+course",
  "Critical Thinking": "https://www.google.com/search?q=critical+thinking+skills",
  "Empathy": "https://www.google.com/search?q=how+to+develop+empathy",
  "Research Methods": "https://www.google.com/search?q=research+methods+course",
  "Laboratory Skills": "https://www.google.com/search?q=basic+laboratory+skills",
  "Data Analysis": "https://www.google.com/search?q=data+analysis+course",
  "Scientific Writing": "https://www.google.com/search?q=scientific+writing+course",
  "Research Methodology": "https://www.google.com/search?q=research+methodology+course",
  "Pedagogy": "https://www.google.com/search?q=pedagogy+course+for+teachers",
  "Subject Expertise": "https://www.google.com/search?q=become+expert+in+subject",
  "Patience": "https://www.google.com/search?q=how+to+develop+patience",
  "Financial Analysis": "https://www.google.com/search?q=financial+analysis+course",
  "Accounting": "https://www.google.com/search?q=basic+accounting+course",
  "Excel": "https://www.google.com/search?q=learn+excel+for+beginners",
  "Market Analysis": "https://www.google.com/search?q=market+analysis+course",
  "Leadership": "https://www.google.com/search?q=leadership+skills+course",
  "Time Management": "https://www.google.com/search?q=time+management+course",
  "Team Leadership": "https://www.google.com/search?q=team+leadership+skills",
  "Business Strategy": "https://www.google.com/search?q=business+strategy+course",
  "Financial Modeling": "https://www.google.com/search?q=financial+modelling+course",
  "Market Research": "https://www.google.com/search?q=market+research+course",
};

function getSkillLink(skill: string): string {
  if (skillResourceLinks[skill]) return skillResourceLinks[skill];
  return `https://www.google.com/search?q=${encodeURIComponent(skill + " course for beginners")}`;
}

function generateCareerSuggestions(data: CareerInputData): CareerSuggestion[] {
  const { subjects, interests, hobbies } = data;
  const suggestions: CareerSuggestion[] = [];

  // Tech + Math → Software Engineer / AI Engineer
  if (
    (interests.includes("Tech") && subjects.includes("Math")) ||
    (interests.includes("Tech") && subjects.includes("Computers")) ||
    hobbies.includes("Coding")
  ) {
    if (interests.includes("Research")) {
      suggestions.push({
        title: "AI Engineer",
        why: "Your passion for technology, mathematics, and research makes you a perfect fit for the cutting-edge field of AI engineering.",
        path: getPathForLevel(data.level),
        skills: ["Python", "Machine Learning", "Data Science", "Neural Networks"],
      });
    }
    suggestions.push({
      title: "Software Engineer",
      why: "Your interest in tech and math, combined with your coding hobby, aligns perfectly with software engineering.",
      path: getPathForLevel(data.level),
      skills: ["Programming", "Problem Solving", "Data Structures", "Algorithms"],
    });
  }

  // Design → UI/UX Designer / Graphic Designer
  if (
    interests.includes("Design") ||
    hobbies.includes("Drawing") ||
    subjects.includes("Arts")
  ) {
    if (interests.includes("Tech")) {
      suggestions.push({
        title: "UI/UX Designer",
        why: "Your combination of design interest and tech knowledge makes you ideal for creating user-friendly digital experiences.",
        path: getPathForLevel(data.level),
        skills: ["Design Thinking", "Figma", "User Research", "Prototyping"],
      });
    }
    suggestions.push({
      title: "Graphic Designer",
      why: "Your creative interests and artistic skills are perfect for visual communication and branding.",
      path: getPathForLevel(data.level),
      skills: ["Adobe Creative Suite", "Typography", "Color Theory", "Layout Design"],
    });
  }

  // Business + People → Business / Marketing / HR
  if (interests.includes("Business") && interests.includes("People")) {
    if (hobbies.includes("Speaking")) {
      suggestions.push({
        title: "Marketing Manager",
        why: "Your business acumen, people skills, and communication abilities are ideal for marketing and brand management.",
        path: getPathForLevel(data.level),
        skills: ["Digital Marketing", "Communication", "Analytics", "Strategy"],
      });
    }
    suggestions.push({
      title: "HR Manager",
      why: "Your interest in business and people makes you well-suited for human resources and talent management.",
      path: getPathForLevel(data.level),
      skills: ["People Management", "Recruitment", "Organizational Psychology", "Communication"],
    });
  } else if (interests.includes("Business")) {
    suggestions.push({
      title: "Business Analyst",
      why: "Your business interest combined with analytical thinking positions you well for business strategy and analysis.",
      path: getPathForLevel(data.level),
      skills: ["Data Analysis", "Business Strategy", "Financial Modeling", "Market Research"],
    });
  }

  // Science + Biology → Doctor / Biologist
  if (subjects.includes("Science") && subjects.includes("Biology")) {
    if (interests.includes("People")) {
      suggestions.push({
        title: "Doctor",
        why: "Your strong foundation in science and biology, combined with your interest in helping people, makes medicine an excellent fit.",
        path: getPathForLevel(data.level),
        skills: ["Biology", "Chemistry", "Critical Thinking", "Empathy"],
      });
    }
    suggestions.push({
      title: "Biomedical Researcher",
      why: "Your passion for science and biology, especially if combined with research interest, aligns with biomedical research.",
      path: getPathForLevel(data.level),
      skills: ["Research Methods", "Laboratory Skills", "Data Analysis", "Scientific Writing"],
    });
  }

  // Research → Researcher / Scientist
  if (interests.includes("Research") && suggestions.length === 0) {
    suggestions.push({
      title: "Research Scientist",
      why: "Your research interest and analytical mindset make you well-suited for scientific research and discovery.",
      path: getPathForLevel(data.level),
      skills: ["Research Methodology", "Data Analysis", "Critical Thinking", "Scientific Writing"],
    });
  }

  // Teaching → Teacher / Professor
  if (interests.includes("Teaching")) {
    suggestions.push({
      title: "Educator",
      why: "Your passion for teaching and sharing knowledge makes education a rewarding career path for you.",
      path: getPathForLevel(data.level),
      skills: ["Communication", "Pedagogy", "Subject Expertise", "Patience"],
    });
  }

  // Commerce → Business / Finance
  if (subjects.includes("Commerce") && interests.includes("Business")) {
    suggestions.push({
      title: "Financial Analyst",
      why: "Your commerce background and business interest position you well for finance and investment analysis.",
      path: getPathForLevel(data.level),
      skills: ["Financial Analysis", "Accounting", "Excel", "Market Analysis"],
    });
  }

  // Default suggestions if nothing matches
  if (suggestions.length === 0) {
    suggestions.push({
      title: "General Manager",
      why: "Your diverse interests and skills make you well-suited for management roles across various industries.",
      path: getPathForLevel(data.level),
      skills: ["Leadership", "Communication", "Problem Solving", "Strategic Thinking"],
    });
    suggestions.push({
      title: "Project Manager",
      why: "Your ability to balance multiple interests suggests you'd excel at coordinating and managing projects.",
      path: getPathForLevel(data.level),
      skills: ["Organization", "Communication", "Time Management", "Team Leadership"],
    });
  }

  return suggestions.slice(0, 4);
}

function getPathForLevel(level: string): string {
  switch (level) {
    case "10th":
      return "Complete 10th → Choose Science/Commerce/Arts in PUC → Pursue relevant degree → Specialize in your chosen field";
    case "PUC":
    case "PUC / 11-12":
      return "Complete PUC → Choose relevant degree program → Gain internships → Build portfolio → Enter workforce or pursue higher studies";
    case "Degree":
      return "Complete your degree → Gain industry experience through internships → Build specialized skills → Consider certifications → Advance in your career";
    case "Others":
      return "Assess your current skills → Identify learning gaps → Take relevant courses/certifications → Build portfolio → Network and apply for opportunities";
    default:
      return "Complete your current education → Gain relevant experience → Build skills → Network → Pursue opportunities in your field";
  }
}

function readStoredCareerInput(): CareerInputData | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedData = localStorage.getItem("careerInput");
  if (!storedData) {
    return null;
  }

  try {
    return JSON.parse(storedData) as CareerInputData;
  } catch {
    return null;
  }
}

export default function CareerResultPage() {
  const router = useRouter();
  const storedCareerInput = useMemo(() => readStoredCareerInput(), []);
  const suggestions = useMemo(() => {
    if (!storedCareerInput) {
      return [];
    }
    return generateCareerSuggestions(storedCareerInput);
  }, [storedCareerInput]);
  const hasData = Boolean(storedCareerInput);

  if (!hasData) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
          {/* 🔗 Navigation Links */}
          <div className="mb-4 flex justify-between text-xs text-slate-300">
            <Link href="/" className="underline hover:text-white">
              ⬅ Back to Home
            </Link>

            <div className="flex gap-4">
              <Link href="/career-input" className="underline hover:text-white">
                Career Quiz
              </Link>
              <Link href="/profile" className="underline hover:text-white">
                Profile
              </Link>
              <Link href="/auth" className="underline hover:text-white">
                Login / Sign up
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
            <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              No Career Data Found
            </h1>
            <p className="mb-6 text-slate-300">
              Please complete the career input form to get personalized recommendations.
            </p>
            <button
              onClick={() => router.push("/career-input")}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110"
            >
              Go to Career Input
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* 🔗 Navigation Links */}
        <div className="mb-4 flex justify-between text-xs text-slate-300">
          <Link href="/" className="underline hover:text-white">
            ⬅ Back to Home
          </Link>

          <div className="flex gap-4">
            <Link href="/career-input" className="underline hover:text-white">
              Career Quiz
            </Link>
            <Link href="/profile" className="underline hover:text-white">
              Profile
            </Link>
            <Link href="/auth" className="underline hover:text-white">
              Login / Sign up
            </Link>
          </div>
        </div>

        <div className="text-center">
          <h1 className="mb-3 text-4xl font-bold text-white sm:text-5xl">
            Your Career Recommendations
          </h1>
          <p className="text-lg text-slate-300">
            Based on your interests, subjects, and hobbies
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-400/60"
            >
              <h2 className="mb-3 text-2xl font-bold text-white">
                {suggestion.title}
              </h2>

              <div className="mb-4">
                <p className="mb-2 text-sm font-semibold text-emerald-300">
                  Why it fits you:
                </p>
                <p className="text-sm leading-relaxed text-slate-300">
                  {suggestion.why}
                </p>
              </div>

              <div className="mb-4">
                <p className="mb-2 text-sm font-semibold text-violet-300">
                  Path after your level:
                </p>
                <p className="text-sm leading-relaxed text-slate-300">
                  {suggestion.path}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-sky-300">
                  Skills to start (click to learn):
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestion.skills.map((skill) => (
                    <a
                      key={skill}
                      href={getSkillLink(skill)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 hover:border-emerald-400 hover:text-emerald-200 hover:bg-emerald-500/10 transition"
                    >
                      {skill}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced sections for each career */}
        {suggestions.map((suggestion, index) => {
          // Calculate skill gap
          const userSkillsMap: Record<string, string[]> = {
            Math: ["Problem Solving", "Data Analysis"],
            Science: ["Research Methods", "Data Analysis"],
            Biology: ["Biology", "Research Methods"],
            Commerce: ["Financial Analysis", "Accounting"],
            Computers: ["Programming", "Data Structures"],
            Tech: ["Programming", "Problem Solving"],
            Coding: ["Programming", "Data Structures"],
          };
          const userSkillsSet = new Set<string>();
          storedCareerInput?.subjects.forEach((s) => {
            (userSkillsMap[s] || []).forEach((sk) => userSkillsSet.add(sk));
          });
          storedCareerInput?.interests.forEach((i) => {
            (userSkillsMap[i] || []).forEach((sk) => userSkillsSet.add(sk));
          });
          storedCareerInput?.hobbies.forEach((h) => {
            (userSkillsMap[h] || []).forEach((sk) => userSkillsSet.add(sk));
          });
          
          const skillsUserHas = suggestion.skills.filter((s) => userSkillsSet.has(s));
          const skillsToLearn = suggestion.skills.filter((s) => !userSkillsSet.has(s));
          
          // Generate roadmap
          const getRoadmap = (title: string, level: string) => {
            if (title.includes("Software") || title.includes("AI")) {
              return {
                stream: "Science (with Computer Science)",
                ugPath: "B.E./B.Tech in Computer Science",
                pgOptions: ["M.Tech in CS", "MS in Software Engineering"],
                timeline: "10th → 12th (PCM) → B.Tech → M.Tech/MS → Job",
              };
            } else if (title.includes("Design")) {
              return {
                stream: "Arts or Science",
                ugPath: "B.Des in UI/UX or B.Tech + Design courses",
                pgOptions: ["M.Des in Interaction Design"],
                timeline: "10th → 12th (Any) → B.Des/B.Tech → M.Des → Job",
              };
            } else if (title.includes("Marketing") || title.includes("Business")) {
              return {
                stream: "Commerce or Arts",
                ugPath: "BBA in Marketing or BA",
                pgOptions: ["MBA in Marketing"],
                timeline: "10th → 12th (Commerce/Arts) → BBA/BA → MBA → Job",
              };
            }
            return {
              stream: "Based on career",
              ugPath: "Relevant degree",
              pgOptions: ["Relevant PG"],
              timeline: "10th → 12th → UG → PG → Job",
            };
          };
          const roadmap = getRoadmap(suggestion.title, storedCareerInput?.level || "");
          
          return (
            <div key={`enhanced-${index}`} className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
              <h2 className="mb-6 text-2xl font-bold text-white">{suggestion.title} - Detailed Analysis</h2>
              
              {/* Full Career Roadmap */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-emerald-300">📋 Full Career Roadmap</h3>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                  <p><span className="font-semibold text-violet-300">Suggested Stream:</span> <span className="text-slate-300">{roadmap.stream}</span></p>
                  <p><span className="font-semibold text-violet-300">UG Path:</span> <span className="text-slate-300">{roadmap.ugPath}</span></p>
                  <p><span className="font-semibold text-violet-300">PG Options:</span> <span className="text-slate-300">{roadmap.pgOptions.join(", ")}</span></p>
                  <p><span className="font-semibold text-violet-300">Timeline:</span> <span className="text-slate-300">{roadmap.timeline}</span></p>
                </div>
              </div>

              {/* Skill Gap Analysis */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-sky-300">🔍 Skill Gap Analysis</h3>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                  {skillsUserHas.length > 0 && (
                    <div>
                      <p className="mb-2 font-semibold text-emerald-300">✅ You already have:</p>
                      <div className="flex flex-wrap gap-2">
                        {skillsUserHas.map((skill) => (
                          <span key={skill} className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300 border border-emerald-400/40">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {skillsToLearn.length > 0 && (
                    <div>
                      <p className="mb-2 font-semibold text-rose-300">📚 You need to learn:</p>
                      <div className="flex flex-wrap gap-2">
                        {skillsToLearn.map((skill) => (
                          <span key={skill} className="rounded-full bg-rose-500/20 px-3 py-1 text-xs text-rose-300 border border-rose-400/40">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Learning Links */}
              {skillsToLearn.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-purple-300">🎓 Learn Missing Skills</h3>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                    {skillsToLearn.slice(0, 3).map((skill) => {
                      const encoded = encodeURIComponent(skill);
                      const links = {
                        nptel: `https://nptel.ac.in/courses/search?q=${encoded}`,
                        youtube: `https://www.youtube.com/results?search_query=${encoded}+course`,
                        coursera: `https://www.coursera.org/search?query=${encoded}`,
                        udemy: `https://www.udemy.com/courses/search/?q=${encoded}`,
                      };
                      return (
                        <div key={skill} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                          <p className="mb-2 font-semibold text-white">{skill}</p>
                          <div className="flex flex-wrap gap-2">
                            <a href={links.nptel} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 hover:bg-emerald-500/20 hover:border-emerald-400/40 hover:text-emerald-300 transition">
                              NPTEL
                            </a>
                            <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 hover:bg-emerald-500/20 hover:border-emerald-400/40 hover:text-emerald-300 transition">
                              YouTube
                            </a>
                            <a href={links.coursera} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 hover:bg-emerald-500/20 hover:border-emerald-400/40 hover:text-emerald-300 transition">
                              Coursera
                            </a>
                            <a href={links.udemy} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 hover:bg-emerald-500/20 hover:border-emerald-400/40 hover:text-emerald-300 transition">
                              Udemy
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Startup Idea Generator */}
        {storedCareerInput && (() => {
          const { interests, hobbies } = storedCareerInput;
          let startupIdea = {
            idea: "Personalized Learning Platform",
            whySuitable: "Your diverse interests make you ideal for building a platform that offers personalized learning paths.",
            requiredSkills: ["Product Development", "Marketing", "Technology"],
            roadmap: {
              "Month 1-2": "Identify niche, build MVP with basic courses",
              "Month 3-4": "Launch beta, acquire initial learners, iterate",
              "Month 5-6": "Expand course library, implement monetization, scale marketing",
            },
            monetization: "Course sales ($19-99 per course), subscription model ($29-79/month)",
          };
          
          if (interests.includes("Tech") || hobbies.includes("Coding")) {
            if (interests.includes("Business")) {
              startupIdea = {
                idea: "EdTech Platform for Coding Bootcamps",
                whySuitable: "Your tech skills combined with business interest make you ideal for building an educational tech startup.",
                requiredSkills: ["Programming", "Business Strategy", "Marketing"],
                roadmap: {
                  "Month 1-2": "Validate idea, build MVP with basic features",
                  "Month 3-4": "Launch beta, get initial users, gather feedback",
                  "Month 5-6": "Scale platform, add advanced features, monetize",
                },
                monetization: "Subscription model ($29-99/month), corporate training programs",
              };
            }
          } else if (interests.includes("Design") && interests.includes("Business")) {
            startupIdea = {
              idea: "Custom Design Marketplace for Small Businesses",
              whySuitable: "Your design skills and business acumen make you perfect for connecting designers with businesses.",
              requiredSkills: ["Design Thinking", "Digital Marketing", "Business Development"],
              roadmap: {
                "Month 1-2": "Build platform MVP, onboard initial designers",
                "Month 3-4": "Launch marketplace, acquire first business customers",
                "Month 5-6": "Scale both sides, implement payment system, build brand",
              },
              monetization: "Commission (15-20% per project), subscription for businesses ($49-199/month)",
            };
          }

          return (
            <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 shadow-xl">
              <h2 className="mb-4 text-2xl font-bold text-white">🚀 Startup Idea Generator</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-purple-300">Startup Idea:</h3>
                  <p className="text-lg font-bold text-white">{startupIdea.idea}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-emerald-300">Why it's suitable:</h3>
                  <p className="text-slate-300">{startupIdea.whySuitable}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-sky-300">Required Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {startupIdea.requiredSkills.map((skill) => (
                      <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300 border border-white/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-violet-300">6-Month Roadmap:</h3>
                  <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-300"><span className="font-semibold">Month 1-2:</span> {startupIdea.roadmap["Month 1-2"]}</p>
                    <p className="text-sm text-slate-300"><span className="font-semibold">Month 3-4:</span> {startupIdea.roadmap["Month 3-4"]}</p>
                    <p className="text-sm text-slate-300"><span className="font-semibold">Month 5-6:</span> {startupIdea.roadmap["Month 5-6"]}</p>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-rose-300">Monetization Idea:</h3>
                  <p className="text-slate-300">{startupIdea.monetization}</p>
                </div>
              </div>
            </div>
          );
        })()}

        <div className="mt-6 flex gap-3">
          <Link
            href="/career-input"
            className="rounded-full border border-slate-600 px-4 py-2 text-sm hover:bg-slate-800"
          >
            Edit my answers
          </Link>
          <button
            onClick={async () => {
              try {
                const response = await fetch("/api/profile/save-career-report", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    suggestions,
                    missingSkills: suggestions.flatMap((s) => {
                      const userSkillsMap: Record<string, string[]> = {
                        Math: ["Problem Solving"], Tech: ["Programming"], Coding: ["Programming"],
                      };
                      const userSkillsSet = new Set<string>();
                      storedCareerInput?.subjects.forEach((sub) => {
                        (userSkillsMap[sub] || []).forEach((sk) => userSkillsSet.add(sk));
                      });
                      return s.skills.filter((sk) => !userSkillsSet.has(sk));
                    }),
                  }),
                });
                if (response.ok) {
                  alert("Report saved successfully!");
                }
              } catch (error) {
                console.error("Failed to save report:", error);
              }
            }}
            className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600"
          >
            Save report to profile
          </button>
        </div>
      </div>
    </main>
  );
}
