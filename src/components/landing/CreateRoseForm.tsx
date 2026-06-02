import { useServerFn } from '@tanstack/react-start'
import { memo, useEffect, useState } from 'react'

import { CheckoutSuccessPanel } from '#/components/landing/CheckoutSuccessPanel'
import { RoseScene } from '#/components/RoseScene'
import type { CheckoutResult } from '#/lib/flower-types'
import { formatProductPrice, productConfig } from '#/lib/product-config'
import createCheckoutSession from '#/server/CreateCheckoutSession'
import getCheckoutResult from '#/server/GetCheckoutResult'

const pollAttempts = 5
const pollDelayMs = 1500

const RosePreviewPanel = memo(function RosePreviewPanel() {
  return (
    <section className="flex min-h-0 flex-col lg:flex-1">
      <div className="relative h-[min(340px,48svh)] min-h-0 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1012] via-[#120a0c] to-[#0a0608] p-1 shadow-2xl shadow-black/60 ring-1 ring-white/10 sm:h-[380px] lg:h-auto lg:min-h-[480px] lg:flex-1">
        <div className="pointer-events-none absolute inset-x-10 -top-24 h-64 rounded-full bg-wine/25 blur-[110px]" />
        <RoseScene className="absolute inset-0" deferUntilVisible />
        <span className="pointer-events-none absolute left-6 top-6 text-[11px] font-medium uppercase tracking-[0.3em] text-gold/70">
          Preview
        </span>
      </div>
      <p className="mt-4 shrink-0 text-center text-sm text-stone-500">
        Drag to rotate. Each rose stays fresh for {productConfig.lifespanDays}{' '}
        days from the moment its link is created.
      </p>
    </section>
  )
})

interface CreateRoseFormProps {
  sessionId?: string
  isCanceled?: boolean
}

export function CreateRoseForm({
  sessionId,
  isCanceled = false,
}: CreateRoseFormProps) {
  const createCheckoutSessionFn = useServerFn(createCheckoutSession)
  const getCheckoutResultFn = useServerFn(getCheckoutResult)

  const [senderName, setSenderName] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [quote, setQuote] = useState('')
  const [result, setResult] = useState<CheckoutResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFinalizing, setIsFinalizing] = useState(Boolean(sessionId))

  useEffect(() => {
    if (!sessionId) {
      return
    }

    let isCancelled = false
    let attempt = 0

    async function pollCheckoutResult(): Promise<void> {
      while (attempt < pollAttempts && !isCancelled) {
        try {
          const checkoutResult = await getCheckoutResultFn({
            data: { sessionId },
          })

          if (checkoutResult.isReady) {
            if (!isCancelled) {
              setResult(checkoutResult)
              setIsFinalizing(false)
            }
            return
          }
        } catch {
          if (!isCancelled) {
            setError('Could not verify your payment. Please contact support.')
            setIsFinalizing(false)
          }
          return
        }

        attempt += 1

        if (attempt < pollAttempts) {
          await new Promise((resolve) => {
            window.setTimeout(resolve, pollDelayMs)
          })
        }
      }

      if (!isCancelled) {
        setError(
          'Payment received, but your rose is still being prepared. Refresh in a moment.',
        )
        setIsFinalizing(false)
      }
    }

    pollCheckoutResult()

    return () => {
      isCancelled = true
    }
  }, [sessionId, getCheckoutResultFn])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const checkout = await createCheckoutSessionFn({
        data: { senderName, recipientName, quote },
      })
      window.location.assign(checkout.url)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Could not start checkout. Please try again.',
      )
      setIsSubmitting(false)
    }
  }

  const payButtonLabel = `Pay ${formatProductPrice()} & create rose`

  return (
    <section
      className="border-t border-white/5 bg-black px-6 py-20 sm:py-24"
      id="create"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-gold/70">
          Create
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl font-medium text-white sm:text-5xl">
          Compose your rose
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-stone-500">
          Fill in the details below. After payment, you will receive a private
          link to share.
        </p>

        <div className="mt-14 flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-14">
          <div className="flex flex-1 flex-col">
            {isCanceled ? (
              <p className="mb-6 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-stone-400">
                Checkout was canceled. Your rose is still waiting — pick up where
                you left off.
              </p>
            ) : null}

            {isFinalizing ? (
              <p className="mb-6 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-stone-300">
                Finalizing your rose…
              </p>
            ) : null}

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                    Your name
                  </span>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-rose-300/40 focus:ring-2 focus:ring-rose-300/10"
                    maxLength={80}
                    onChange={(event) => setSenderName(event.target.value)}
                    placeholder="Alex"
                    required
                    value={senderName}
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                    Their name
                  </span>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-rose-300/40 focus:ring-2 focus:ring-rose-300/10"
                    maxLength={80}
                    onChange={(event) => setRecipientName(event.target.value)}
                    placeholder="Someone special"
                    required
                    value={recipientName}
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                  Your message
                </span>
                <textarea
                  className="min-h-36 w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-rose-300/40 focus:ring-2 focus:ring-rose-300/10"
                  maxLength={500}
                  onChange={(event) => setQuote(event.target.value)}
                  placeholder="Write something only they should read..."
                  required
                  value={quote}
                />
              </label>

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
                {isSubmitting ? 'Redirecting to checkout…' : payButtonLabel}
              </button>
            </form>

            {result?.isReady ? <CheckoutSuccessPanel result={result} /> : null}
          </div>

          <RosePreviewPanel />
        </div>
      </div>
    </section>
  )
}
