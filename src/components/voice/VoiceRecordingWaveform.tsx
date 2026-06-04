import { Square } from 'lucide-react'

import { VoiceWaveformBars } from '#/components/voice/VoiceWaveformBars'
import { formatAudioTime } from '#/lib/format-audio-time'
import { voiceMessageConfig } from '#/lib/voice-message-config'

interface VoiceRecordingWaveformProps {
  peaks: number[]
  recordingSeconds: number
  stopLabel: string
  onStop: () => void
}

const stopButtonClassName =
  'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-rose-400/30 bg-rose-500/10 text-rose-200 transition hover:bg-rose-500/20'

export function VoiceRecordingWaveform({
  peaks,
  recordingSeconds,
  stopLabel,
  onStop,
}: VoiceRecordingWaveformProps) {
  return (
    <div className="mt-3 grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-3">
      <button
        aria-label={stopLabel}
        className={stopButtonClassName}
        onClick={onStop}
        type="button"
      >
        <Square className="size-3.5 fill-current" />
      </button>

      <VoiceWaveformBars
        isDisabled
        isLive
        onSeek={() => {}}
        peaks={peaks}
        progressRatio={1}
      />

      <span className="shrink-0 tabular-nums text-xs text-rose-200/80">
        {formatAudioTime(recordingSeconds)} /{' '}
        {formatAudioTime(voiceMessageConfig.maxDurationSeconds)}
      </span>
    </div>
  )
}
