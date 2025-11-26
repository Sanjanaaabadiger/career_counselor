export interface CareerInputData {
  level: string;
  marks: string;
  subjects: string[];
  interests: string[];
  hobbies: string[];
}

export interface CareerSuggestion {
  title: string;
  why: string;
  path: string;
  skills: string[];
  roadmap?: CareerRoadmap;
  skillGap?: SkillGap;
}

export interface CareerRoadmap {
  stream: string;
  ugPath: string;
  pgOptions: string[];
  idealJobRoles: string[];
  timeline: {
    "10th": string;
    "12th": string;
    "UG": string;
    "PG": string;
    "Job": string;
  };
}

export interface SkillGap {
  skillsUserHas: string[];
  skillsToLearn: string[];
  totalRequired: number;
  alreadyHave: number;
  needToLearn: number;
}

export interface StartupIdea {
  idea: string;
  whySuitable: string;
  requiredSkills: string[];
  roadmap: {
    "Month 1-2": string;
    "Month 3-4": string;
    "Month 5-6": string;
  };
  monetization: string;
}

