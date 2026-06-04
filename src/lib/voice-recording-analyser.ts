import { voiceWaveformConfig } from '#/lib/voice-waveform-config'

export interface VoiceRecordingAnalyser {
  samplePeaks: () => number[]
  teardown: () => void
}

export function createVoiceRecordingAnalyser(
  stream: MediaStream,
): VoiceRecordingAnalyser {
  const audioContext = new AudioContext()
  void audioContext.resume()
  const source = audioContext.createMediaStreamSource(stream)
  const analyser = audioContext.createAnalyser()
  analyser.fftSize = 256
  analyser.smoothingTimeConstant = 0.72
  source.connect(analyser)

  const frequencyData = new Uint8Array(analyser.frequencyBinCount)
  const barCount = voiceWaveformConfig.barCount

  function samplePeaks(): number[] {
    analyser.getByteFrequencyData(frequencyData)
    const peaks: number[] = []
    const binCount = frequencyData.length
    const binsPerBar = Math.max(1, Math.floor(binCount / barCount))

    for (let barIndex = 0; barIndex < barCount; barIndex += 1) {
      const start = barIndex * binsPerBar
      const end = barIndex === barCount - 1 ? binCount : start + binsPerBar
      let sum = 0

      for (let binIndex = start; binIndex < end; binIndex += 1) {
        sum += frequencyData[binIndex] ?? 0
      }

      const average = sum / (end - start)
      peaks.push(average / 255)
    }

    return peaks
  }

  function teardown(): void {
    source.disconnect()
    analyser.disconnect()
    void audioContext.close()
  }

  return { samplePeaks, teardown }
}
