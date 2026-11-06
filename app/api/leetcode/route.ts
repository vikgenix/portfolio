import { NextResponse } from "next/server"
import { siteConfig } from "@/config/siteConfig"

export const revalidate = 21600 // 6-hour cache

export async function GET() {
  try {
    const username = siteConfig.social.leetcodeUsername || "vikgenix"
    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          userCalendar {
            streak
            totalActiveDays
            submissionCalendar
          }
        }
      }
    `

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 21600 },
    })

    if (!res.ok) throw new Error("upstream error")
    const json = await res.json()
    const user = json?.data?.matchedUser
    if (!user) throw new Error("User not found")

    const rawCalendar = JSON.parse(user.userCalendar?.submissionCalendar || "{}")
    const streak = user.userCalendar?.streak ?? 0
    const totalActiveDays = user.userCalendar?.totalActiveDays ?? 0

    // Map epoch timestamps (in seconds) to YYYY-MM-DD
    const dateCounts: Record<string, number> = {}
    for (const [timestamp, count] of Object.entries(rawCalendar)) {
      const d = new Date(parseInt(timestamp, 10) * 1000)
      const dateStr = d.toISOString().slice(0, 10)
      dateCounts[dateStr] = (dateCounts[dateStr] || 0) + (count as number)
    }

    // Build contributions for the past 365 days
    const contributions: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - 364)

    let totalSubmissions = 0
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().slice(0, 10)
      const count = dateCounts[dateStr] || 0
      totalSubmissions += count

      let level: 0 | 1 | 2 | 3 | 4 = 0
      if (count >= 8) level = 4
      else if (count >= 5) level = 3
      else if (count >= 3) level = 2
      else if (count >= 1) level = 1

      contributions.push({ date: dateStr, count, level })
    }

    const acStats = user.submitStatsGlobal?.acSubmissionNum || []
    const totalSolved = acStats.find((s: { difficulty: string }) => s.difficulty === "All")?.count ?? 0
    const easy = acStats.find((s: { difficulty: string }) => s.difficulty === "Easy")?.count ?? 0
    const medium = acStats.find((s: { difficulty: string }) => s.difficulty === "Medium")?.count ?? 0
    const hard = acStats.find((s: { difficulty: string }) => s.difficulty === "Hard")?.count ?? 0

    return NextResponse.json({
      contributions,
      total: totalSubmissions,
      totalSolved,
      easy,
      medium,
      hard,
      streak,
      totalActiveDays,
      username,
    })
  } catch {
    return NextResponse.json({
      contributions: [],
      total: 0,
      totalSolved: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      streak: 0,
      totalActiveDays: 0,
      username: siteConfig.social.leetcodeUsername || "vikgenix",
    })
  }
}

