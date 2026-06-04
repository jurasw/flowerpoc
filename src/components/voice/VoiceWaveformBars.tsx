import { useCallback, useRef, type PointerEvent } from 'react'

import { voiceWaveformConfig } from '#/lib/voice-waveform-config'

interface VoiceWaveformBarsProps {
  peaks: number[]
  progressRatio: number
  isDisabled?: boolean
  isLive?: boolean
  onSeek: (ratio: number) => void
}

function seekRatioFromPointer(
  clientX: number,
  element: HTMLDivElement,
): number {
  const rect = element.getBoundingClientRect()

  if (rect.width <= 0) {
    return 0
  }

  return (clientX - rect.left) / rect.width
}

export function VoiceWaveformBars({
  peaks,
  progressRatio,
  isDisabled = false,
  isLive = false,
  onSeek,
}: VoiceWaveformBarsProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const isScrubbingRef = useRef(false)

  const handleSeekAt = useCallback(
    (clientX: number) => {
      const track = trackRef.current

      if (!track || isDisabled) {
        return
      }

      onSeek(seekRatioFromPointer(clientX, track))
    },
    [isDisabled, onSeek],
  )

  function handlePointerDown(event: PointerEvent<HTMLDivElement>): void {
    if (isDisabled) {
      return
    }

    isScrubbingRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    handleSeekAt(event.clientX)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>): void {
    if (!isScrubbingRef.current || isDisabled) {
      return
    }

    handleSeekAt(event.clientX)
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>): void {
    if (!isScrubbingRef.current) {
      return
    }

    isScrubbingRef.current = false

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const displayPeaks =
    peaks.length > 0
      ? peaks
      : Array.from({ length: voiceWaveformConfig.barCount }, () => 0.3)

  return (
    <div
      aria-disabled={isDisabled}
      className={`flex h-10 min-w-0 flex-1 touch-none items-end gap-[2px] rounded-md px-0.5 ${
        isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={trackRef}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progressRatio * 100)}
    >
      {displayPeaks.map((peak, index) => {
        const barCenter = (index + 0.5) / displayPeaks.length
        const isPlayed = barCenter <= progressRatio
        const heightPercent =
          voiceWaveformConfig.minBarHeightPercent +
          peak *
            (voiceWaveformConfig.maxBarHeightPercent -
              voiceWaveformConfig.minBarHeightPercent)

        return (
          <div
            className="flex h-full min-w-0 flex-1 items-end justify-center"
            key={`wave-bar-${index}`}
          >
            <span
              className={`block w-full max-w-[3px] rounded-full ${
                isLive ? 'transition-[height] duration-75 ease-out' : 'transition-colors'
              } ${isPlayed ? 'bg-rose-300' : 'bg-white/20'}`}
              style={{ height: `${heightPercent}%` }}
            />
          </div>
        )
      })}
    </div>
  )
}
