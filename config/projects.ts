/**
 * projects.ts
 * ─────────────────────────────────────────────────────────────
 * Projects by Vikrant Yadav.
 * ─────────────────────────────────────────────────────────────
 */

export interface ProjectItem {
  title: string
  description: string
  tech: string[]
  status?: string
  stars?: number
  link: string
}

export interface ProjectsConfig {
  personal: ProjectItem[]
  client: ProjectItem[]
}

export const projects: ProjectsConfig = {
  personal: [
    {
      title: "Diabetes Detection Agent (Agentic AI + RAG System)",
      description:
        "Two-stage ML pipeline (Linear Regression & Decision Trees on 24 clinical parameters) paired with LangGraph & ChromaDB Agentic RAG generating WHO & ICMR clinical guidelines-grounded reports with a Streamlit glassmorphism UI.",
      tech: ["Python", "LangGraph", "ChromaDB", "HuggingFace MiniLM", "Scikit-learn", "Streamlit"],
      status: "Completed",
      link: "https://github.com/vikrantyadav/diabetes-detection-agent",
    },
    {
      title: "Kudos To Code",
      description:
        "Full-stack web application unifying GitHub activity, projects, and competitive programming metrics (LeetCode, Codeforces) into one interactive shareable developer profile.",
      tech: ["Next.js 16", "React 19", "Tailwind CSS v4", "Framer Motion", "Radix UI", "Node.js", "Express.js", "MongoDB", "JWT"],
      status: "Active",
      link: "https://github.com/vikrantyadav/kudos-to-code",
    },
  ],

  client: [
    {
      title: "AI Lead & Social Automation Pipelines",
      description:
        "Engineered 5 n8n pipelines with Meta, LinkedIn, and WhatsApp Business APIs, automating 90% of social media distribution and 70% of lead qualification with real-time Google Sheets sync.",
      tech: ["n8n", "Python", "WhatsApp API", "Meta API", "LinkedIn API", "Google Sheets"],
      link: "https://studyzone365.com",
    },
    {
      title: "Conversational Recruitment AI Voice Agents",
      description:
        "Developed 2 AI voice agents via Retell AI and ElevenLabs, automating 50% of candidate screening calls, personalized outreach, and interview bookings.",
      tech: ["Retell AI", "ElevenLabs", "Python", "Webhooks"],
      link: "https://studyzone365.com",
    },
  ],
}

/** Résumé-only condensed project highlights */
export interface ResumeProjectItem {
  name: string
  desc: string
}

export const resumeProjects: ResumeProjectItem[] = [
  {
    name: "Diabetes Detection Agent (Agentic AI + RAG System)",
    desc: "Two-stage ML pipeline (Linear Regression & Decision Trees on 24 parameters) paired with a LangGraph & ChromaDB Agentic RAG pipeline producing WHO/ICMR-grounded PDF reports with Streamlit glassmorphism UI.",
  },
  {
    name: "Kudos To Code",
    desc: "Full-stack developer showcase built with Next.js 16, React 19, Tailwind CSS v4, Node.js, Express, and MongoDB, aggregating GitHub activity with LeetCode and Codeforces competitive stats.",
  },
]
