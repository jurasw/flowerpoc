import { Mic, Square, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'

import { VoiceWaveformPlayer } from '#/components/voice/VoiceWaveformPlayer'
import { useVoiceRecorder } from '#/hooks/useVoiceRecorder'
import type { RestoredVoiceRecording } from '#/lib/create-rose-form-draft-types'
import { useI18n } from '#/lib/i18n/i18n-context'
import type { VoiceRecorderError } from '#/lib/voice-recorder-error'
import { voiceMessageConfig } from '#/lib/voice-message-config'

interface VoiceMessageRecorderProps {
  onError: (message: string) => void
  onRecordingChange: (blob: Blob | null, mimeType: string | null) => void
  restoredRecording?: RestoredVoiceRecording | null
}

function formatRecordingTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${minutes}:${remainder.toString().padStart(2, '0')}`
}

const recordingPillClassName =
  'rounded-full border border-rose-400/30 bg-rose-500/10 text-rose-200'

const recordingStopButtonClassName = `${recordingPillClassName} inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition hover:bg-rose-500/20`

export function VoiceMessageRecorder({
  onError,
  onRecordingChange,
  restoredRecording = null,
}: VoiceMessageRecorderProps) {
  const { t } = useI18n()
  const voiceErrors = t.createForm.voice.errors

  const handleRecorderError = useCallback(
    (error: VoiceRecorderError) => {
      onError(voiceErrors[error])
    },
    [onError, voiceErrors],
  )

  const handlePlaybackError = useCallback(() => {
    onError(voiceErrors.previewPlaybackFailed)
  }, [onError, voiceErrors.previewPlaybackFailed])

  const voice = useVoiceRecorder({ onError: handleRecorderError })
  const { restoreRecording } = voice
  const hasRestoredRecordingRef = useRef(false)

  useEffect(() => {
    if (!restoredRecording || hasRestoredRecordingRef.current) {
      return
    }

    restoreRecording(restoredRecording)
    hasRestoredRecordingRef.current = true
  }, [restoredRecording, restoreRecording])

  useEffect(() => {
    onRecordingChange(voice.recordedBlob, voice.recordedMimeType)
  }, [onRecordingChange, voice.recordedBlob, voice.recordedMimeType])

  function handleClear(): void {
    voice.clearRecording()
  }

  function handleStop(): void {
    voice.stopRecording()
  }

  async function handleStart(): Promise<void> {
    await voice.startRecording()
  }

  const hasRecording = voice.recordedBlob !== null

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
            {t.createForm.voice.label}
          </p>
          <p className="mt-1 text-sm text-stone-400">
            {t.createForm.voice.hint(voiceMessageConfig.maxDurationSeconds)}
          </p>
        </div>
      </div>

      {voice.isRecording ? (
        <div className="mt-3 flex items-center gap-2">
          <span
            className={`${recordingPillClassName} px-3 py-1 text-xs font-medium`}
          >
            {t.createForm.voice.recording(
              formatRecordingTime(voice.recordingSeconds),
            )}
          </span>
          <button
            aria-label={t.createForm.voice.stop}
            className={recordingStopButtonClassName}
            onClick={handleStop}
            type="button"
          >
            <Square className="size-3.5 fill-current" />
          </button>
        </div>
      ) : null}

      {!voice.canRecord ? (
        <p className="mt-4 text-sm text-stone-500">
          {t.createForm.voice.unsupported}
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {!voice.isRecording && !hasRecording ? (
            <button
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-stone-100 transition hover:border-rose-300/30 hover:bg-white/[0.1]"
              onClick={() => {
                void handleStart()
              }}
              type="button"
            >
              <Mic className="size-4" />
              {t.createForm.voice.record}
            </button>
          ) : null}

          {hasRecording ? (
            <>
              <button
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-stone-400 transition hover:border-white/20 hover:text-stone-200"
                onClick={() => {
                  void handleStart()
                }}
                type="button"
              >
                <Mic className="size-4" />
                {t.createForm.voice.rerecord}
              </button>
              <button
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-sm text-stone-500 transition hover:border-rose-400/30 hover:text-rose-200"
                onClick={handleClear}
                type="button"
              >
                <Trash2 className="size-4" />
                {t.createForm.voice.remove}
              </button>
            </>
          ) : null}
        </div>
      )}

      {hasRecording ? (
        <>
          <VoiceWaveformPlayer
            audioBlob={voice.recordedBlob}
            loadingLabel={t.createForm.voice.waveformLoading}
            onPlaybackError={handlePlaybackError}
            pauseLabel={t.createForm.voice.pausePreview}
            playLabel={t.createForm.voice.playPreview}
          />
          <p className="mt-2 text-sm text-rose-200/80">
            {t.createForm.voice.attached}
          </p>
        </>
      ) : null}
    </div>
  )
}
