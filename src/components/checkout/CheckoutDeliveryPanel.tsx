import { Check, CheckCircle2, Copy, Mail, MessageSquare } from 'lucide-react'
import { useState } from 'react'

import { FlowerShareQrDownload } from '#/components/checkout/FlowerShareQrDownload'
import type { CheckoutResult } from '#/lib/flower-types'
import { useI18n } from '#/lib/i18n/i18n-context'
import type { ShareDeliveryMethod } from '#/lib/share-delivery-types'

interface CheckoutDeliveryPanelProps {
  result: CheckoutResult
}

function DeliveryStatus({
  deliveryMethod,
  recipientEmail,
  recipientPhone,
}: {
  deliveryMethod: ShareDeliveryMethod
  recipientEmail?: string
  recipientPhone?: string
}) {
  const { t } = useI18n()
  const success = t.checkoutSuccess

  if (deliveryMethod === 'email' && recipientEmail) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3">
        <CheckCircle2 className="size-4 shrink-0 text-emerald-100" />
        <Mail className="size-4 shrink-0 text-emerald-300/90" />
        <span className="text-sm font-medium text-emerald-100">
          {success.emailSent(recipientEmail)}
        </span>
      </div>
    )
  }

  if (deliveryMethod === 'phone' && recipientPhone) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3">
        <CheckCircle2 className="size-4 shrink-0 text-emerald-100" />
        <MessageSquare className="size-4 shrink-0 text-emerald-300/90" />
        <span className="text-sm font-medium text-emerald-100">
          {success.smsSent(recipientPhone)}
        </span>
      </div>
    )
  }

  return null
}

export function CheckoutDeliveryPanel({ result }: CheckoutDeliveryPanelProps) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const success = t.checkoutSuccess
  const deliveryMethod = result.deliveryMethod ?? 'link'

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/flower/${result.id}`
      : ''
  const flowerPath = `/flower/${result.id}`

  async function handleCopyLink(): Promise<void> {
    if (!shareUrl) {
      return
    }

    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative z-10 flex w-full flex-col items-center gap-5 text-center">
      <p className="font-serif text-2xl italic text-stone-100 sm:text-3xl">
        {success.title}
      </p>

      <div className="w-full max-w-md">
        <DeliveryStatus
          deliveryMethod={deliveryMethod}
          recipientEmail={result.recipientEmail}
          recipientPhone={result.recipientPhone}
        />
      </div>

      {deliveryMethod === 'link' ? (
        <p className="text-sm text-stone-400">{success.linkSubtitle}</p>
      ) : null}

      <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <input
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-left text-sm text-stone-300"
          readOnly
          value={shareUrl}
        />
        <button
          className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-medium text-stone-200 transition hover:border-rose-300/40 hover:text-rose-200"
          onClick={handleCopyLink}
          type="button"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? success.copied : success.copy}
        </button>
      </div>

      {shareUrl ? (
        <FlowerShareQrDownload
          downloadFileName={`rose-${result.id}.png`}
          downloadLabel={success.downloadQr}
          label={success.qrLabel}
          shareUrl={shareUrl}
        />
      ) : null}

      <a
        className="inline-flex cursor-pointer items-center text-sm font-medium text-rose-300 underline underline-offset-4 transition hover:text-rose-200"
        href={flowerPath}
      >
        {success.openRose}
      </a>
    </div>
  )
}
