import { voiceWaveformConfig } from '#/lib/voice-waveform-config'

export function buildHeroExampleVoicePeaks(seed: number): number[] {
  return Array.from({ length: voiceWaveformConfig.barCount }, (_, index) => {
    const position = index / voiceWaveformConfig.barCount
    const wave =
      Math.abs(Math.sin(position * Math.PI * 5 + seed)) * 0.55 +
      Math.abs(Math.cos(position * Math.PI * 2.3 + seed * 0.7)) * 0.25

    return 0.2 + wave
  })
}
