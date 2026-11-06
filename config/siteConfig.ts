/**
 * siteConfig.ts
 * ─────────────────────────────────────────────────────────────
 * Identity, social profiles, contact details, and page metadata
 * for Vikrant Yadav.
 * ─────────────────────────────────────────────────────────────
 */

// ── Types ───────────────────────────────────────────────────────────

export interface Personal {
  firstName: string
  lastName: string
  fullName: string
  /** Two-letter badge shown in the mobile status bar (e.g. "VY"). */
  initials: string
  /** Short role shown under your name in the Hero (e.g. "AI Engineer"). */
  role: string
  /** Longer title shown on the résumé header. */
  shortRole: string
  /** One-paragraph bio shown in the Hero. */
  tagline: string
  /** "City, Country" — displayed in Hero footer and résumé header. */
  location: string
  age: number | string
  /** Path (in /public) to your avatar image. */
  avatar: string
  /** Handle shown next to the avatar (no @). */
  username: string
}

export interface Social {
  github: string
  twitter: string
  /** Medium, Hashnode, personal blog, etc. */
  blog: string
  /** Bare GitHub username used in labels + API calls. */
  githubUsername: string
  /** Twitter/X handle, no @. */
  twitterHandle: string
  linkedin?: string
  leetcode?: string
  leetcodeUsername?: string
  codeforces?: string
  codechef?: string
}

export interface ContactRow {
  icon: "mail" | "calendar" | "twitter" | "github"
  href: string
  label: string
  /** Short monospaced value shown on the right of each row. */
  mono: string
}

export interface Contact {
  email: string
  phone?: string
  calendar: string
  heading: string
  subheading: string
  rows: ContactRow[]
}

export interface Seo {
  title: string
  description: string
}

export interface Features {
  /** If true, the arrow-arrow-b-a Konami code triggers an easter egg overlay. */
  konami: boolean
}

export interface SiteConfig {
  personal: Personal
  social: Social
  contact: Contact
  seo: Seo
  /** URL to an external résumé (Notion page, Google Doc, hosted PDF). */
  resumeLink: string
  features: Features
}

// ── EDIT BELOW ──────────────────────────────────────────────────────

export const siteConfig: SiteConfig = {
  personal: {
    firstName: "Vikrant",
    lastName: "Yadav",
    fullName: "Vikrant Yadav",
    initials: "VY",
    role: "AI & Full-Stack Engineer",
    shortRole: "AI Engineer · Full-Stack Developer",
    tagline:
      "B.Tech in CS & AI at Newton School of Technology (Rishihood University). Building autonomous AI agents, LangGraph workflows, and high-performance web platforms.",
    location: "Sonipat, India",
    age: 20,
    avatar: "/avatar.svg",
    username: "vikgenix",
  },

  social: {
    github: "https://github.com/vikgenix",
    twitter: "https://x.com/vikrantyadav",
    blog: "https://github.com/vikgenix",
    githubUsername: "vikgenix",
    twitterHandle: "vikrantyadav",
    linkedin: "https://linkedin.com/in/vikrant-yadav",
    leetcode: "https://leetcode.com/u/vikgenix",
    leetcodeUsername: "vikgenix",
    codeforces: "https://codeforces.com/profile/vikrantyadav",
    codechef: "https://codechef.com/users/vikrantyadav",
  },

  contact: {
    email: "vikrant.yadav2024@nst.rishihood.edu.in",
    phone: "+919702874373",
    calendar: "tel:+919702874373",
    heading: "Let's Connect",
    subheading: "Open to AI/ML opportunities, full-stack engineering roles, and open-source collaborations.",
    rows: [
      { icon: "mail",     href: "mailto:vikrant.yadav2024@nst.rishihood.edu.in", label: "Email",       mono: "vikrant.yadav2024@nst.rishihood.edu.in" },
      { icon: "calendar", href: "tel:+919702874373",                           label: "Phone",       mono: "+91 9702874373" },
      { icon: "github",   href: "https://github.com/vikgenix",                  label: "GitHub",      mono: "vikgenix" },
      { icon: "twitter",  href: "https://linkedin.com/in/vikrant-yadav",        label: "LinkedIn",    mono: "vikrant-yadav" },
    ],
  },

  seo: {
    title: "Vikrant Yadav — AI & Full-Stack Engineer",
    description: "Portfolio & Résumé of Vikrant Yadav — AI Engineer, Competitive Programmer, and Full-Stack Developer.",
  },

  resumeLink: "/resume.pdf",

  features: {
    konami: false,
  },
}
