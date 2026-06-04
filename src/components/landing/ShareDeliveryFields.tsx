import { Link2, Mail, Smartphone } from 'lucide-react'

import type { ShareDeliveryMethod } from '#/lib/share-delivery-types'
import { useI18n } from '#/lib/i18n/i18n-context'

const inputClassName =
  'w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-rose-300/40 focus:ring-2 focus:ring-rose-300/10'

const labelClassName =
  'text-xs font-medium uppercase tracking-[0.12em] text-stone-500'

interface ShareDeliveryFieldsProps {
  senderEmail: string
  deliveryMethod: ShareDeliveryMethod
  recipientEmail: string
  recipientPhone: string
  onSenderEmailChange: (value: string) => void
  onDeliveryMethodChange: (value: ShareDeliveryMethod) => void
  onRecipientEmailChange: (value: string) => void
  onRecipientPhoneChange: (value: string) => void
}

export function ShareDeliveryFields({
  senderEmail,
  deliveryMethod,
  recipientEmail,
  recipientPhone,
  onSenderEmailChange,
  onDeliveryMethodChange,
  onRecipientEmailChange,
  onRecipientPhoneChange,
}: ShareDeliveryFieldsProps) {
  const { t } = useI18n()
  const delivery = t.createForm.delivery

  const methods: {
    value: ShareDeliveryMethod
    icon: typeof Mail
    label: string
  }[] = [
    { value: 'email', icon: Mail, label: delivery.methodEmail },
    { value: 'phone', icon: Smartphone, label: delivery.methodPhone },
    { value: 'link', icon: Link2, label: delivery.methodLink },
  ]

  return (
    <div className="space-y-5">
      <label className="block space-y-2">
        <span className={labelClassName}>{delivery.senderEmailLabel}</span>
        <input
          autoComplete="email"
          className={inputClassName}
          inputMode="email"
          maxLength={120}
          onChange={(event) => onSenderEmailChange(event.target.value)}
          placeholder={delivery.senderEmailPlaceholder}
          required
          type="email"
          value={senderEmail}
        />
      </label>

      <fieldset className="space-y-3">
        <legend className={labelClassName}>{delivery.methodLegend}</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {methods.map((method) => {
            const isSelected = deliveryMethod === method.value

            return (
              <label
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border px-3 py-4 text-center transition ${
                  isSelected
                    ? 'border-rose-300/50 bg-rose-500/10 text-stone-100'
                    : 'border-white/10 bg-white/[0.04] text-stone-400 hover:border-white/20'
                }`}
                key={method.value}
              >
                <input
                  checked={isSelected}
                  className="sr-only"
                  name="deliveryMethod"
                  onChange={() => onDeliveryMethodChange(method.value)}
                  type="radio"
                  value={method.value}
                />
                <method.icon className="size-5 text-rose-300/90" strokeWidth={1.5} />
                <span className="text-sm font-medium">{method.label}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {deliveryMethod === 'email' ? (
        <label className="block space-y-2">
          <span className={labelClassName}>{delivery.recipientEmailLabel}</span>
          <input
            autoComplete="email"
            className={inputClassName}
            inputMode="email"
            maxLength={120}
            onChange={(event) => onRecipientEmailChange(event.target.value)}
            placeholder={delivery.recipientEmailPlaceholder}
            required
            type="email"
            value={recipientEmail}
          />
        </label>
      ) : null}

      {deliveryMethod === 'phone' ? (
        <label className="block space-y-2">
          <span className={labelClassName}>{delivery.recipientPhoneLabel}</span>
          <input
            autoComplete="tel"
            className={inputClassName}
            inputMode="tel"
            maxLength={24}
            onChange={(event) => onRecipientPhoneChange(event.target.value)}
            placeholder={delivery.recipientPhonePlaceholder}
            required
            type="tel"
            value={recipientPhone}
          />
        </label>
      ) : null}

      {deliveryMethod === 'link' ? (
        <p className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-stone-400">
          {delivery.linkMethodHint}
        </p>
      ) : null}
    </div>
  )
}
