import { createServerFn } from '@tanstack/react-start'

import { savePendingVoiceMessage } from '#/lib/voice-message-store'
import {
  validateVoiceMessageUploadInput,
  type VoiceMessageUploadInput,
} from '#/lib/validate-voice-message-input'

export interface SavePendingVoiceMessageResult {
  voiceMessageId: string
}

export default createServerFn({ method: 'POST' })
  .inputValidator((data: VoiceMessageUploadInput) =>
    validateVoiceMessageUploadInput(data),
  )
  .handler(async ({ data }): Promise<SavePendingVoiceMessageResult> => {
    const message = savePendingVoiceMessage(data.mimeType, data.dataBase64)

    return { voiceMessageId: message.id }
  })
