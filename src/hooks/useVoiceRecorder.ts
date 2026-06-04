import { useCallback, useEffect, useRef, useState } from 'react'

import type { RestoredVoiceRecording } from '#/lib/create-rose-form-draft-types'
import { pickRecorderMimeType } from '#/lib/pick-recorder-mime-type'
import type { VoiceRecorderError } from '#/lib/voice-recorder-error'
import { voiceMessageConfig } from '#/lib/voice-message-config'
import {
  createVoiceRecordingAnalyser,
  type VoiceRecordingAnalyser,
} from '#/lib/voice-recording-analyser'

interface UseVoiceRecorderOptions {
  onError: (error: VoiceRecorderError) => void
}

interface UseVoiceRecorderResult {
  recordedBlob: Blob | null
  recordedMimeType: string | null
  isRecording: boolean
  recordingSeconds: number
  recordingPeaks: number[]
  canRecord: boolean
  startRecording: () => Promise<void>
  stopRecording: () => void
  clearRecording: () => void
  restoreRecording: (recording: RestoredVoiceRecording) => void
}

export function useVoiceRecorder({
  onError,
}: UseVoiceRecorderOptions): UseVoiceRecorderResult {
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [recordedMimeType, setRecordedMimeType] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [recordingPeaks, setRecordingPeaks] = useState<number[]>([])

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const recordingTimerRef = useRef<number | null>(null)
  const recordingAnalyserRef = useRef<VoiceRecordingAnalyser | null>(null)
  const recordingAnimationFrameRef = useRef<number | null>(null)

  const recorderMimeType = pickRecorderMimeType()
  const canRecord = recorderMimeType !== undefined

  const stopMediaStream = useCallback(() => {
    if (mediaStreamRef.current) {
      for (const track of mediaStreamRef.current.getTracks()) {
        track.stop()
      }

      mediaStreamRef.current = null
    }
  }, [])

  const clearRecordingTimer = useCallback(() => {
    if (recordingTimerRef.current !== null) {
      window.clearInterval(recordingTimerRef.current)
      recordingTimerRef.current = null
    }
  }, [])

  const stopRecordingAnalyser = useCallback(() => {
    if (recordingAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(recordingAnimationFrameRef.current)
      recordingAnimationFrameRef.current = null
    }

    if (recordingAnalyserRef.current) {
      recordingAnalyserRef.current.teardown()
      recordingAnalyserRef.current = null
    }

    setRecordingPeaks([])
  }, [])

  const startRecordingAnalyser = useCallback((stream: MediaStream) => {
    stopRecordingAnalyser()

    const analyser = createVoiceRecordingAnalyser(stream)
    recordingAnalyserRef.current = analyser

    const sampleFrame = (): void => {
      setRecordingPeaks(analyser.samplePeaks())
      recordingAnimationFrameRef.current = window.requestAnimationFrame(sampleFrame)
    }

    recordingAnimationFrameRef.current = window.requestAnimationFrame(sampleFrame)
  }, [stopRecordingAnalyser])

  const clearRecording = useCallback(() => {
    setRecordedBlob(null)
    setRecordedMimeType(null)
    setRecordingSeconds(0)
  }, [])

  const restoreRecording = useCallback((recording: RestoredVoiceRecording) => {
    setRecordedBlob(recording.blob)
    setRecordedMimeType(recording.mimeType)
    setRecordingSeconds(0)
  }, [])

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current

    if (recorder && recorder.state !== 'inactive') {
      recorder.stop()
    }
  }, [])

  const startRecordingTimer = useCallback(() => {
    clearRecordingTimer()

    recordingTimerRef.current = window.setInterval(() => {
      setRecordingSeconds((previous) => {
        const next = previous + 1

        if (next >= voiceMessageConfig.maxDurationSeconds) {
          stopRecording()
        }

        return next
      })
    }, 1000)
  }, [clearRecordingTimer, stopRecording])

  const startRecording = useCallback(async () => {
    if (!recorderMimeType) {
      onError('unsupportedBrowser')
      return
    }

    clearRecording()

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream
      chunksRef.current = []

      const recorder = new MediaRecorder(stream, { mimeType: recorderMimeType })
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      recorder.onerror = () => {
        clearRecordingTimer()
        stopRecordingAnalyser()
        setIsRecording(false)
        stopMediaStream()
        chunksRef.current = []
        mediaRecorderRef.current = null
        onError('noAudioCaptured')
      }

      recorder.onstop = () => {
        clearRecordingTimer()
        stopRecordingAnalyser()
        setIsRecording(false)
        stopMediaStream()

        const blob = new Blob(chunksRef.current, { type: recorderMimeType })
        chunksRef.current = []
        mediaRecorderRef.current = null

        if (blob.size === 0) {
          onError('noAudioCaptured')
          return
        }

        setRecordedBlob(blob)
        setRecordedMimeType(recorderMimeType)
        setRecordingSeconds(0)
      }

      recorder.start(250)
      startRecordingAnalyser(stream)
      setIsRecording(true)
      setRecordingSeconds(0)
      startRecordingTimer()
    } catch {
      stopRecordingAnalyser()
      stopMediaStream()
      onError('microphoneRequired')
    }
  }, [
    clearRecording,
    clearRecordingTimer,
    onError,
    recorderMimeType,
    startRecordingAnalyser,
    startRecordingTimer,
    stopMediaStream,
    stopRecording,
    stopRecordingAnalyser,
  ])

  useEffect(() => {
    return () => {
      clearRecordingTimer()
      stopRecordingAnalyser()
      stopMediaStream()

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [clearRecordingTimer, stopMediaStream, stopRecordingAnalyser])

  return {
    recordedBlob,
    recordedMimeType,
    isRecording,
    recordingSeconds,
    recordingPeaks,
    canRecord,
    startRecording,
    stopRecording,
    clearRecording,
    restoreRecording,
  }
}
