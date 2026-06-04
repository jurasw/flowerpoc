import { voiceMessageConfig } from '#/lib/voice-message-config'

export function normalizeVoiceMimeType(mimeType: string): string {
  return mimeType.split(';')[0]?.trim().toLowerCase() ?? ''
}

export function isAllowedVoiceMimeType(mimeType: string): boolean {
  const normalized = normalizeVoiceMimeType(mimeType)

  return voiceMessageConfig.allowedMimeTypes.some(
    (allowed) => normalizeVoiceMimeType(allowed) === normalized,
  )
}
