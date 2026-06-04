import { Pause } from 'lucide-react'

import { VoiceWaveformBars } from '#/components/voice/VoiceWaveformBars'
import {
  VoicePlayIcon,
  VoiceWaveformIconButton,
} from '#/components/voice/VoiceWaveformIconButton'
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
    <div className="w-full min-w-0">
      <div className="grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-end gap-2 sm:gap-3">
        <VoiceWaveformIconButton
          ariaLabel={playButtonLabel}
          className="border-white/10 bg-white/[0.06] text-stone-100 hover:border-rose-300/30 hover:bg-white/[0.1]"
          disabled={isControlsDisabled}
          onClick={playback.togglePlayback}
        >
          {playback.isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <VoicePlayIcon className="size-4" />
          )}
        </VoiceWaveformIconButton>

        <div className="relative z-0 min-w-0 overflow-hidden">
          <VoiceWaveformBars
          isDisabled={isControlsDisabled}
          onSeek={playback.seekToRatio}
          peaks={playback.peaks}
          progressRatio={playback.progressRatio}
          />
        </div>

        <span className="relative z-0 shrink-0 leading-none tabular-nums text-xs text-stone-500">
          {playback.isLoading
            ? loadingLabel
            : `${formatAudioTime(playback.currentSeconds)} / ${formatAudioTime(playback.durationSeconds)}`}
        </span>
      </div>
    </div>
  )
}
