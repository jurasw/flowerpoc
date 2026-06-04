import { useCallback, useEffect, useRef, useState } from 'react'

import {
  createPlaceholderWaveformPeaks,
  decodeAudioWaveform,
} from '#/lib/decode-audio-waveform'
import { voiceWaveformConfig } from '#/lib/voice-waveform-config'

interface UseVoiceWaveformPlaybackOptions {
  audioBlob: Blob | null
  onError?: () => void
}

interface UseVoiceWaveformPlaybackResult {
  peaks: number[]
  durationSeconds: number
  currentSeconds: number
  progressRatio: number
  isPlaying: boolean
  isLoading: boolean
  togglePlayback: () => void
  seekToRatio: (ratio: number) => void
}

export function useVoiceWaveformPlayback({
  audioBlob,
  onError,
}: UseVoiceWaveformPlaybackOptions): UseVoiceWaveformPlaybackResult {
  const [peaks, setPeaks] = useState<number[]>([])
  const [durationSeconds, setDurationSeconds] = useState(0)
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioUrlRef = useRef<string | null>(null)

  const releaseAudioUrl = useCallback(() => {
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current)
      audioUrlRef.current = null
    }
  }, [])

  const teardownAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    releaseAudioUrl()
    setIsPlaying(false)
    setCurrentSeconds(0)
    setDurationSeconds(0)
    setPeaks([])
  }, [releaseAudioUrl])

  useEffect(() => {
    if (!audioBlob) {
      teardownAudio()
      return
    }

    let isCancelled = false

    async function preparePlayback(): Promise<void> {
      setIsLoading(true)
      teardownAudio()

      let decodedDuration = 0
      let decodedPeaks = createPlaceholderWaveformPeaks(
        voiceWaveformConfig.barCount,
      )

      try {
        const decoded = await decodeAudioWaveform(audioBlob)
        decodedPeaks = decoded.peaks
        decodedDuration = decoded.durationSeconds
      } catch {
        decodedPeaks = createPlaceholderWaveformPeaks(
          voiceWaveformConfig.barCount,
        )
      }

      if (isCancelled) {
        return
      }

      const url = URL.createObjectURL(audioBlob)
      audioUrlRef.current = url

      const audio = new Audio(url)
      audioRef.current = audio

      audio.onended = () => {
        setIsPlaying(false)
        setCurrentSeconds(audio.duration || decodedDuration)
      }

      audio.onerror = () => {
        onError?.()
        teardownAudio()
      }

      audio.ontimeupdate = () => {
        setCurrentSeconds(audio.currentTime)
      }

      audio.onloadedmetadata = () => {
        if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
          return
        }

        setDurationSeconds(audio.duration)
      }

      setPeaks(decodedPeaks)
      setDurationSeconds(decodedDuration)
      setCurrentSeconds(0)
    }

    void preparePlayback().finally(() => {
      if (!isCancelled) {
        setIsLoading(false)
      }
    })

    return () => {
      isCancelled = true
      teardownAudio()
    }
  }, [audioBlob, onError, teardownAudio])

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    void audio.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {
      onError?.()
      setIsPlaying(false)
    })
  }, [isPlaying, onError])

  const seekToRatio = useCallback(
    (ratio: number) => {
      const audio = audioRef.current

      if (!audio || durationSeconds <= 0) {
        return
      }

      const clampedRatio = Math.min(1, Math.max(0, ratio))
      audio.currentTime = clampedRatio * durationSeconds
      setCurrentSeconds(audio.currentTime)
    },
    [durationSeconds],
  )

  const progressRatio =
    durationSeconds > 0 ? Math.min(1, currentSeconds / durationSeconds) : 0

  return {
    peaks,
    durationSeconds,
    currentSeconds,
    progressRatio,
    isPlaying,
    isLoading,
    togglePlayback,
    seekToRatio,
  }
}
