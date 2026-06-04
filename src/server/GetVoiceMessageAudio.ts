import { createServerFn } from '@tanstack/react-start'

import { getVoiceMessageById } from '#/lib/voice-message-store'

export interface VoiceMessageAudioResult {
  mimeType: string
  dataBase64: string
}

export default createServerFn({ method: 'GET' })
  .inputValidator((data: { voiceMessageId: string }) => {
    const voiceMessageId = data.voiceMessageId.trim()

    if (!voiceMessageId) {
      throw new Error('Voice message id is required.')
    }

    return { voiceMessageId }
  })
  .handler(async ({ data }): Promise<VoiceMessageAudioResult | null> => {
    const message = getVoiceMessageById(data.voiceMessageId)

    if (!message) {
      return null
    }

    return {
      mimeType: message.mimeType,
      dataBase64: message.dataBase64,
    }
  })
