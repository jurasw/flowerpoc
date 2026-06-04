import { Square } from 'lucide-react'

import { VoiceWaveformBars } from '#/components/voice/VoiceWaveformBars'
import { VoiceWaveformIconButton } from '#/components/voice/VoiceWaveformIconButton'
import { formatAudioTime } from '#/lib/format-audio-time'
import { voiceMessageConfig } from '#/lib/voice-message-config'

interface VoiceRecordingWaveformProps {
  peaks: number[]
  recordingSeconds: number
  stopLabel: string
  onStop: () => void
}

export function VoiceRecordingWaveform({
  peaks,
  recordingSeconds,
  stopLabel,
  onStop,
}: VoiceRecordingWaveformProps) {
  return (
    <div className="mt-3 grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-end gap-2 sm:gap-3">
      <VoiceWaveformIconButton
        ariaLabel={stopLabel}
        className="border-rose-400/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20"
        onClick={onStop}
      >
        <Square className="size-3.5 fill-current" />
      </VoiceWaveformIconButton>

      <div className="relative z-0 min-w-0 overflow-hidden">
        <VoiceWaveformBars
        isDisabled
        isLive
        onSeek={() => {}}
        peaks={peaks}
        progressRatio={1}
        />
      </div>

      <span className="relative z-0 shrink-0 leading-none tabular-nums text-xs text-rose-200/80">
        {formatAudioTime(recordingSeconds)} /{' '}
        {formatAudioTime(voiceMessageConfig.maxDurationSeconds)}
      </span>
    </div>
  )
}
