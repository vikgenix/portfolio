"use client"

import { motion } from "framer-motion"
import { ExternalLink, MapPin, Mail, Github, Linkedin, Phone } from "lucide-react"
import { siteConfig } from "@/config/siteConfig"
import { skills } from "@/config/skills"
import {
  resumeExperience as experience,
  educationList,
  coursework,
  achievements,
  extracurricular,
} from "@/config/experience"
import { resumeProjects as projects } from "@/config/projects"

export default function Resume({ compact = false }: { compact?: boolean }) {
  const { personal, social, contact, resumeLink } = siteConfig

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={compact ? "px-5 py-5" : "py-10"}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-white leading-tight">
            {personal.fullName}
          </h1>
          <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">
            {personal.shortRole}
          </p>
          <div className="flex items-center gap-3 mt-2.5 flex-wrap">
            <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
              <MapPin size={11} /> {personal.location}
            </span>
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <Phone size={11} /> {contact.phone}
              </a>
            )}
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-white transition-colors"
            >
              <Mail size={11} /> {contact.email}
            </a>
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <Linkedin size={11} /> LinkedIn
              </a>
            )}
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-white transition-colors"
            >
              <Github size={11} /> {social.githubUsername}
            </a>
            {social.leetcode && (
              <a
                href={social.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-white transition-colors"
              >
                LeetCode (Knight)
              </a>
            )}
            {social.codeforces && (
              <a
                href={social.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-white transition-colors"
              >
                Codeforces
              </a>
            )}
          </div>
        </div>

        {/* View PDF Resume */}
        <a
          href={resumeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-colors flex-none hover:text-white"
          style={{
            background: "var(--widget-border)",
            border: "1px solid var(--widget-border)",
            color: "var(--text-secondary)",
          }}
        >
          <ExternalLink size={12} />
          View PDF Résumé
        </a>
      </div>

      <div className="space-y-6">
        {/* Education */}
        <section>
          <h2
            className="text-[11px] font-semibold uppercase tracking-widest mb-3.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {educationList.map((edu, i) => (
              <div key={i} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-[13px] font-semibold text-white">
                      {edu.school}
                    </span>
                    {edu.score && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                        style={{
                          background: "var(--separator)",
                          border: "1px solid var(--widget-border)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {edu.score}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[11px] mt-0.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {edu.degree}
                  </p>
                </div>
                <span
                  className="text-[10px] flex-none font-mono mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: "1px", background: "var(--separator)" }} />

        {/* Internships / Experience */}
        <section>
          <h2
            className="text-[11px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Internships & Experience
          </h2>
          <div className="space-y-4">
            {experience.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-[13px] font-semibold text-white">
                        {job.company}
                      </span>
                      <span
                        className="text-[11px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        · {job.role}
                      </span>
                      {job.location && (
                        <span
                          className="text-[10px]"
                          style={{ color: "var(--text-muted)" }}
                        >
                          ({job.location})
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-mono flex-none mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {job.period}
                  </span>
                </div>
                <ul className="space-y-1.5 pl-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span
                        className="mt-[6px] w-1 h-1 rounded-full flex-none"
                        style={{ background: "var(--text-faint)" }}
                      />
                      <span
                        className="text-[11px] leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <div style={{ height: "1px", background: "var(--separator)" }} />

        {/* Projects */}
        <section>
          <h2
            className="text-[11px] font-semibold uppercase tracking-widest mb-3.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Selected Projects
          </h2>
          <div className="space-y-3">
            {projects.map((p, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:gap-4 gap-1">
                <span className="text-[12px] font-medium sm:w-52 flex-none pt-px text-white/90">
                  {p.name}
                </span>
                <span
                  className="text-[11px] leading-relaxed flex-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: "1px", background: "var(--separator)" }} />

        {/* Skills */}
        <section>
          <h2
            className="text-[11px] font-semibold uppercase tracking-widest mb-3.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Skills
          </h2>
          <div className="space-y-2.5">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="flex flex-col sm:flex-row sm:gap-3 gap-1">
                <span
                  className="text-[10px] sm:w-36 flex-none pt-0.5 font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  {category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        background: "var(--separator)",
                        border: "1px solid var(--widget-border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: "1px", background: "var(--separator)" }} />

        {/* Relevant Coursework */}
        <section>
          <h2
            className="text-[11px] font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            Relevant Coursework
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {coursework.map((c, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg"
                style={{
                  background: "var(--separator)",
                  border: "1px solid var(--widget-border)",
                }}
              >
                <div className="text-[11px] font-medium text-white mb-0.5">
                  {c.topic}
                </div>
                <p
                  className="text-[10px] leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {c.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: "1px", background: "var(--separator)" }} />

        {/* Achievements */}
        <section>
          <h2
            className="text-[11px] font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            Achievements
          </h2>
          <ul className="space-y-1.5 pl-2">
            {achievements.map((a, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="mt-[6px] w-1 h-1 rounded-full flex-none"
                  style={{ background: "var(--text-faint)" }}
                />
                <span
                  className="text-[11px] leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {a}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div style={{ height: "1px", background: "var(--separator)" }} />

        {/* Extra-Curricular Activities */}
        <section>
          <h2
            className="text-[11px] font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            Extra-Curricular Activities
          </h2>
          <ul className="space-y-1.5 pl-2">
            {extracurricular.map((e, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="mt-[6px] w-1 h-1 rounded-full flex-none"
                  style={{ background: "var(--text-faint)" }}
                />
                <span
                  className="text-[11px] leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {e}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </motion.div>
  )
}
