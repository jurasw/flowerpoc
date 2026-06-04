import { isAllowedVoiceMimeType } from '#/lib/voice-message-mime'
import { voiceMessageConfig } from '#/lib/voice-message-config'

export interface VoiceMessageUploadInput {
  mimeType: string
  dataBase64: string
}

export function validateVoiceMessageUploadInput(
  data: VoiceMessageUploadInput,
): VoiceMessageUploadInput {
  const mimeType = data.mimeType.trim()
  const dataBase64 = data.dataBase64.trim()

  if (!mimeType || !dataBase64) {
    throw new Error('Voice message mime type and audio data are required.')
  }

  if (!isAllowedVoiceMimeType(mimeType)) {
    throw new Error('Unsupported voice message format.')
  }

  if (dataBase64.length > voiceMessageConfig.maxBase64Length) {
    throw new Error('Voice message is too large.')
  }

  if (!/^[A-Za-z0-9+/]+=*$/.test(dataBase64)) {
    throw new Error('Invalid voice message encoding.')
  }

  return { mimeType, dataBase64 }
}
