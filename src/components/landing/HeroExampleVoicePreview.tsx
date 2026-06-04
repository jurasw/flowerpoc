import { Pause, Play } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { VoiceWaveformBars } from '#/components/voice/VoiceWaveformBars'
import { formatAudioTime } from '#/lib/format-audio-time'

interface HeroExampleVoicePreviewProps {
  peaks: number[]
  durationSeconds: number
  label: string
  playLabel: string
  pauseLabel: string
  demoHint: string
  isMilky?: boolean
}

export function HeroExampleVoicePreview({
  peaks,
  durationSeconds,
  label,
  playLabel,
  pauseLabel,
  demoHint,
  isMilky = false,
}: HeroExampleVoicePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progressRatio, setProgressRatio] = useState(0.18)

  const togglePlayback = useCallback(() => {
    setIsPlaying((wasPlaying) => {
      if (wasPlaying) {
        return false
      }

      setProgressRatio(0)
      return true
    })
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      return
    }

    const startedAt = performance.now()
    let frameId = 0

    const tick = (now: number): void => {
      const elapsedSeconds = (now - startedAt) / 1000
      const nextRatio = Math.min(1, elapsedSeconds / durationSeconds)

      setProgressRatio(nextRatio)

      if (nextRatio >= 1) {
        setIsPlaying(false)
        return
      }

      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [durationSeconds, isPlaying])

  const playButtonLabel = isPlaying ? pauseLabel : playLabel

  return (
    <div
      className={
        isMilky
          ? 'mt-5 rounded-2xl border border-ivory/20 bg-ivory/10 p-3.5 backdrop-blur-md'
          : 'mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5'
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold/80">
          {label}
        </p>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
          {demoHint}
        </span>
      </div>

      <div className="mt-3 grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-3">
        <button
          aria-label={playButtonLabel}
          className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-stone-100 transition hover:border-rose-300/30 hover:bg-white/[0.1]"
          onClick={togglePlayback}
          type="button"
        >
          {isPlaying ? (
            <Pause className="size-3.5" />
          ) : (
            <Play className="size-3.5 translate-x-0.5" />
          )}
        </button>

        <VoiceWaveformBars
          isDisabled={false}
          onSeek={setProgressRatio}
          peaks={peaks}
          progressRatio={progressRatio}
        />

        <span className="shrink-0 tabular-nums text-[11px] text-stone-500">
          {`${formatAudioTime(progressRatio * durationSeconds)} / ${formatAudioTime(durationSeconds)}`}
        </span>
      </div>
    </div>
  )
}
