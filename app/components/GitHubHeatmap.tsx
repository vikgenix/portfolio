"use client"

import { useEffect, useState } from "react"
import { Github, Flame } from "lucide-react"
import { motion, useDragControls } from "framer-motion"
import { siteConfig } from "@/config/siteConfig"

interface Contribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface LeetCodeStats {
  contributions: Contribution[]
  total: number
  totalSolved: number
  easy: number
  medium: number
  hard: number
  streak: number
  totalActiveDays: number
  username: string
}

interface GitHubStats {
  contributions: Contribution[]
  total: number
}

const LEVEL_COLORS = [
  "var(--heatmap-empty)",
  "rgba(0,200,100,0.25)",
  "rgba(0,200,100,0.45)",
  "rgba(0,200,100,0.70)",
  "rgba(0,200,100,0.95)",
]

const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

function LeetCodeIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#22c55e">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.793L9.36 7.424l4.908-4.996a1.385 1.385 0 0 0-.785-2.428zM19.98 12.012c0-.76-.616-1.376-1.376-1.376H9.77a1.376 1.376 0 1 0 0 2.752h8.834c.76 0 1.376-.616 1.376-1.376z" />
    </svg>
  )
}

export default function GitHubHeatmap() {
  const [activeTab, setActiveTab] = useState<"leetcode" | "github">("leetcode")
  const [leetcodeData, setLeetcodeData] = useState<LeetCodeStats | null>(null)
  const [githubData, setGithubData] = useState<GitHubStats | null>(null)
  const [loaded, setLoaded] = useState(false)
  const dragControls = useDragControls()

  useEffect(() => {
    Promise.all([
      fetch("/api/leetcode")
        .then((r) => r.json())
        .then((d) => setLeetcodeData(d))
        .catch(() => {}),
      fetch("/api/github")
        .then((r) => r.json())
        .then((d) => {
          const sum = Object.values(d.total as Record<string, number> || {}).reduce(
            (a: number, b) => a + (b as number), 0
          )
          setGithubData({
            contributions: d.contributions ?? [],
            total: sum,
          })
        })
        .catch(() => {}),
    ]).finally(() => {
      setLoaded(true)
    })
  }, [])

  if (!loaded) return null

  const isLeetCode = activeTab === "leetcode"
  const currentContributions = isLeetCode
    ? (leetcodeData?.contributions ?? [])
    : (githubData?.contributions ?? [])
  const levelColors = LEVEL_COLORS

  const weeks: (Contribution | null)[][] = []
  if (currentContributions.length > 0) {
    const sorted = [...currentContributions].sort((a, b) => a.date.localeCompare(b.date))
    const firstDate = new Date(sorted[0].date)
    const dayOfWeek = firstDate.getDay()
    const startDate = new Date(firstDate)
    startDate.setDate(startDate.getDate() - dayOfWeek)

    const byDate = new Map(sorted.map((c) => [c.date, c]))
    const current = new Date(startDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    while (current <= today) {
      const week: (Contribution | null)[] = []
      for (let d = 0; d < 7; d++) {
        const dateStr = current.toISOString().slice(0, 10)
        week.push(current > today ? null : (byDate.get(dateStr) ?? { date: dateStr, count: 0, level: 0 }))
        current.setDate(current.getDate() + 1)
      }
      weeks.push(week)
    }
  }

  const monthPositions: { label: string; col: number }[] = []
  if (weeks.length > 0) {
    let lastMonth = -1
    weeks.forEach((week, col) => {
      const firstValid = week.find((d) => d !== null)
      if (firstValid) {
        const month = new Date(firstValid.date).getMonth()
        if (month !== lastMonth) {
          monthPositions.push({ label: MONTH_LABELS[month], col })
          lastMonth = month
        }
      }
    })
  }

  const CELL = 10
  const GAP = 2
  const colWidth = CELL + GAP

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      className="absolute select-none"
      style={{ bottom: 80, right: 24, zIndex: 5 }}
    >
      <div className="widget-handle" onPointerDown={(e) => dragControls.start(e)}>
        <div style={{ width: 24, height: 2, borderRadius: 1, background: "rgba(255,255,255,0.12)" }} />
      </div>

      <div className="widget-body px-4 pt-3 pb-3">
        {/* Header row with Tab switcher */}
        <div className="flex items-center justify-between mb-2.5 gap-4">
          <div className="flex items-center gap-2">
            {isLeetCode ? (
              <a
                href={siteConfig.social.leetcode || "https://leetcode.com/u/vikgenix"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                <LeetCodeIcon size={12} />
                <span className="text-[11px] font-semibold text-white">
                  {leetcodeData?.username || siteConfig.social.leetcodeUsername || "vikgenix"}
                </span>
              </a>
            ) : (
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                <Github size={12} style={{ color: "var(--text-faint)" }} />
                <span className="text-[11px] font-semibold text-white">
                  {siteConfig.social.githubUsername}
                </span>
              </a>
            )}

            {/* Toggle Switch */}
            <div
              className="flex items-center rounded-md p-0.5 ml-1"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--widget-border)",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("leetcode")}
                className="px-1.5 py-0.5 rounded text-[9px] font-medium transition-all"
                style={{
                  background: isLeetCode ? "rgba(0, 200, 100, 0.22)" : "transparent",
                  color: isLeetCode ? "#22c55e" : "var(--text-muted)",
                }}
              >
                LeetCode
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("github")}
                className="px-1.5 py-0.5 rounded text-[9px] font-medium transition-all"
                style={{
                  background: !isLeetCode ? "rgba(0, 200, 100, 0.22)" : "transparent",
                  color: !isLeetCode ? "#22c55e" : "var(--text-muted)",
                }}
              >
                GitHub
              </button>
            </div>
          </div>

          {/* Subtitle / summary */}
          <div className="flex items-center gap-2 text-[10px]" style={{ color: "var(--text-muted)" }}>
            {isLeetCode ? (
              <>
                {leetcodeData && leetcodeData.streak > 0 && (
                  <span className="flex items-center gap-0.5 font-medium text-[#22c55e]">
                    <Flame size={11} className="fill-current text-[#22c55e]" />
                    {leetcodeData.streak}d streak
                  </span>
                )}
                <span>
                  {leetcodeData?.totalSolved
                    ? `${leetcodeData.totalSolved} solved`
                    : `${leetcodeData?.total ?? 0} submissions`}
                </span>
              </>
            ) : (
              githubData && githubData.total > 0 && (
                <span>{githubData.total.toLocaleString()} contributions</span>
              )
            )}
          </div>
        </div>

        {weeks.length === 0 ? (
          <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>No data available</div>
        ) : (
          <div>
            <div style={{ position: "relative", height: 14, marginBottom: 2, width: weeks.length * colWidth }}>
              {monthPositions.map(({ label, col }) => (
                <span
                  key={`${label}-${col}`}
                  style={{
                    position: "absolute",
                    left: col * colWidth,
                    fontSize: 9,
                    color: "var(--text-muted)",
                    lineHeight: "14px",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: GAP }}>
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={
                        day
                          ? isLeetCode
                            ? `${day.date}: ${day.count} problem${day.count === 1 ? "" : "s"} submitted`
                            : `${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`
                          : ""
                      }
                      style={{
                        width: CELL,
                        height: CELL,
                        borderRadius: 2,
                        background: day ? levelColors[day.level] : "transparent",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
