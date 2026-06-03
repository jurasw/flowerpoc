import { CreditCard, PenLine, Share2 } from 'lucide-react'

import { useI18n } from '#/lib/i18n/i18n-context'

export function LandingHowItWorks() {
  const { t } = useI18n()

  const steps = [
    {
      icon: PenLine,
      step: '01',
      title: t.howItWorks.steps.compose.title,
      description: t.howItWorks.steps.compose.description,
    },
    {
      icon: CreditCard,
      step: '02',
      title: t.howItWorks.steps.pay.title,
      description: t.howItWorks.steps.pay.description,
    },
    {
      icon: Share2,
      step: '03',
      title: t.howItWorks.steps.share.title,
      description: t.howItWorks.steps.share.description,
    },
  ]

  return (
    <section className="px-6 py-20 sm:py-24" id="how-it-works">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-gold/70">
          {t.howItWorks.eyebrow}
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl font-medium text-white sm:text-5xl">
          {t.howItWorks.title}
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <article
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur"
              key={step.step}
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-stone-600">
                {step.step}
              </span>
              <span className="mt-6 flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <step.icon className="size-5 text-rose-300/90" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-serif text-2xl text-stone-100">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
