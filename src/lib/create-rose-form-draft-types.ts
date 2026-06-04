import type { ShareDeliveryMethod } from '#/lib/share-delivery-types'

export const createRoseFormDraftVersion = 1

export const createRoseFormDraftStorageKey = 'flowerpoc:create-rose-draft'

export interface StoredCreateRoseFormVoice {
  mimeType: string
  dataBase64: string
}

export interface StoredCreateRoseFormDraft {
  version: typeof createRoseFormDraftVersion
  senderName: string
  recipientName: string
  quote: string
  senderEmail: string
  deliveryMethod: ShareDeliveryMethod
  recipientEmail: string
  recipientPhone: string
  voice?: StoredCreateRoseFormVoice
}

export interface CreateRoseFormDraftFields {
  senderName: string
  recipientName: string
  quote: string
  senderEmail: string
  deliveryMethod: ShareDeliveryMethod
  recipientEmail: string
  recipientPhone: string
  voiceBlob: Blob | null
  voiceMimeType: string | null
}

export interface RestoredVoiceRecording {
  blob: Blob
  mimeType: string
}
