/**
 * experience.ts
 * ─────────────────────────────────────────────────────────────
 * Work history, education, coursework, achievements, and activities
 * for Vikrant Yadav's portfolio and résumé.
 * ─────────────────────────────────────────────────────────────
 */

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location?: string
  description: string
  tech: string[]
  achievements: string[]
  links?: { type: string; url: string; label: string }[]
}

export const experience: ExperienceItem[] = [
  {
    company: "Study2Win Pvt. Ltd. (studyzone365)",
    role: "AI Intern",
    period: "Jun 2026 – Aug 2026",
    location: "Faridabad, India",
    description: "Engineered automated multi-channel n8n pipelines and built real-time conversational AI voice agents.",
    tech: ["n8n", "Python", "WhatsApp Business API", "Meta API", "LinkedIn API", "Retell AI", "ElevenLabs", "Google Sheets"],
    achievements: [
      "Engineered 5 n8n pipelines with Meta and LinkedIn APIs, automating 90% of social media workflows, including topic discovery, content generation, post scheduling, and multi-channel publishing across Facebook, Instagram, and LinkedIn.",
      "Streamlined 70% of lead-generation workflows using n8n, Python, and WhatsApp Business API to enable AI-driven outreach, automated lead qualification, multi-step follow-up sequences, and real-time data synchronization with centralized Google Sheets.",
      "Developed 2 AI voice agents using Retell AI and ElevenLabs, automating 50% of recruitment-call workflows through real-time voice interactions, initial candidate screening, personalized counselling outreach, and end-to-end interview scheduling.",
    ],
  },
  {
    company: "Rashtram AI",
    role: "AI/UI Engineer",
    period: "Jul 2025 – Aug 2025",
    location: "Sonipat, India",
    description: "Architected the full frontend platform in Next.js/React and optimized backend microservices and LLM pipelines.",
    tech: ["Next.js", "React", "REST APIs", "LLMs", "Microservices", "JavaScript", "Tailwind CSS"],
    achievements: [
      "Architected 100% of the frontend web platform from scratch using Next.js and React, designing end-to-end responsive UI modules and interactive dashboards across all core AI product workflows.",
      "Engineered 100% of user authentication and REST API integrations, building secure login flows and automated data ingestion pipelines to standardize payload delivery into core AI models.",
      "Optimized backend microservices and LLM workflows in collaboration with backend engineers to streamline end-to-end data flow, enhance model performance, improve response quality, and reduce system latency.",
    ],
  },
]

// ── Résumé-only condensed version ────────────────────────────────────

export interface ResumeExperienceItem {
  company: string
  role: string
  period: string
  location?: string
  subRoles?: string[]
  bullets: string[]
}

export const resumeExperience: ResumeExperienceItem[] = [
  {
    company: "Study2Win Pvt. Ltd. (studyzone365)",
    role: "AI Intern",
    period: "Jun 2026 – Aug 2026",
    location: "Faridabad",
    bullets: [
      "Engineered 5 n8n pipelines with Meta and LinkedIn APIs, automating 90% of social media workflows, including topic discovery, content generation, post scheduling, and multi-channel publishing across Facebook, Instagram, and LinkedIn.",
      "Streamlined 70% of lead-generation workflows using n8n, Python, and WhatsApp Business API to enable AI-driven outreach, automated lead qualification, multi-step follow-up sequences, and real-time data synchronization with centralized Google Sheets.",
      "Developed 2 AI voice agents using Retell AI and ElevenLabs, automating 50% of recruitment-call workflows through real-time voice interactions, initial candidate screening, personalized counselling outreach, and end-to-end interview scheduling.",
    ],
  },
  {
    company: "Rashtram AI",
    role: "AI/UI Engineer",
    period: "Jul 2025 – Aug 2025",
    location: "Sonipat",
    bullets: [
      "Architected 100% of the frontend web platform from scratch using Next.js and React, designing end-to-end responsive UI modules and interactive dashboards across all core AI product workflows.",
      "Engineered 100% of user authentication and REST API integrations, building secure login flows and automated data ingestion pipelines to standardize payload delivery into core AI models.",
      "Optimized backend microservices and LLM workflows in collaboration with backend engineers to streamline end-to-end data flow, enhance model performance, improve response quality, and reduce system latency.",
    ],
  },
]

// ── Education ────────────────────────────────────────────────────────

export interface EducationItem {
  school: string
  degree: string
  period: string
  score?: string
}

export const educationList: EducationItem[] = [
  {
    school: "Newton School of Technology, Rishihood University",
    degree: "Bachelor of Technology (Computer Science and AI)",
    period: "2024 – 2028",
    score: "CGPA: 7.9 / 10.0",
  },
  {
    school: "Kendriya Vidyalaya",
    degree: "Intermediate (Class XII)",
    period: "2023 – 2024",
    score: "Marks: 8.6 / 10.0",
  },
  {
    school: "Kendriya Vidyalaya",
    degree: "Matriculation (Class X)",
    period: "2021 – 2022",
    score: "Marks: 8.5 / 10.0",
  },
]

/** Legacy single-entry export kept for backwards compatibility */
export const education: EducationItem = educationList[0]

// ── Relevant Coursework ──────────────────────────────────────────────

export interface CourseworkItem {
  topic: string
  detail: string
}

export const coursework: CourseworkItem[] = [
  {
    topic: "Data Structures & Algorithms",
    detail: "Solved complex algorithmic problems using efficient structures and optimized time-space complexity.",
  },
  {
    topic: "Generative AI",
    detail: "Built production LLM applications using RAG, prompt engineering, embeddings, and FAISS/ChromaDB vector search.",
  },
  {
    topic: "Machine Learning",
    detail: "Optimized Scikit-learn models through feature engineering, cross-validation, and hyperparameter tuning.",
  },
  {
    topic: "Deep Learning",
    detail: "Developed TensorFlow & PyTorch neural networks using CNNs, adaptive optimizers, and regularization techniques.",
  },
]

// ── Achievements & Extra-Curricular ──────────────────────────────────

export const achievements: string[] = [
  "Secured National Rank 1,067 in ICPC 2025, solving complex algorithmic problems under strict competitive constraints.",
  "Solved 1,200+ competitive programming problems across LeetCode (~890), Codeforces (~300), and CodeChef (~120); achieved Knight Rank (1863 rating) on LeetCode and Pupil Rank on Codeforces.",
  "Completed 2 Hacktoberfest editions, contributing open-source code, bug fixes, and pull requests across collaborative repositories.",
]

export const extracurricular: string[] = [
  "Participated in the Amazon ML Challenge and AI Harness Hackathon, exploring practical AI/ML solutions.",
  "Active participant in competitive programming contests on LeetCode, Codeforces, and CodeChef.",
  "Two-time contributor to open-source software via Hacktoberfest.",
]

export const teaching: string[] = [
  "Mentored fellow students in Data Structures, Algorithms, and Python programming.",
]
