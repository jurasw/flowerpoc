import { getFlowerById } from '#/lib/flower-store'
import { attachVoiceMessageToFlower } from '#/lib/voice-message-store'

export async function linkFlowerVoiceMessage(
  flowerId: string,
  voiceMessageId: string,
): Promise<void> {
  const flower = await getFlowerById(flowerId)

  if (!flower) {
    return
  }

  attachVoiceMessageToFlower(voiceMessageId, flowerId)
}
