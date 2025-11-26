import { CareerInputData, CareerSuggestion, CareerRoadmap, SkillGap, StartupIdea } from "./types";

// Map skills to their learning resources
export function getSkillLearningLinks(skill: string) {
  const encoded = encodeURIComponent(skill);
  return {
    nptel: `https://nptel.ac.in/courses/search?q=${encoded}`,
    youtube: `https://www.youtube.com/results?search_query=${encoded}+course+for+beginners`,
    coursera: `https://www.coursera.org/search?query=${encoded}`,
    udemy: `https://www.udemy.com/courses/search/?q=${encoded}`,
  };
}

// Generate skill gap analysis
export function analyzeSkillGap(userData: CareerInputData, requiredSkills: string[]): SkillGap {
  // Map user's inputs to potential skills they might already have
  const userSkillsMap: Record<string, string[]> = {
    Math: ["Problem Solving", "Data Analysis", "Algorithms"],
    Science: ["Research Methods", "Data Analysis", "Critical Thinking"],
    Biology: ["Biology", "Research Methods", "Laboratory Skills"],
    Commerce: ["Financial Analysis", "Accounting", "Market Analysis"],
    Arts: ["Design Thinking", "Typography", "Color Theory"],
    Computers: ["Programming", "Data Structures", "Algorithms"],
    Tech: ["Programming", "Problem Solving", "Data Structures"],
    Design: ["Design Thinking", "Typography", "Color Theory"],
    Business: ["Business Strategy", "Market Research", "Leadership"],
    Research: ["Research Methods", "Data Analysis", "Critical Thinking"],
    Coding: ["Programming", "Data Structures", "Algorithms"],
    Drawing: ["Design Thinking", "Color Theory", "Layout Design"],
  };

  const userSkillsSet = new Set<string>();
  
  // Add skills based on subjects
  userData.subjects.forEach((subject) => {
    const skills = userSkillsMap[subject] || [];
    skills.forEach((skill) => userSkillsSet.add(skill));
  });
  
  // Add skills based on interests
  userData.interests.forEach((interest) => {
    const skills = userSkillsMap[interest] || [];
    skills.forEach((skill) => userSkillsSet.add(skill));
  });
  
  // Add skills based on hobbies
  userData.hobbies.forEach((hobby) => {
    const skills = userSkillsMap[hobby] || [];
    skills.forEach((skill) => userSkillsSet.add(skill));
  });

  const userSkills = Array.from(userSkillsSet);
  const requiredSkillsSet = new Set(requiredSkills);
  
  const skillsUserHas = requiredSkills.filter((skill) => userSkillsSet.has(skill));
  const skillsToLearn = requiredSkills.filter((skill) => !userSkillsSet.has(skill));

  return {
    skillsUserHas,
    skillsToLearn,
    totalRequired: requiredSkills.length,
    alreadyHave: skillsUserHas.length,
    needToLearn: skillsToLearn.length,
  };
}

// Generate full career roadmap
export function generateCareerRoadmap(careerTitle: string, level: string): CareerRoadmap {
  const roadmaps: Record<string, CareerRoadmap> = {
    "Software Engineer": {
      stream: "Science (with Computer Science)",
      ugPath: "B.E./B.Tech in Computer Science or IT",
      pgOptions: ["M.Tech in Computer Science", "MS in Software Engineering", "MBA (optional)"],
      idealJobRoles: ["Software Developer", "Full Stack Engineer", "Backend Developer", "Frontend Developer", "DevOps Engineer"],
      timeline: {
        "10th": "Focus on Mathematics, Science. Score well in board exams.",
        "12th": "Choose Science stream with PCM. Prepare for engineering entrance exams (JEE, CET).",
        "UG": "Complete B.E./B.Tech. Learn programming languages, build projects, do internships.",
        "PG": "Optional: Pursue M.Tech or MS. Gain specialization. Or join industry directly.",
        "Job": "Start as Software Engineer → Senior Engineer → Tech Lead → Engineering Manager",
      },
    },
    "AI Engineer": {
      stream: "Science (with Mathematics)",
      ugPath: "B.E./B.Tech in Computer Science or Data Science",
      pgOptions: ["M.Tech in AI/ML", "MS in Artificial Intelligence", "PhD (for research)"],
      idealJobRoles: ["AI Engineer", "ML Engineer", "Data Scientist", "Research Scientist", "AI Consultant"],
      timeline: {
        "10th": "Strong foundation in Mathematics and Science.",
        "12th": "Science stream with PCM. Excellent math scores.",
        "UG": "B.Tech in CS/DS. Learn Python, Statistics, ML basics. Build AI projects.",
        "PG": "M.Tech/MS in AI/ML. Research papers. Internships at AI companies.",
        "Job": "AI Engineer → Senior AI Engineer → Principal AI Engineer → AI Architect",
      },
    },
    "UI/UX Designer": {
      stream: "Arts or Science",
      ugPath: "B.Des in UI/UX or B.E./B.Tech + Design courses",
      pgOptions: ["M.Des in Interaction Design", "MS in Human-Computer Interaction"],
      idealJobRoles: ["UI Designer", "UX Designer", "Product Designer", "Design Lead", "UX Researcher"],
      timeline: {
        "10th": "Develop creative and analytical thinking.",
        "12th": "Any stream. Build portfolio with design projects.",
        "UG": "B.Des or B.Tech + design courses. Master Figma, learn user research.",
        "PG": "Optional: M.Des in Interaction Design. Build strong portfolio.",
        "Job": "Junior Designer → Designer → Senior Designer → Design Lead",
      },
    },
    "Graphic Designer": {
      stream: "Arts",
      ugPath: "B.F.A. (Bachelor of Fine Arts) or B.Des in Graphic Design",
      pgOptions: ["M.F.A. in Graphic Design", "M.Des in Visual Communication"],
      idealJobRoles: ["Graphic Designer", "Visual Designer", "Brand Designer", "Creative Director"],
      timeline: {
        "10th": "Focus on arts and creative subjects.",
        "12th": "Arts stream. Build basic design skills and portfolio.",
        "UG": "B.F.A. or B.Des. Master Adobe Creative Suite. Build portfolio.",
        "PG": "Optional: M.F.A. or M.Des. Gain specialization.",
        "Job": "Junior Graphic Designer → Graphic Designer → Senior Designer → Creative Director",
      },
    },
    "Marketing Manager": {
      stream: "Commerce or Arts",
      ugPath: "BBA in Marketing or BA in Marketing/Business",
      pgOptions: ["MBA in Marketing", "M.Com with Marketing specialization"],
      idealJobRoles: ["Marketing Executive", "Marketing Manager", "Brand Manager", "Marketing Director"],
      timeline: {
        "10th": "Develop communication and analytical skills.",
        "12th": "Commerce or Arts. Participate in marketing events.",
        "UG": "BBA/BA in Marketing. Learn digital marketing. Do internships.",
        "PG": "MBA in Marketing. Gain industry exposure. Build network.",
        "Job": "Marketing Executive → Marketing Manager → Senior Manager → Marketing Director",
      },
    },
    "HR Manager": {
      stream: "Commerce or Arts",
      ugPath: "BBA in HR or BA in Psychology/Human Resources",
      pgOptions: ["MBA in HR", "MA in Organizational Psychology"],
      idealJobRoles: ["HR Executive", "HR Manager", "Talent Acquisition Manager", "HR Director"],
      timeline: {
        "10th": "Develop people skills and communication.",
        "12th": "Commerce or Arts. Psychology is helpful.",
        "UG": "BBA/BA in HR or Psychology. Learn recruitment processes.",
        "PG": "MBA in HR. Gain industry experience through internships.",
        "Job": "HR Executive → HR Manager → Senior HR Manager → HR Director",
      },
    },
    "Business Analyst": {
      stream: "Commerce or Science",
      ugPath: "BBA or B.Com or B.E./B.Tech",
      pgOptions: ["MBA", "MS in Business Analytics"],
      idealJobRoles: ["Business Analyst", "Data Analyst", "Business Consultant", "Product Manager"],
      timeline: {
        "10th": "Strong analytical and problem-solving skills.",
        "12th": "Commerce or Science. Develop Excel and analytical skills.",
        "UG": "BBA/B.Com/B.Tech. Learn data analysis tools. Do internships.",
        "PG": "MBA or MS in Business Analytics. Gain domain expertise.",
        "Job": "Junior Business Analyst → Business Analyst → Senior Analyst → Principal Analyst",
      },
    },
    "Doctor": {
      stream: "Science (with Biology)",
      ugPath: "MBBS (Bachelor of Medicine and Bachelor of Surgery)",
      pgOptions: ["MD/MS (Specialization)", "DM/MCh (Super-specialization)"],
      idealJobRoles: ["General Practitioner", "Specialist Doctor", "Surgeon", "Medical Researcher"],
      timeline: {
        "10th": "Excellent scores in Science, especially Biology and Chemistry.",
        "12th": "Science with PCB. Prepare for NEET. High scores required.",
        "UG": "MBBS (5.5 years). Clinical rotations. Complete internship.",
        "PG": "MD/MS (3 years) for specialization. Or start practice after MBBS.",
        "Job": "Junior Doctor → Resident Doctor → Specialist → Senior Consultant",
      },
    },
    "Biomedical Researcher": {
      stream: "Science (with Biology)",
      ugPath: "B.Sc in Biology/Biotechnology or B.E. in Biomedical Engineering",
      pgOptions: ["M.Sc in Biomedical Sciences", "PhD in Biomedical Research"],
      idealJobRoles: ["Research Scientist", "Biomedical Engineer", "Research Associate", "Lab Manager"],
      timeline: {
        "10th": "Strong interest in Biology and Chemistry.",
        "12th": "Science with PCB. Prepare for entrance exams.",
        "UG": "B.Sc/B.E. in Biomedical. Learn lab techniques. Do research internships.",
        "PG": "M.Sc in Biomedical. Pursue PhD for advanced research.",
        "Job": "Research Associate → Research Scientist → Senior Scientist → Principal Researcher",
      },
    },
    "Educator": {
      stream: "Any (based on subject)",
      ugPath: "BA/B.Sc/B.Com + B.Ed",
      pgOptions: ["MA/M.Sc/M.Com", "M.Ed", "PhD (for higher education)"],
      idealJobRoles: ["School Teacher", "College Professor", "Educational Consultant", "Curriculum Developer"],
      timeline: {
        "10th": "Strong grasp of subjects you want to teach.",
        "12th": "Choose stream based on teaching subject. High scores.",
        "UG": "BA/B.Sc/B.Com in chosen subject. Develop communication skills.",
        "PG": "B.Ed + MA/M.Sc. Gain teaching certification.",
        "Job": "Assistant Teacher → Teacher → Senior Teacher → Principal/Professor",
      },
    },
    "Financial Analyst": {
      stream: "Commerce",
      ugPath: "B.Com or BBA in Finance",
      pgOptions: ["MBA in Finance", "M.Com", "CFA certification"],
      idealJobRoles: ["Financial Analyst", "Investment Analyst", "Financial Consultant", "Finance Manager"],
      timeline: {
        "10th": "Strong mathematical and analytical abilities.",
        "12th": "Commerce stream. Excellent scores in Accounts and Mathematics.",
        "UG": "B.Com/BBA in Finance. Learn Excel, accounting software.",
        "PG": "MBA in Finance or M.Com. Pursue CFA certification.",
        "Job": "Junior Financial Analyst → Financial Analyst → Senior Analyst → Finance Manager",
      },
    },
  };

  return (
    roadmaps[careerTitle] || {
      stream: "Based on career choice",
      ugPath: "Relevant undergraduate degree",
      pgOptions: ["Relevant postgraduate degree"],
      idealJobRoles: ["Entry-level role", "Mid-level role", "Senior role"],
      timeline: {
        "10th": "Focus on core subjects",
        "12th": "Choose relevant stream",
        "UG": "Complete degree",
        "PG": "Optional postgraduate",
        "Job": "Start career",
      },
    }
  );
}

// Generate startup idea
export function generateStartupIdea(userData: CareerInputData): StartupIdea {
  const { interests, hobbies, subjects } = userData;
  
  const startupIdeas: StartupIdea[] = [];

  // Tech + Coding
  if (interests.includes("Tech") || hobbies.includes("Coding")) {
    if (interests.includes("Business")) {
      startupIdeas.push({
        idea: "EdTech Platform for Coding Bootcamps",
        whySuitable: "Your tech skills combined with business interest make you ideal for building an educational tech startup that solves the coding skill gap.",
        requiredSkills: ["Programming", "Business Strategy", "Marketing", "Product Development"],
        roadmap: {
          "Month 1-2": "Validate idea, build MVP with basic features",
          "Month 3-4": "Launch beta, get initial users, gather feedback",
          "Month 5-6": "Scale platform, add advanced features, monetize",
        },
        monetization: "Subscription model ($29-99/month), corporate training programs, certification fees",
      });
    } else {
      startupIdeas.push({
        idea: "AI-Powered Productivity SaaS Tool",
        whySuitable: "Your tech background and coding hobby position you well to build AI-driven solutions that help people work smarter.",
        requiredSkills: ["AI/ML", "Full Stack Development", "User Experience Design", "Product Management"],
        roadmap: {
          "Month 1-2": "Research market, build MVP with core AI features",
          "Month 3-4": "Beta launch, iterate based on user feedback",
          "Month 5-6": "Add premium features, implement pricing, scale user base",
        },
        monetization: "Freemium model with premium tiers ($9-49/month), enterprise plans ($99+/month)",
      });
    }
  }

  // Design + Business
  if (interests.includes("Design") && interests.includes("Business")) {
    startupIdeas.push({
      idea: "Custom Design Marketplace for Small Businesses",
      whySuitable: "Your design skills and business acumen make you perfect for connecting designers with businesses needing affordable design solutions.",
      requiredSkills: ["Design Thinking", "Digital Marketing", "Business Development", "E-commerce Platform"],
      roadmap: {
        "Month 1-2": "Build platform MVP, onboard initial designers",
        "Month 3-4": "Launch marketplace, acquire first business customers",
        "Month 5-6": "Scale both sides, implement payment system, build brand",
      },
      monetization: "Commission (15-20% per project), subscription for businesses ($49-199/month)",
    });
  }

  // Business + People
  if (interests.includes("Business") && interests.includes("People")) {
    startupIdeas.push({
      idea: "Career Coaching Platform for Students",
      whySuitable: "Your business and people skills, combined with understanding of career guidance, make this an ideal startup opportunity.",
      requiredSkills: ["Business Strategy", "Digital Marketing", "Platform Development", "Networking"],
      roadmap: {
        "Month 1-2": "Develop coaching curriculum, build booking platform",
        "Month 3-4": "Launch with certified coaches, market to students",
        "Month 5-6": "Expand coach network, add AI recommendations, scale",
      },
      monetization: "Per-session fees ($50-150), subscription packages ($99-299/month), corporate partnerships",
    });
  }

  // Research + Teaching
  if (interests.includes("Research") || interests.includes("Teaching")) {
    startupIdeas.push({
      idea: "Online Research Collaboration Platform",
      whySuitable: "Your research and teaching interests make you well-suited to build a platform that connects researchers and facilitates knowledge sharing.",
      requiredSkills: ["Research Methodology", "Platform Development", "Content Strategy", "Community Building"],
      roadmap: {
        "Month 1-2": "Build collaboration tools, create content structure",
        "Month 3-4": "Beta launch with academic institutions, gather feedback",
        "Month 5-6": "Add premium features, expand to more universities, monetize",
      },
      monetization: "Institutional subscriptions ($999-4999/year), individual researcher plans ($29/month)",
    });
  }

  // Default idea
  if (startupIdeas.length === 0) {
    startupIdeas.push({
      idea: "Personalized Learning Platform",
      whySuitable: "Your diverse interests and skills make you ideal for building a platform that offers personalized learning paths for various skills.",
      requiredSkills: ["Product Development", "Content Creation", "Marketing", "Technology"],
      roadmap: {
        "Month 1-2": "Identify niche, build MVP with basic courses",
        "Month 3-4": "Launch beta, acquire initial learners, iterate",
        "Month 5-6": "Expand course library, implement monetization, scale marketing",
      },
      monetization: "Course sales ($19-99 per course), subscription model ($29-79/month), corporate training",
    });
  }

  return startupIdeas[0];
}

