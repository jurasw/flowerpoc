import { voiceWaveformConfig } from '#/lib/voice-waveform-config'

export interface DecodedAudioWaveform {
  peaks: number[]
  durationSeconds: number
}

function computePeaks(channelData: Float32Array, barCount: number): number[] {
  const samplesPerBar = Math.max(1, Math.floor(channelData.length / barCount))
  const peaks: number[] = []

  for (let barIndex = 0; barIndex < barCount; barIndex += 1) {
    const start = barIndex * samplesPerBar
    const end =
      barIndex === barCount - 1
        ? channelData.length
        : start + samplesPerBar
    let peak = 0

    for (let sampleIndex = start; sampleIndex < end; sampleIndex += 1) {
      const sample = channelData[sampleIndex] ?? 0
      const amplitude = Math.abs(sample)

      if (amplitude > peak) {
        peak = amplitude
      }
    }

    peaks.push(peak)
  }

  const maxPeak = Math.max(...peaks, 0.001)

  return peaks.map((peak) => peak / maxPeak)
}

export function createPlaceholderWaveformPeaks(barCount: number): number[] {
  const peaks: number[] = []

  for (let index = 0; index < barCount; index += 1) {
    const phase = (index / barCount) * Math.PI * 5
    const value = 0.32 + 0.42 * Math.abs(Math.sin(phase))
    peaks.push(Math.min(1, value))
  }

  return peaks
}

async function resumeAudioContextIfNeeded(
  audioContext: AudioContext,
): Promise<void> {
  if (audioContext.state === 'suspended') {
    await audioContext.resume()
  }
}

export async function decodeAudioWaveform(
  blob: Blob,
  barCount: number = voiceWaveformConfig.barCount,
): Promise<DecodedAudioWaveform> {
  const arrayBuffer = await blob.arrayBuffer()
  const audioContext = new AudioContext()

  try {
    await resumeAudioContextIfNeeded(audioContext)
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0))
    const channelData = audioBuffer.getChannelData(0)

    return {
      peaks: computePeaks(channelData, barCount),
      durationSeconds: audioBuffer.duration,
    }
  } finally {
    await audioContext.close()
  }
}
