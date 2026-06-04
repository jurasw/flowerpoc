import { useServerFn } from '@tanstack/react-start'
import { useCallback, useEffect, useState } from 'react'

import { VoiceWaveformPlayer } from '#/components/voice/VoiceWaveformPlayer'
import { base64ToBlob } from '#/lib/voice-message-encoding'
import { useI18n } from '#/lib/i18n/i18n-context'
import getVoiceMessageAudio from '#/server/GetVoiceMessageAudio'

interface VoiceMessagePlayerProps {
  voiceMessageId: string
}

export function VoiceMessagePlayer({ voiceMessageId }: VoiceMessagePlayerProps) {
  const { t } = useI18n()
  const getVoiceMessageAudioFn = useServerFn(getVoiceMessageAudio)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

  const handleLoadError = useCallback(() => {
    setHasError(true)
  }, [])

  useEffect(() => {
    let isCancelled = false

    async function loadAudio(): Promise<void> {
      setIsLoading(true)
      setHasError(false)
      setAudioBlob(null)

      try {
        const audio = await getVoiceMessageAudioFn({
          data: { voiceMessageId },
        })

        if (isCancelled) {
          return
        }

        if (!audio) {
          setHasError(true)
          setIsLoading(false)
          return
        }

        setAudioBlob(base64ToBlob(audio.dataBase64, audio.mimeType))
        setIsLoading(false)
      } catch {
        if (!isCancelled) {
          setHasError(true)
          setIsLoading(false)
        }
      }
    }

    void loadAudio()

    return () => {
      isCancelled = true
    }
  }, [getVoiceMessageAudioFn, voiceMessageId])

  if (hasError) {
    return (
      <p className="mt-6 text-sm text-stone-500">{t.flower.voice.unavailable}</p>
    )
  }

  return (
    <div className="relative z-20 mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-4 pointer-events-auto">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold/80">
        {t.flower.voice.label}
      </p>
      <VoiceWaveformPlayer
        audioBlob={isLoading ? null : audioBlob}
        loadingLabel={t.flower.voice.loading}
        onPlaybackError={handleLoadError}
        pauseLabel={t.flower.voice.pause}
        playLabel={t.flower.voice.play}
      />
    </div>
  )
}
