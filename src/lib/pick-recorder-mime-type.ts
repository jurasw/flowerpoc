import { voiceMessageConfig } from '#/lib/voice-message-config'

export function pickRecorderMimeType(): string | undefined {
  if (typeof MediaRecorder === 'undefined') {
    return undefined
  }

  for (const mimeType of voiceMessageConfig.allowedMimeTypes) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return mimeType
    }
  }

  return undefined
}
