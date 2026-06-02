import { Link } from '@tanstack/react-router'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import type { CheckoutResult } from '#/lib/flower-types'

interface CheckoutSuccessPanelProps {
  result: CheckoutResult
}

export function CheckoutSuccessPanel({ result }: CheckoutSuccessPanelProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/flower/${result.id}`
      : ''

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
      <p className="font-serif text-lg italic text-stone-100">
        Your rose is ready.
      </p>
      <p className="mt-1 text-sm text-stone-400">
        Copy the link below and send it by email or text.
      </p>
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
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
      <Link
        className="mt-4 inline-block text-sm font-medium text-rose-300 underline-offset-4 hover:underline"
        params={{ id: result.id }}
        to="/flower/$id"
      >
        Preview what they will see →
      </Link>
    </div>
  )
}
