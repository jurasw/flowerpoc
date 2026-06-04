export interface VoiceMessage {
  id: string
  mimeType: string
  dataBase64: string
  flowerId?: string
  createdAt: string
}

const voiceMessages = new Map<string, VoiceMessage>()

export function savePendingVoiceMessage(
  mimeType: string,
  dataBase64: string,
): VoiceMessage {
  const message: VoiceMessage = {
    id: crypto.randomUUID(),
    mimeType,
    dataBase64,
    createdAt: new Date().toISOString(),
  }

  voiceMessages.set(message.id, message)
  return message
}

export function attachVoiceMessageToFlower(
  voiceMessageId: string,
  flowerId: string,
): boolean {
  const message = voiceMessages.get(voiceMessageId)

  if (!message) {
    return false
  }

  voiceMessages.set(voiceMessageId, { ...message, flowerId })
  return true
}

export function getVoiceMessageById(id: string): VoiceMessage | undefined {
  return voiceMessages.get(id)
}

export function getVoiceMessageByFlowerId(
  flowerId: string,
): VoiceMessage | undefined {
  for (const message of voiceMessages.values()) {
    if (message.flowerId === flowerId) {
      return message
    }
  }

  return undefined
}
