import { memo, useState } from 'react'

import { CreateRoseFormFields } from '#/components/landing/CreateRoseFormFields'
import { RoseScene } from '#/components/RoseScene'
import { useCreateRoseFormDraft } from '#/hooks/useCreateRoseFormDraft'
import { useI18n } from '#/lib/i18n/i18n-context'
import { formatProductPrice, productConfig } from '#/lib/product-config'
import {
  createCheckoutSession,
  savePendingVoiceMessage,
} from '#/lib/checkout-api'
import { blobToBase64 } from '#/lib/voice-message-encoding'

const RosePreviewPanel = memo(function RosePreviewPanel() {
  const { t } = useI18n()

  return (
    <section className="flex min-h-0 flex-col lg:flex-1">
      <div className="relative h-[min(340px,48svh)] min-h-0 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1012] via-[#120a0c] to-[#0a0608] p-1 shadow-2xl shadow-black/60 ring-1 ring-white/10 sm:h-[380px] lg:h-auto lg:min-h-[480px] lg:flex-1">
        <div className="pointer-events-none absolute inset-x-10 -top-24 h-64 rounded-full bg-wine/25 blur-[110px]" />
        <RoseScene className="absolute inset-0" deferUntilVisible />
        <span className="pointer-events-none absolute left-6 top-6 text-[11px] font-medium uppercase tracking-[0.3em] text-gold/70">
          {t.createForm.preview.label}
        </span>
      </div>
      <p className="mt-4 shrink-0 text-center text-sm text-stone-500">
        {t.createForm.preview.caption}
      </p>
    </section>
  )
})

interface CreateRoseFormProps {
  isCanceled?: boolean
}

export function CreateRoseForm({
  isCanceled = false,
}: CreateRoseFormProps) {
  const { locale, t } = useI18n()
  const draft = useCreateRoseFormDraft()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const error = submitError

  const restoredVoiceRecording =
    draft.isHydrated && draft.voiceBlob && draft.voiceMimeType
      ? { blob: draft.voiceBlob, mimeType: draft.voiceMimeType }
      : null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      let voiceMessageId: string | undefined

      if (draft.voiceBlob && draft.voiceMimeType) {
        const upload = await savePendingVoiceMessage({
          mimeType: draft.voiceMimeType,
          dataBase64: await blobToBase64(draft.voiceBlob),
        })
        const uploadedVoiceMessageId = upload?.voiceMessageId

        if (!uploadedVoiceMessageId) {
          throw new Error(t.createForm.errors.voiceUploadFailed)
        }

        voiceMessageId = uploadedVoiceMessageId
      }

      const checkout = await createCheckoutSession({
        senderName: draft.senderName,
        recipientName: draft.recipientName,
        quote: draft.quote,
        senderEmail: draft.senderEmail,
        deliveryMethod: draft.deliveryMethod,
        recipientEmail:
          draft.deliveryMethod === 'email' ? draft.recipientEmail : undefined,
        recipientPhone:
          draft.deliveryMethod === 'phone' ? draft.recipientPhone : undefined,
        locale,
        voiceMessageId,
      })
      window.location.assign(checkout.url)
    } catch (caughtError) {
      const fallbackMessage =
        draft.voiceBlob && draft.voiceMimeType
          ? t.createForm.errors.voiceUploadFailed
          : t.createForm.errors.checkoutFailed

      setSubmitError(
        caughtError instanceof Error ? caughtError.message : fallbackMessage,
      )
      setIsSubmitting(false)
    }
  }

  const payButtonLabel = t.createForm.payButton(formatProductPrice())

  return (
    <section
      className="border-t border-white/5 bg-black px-4 py-20 sm:px-6 sm:py-24"
      id="create"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-gold/70">
          {t.createForm.eyebrow}
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl font-medium text-white sm:text-5xl">
          {t.createForm.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-stone-500">
          {t.createForm.subtitle}
        </p>

        <div className="mt-14 flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-14">
          <div className="flex flex-1 flex-col">
            {isCanceled ? (
              <p className="mb-6 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-stone-400">
                {t.createForm.canceledNotice}
              </p>
            ) : null}

            <CreateRoseFormFields
              deliveryMethod={draft.deliveryMethod}
              error={error}
              isFinalizing={false}
              isSubmitting={isSubmitting}
              onDeliveryMethodChange={draft.setDeliveryMethod}
              onQuoteChange={draft.setQuote}
              onRecipientEmailChange={draft.setRecipientEmail}
              onRecipientNameChange={draft.setRecipientName}
              onRecipientPhoneChange={draft.setRecipientPhone}
              onSenderEmailChange={draft.setSenderEmail}
              onSenderNameChange={draft.setSenderName}
              onSubmit={handleSubmit}
              onVoiceError={(message) => setSubmitError(message)}
              onVoiceRecordingChange={draft.setVoiceRecording}
              payButtonLabel={payButtonLabel}
              quote={draft.quote}
              recipientEmail={draft.recipientEmail}
              recipientName={draft.recipientName}
              recipientPhone={draft.recipientPhone}
              restoredVoiceRecording={restoredVoiceRecording}
              senderEmail={draft.senderEmail}
              senderName={draft.senderName}
            />
          </div>

          <RosePreviewPanel />
        </div>
      </div>
    </section>
  )
}
