"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

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

        <div className="mt-6 flex gap-3">
          <Link
            href="/career-input"
            className="rounded-full border border-slate-600 px-4 py-2 text-sm hover:bg-slate-800"
          >
            Edit my answers
          </Link>
          <Link
            href="/profile"
            className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600"
          >
            Save in my profile
          </Link>
        </div>
      </div>
    </main>
  );
}
