import { getFlowerById } from '#/lib/flower-store'
import { attachVoiceMessageToFlower } from '#/lib/voice-message-store'

export function linkFlowerVoiceMessage(
  flowerId: string,
  voiceMessageId: string,
): void {
  const flower = getFlowerById(flowerId)

  if (!flower) {
    return
  }

  attachVoiceMessageToFlower(voiceMessageId, flowerId)
}
