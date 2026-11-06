"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, useDragControls } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { playlist, type Track } from "@/config/music"

function EqBars() {
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 12 }} aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: "100%",
            borderRadius: 1,
            background: "#1DB954",
            transformOrigin: "bottom",
            animation: `eq-bar ${0.55 + i * 0.15}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}

function SpotifyLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1DB954">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

export default function NowPlaying() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const dragControls = useDragControls()

  const currentTrack: Track = playlist[trackIndex] ?? playlist[0]

  const nextTrack = useCallback(() => {
    setTrackIndex((prev) => (prev + 1) % playlist.length)
  }, [])

  const prevTrack = (e: React.MouseEvent) => {
    e.stopPropagation()
    setTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
  }

  // Load and switch track
  useEffect(() => {
    if (!currentTrack) return

    const audio = new Audio(currentTrack.src)
    audioRef.current = audio

    audio.ontimeupdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    audio.onended = () => {
      nextTrack()
    }

    audio.onerror = () => {
      setIsPlaying(false)
      setErrorNotice("File not found in public/music/")
      setTimeout(() => setErrorNotice(null), 4000)
    }

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false)
      })
    }

    return () => {
      audio.pause()
      audio.src = ""
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex, nextTrack])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setErrorNotice(null)
        })
        .catch(() => {
          setIsPlaying(false)
          setErrorNotice("Cannot play audio file")
          setTimeout(() => setErrorNotice(null), 3000)
        })
    }
  }

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      className="absolute select-none"
      style={{ bottom: 72, left: 20, zIndex: 5, width: 284 }}
    >
      {/* Drag handle */}
      <div className="widget-handle" onPointerDown={(e) => dragControls.start(e)}>
        <div style={{ width: 24, height: 2, borderRadius: 1, background: "rgba(255,255,255,0.12)" }} />
      </div>

      <div className="widget-body relative overflow-hidden px-3 py-2.5">
        {/* Subtle Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-200"
          style={{
            width: `${progress}%`,
            background: "#1DB954",
            opacity: isPlaying ? 0.8 : 0.2,
          }}
        />

        <div className="flex items-center gap-3">
          {/* Cover Art / Spotify Icon */}
          <div
            className="relative w-9 h-9 flex-none rounded flex items-center justify-center overflow-hidden transition-transform"
            style={{
              background: "rgba(29, 185, 84, 0.12)",
              border: "1px solid rgba(29, 185, 84, 0.25)",
            }}
          >
            {currentTrack?.cover ? (
              <Image
                src={currentTrack.cover}
                alt={currentTrack.title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <SpotifyLogo size={18} />
            )}
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <span
                className="block text-[12px] font-medium truncate"
                style={{ color: "var(--text-primary)" }}
                title={currentTrack?.title}
              >
                {currentTrack?.title ?? "No Track"}
              </span>
            </div>
            <p className="font-mono text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
              {errorNotice ? (
                <span className="text-red-400">{errorNotice}</span>
              ) : (
                currentTrack?.artist ?? "Spotify Playlist"
              )}
            </p>
          </div>

          {/* Controls & Equalizer */}
          <div className="flex items-center gap-1 flex-none">
            {isPlaying && (
              <div className="mr-1">
                <EqBars />
              </div>
            )}

            <button
              type="button"
              onClick={prevTrack}
              aria-label="Previous Track"
              className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <SkipBack size={12} />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="w-6 h-6 rounded-full flex items-center justify-center text-black font-semibold transition-transform active:scale-95 shadow-sm"
              style={{ background: "#1DB954" }}
            >
              {isPlaying ? (
                <Pause size={11} className="fill-current text-black" />
              ) : (
                <Play size={11} className="fill-current text-black ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextTrack()
              }}
              aria-label="Next Track"
              className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <SkipForward size={12} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
