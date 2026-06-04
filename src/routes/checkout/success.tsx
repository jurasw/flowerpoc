import { createFileRoute } from '@tanstack/react-router'

import { CheckoutDeliveryPanel } from '#/components/checkout/CheckoutDeliveryPanel'
import { CheckoutFlowerPhonePreview } from '#/components/checkout/CheckoutFlowerPhonePreview'
import { IphoneMockup } from '#/components/IphoneMockup'
import { useCheckoutSuccessFlower } from '#/hooks/useCheckoutSuccessFlower'
import { getDictionary } from '#/lib/i18n/dictionaries'
import type { Locale } from '#/lib/i18n/locale'
import { roseModelUrl } from '#/lib/roseModel'
import { useI18n } from '#/lib/i18n/i18n-context'

interface CheckoutSuccessSearch {
  session_id?: string
}

function parseCheckoutSuccessSearch(
  search: Record<string, unknown>,
): CheckoutSuccessSearch {
  const sessionId =
    typeof search.session_id === 'string' ? search.session_id : undefined

  return { session_id: sessionId }
}

export const Route = createFileRoute('/checkout/success')({
  validateSearch: parseCheckoutSuccessSearch,
  loader: ({ context }): { locale: Locale } => ({ locale: context.locale }),
  head: ({ loaderData }) => {
    const t = getDictionary(loaderData?.locale ?? 'en')

    return {
      meta: [
        {
          title: t.checkoutSuccess.title,
        },
      ],
      links: [
        {
          rel: 'preload',
          href: roseModelUrl,
          as: 'fetch',
          crossOrigin: 'anonymous',
        },
      ],
    }
  },
  component: CheckoutSuccessPage,
})

function CheckoutSuccessPage() {
  const { session_id: sessionId } = Route.useSearch()
  const { t } = useI18n()
  const { checkoutResult, flower, error, isLoading } =
    useCheckoutSuccessFlower(sessionId)
  const success = t.checkoutSuccess

  return (
    <div className="min-h-dvh overflow-x-hidden bg-black text-stone-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,_rgba(124,31,51,0.22)_0%,_transparent_70%)]" />
      <main className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-start px-4 py-16 sm:px-6 sm:py-20">
        {isLoading ? (
          <p className="text-center text-sm text-stone-400">{success.finalizing}</p>
        ) : null}

        {error ? (
          <p className="mx-auto max-w-md rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm text-stone-300">
            {error}
          </p>
        ) : null}

        {!isLoading && !error && checkoutResult && flower ? (
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,320px)] lg:gap-16">
            <CheckoutDeliveryPanel result={checkoutResult} />
            <div className="pointer-events-none flex flex-col items-center gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold/70">
                {success.previewEyebrow}
              </p>
              <IphoneMockup isScrollable>
                <CheckoutFlowerPhonePreview flower={flower} />
              </IphoneMockup>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}
