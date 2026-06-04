import { memo } from 'react'

import { RoseScene } from '#/components/RoseScene'
import { useI18n } from '#/lib/i18n/i18n-context'

const heroRosePanelHeightClass =
  'h-[min(100vw-3rem,28rem)] sm:h-[min(100vw-3rem,32rem)] lg:h-[34rem]'

const heroRoseFrameSettings = {
  fillRatio: 0.78,
  verticalFocus: 0.58,
}

function LandingHeroCopy() {
  const { t } = useI18n()

  return (
    <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-left">
      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-rose-300/80">
        {t.checkout.productName}
      </p>

      <h1 className="mt-5 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
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

const LandingHeroRosePanel = memo(function LandingHeroRosePanel() {
  return (
    <div className="relative mx-auto w-full max-w-lg shrink-0 [contain:layout] lg:mx-0 lg:max-w-none">
      <div
        className={`relative ${heroRosePanelHeightClass} overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1012] via-[#120a0c] to-[#0a0608] shadow-2xl shadow-black/60 ring-1 ring-white/10`}
      >
        <div className="pointer-events-none absolute inset-x-10 -top-24 h-64 rounded-full bg-wine/25 blur-[110px]" />
        <RoseScene
          className="absolute inset-0"
          deferUntilVisible
          frameSettings={heroRoseFrameSettings}
        />
      </div>
    </div>
  )
})

export function LandingHero() {
  return (
    <section
      className="relative overflow-hidden px-6 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
      id="top"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,_rgba(124,31,51,0.22)_0%,_transparent_70%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex items-center justify-center lg:min-h-[34rem] lg:justify-start">
          <LandingHeroCopy />
        </div>
        <LandingHeroRosePanel />
      </div>
    </section>
  )
}
