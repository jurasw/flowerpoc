import {
  createRoseFormDraftStorageKey,
  createRoseFormDraftVersion,
  type CreateRoseFormDraftFields,
  type StoredCreateRoseFormDraft,
  type StoredCreateRoseFormVoice,
} from '#/lib/create-rose-form-draft-types'
import {
  isShareDeliveryMethod,
  normalizeSelectableShareDeliveryMethod,
} from '#/lib/share-delivery-types'
import { isAllowedVoiceMimeType } from '#/lib/voice-message-mime'
import { voiceMessageConfig } from '#/lib/voice-message-config'
import { base64ToBlob, blobToBase64 } from '#/lib/voice-message-encoding'

const fieldLimits = {
  senderName: 80,
  recipientName: 80,
  quote: 500,
  senderEmail: 120,
  recipientEmail: 120,
  recipientPhone: 24,
} as const

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function readTrimmedString(
  value: unknown,
  maxLength: number,
): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }

  return value.slice(0, maxLength)
}

function parseStoredVoice(value: unknown): StoredCreateRoseFormVoice | undefined {
  if (!isRecord(value)) {
    return undefined
  }

  const mimeType = readTrimmedString(value.mimeType, 80)
  const dataBase64 = readTrimmedString(value.dataBase64, voiceMessageConfig.maxBase64Length)

  if (!mimeType || !dataBase64) {
    return undefined
  }

  if (!isAllowedVoiceMimeType(mimeType)) {
    return undefined
  }

  return { mimeType, dataBase64 }
}

function parseStoredDraft(value: unknown): StoredCreateRoseFormDraft | null {
  if (!isRecord(value) || value.version !== createRoseFormDraftVersion) {
    return null
  }

  const deliveryMethod = value.deliveryMethod

  if (typeof deliveryMethod !== 'string' || !isShareDeliveryMethod(deliveryMethod)) {
    return null
  }

  const senderName = readTrimmedString(value.senderName, fieldLimits.senderName)
  const recipientName = readTrimmedString(
    value.recipientName,
    fieldLimits.recipientName,
  )
  const quote = readTrimmedString(value.quote, fieldLimits.quote)
  const senderEmail = readTrimmedString(value.senderEmail, fieldLimits.senderEmail)
  const recipientEmail = readTrimmedString(
    value.recipientEmail,
    fieldLimits.recipientEmail,
  )
  const recipientPhone = readTrimmedString(
    value.recipientPhone,
    fieldLimits.recipientPhone,
  )

  if (
    senderName === undefined ||
    recipientName === undefined ||
    quote === undefined ||
    senderEmail === undefined ||
    recipientEmail === undefined ||
    recipientPhone === undefined
  ) {
    return null
  }

  const voice = parseStoredVoice(value.voice)

  return {
    version: createRoseFormDraftVersion,
    senderName,
    recipientName,
    quote,
    senderEmail,
    deliveryMethod,
    recipientEmail,
    recipientPhone,
    voice,
  }
}

export function readCreateRoseFormDraft(): CreateRoseFormDraftFields | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(createRoseFormDraftStorageKey)

    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)
    const stored = parseStoredDraft(parsed)

    if (!stored) {
      return null
    }

    let voiceBlob: Blob | null = null
    let voiceMimeType: string | null = null

    if (stored.voice) {
      voiceBlob = base64ToBlob(stored.voice.dataBase64, stored.voice.mimeType)
      voiceMimeType = stored.voice.mimeType
    }

    return {
      senderName: stored.senderName,
      recipientName: stored.recipientName,
      quote: stored.quote,
      senderEmail: stored.senderEmail,
      deliveryMethod: normalizeSelectableShareDeliveryMethod(stored.deliveryMethod),
      recipientEmail: stored.recipientEmail,
      recipientPhone: stored.recipientPhone,
      voiceBlob,
      voiceMimeType,
    }
  } catch {
    return null
  }
}

async function serializeVoice(
  voiceBlob: Blob,
  voiceMimeType: string,
): Promise<StoredCreateRoseFormVoice | undefined> {
  if (!isAllowedVoiceMimeType(voiceMimeType)) {
    return undefined
  }

  const dataBase64 = await blobToBase64(voiceBlob)

  if (dataBase64.length > voiceMessageConfig.maxBase64Length) {
    return undefined
  }

  return { mimeType: voiceMimeType, dataBase64 }
}

export async function writeCreateRoseFormDraft(
  fields: CreateRoseFormDraftFields,
): Promise<void> {
  if (typeof window === 'undefined') {
    return
  }

  const payload: StoredCreateRoseFormDraft = {
    version: createRoseFormDraftVersion,
    senderName: fields.senderName.slice(0, fieldLimits.senderName),
    recipientName: fields.recipientName.slice(0, fieldLimits.recipientName),
    quote: fields.quote.slice(0, fieldLimits.quote),
    senderEmail: fields.senderEmail.slice(0, fieldLimits.senderEmail),
    deliveryMethod: normalizeSelectableShareDeliveryMethod(fields.deliveryMethod),
    recipientEmail: fields.recipientEmail.slice(0, fieldLimits.recipientEmail),
    recipientPhone: fields.recipientPhone.slice(0, fieldLimits.recipientPhone),
  }

  if (fields.voiceBlob && fields.voiceMimeType) {
    const voice = await serializeVoice(fields.voiceBlob, fields.voiceMimeType)

    if (voice) {
      payload.voice = voice
    }
  }

  try {
    window.localStorage.setItem(
      createRoseFormDraftStorageKey,
      JSON.stringify(payload),
    )
  } catch {
    const withoutVoice: StoredCreateRoseFormDraft = {
      version: createRoseFormDraftVersion,
      senderName: payload.senderName,
      recipientName: payload.recipientName,
      quote: payload.quote,
      senderEmail: payload.senderEmail,
      deliveryMethod: payload.deliveryMethod,
      recipientEmail: payload.recipientEmail,
      recipientPhone: payload.recipientPhone,
    }

    try {
      window.localStorage.setItem(
        createRoseFormDraftStorageKey,
        JSON.stringify(withoutVoice),
      )
    } catch {
      return
    }
  }
}

export function clearCreateRoseFormDraft(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.removeItem(createRoseFormDraftStorageKey)
  } catch {
    return
  }
}
