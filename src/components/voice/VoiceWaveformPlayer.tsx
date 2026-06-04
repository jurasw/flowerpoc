import { Pause, Play } from 'lucide-react'

import { VoiceWaveformBars } from '#/components/voice/VoiceWaveformBars'
import { useVoiceWaveformPlayback } from '#/hooks/useVoiceWaveformPlayback'
import { formatAudioTime } from '#/lib/format-audio-time'

interface VoiceWaveformPlayerProps {
  audioBlob: Blob | null
  playLabel: string
  pauseLabel: string
  loadingLabel: string
  onPlaybackError?: () => void
}

export function VoiceWaveformPlayer({
  audioBlob,
  playLabel,
  pauseLabel,
  loadingLabel,
  onPlaybackError,
}: VoiceWaveformPlayerProps) {
  const playback = useVoiceWaveformPlayback({
    audioBlob,
    onError: onPlaybackError,
  })

  const playButtonLabel = playback.isPlaying ? pauseLabel : playLabel
  const isControlsDisabled = playback.isLoading || !audioBlob

  return (
    <div className="mt-4 space-y-2">
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <button
          aria-label={playButtonLabel}
          className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-stone-100 transition hover:border-rose-300/30 hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isControlsDisabled}
          onClick={playback.togglePlayback}
          type="button"
        >
          {playback.isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4 translate-x-0.5" />
          )}
        </button>

        <VoiceWaveformBars
          isDisabled={isControlsDisabled}
          onSeek={playback.seekToRatio}
          peaks={playback.peaks}
          progressRatio={playback.progressRatio}
        />

        <span className="shrink-0 tabular-nums text-xs text-stone-500">
          {playback.isLoading
            ? loadingLabel
            : `${formatAudioTime(playback.currentSeconds)} / ${formatAudioTime(playback.durationSeconds)}`}
        </span>
      </div>
    </div>
  )
}
