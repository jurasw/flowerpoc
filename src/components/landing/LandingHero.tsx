import { LandingHeroPhonePanel } from '#/components/landing/LandingHeroPhonePanel'
import { useI18n } from '#/lib/i18n/i18n-context'

function LandingHeroCopy() {
  const { t } = useI18n()

  return (
    <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-left">
      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-rose-300/80">
        {t.checkout.productName}
      </p>

      <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        {t.hero.titleLineOne}
        <br />
        <span className="italic text-rose-300">{t.hero.titleLineTwo}</span>
      </h1>

      <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-stone-400 sm:text-lg lg:mx-0">
        {t.hero.description}
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
        <a
          className="inline-flex items-center justify-center rounded-lg bg-wine px-6 py-3.5 text-sm font-medium tracking-wide text-white shadow-lg shadow-wine/20 transition hover:bg-wine-deep"
          href="#create"
        >
          {t.hero.primaryCta}
        </a>
        <a
          className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-stone-300 transition hover:border-rose-300/30 hover:text-rose-200"
          href="#how-it-works"
        >
          {t.hero.secondaryCta}
        </a>
      </div>
    </div>
  )
}

export function LandingHero() {
  return (
    <section
      className="relative overflow-x-hidden px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20"
      id="top"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,_rgba(124,31,51,0.22)_0%,_transparent_70%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="flex items-center justify-center self-center lg:justify-start">
          <LandingHeroCopy />
        </div>
        <div className="flex justify-center lg:-mt-8">
          <LandingHeroPhonePanel />
        </div>
      </div>
    </section>
  )
}
