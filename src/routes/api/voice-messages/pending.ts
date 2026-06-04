import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { savePendingVoiceMessage } from '#/lib/voice-message-store'
import {
  validateVoiceMessageUploadInput,
  type VoiceMessageUploadInput,
} from '#/lib/validate-voice-message-input'

export const Route = createFileRoute('/api/voice-messages/pending')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as VoiceMessageUploadInput

        try {
          const data = validateVoiceMessageUploadInput(body)
          const message = savePendingVoiceMessage(data.mimeType, data.dataBase64)

          return json({ voiceMessageId: message.id })
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Invalid voice message.'

          return json({ error: message }, { status: 400 })
        }
      },
    },
  },
})
