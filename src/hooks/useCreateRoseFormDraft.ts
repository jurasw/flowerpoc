import { useCallback, useEffect, useRef, useState } from 'react'

import type { CreateRoseFormDraftFields } from '#/lib/create-rose-form-draft-types'
import {
  clearCreateRoseFormDraft,
  readCreateRoseFormDraft,
  writeCreateRoseFormDraft,
} from '#/lib/create-rose-form-draft-store'
import type { ShareDeliveryMethod } from '#/lib/share-delivery-types'

const draftSaveDelayMs = 400

interface UseCreateRoseFormDraftResult extends CreateRoseFormDraftFields {
  isHydrated: boolean
  setSenderName: (value: string) => void
  setRecipientName: (value: string) => void
  setQuote: (value: string) => void
  setSenderEmail: (value: string) => void
  setDeliveryMethod: (value: ShareDeliveryMethod) => void
  setRecipientEmail: (value: string) => void
  setRecipientPhone: (value: string) => void
  setVoiceRecording: (blob: Blob | null, mimeType: string | null) => void
  clearDraft: () => void
}

export function useCreateRoseFormDraft(): UseCreateRoseFormDraftResult {
  const [isHydrated, setIsHydrated] = useState(false)
  const [senderName, setSenderName] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [quote, setQuote] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [deliveryMethod, setDeliveryMethod] =
    useState<ShareDeliveryMethod>('link')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [recipientPhone, setRecipientPhone] = useState('')
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null)
  const [voiceMimeType, setVoiceMimeType] = useState<string | null>(null)
  const saveTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const draft = readCreateRoseFormDraft()

    if (draft) {
      setSenderName(draft.senderName)
      setRecipientName(draft.recipientName)
      setQuote(draft.quote)
      setSenderEmail(draft.senderEmail)
      setDeliveryMethod(draft.deliveryMethod)
      setRecipientEmail(draft.recipientEmail)
      setRecipientPhone(draft.recipientPhone)
      setVoiceBlob(draft.voiceBlob)
      setVoiceMimeType(draft.voiceMimeType)
    }

    setIsHydrated(true)
  }, [])

  const clearDraft = useCallback(() => {
    clearCreateRoseFormDraft()
    setSenderName('')
    setRecipientName('')
    setQuote('')
    setSenderEmail('')
    setDeliveryMethod('link')
    setRecipientEmail('')
    setRecipientPhone('')
    setVoiceBlob(null)
    setVoiceMimeType(null)
  }, [])

  const setVoiceRecording = useCallback(
    (blob: Blob | null, mimeType: string | null) => {
      setVoiceBlob(blob)
      setVoiceMimeType(mimeType)
    },
    [],
  )

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    if (saveTimerRef.current !== null) {
      window.clearTimeout(saveTimerRef.current)
    }

    saveTimerRef.current = window.setTimeout(() => {
      void writeCreateRoseFormDraft({
        senderName,
        recipientName,
        quote,
        senderEmail,
        deliveryMethod,
        recipientEmail,
        recipientPhone,
        voiceBlob,
        voiceMimeType,
      })
    }, draftSaveDelayMs)

    return () => {
      if (saveTimerRef.current !== null) {
        window.clearTimeout(saveTimerRef.current)
      }
    }
  }, [
    deliveryMethod,
    isHydrated,
    quote,
    recipientEmail,
    recipientName,
    recipientPhone,
    senderEmail,
    senderName,
    voiceBlob,
    voiceMimeType,
  ])

  return {
    isHydrated,
    senderName,
    recipientName,
    quote,
    senderEmail,
    deliveryMethod,
    recipientEmail,
    recipientPhone,
    voiceBlob,
    voiceMimeType,
    setSenderName,
    setRecipientName,
    setQuote,
    setSenderEmail,
    setDeliveryMethod,
    setRecipientEmail,
    setRecipientPhone,
    setVoiceRecording,
    clearDraft,
  }
}
