/**
 * status.ts
 * ─────────────────────────────────────────────────────────────
 * Data for the StatusWidget shown in the desktop's top-right
 * corner.
 * ─────────────────────────────────────────────────────────────
 */

export interface StatusRow {
  label: string
  value: string
}

export interface StatusConfig {
  available: boolean
  label: string
  currently: StatusRow[]
}

export const status: StatusConfig = {
  available: true,
  label: "Open to opportunities",
  currently: [
    { label: "Building", value: "Agentic RAG pipelines & AI Voice Agents" },
    { label: "Studying", value: "CS & AI @ Newton School of Technology" },
    { label: "Grinding", value: "CP problems on LeetCode & Codeforces" },
  ],
}
