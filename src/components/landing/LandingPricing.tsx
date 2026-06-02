import { Check } from 'lucide-react'

import { formatProductPrice, productConfig } from '#/lib/product-config'

const includedItems = [
  'One personalized 3D digital rose',
  'Private message card',
  'Shareable link — no app needed',
  `${productConfig.lifespanDays} days of freshness`,
]

export function LandingPricing() {
  return (
    <section className="px-6 py-20 sm:py-24" id="pricing">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-gold/70">
          Pricing
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl font-medium text-white sm:text-5xl">
          One rose. One moment.
        </h2>

        <div className="mx-auto mt-14 max-w-md">
          <article className="rounded-[2rem] border border-rose-300/20 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 shadow-2xl shadow-wine/10 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-rose-300/80">
              {productConfig.productName}
            </p>
            <p className="mt-4 font-serif text-5xl text-white">
              {formatProductPrice()}
            </p>
            <p className="mt-2 text-sm text-stone-500">One-time payment</p>

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
              Create your rose
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
