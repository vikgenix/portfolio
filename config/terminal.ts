/**
 * terminal.ts
 * ─────────────────────────────────────────────────────────────
 * Payloads for the interactive Terminal window for Vikrant Yadav.
 * ─────────────────────────────────────────────────────────────
 */

export interface TerminalConfig {
  /** Content of `cat about.txt`. */
  about: string[]
  /** Content of `cat skills.txt`. */
  skills: string[]
  /** Content of `cat experience.txt`. */
  experience: string[]
  /** Content of `cat contact.txt`. */
  contact: string[]
  /** Content of `cat resume.pdf`. */
  resume: string[]
  /** Output of `whoami`. */
  whoami: string[]
  /** Fake JSON returned by `curl github.com/<user>`. */
  githubJson: string
}

export const terminal: TerminalConfig = {
  about: [
    "Name:        Vikrant Yadav",
    "Education:   B.Tech in Computer Science & AI (2024–2028)",
    "Institute:   Newton School of Technology, Rishihood University",
    "Location:    Sonipat / Faridabad, India",
    "Role:        AI Engineer & Full-Stack Developer",
    "",
    "Passionate about Generative AI, LangGraph agentic pipelines,",
    "and competitive programming (ICPC '25, LeetCode Knight, Codeforces Pupil).",
  ],
  skills: [
    "Artificial Intelligence:  LangGraph · LangChain · Transformers · Scikit-learn · Deep Learning · ChromaDB",
    "Web & Full-Stack:         Next.js · React · Node.js · Express · Tailwind CSS · MongoDB · Streamlit",
    "Languages:                Python · C++ · C · JavaScript · TypeScript · SQL",
    "Dev & Tools:              AWS · Git · GitHub · n8n · Retell AI · ElevenLabs · Claude Code",
  ],
  experience: [
    "Study2Win Pvt. Ltd.   Jun 2026 – Aug 2026   AI Intern (n8n, Voice Agents, Python)",
    "Rashtram AI           Jul 2025 – Aug 2025   AI/UI Engineer (Next.js, REST APIs, LLMs)",
  ],
  contact: [
    "email:     vikrant.yadav2024@nst.rishihood.edu.in",
    "phone:     +91 9702874373",
    "github:    github.com/vikrantyadav",
    "linkedin:  linkedin.com/in/vikrant-yadav",
    "leetcode:  leetcode.com/u/vikrantyadav (Knight, 1863)",
    "codeforces:codeforces.com/profile/vikrantyadav (Pupil)",
  ],
  resume: [
    "Opening résumé…",
    "→ /resume.pdf",
  ],
  whoami: [
    "Vikrant Yadav",
    "AI Engineer & Full-Stack Developer · Sonipat, India",
    "",
    "B.Tech in Computer Science & AI at Newton School of Technology.",
    "Solved 1,200+ CP problems (ICPC 2025 Rank 1,067, Knight on LeetCode).",
  ],
  githubJson: `{"login":"vikrantyadav","name":"Vikrant Yadav","bio":"AI Engineer & Full-Stack Developer | B.Tech CS & AI @ NST","public_repos":24}`,
}
