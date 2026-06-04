import { Mp3Encoder } from '@breezystack/lamejs'

import { voiceMessageConfig } from '#/lib/voice-message-config'

const mp3EncoderSampleBlockSize = 1152

function mixToMono(audioBuffer: AudioBuffer): Float32Array {
  if (audioBuffer.numberOfChannels === 1) {
    return audioBuffer.getChannelData(0)
  }

  const left = audioBuffer.getChannelData(0)
  const right = audioBuffer.getChannelData(1)
  const mono = new Float32Array(audioBuffer.length)

  for (let index = 0; index < audioBuffer.length; index += 1) {
    mono[index] = ((left[index] ?? 0) + (right[index] ?? 0)) / 2
  }

  return mono
}

function float32ToInt16(samples: Float32Array): Int16Array {
  const int16 = new Int16Array(samples.length)

  for (let index = 0; index < samples.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, samples[index] ?? 0))
    int16[index] = sample < 0 ? sample * 0x8000 : sample * 0x7fff
  }

  return int16
}

function concatMp3Chunks(chunks: Uint8Array[]): Blob {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  const merged = new Uint8Array(totalLength)
  let offset = 0

  for (const chunk of chunks) {
    merged.set(chunk, offset)
    offset += chunk.length
  }

  return new Blob([merged], { type: voiceMessageConfig.outputMimeType })
}

export async function encodeVoiceBlobToMp3(sourceBlob: Blob): Promise<Blob> {
  const audioContext = new AudioContext()

  try {
    const arrayBuffer = await sourceBlob.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0))
    const monoSamples = mixToMono(audioBuffer)
    const pcmSamples = float32ToInt16(monoSamples)
    const encoder = new Mp3Encoder(
      1,
      audioBuffer.sampleRate,
      voiceMessageConfig.mp3BitRateKbps,
    )
    const mp3Chunks: Uint8Array[] = []

    for (
      let offset = 0;
      offset < pcmSamples.length;
      offset += mp3EncoderSampleBlockSize
    ) {
      const blockEnd = Math.min(
        offset + mp3EncoderSampleBlockSize,
        pcmSamples.length,
      )
      const block = pcmSamples.subarray(offset, blockEnd)
      const encoded = encoder.encodeBuffer(block)

      if (encoded.length > 0) {
        mp3Chunks.push(encoded)
      }
    }

    const flushed = encoder.flush()

    if (flushed.length > 0) {
      mp3Chunks.push(flushed)
    }

    if (mp3Chunks.length === 0) {
      throw new Error('MP3 encoding produced no audio data.')
    }

    return concatMp3Chunks(mp3Chunks)
  } finally {
    await audioContext.close()
  }
}
