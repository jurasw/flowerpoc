import { VoiceMessageRecorder } from '#/components/landing/VoiceMessageRecorder'
import { ShareDeliveryFields } from '#/components/landing/ShareDeliveryFields'
import type { RestoredVoiceRecording } from '#/lib/create-rose-form-draft-types'
import type { ShareDeliveryMethod } from '#/lib/share-delivery-types'
import { useI18n } from '#/lib/i18n/i18n-context'

const inputClassName =
  'w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-rose-300/40 focus:ring-2 focus:ring-rose-300/10'

const labelClassName =
  'text-xs font-medium uppercase tracking-[0.12em] text-stone-500'

interface CreateRoseFormFieldsProps {
  senderName: string
  recipientName: string
  quote: string
  senderEmail: string
  deliveryMethod: ShareDeliveryMethod
  recipientEmail: string
  error: string | null
  isSubmitting: boolean
  isFinalizing: boolean
  payButtonLabel: string
  restoredVoiceRecording?: RestoredVoiceRecording | null
  onSenderNameChange: (value: string) => void
  onRecipientNameChange: (value: string) => void
  onQuoteChange: (value: string) => void
  onSenderEmailChange: (value: string) => void
  onDeliveryMethodChange: (value: ShareDeliveryMethod) => void
  onRecipientEmailChange: (value: string) => void
  onVoiceError: (message: string) => void
  onVoiceRecordingChange: (blob: Blob | null, mimeType: string | null) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function CreateRoseFormFields({
  senderName,
  recipientName,
  quote,
  senderEmail,
  deliveryMethod,
  recipientEmail,
  error,
  isSubmitting,
  isFinalizing,
  payButtonLabel,
  restoredVoiceRecording = null,
  onSenderNameChange,
  onRecipientNameChange,
  onQuoteChange,
  onSenderEmailChange,
  onDeliveryMethodChange,
  onRecipientEmailChange,
  onVoiceError,
  onVoiceRecordingChange,
  onSubmit,
}: CreateRoseFormFieldsProps) {
  const { t } = useI18n()

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className={labelClassName}>{t.createForm.senderLabel}</span>
          <input
            className={inputClassName}
            maxLength={80}
            onChange={(event) => onSenderNameChange(event.target.value)}
            placeholder={t.createForm.senderPlaceholder}
            required
            value={senderName}
          />
        </label>

        <label className="block space-y-2">
          <span className={labelClassName}>{t.createForm.recipientLabel}</span>
          <input
            className={inputClassName}
            maxLength={80}
            onChange={(event) => onRecipientNameChange(event.target.value)}
            placeholder={t.createForm.recipientPlaceholder}
            required
            value={recipientName}
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className={labelClassName}>{t.createForm.messageLabel}</span>
        <textarea
          className={`min-h-36 resize-none ${inputClassName}`}
          maxLength={500}
          onChange={(event) => onQuoteChange(event.target.value)}
          placeholder={t.createForm.messagePlaceholder}
          required
          value={quote}
        />
      </label>

      <ShareDeliveryFields
        deliveryMethod={deliveryMethod}
        onDeliveryMethodChange={onDeliveryMethodChange}
        onRecipientEmailChange={onRecipientEmailChange}
        onSenderEmailChange={onSenderEmailChange}
        recipientEmail={recipientEmail}
        senderEmail={senderEmail}
      />

      <VoiceMessageRecorder
        onError={onVoiceError}
        onRecordingChange={onVoiceRecordingChange}
        restoredRecording={restoredVoiceRecording}
      />

      {error ? (
        <p className="rounded-lg border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}

      <button
        className="inline-flex w-full shrink-0 items-center justify-center rounded-lg bg-wine px-5 py-3.5 text-sm font-medium tracking-wide text-white shadow-lg shadow-wine/20 transition hover:bg-wine-deep disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting || isFinalizing}
        type="submit"
      >
        {isSubmitting ? t.createForm.redirecting : payButtonLabel}
      </button>
    </form>
  )
}
