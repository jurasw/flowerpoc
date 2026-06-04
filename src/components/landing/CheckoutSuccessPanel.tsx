import { Link } from '@tanstack/react-router'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { FlowerShareQrCode } from '#/components/landing/FlowerShareQrCode'
import type { CheckoutResult } from '#/lib/flower-types'
import { useI18n } from '#/lib/i18n/i18n-context'

interface CheckoutSuccessPanelProps {
  result: CheckoutResult
}

export function CheckoutSuccessPanel({ result }: CheckoutSuccessPanelProps) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/flower/${result.id}`
      : ''

  const deliveryMethod = result.deliveryMethod ?? 'link'
  const success = t.checkoutSuccess

  const subtitle =
    deliveryMethod === 'email' && result.recipientEmail
      ? success.subtitleEmail(result.recipientEmail)
      : deliveryMethod === 'phone' && result.recipientPhone
        ? success.subtitlePhone(result.recipientPhone)
        : success.subtitleLink

  async function handleCopyLink(): Promise<void> {
    if (!shareUrl) {
      return
    }

    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-6 shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <p className="font-serif text-lg italic text-stone-100">{success.title}</p>
      <p className="mt-1 text-sm text-stone-400">{subtitle}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          className="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-stone-300"
          readOnly
          value={shareUrl}
        />
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-medium text-stone-200 transition hover:border-rose-300/40 hover:text-rose-200"
          onClick={handleCopyLink}
          type="button"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? success.copied : success.copy}
        </button>
      </div>
      {deliveryMethod === 'link' && shareUrl ? (
        <div className="mt-6 flex justify-center">
          <FlowerShareQrCode label={success.qrLabel} shareUrl={shareUrl} />
        </div>
      ) : null}
      <Link
        className="mt-4 inline-block text-sm font-medium text-rose-300 underline-offset-4 hover:underline"
        params={{ id: result.id }}
        to="/flower/$id"
      >
        {success.previewLink}
      </Link>
    </div>
  )
}
