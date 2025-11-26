"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";

type Roadmap = {
  shortTerm: string[];
  midTerm: string[];
  longTerm: string[];
};

interface Course {
  title: string;
  platform: string;
  link: string;
  note?: string;
}

interface ResumeAnalysisResult {
  careerTitle: string;
  fitReason: string;
  requiredSkills: string[];
  detectedSkills: string[];
  missingSkills: string[];
  roadmap: Roadmap;
  courseRecommendations: Course[];
}

// Simple keyword → skill mapping
const SKILL_KEYWORDS: Record<string, string[]> = {
  Python: ["python"],
  "Machine Learning": ["machine learning", "ml", "scikit-learn"],
  "Data Science": ["data science", "data scientist", "pandas", "numpy"],
  SQL: ["sql", "mysql", "postgresql", "postgres"],
  "Statistics": ["statistics", "probability", "statistical"],
  "HTML": ["html"],
  "CSS": ["css"],
  JavaScript: ["javascript", "js", "react", "next.js", "node.js"],
  "React": ["react", "next.js"],
  "UI/UX Design": ["ui/ux", "ux", "ui", "wireframe", "prototype", "user research"],
  "Figma": ["figma"],
  "Java": ["java"],
  "C Programming": [" c ", "c programmer", "c programming"],
  "Communication": ["communication", "presentation", "public speaking"],
  "Leadership": ["leader", "lead", "team lead", "leadership"],
};

// Career “templates” we will choose from based on detected skills
const CAREER_TEMPLATES: {
  title: string;
  matchSkills: string[];
  requiredSkills: string[];
  fitReason: string;
  roadmap: Roadmap;
}[] = [
  {
    title: "ML / Data Science Engineer",
    matchSkills: ["Python", "Machine Learning", "Data Science"],
    requiredSkills: ["Python", "Machine Learning", "Data Science", "SQL", "Statistics"],
    fitReason:
      "Your resume mentions Python and data-related tools, which are a strong base for a career in Machine Learning / Data Science.",
    roadmap: {
      shortTerm: [
        "Strengthen Python fundamentals (functions, OOP, libraries).",
        "Learn basic statistics and probability.",
        "Complete an introductory data analysis course.",
      ],
      midTerm: [
        "Build 2–3 ML projects (classification, regression).",
        "Learn SQL and practice querying real datasets.",
        "Explore data visualization tools (Matplotlib / Power BI / Tableau).",
      ],
      longTerm: [
        "Create a strong ML/Data Science portfolio on GitHub.",
        "Apply for internships / junior data roles.",
        "Learn advanced ML topics (NLP, deep learning) as you grow.",
      ],
    },
  },
  {
    title: "Frontend Web Developer",
    matchSkills: ["HTML", "CSS", "JavaScript", "React"],
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Git"],
    fitReason:
      "Your resume shows web technologies like HTML, CSS, JavaScript or React, which fit very well with a frontend developer role.",
    roadmap: {
      shortTerm: [
        "Master HTML & CSS basics (layouts, flexbox, grid).",
        "Finish a beginner JavaScript course.",
        "Build 1 simple static website (portfolio / landing page).",
      ],
      midTerm: [
        "Learn React fundamentals (components, props, state).",
        "Recreate 2–3 real websites using React.",
        "Learn Git & GitHub to manage your projects.",
      ],
      longTerm: [
        "Build a polished portfolio website with multiple projects.",
        "Apply for frontend internships / junior developer roles.",
        "Learn Next.js and TypeScript for advanced roles.",
      ],
    },
  },
  {
    title: "UI/UX Designer",
    matchSkills: ["UI/UX Design", "Figma"],
    requiredSkills: ["UI/UX Design", "Figma", "User Research", "Prototyping", "Communication"],
    fitReason:
      "Your resume includes design and UX-related keywords, which are ideal for a UI/UX design career.",
    roadmap: {
      shortTerm: [
        "Learn UI/UX basics (good vs bad design, design principles).",
        "Learn Figma and practice simple UI screens.",
        "Redesign a basic app or website as practice.",
      ],
      midTerm: [
        "Create 2–3 full app/web design case studies.",
        "Study user research basics (surveys, interviews).",
        "Learn about prototyping and user testing.",
      ],
      longTerm: [
        "Build a strong design portfolio on Behance/Dribbble.",
        "Apply for design internships / freelance gigs.",
        "Collaborate with developers to see your designs go live.",
      ],
    },
  },
  {
    title: "General Tech Career Explorer",
    matchSkills: [],
    requiredSkills: ["Programming", "Problem Solving", "Communication"],
    fitReason:
      "Your resume contains general academic/tech content but not enough clear skill keywords, so this path gives you a broad starting direction.",
    roadmap: {
      shortTerm: [
        "Pick one programming language (Python or JavaScript) and learn the basics.",
        "Solve simple coding problems daily.",
        "Improve general communication and presentation skills.",
      ],
      midTerm: [
        "Build 1–2 small projects in your chosen language.",
        "Join online communities / hackathons.",
        "Explore different domains like web dev, data, or app dev.",
      ],
      longTerm: [
        "Choose one domain to go deep (web, data, app).",
        "Create a small but focused portfolio.",
        "Apply for internships / entry-level roles in that domain.",
      ],
    },
  },
];

// Very simple mapping: skill → some useful courses/resources
const COURSE_RESOURCES: Record<string, Course[]> = {
  Python: [
    {
      title: "Python for Everybody",
      platform: "Coursera",
      link: "https://www.google.com/search?q=python+for+everybody+coursera",
      note: "Beginner-friendly Python course.",
    },
    {
      title: "NPTEL – Programming, Data Structures and Algorithms using Python",
      platform: "NPTEL",
      link: "https://www.google.com/search?q=nptel+python+course",
    },
  ],
  "Machine Learning": [
    {
      title: "NPTEL – Introduction to Machine Learning",
      platform: "NPTEL",
      link: "https://www.google.com/search?q=nptel+introduction+to+machine+learning",
    },
    {
      title: "Machine Learning Crash Course",
      platform: "Google / YouTube",
      link: "https://www.google.com/search?q=google+machine+learning+crash+course",
    },
  ],
  "Data Science": [
    {
      title: "IBM Data Science Professional Certificate",
      platform: "Coursera",
      link: "https://www.google.com/search?q=ibm+data+science+professional+certificate",
    },
  ],
  SQL: [
    {
      title: "SQL for Data Science",
      platform: "Coursera",
      link: "https://www.google.com/search?q=sql+for+data+science+coursera",
    },
  ],
  Statistics: [
    {
      title: "NPTEL – Probability and Statistics",
      platform: "NPTEL",
      link: "https://www.google.com/search?q=nptel+probability+and+statistics",
    },
  ],
  HTML: [
    {
      title: "HTML Full Course",
      platform: "YouTube",
      link: "https://www.google.com/search?q=html+full+course+youtube",
    },
  ],
  CSS: [
    {
      title: "Modern CSS Course",
      platform: "YouTube / Udemy",
      link: "https://www.google.com/search?q=css+course+for+beginners",
    },
  ],
  JavaScript: [
    {
      title: "JavaScript for Beginners",
      platform: "FreeCodeCamp / YouTube",
      link: "https://www.google.com/search?q=javascript+for+beginners+course",
    },
  ],
  React: [
    {
      title: "React – The Complete Guide",
      platform: "Udemy",
      link: "https://www.google.com/search?q=react+the+complete+guide+udemy",
    },
  ],
  "UI/UX Design": [
    {
      title: "UI/UX Design Specialization",
      platform: "Coursera",
      link: "https://www.google.com/search?q=ui+ux+design+course+coursera",
    },
  ],
  Figma: [
    {
      title: "Figma UI Design Tutorial",
      platform: "YouTube",
      link: "https://www.google.com/search?q=figma+ui+design+tutorial",
    },
  ],
  Communication: [
    {
      title: "Improve Your Communication Skills",
      platform: "Coursera / YouTube",
      link: "https://www.google.com/search?q=improve+communication+skills+course",
    },
  ],
  Leadership: [
    {
      title: "Leadership Skills Development",
      platform: "Coursera / edX",
      link: "https://www.google.com/search?q=leadership+skills+course",
    },
  ],
};

// ---- Helper functions ----

function detectSkillsFromText(rawText: string): string[] {
  const text = rawText.toLowerCase();
  const detected = new Set<string>();

  Object.entries(SKILL_KEYWORDS).forEach(([skill, keywords]) => {
    if (keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      detected.add(skill);
    }
  });

  return Array.from(detected);
}

function chooseBestCareer(detectedSkills: string[]): {
  title: string;
  requiredSkills: string[];
  fitReason: string;
  roadmap: Roadmap;
} {
  // Try to find template with most matching skills
  let bestTemplate = CAREER_TEMPLATES[CAREER_TEMPLATES.length - 1]; // default general
  let bestScore = -1;

  for (const template of CAREER_TEMPLATES) {
    const score = template.matchSkills.filter((s) => detectedSkills.includes(s)).length;
    if (score > bestScore) {
      bestScore = score;
      bestTemplate = template;
    }
  }

  return {
    title: bestTemplate.title,
    requiredSkills: bestTemplate.requiredSkills,
    fitReason: bestTemplate.fitReason,
    roadmap: bestTemplate.roadmap,
  };
}

function buildCourseList(missingSkills: string[]): Course[] {
  const courses: Course[] = [];

  missingSkills.forEach((skill) => {
    const skillCourses = COURSE_RESOURCES[skill];
    if (skillCourses) {
      skillCourses.forEach((c) => {
        // Avoid duplicates by title + platform
        if (!courses.some((x) => x.title === c.title && x.platform === c.platform)) {
          courses.push(c);
        }
      });
    }
  });

  return courses;
}

// ---- Page component ----

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "analyzing" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
    setResult(null);
    setError("");
  };

  const handleAnalyze = async (event: FormEvent) => {
    event.preventDefault();

    if (!file) {
      setError("Please upload your resume file first.");
      setStatus("error");
      return;
    }

    try {
      setStatus("analyzing");
      setError("");
      setResult(null);

      // NOTE: This reads the file as plain text.
      // For PDFs this may not be perfect but often still contains readable text.
      const text = await file.text();

      const detectedSkills = detectSkillsFromText(text);
      const { title, requiredSkills, fitReason, roadmap } =
        chooseBestCareer(detectedSkills);

      const missingSkills = requiredSkills.filter(
        (skill) => !detectedSkills.includes(skill)
      );

      const courseRecommendations = buildCourseList(missingSkills);

      const analysis: ResumeAnalysisResult = {
        careerTitle: title,
        fitReason,
        requiredSkills,
        detectedSkills,
        missingSkills,
        roadmap,
        courseRecommendations,
      };

      setResult(analysis);
      setStatus("idle");
    } catch (err) {
      console.error("Resume analysis failed:", err);
      setError("Something went wrong while reading your resume. Try a different file or format.");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
              New feature
            </p>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">
              Resume-based Career Suggestions
            </h1>
            <p className="text-sm text-slate-300">
              Upload your resume and we&apos;ll detect your skills, suggest a career,
              show missing skills and give you learning resources.
            </p>
          </div>
          <Link
            href="/career-input"
            className="rounded-full border border-slate-500/60 px-4 py-2 text-sm text-slate-200 transition hover:border-white hover:text-white"
          >
            Use Career Quiz →
          </Link>
        </div>

        {/* Form */}
        <form
          onSubmit={handleAnalyze}
          className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl"
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-200">
              Upload your resume
            </label>
            <p className="text-xs text-slate-400">
              Preferably PDF or text format. We&apos;ll scan the text for skills, tools and technologies.
            </p>
            <input
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full rounded-2xl border border-slate-600/60 bg-slate-900/60 p-2 text-sm text-slate-100 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-500/90 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-slate-950 hover:file:bg-emerald-400/90"
            />
          </div>

          <button
            type="submit"
            disabled={!file || status === "analyzing"}
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-900/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "analyzing" ? "Analyzing your resume..." : "Analyze Resume & Suggest Career"}
          </button>

          {status === "error" && error && (
            <p className="text-sm text-rose-400">{error}</p>
          )}
        </form>

        {/* Results */}
        {result && (
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Career + Roadmap */}
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">
                Suggested Career: <span className="text-emerald-300">{result.careerTitle}</span>
              </h2>
              <p className="text-sm text-slate-200">{result.fitReason}</p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Short term (0–3 months)
                  </h3>
                  <ul className="mt-2 space-y-1 text-xs text-slate-200">
                    {result.roadmap.shortTerm.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Mid term (3–12 months)
                  </h3>
                  <ul className="mt-2 space-y-1 text-xs text-slate-200">
                    {result.roadmap.midTerm.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Long term (&gt; 1 year)
                  </h3>
                  <ul className="mt-2 space-y-1 text-xs text-slate-200">
                    {result.roadmap.longTerm.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Skill gap + courses */}
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Skill Gap Analysis
              </h2>

              <div className="grid gap-3 text-xs text-slate-200 sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-slate-100">Skills detected in your resume</p>
                  {result.detectedSkills.length > 0 ? (
                    <ul className="mt-1 flex flex-wrap gap-1">
                      {result.detectedSkills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] text-emerald-200"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-slate-400">
                      No clear technical skills detected. Try adding more detailed skills in your resume.
                    </p>
                  )}
                </div>

                <div>
                  <p className="font-semibold text-slate-100">Skills you need to add</p>
                  {result.missingSkills.length > 0 ? (
                    <ul className="mt-1 flex flex-wrap gap-1">
                      {result.missingSkills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full bg-rose-500/20 px-2 py-1 text-[10px] text-rose-200"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-emerald-300">
                      Great! You already have most of the key skills for this career.
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Recommended courses & resources
                </h3>
                {result.courseRecommendations.length === 0 ? (
                  <p className="text-xs text-slate-400">
                    No specific courses found for the missing skills, but you can still search them on NPTEL, Coursera or YouTube.
                  </p>
                ) : (
                  <ul className="space-y-2 text-xs text-slate-200">
                    {result.courseRecommendations.map((course, index) => (
                      <li key={index} className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-2">
                        <p className="font-semibold">
                          {course.title}{" "}
                          <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                            • {course.platform}
                          </span>
                        </p>
                        {course.note && (
                          <p className="text-[11px] text-slate-400">{course.note}</p>
                        )}
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-flex text-[11px] text-sky-300 underline hover:text-sky-200"
                        >
                          Open resource ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
