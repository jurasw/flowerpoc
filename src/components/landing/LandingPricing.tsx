import { Check } from 'lucide-react'

import { useI18n } from '#/lib/i18n/i18n-context'
import { formatProductPrice } from '#/lib/product-config'

export function LandingPricing() {
  const { t } = useI18n()

  const includedItems = [
    t.pricing.included.rose,
    t.pricing.included.card,
    t.pricing.included.link,
    t.pricing.included.lasting,
  ]

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24" id="pricing">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-gold/70">
          {t.pricing.eyebrow}
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl font-medium text-white sm:text-5xl">
          {t.pricing.title}
        </h2>

        <div className="mx-auto mt-14 max-w-md">
          <article className="rounded-[2rem] border border-rose-300/20 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 shadow-2xl shadow-wine/10 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-rose-300/80">
              {t.checkout.productName}
            </p>
            <p className="mt-4 font-serif text-5xl text-white">
              {formatProductPrice()}
            </p>
            <p className="mt-2 text-sm text-stone-500">
              {t.pricing.oneTimePayment}
            </p>

            <ul className="mt-8 space-y-3">
              {includedItems.map((item) => (
                <li className="flex items-start gap-3 text-sm text-stone-300" key={item}>
                  <Check className="mt-0.5 size-4 shrink-0 text-rose-300/90" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-wine px-5 py-3.5 text-sm font-medium tracking-wide text-white shadow-lg shadow-wine/20 transition hover:bg-wine-deep"
              href="#create"
            >
              {t.pricing.cta}
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
