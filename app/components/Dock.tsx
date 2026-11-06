"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Github } from "lucide-react"
import { siteConfig } from "@/config/siteConfig"
import { windows } from "@/config/windows"

function LeetCodeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.793L9.36 7.424l4.908-4.996a1.385 1.385 0 0 0-.785-2.428zM19.98 12.012c0-.76-.616-1.376-1.376-1.376H9.77a1.376 1.376 0 1 0 0 2.752h8.834c.76 0 1.376-.616 1.376-1.376z" />
    </svg>
  )
}

type DockItem =
  | { kind: "window"; id: string; label: string; icon: React.ReactNode }
  | { kind: "link"; id: string; label: string; icon: React.ReactNode; url: string }

const dockApps: DockItem[] = windows.map((w) => ({
  kind: "window",
  id: w.id,
  label: w.title,
  icon: <w.icon size={22} strokeWidth={1.5} aria-hidden="true" />,
}))

const dockLinks: DockItem[] = [
  { kind: "link", id: "github",   label: "GitHub",   icon: <Github size={20} strokeWidth={1.5} aria-hidden="true" />, url: siteConfig.social.github },
  { kind: "link", id: "leetcode", label: "LeetCode", icon: <LeetCodeIcon size={20} />,                              url: siteConfig.social.leetcode || "https://leetcode.com/u/vikgenix" },
]

function DockIcon({
  item,
  mouseX,
  isOpen,
  onActivate,
}: {
  item: DockItem
  mouseX: ReturnType<typeof useMotionValue<number>>
  isOpen: boolean
  onActivate: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const sizeTransform = useTransform(distance, [-120, 0, 120], [40, 62, 40])
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 200, damping: 14 })

  return (
    <div className="relative flex flex-col items-center gap-1">
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute bottom-full mb-2 px-2.5 py-1 rounded font-mono text-[10px] uppercase tracking-[0.06em] whitespace-nowrap pointer-events-none"
            style={{
              background: "var(--tooltip-bg)",
              border: "1px solid var(--widget-border)",
              color: "var(--text-primary)",
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.1 }}
            aria-hidden="true"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        type="button"
        aria-label={item.label}
        aria-pressed={item.kind === "window" ? isOpen : undefined}
        style={{ width: size, height: size }}
        animate={{
          background: isOpen ? "rgba(255,255,255,0.1)" : hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
          color: isOpen ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
        }}
        transition={{ duration: 0.15 }}
        className="rounded-xl flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        whileTap={{ scale: 0.88 }}
        onClick={onActivate}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {item.icon}
      </motion.button>

      <span
        aria-hidden="true"
        className="w-1 h-1 rounded-full"
        style={{
          background: isOpen ? "var(--accent)" : "transparent",
          transition: "background 0.2s",
        }}
      />
    </div>
  )
}

export default function Dock({
  openWindows,
  onToggleWindow,
}: {
  openWindows: string[]
  onToggleWindow: (id: string, url?: string) => void
}) {
  const mouseX = useMotionValue(Infinity)

  return (
    <nav
      aria-label="Application dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]"
    >
      <motion.div
        className="flex items-end gap-2 px-3 pb-2 pt-2.5 rounded-2xl"
        style={{
          background: "var(--dock-bg)",
          border: "1px solid var(--widget-border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {dockApps.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            mouseX={mouseX}
            isOpen={openWindows.includes(item.id)}
            onActivate={() => onToggleWindow(item.id)}
          />
        ))}

        <span
          aria-hidden="true"
          className="h-8 self-center mx-1 rounded-full"
          style={{ width: 1, background: "var(--widget-border)" }}
        />

        {dockLinks.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            mouseX={mouseX}
            isOpen={false}
            onActivate={() => onToggleWindow(item.id, item.kind === "link" ? item.url : undefined)}
          />
        ))}
      </motion.div>
    </nav>
  )
}
