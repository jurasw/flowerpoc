import { HeroExampleMessageCard } from '#/components/landing/HeroExampleMessageCard'
import { HeroExampleProgressPills } from '#/components/landing/HeroExampleProgressPills'
import { useHeroExampleCardTransition } from '#/hooks/useHeroExampleCardTransition'
import { useHeroExampleCarousel } from '#/hooks/useHeroExampleCarousel'
import { useHeroExampleSwipe } from '#/hooks/useHeroExampleSwipe'
import { heroExampleCardStageHeightClass } from '#/lib/hero-example-card-stage'
import {
  getHeroExampleIncomingCardClass,
  getHeroExampleLeavingCardClass,
} from '#/lib/hero-example-card-motion'
import { useI18n } from '#/lib/i18n/i18n-context'

interface LandingHeroRoseExamplesProps {
  className?: string
}

export function LandingHeroRoseExamples({
  className = '',
}: LandingHeroRoseExamplesProps) {
  const { t } = useI18n()
  const examples = t.hero.examples.items
  const { activeIndex, progressCycleKey, goToIndex, goNext, goPrev } =
    useHeroExampleCarousel(examples.length)
  const { shownIndex, leavingIndex, isLeavingVisible, isIncomingVisible } =
    useHeroExampleCardTransition(activeIndex)
  const swipeHandlers = useHeroExampleSwipe({
    isEnabled: examples.length > 1,
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
  })

  const shownExample = examples[shownIndex]
  const leavingExample =
    leavingIndex === null ? undefined : examples[leavingIndex]

  return (
    <div aria-live="polite" className={`flex w-full flex-col items-start ${className}`}>
      <p className="sr-only">{t.hero.examples.title}</p>

      {examples.length > 1 ? (
        <HeroExampleProgressPills
          activeIndex={activeIndex}
          labels={examples.map((example) => example.tabLabel)}
          onSelect={goToIndex}
          progressCycleKey={progressCycleKey}
        />
      ) : null}

      <div
        className={`relative w-full shrink-0 touch-pan-y overflow-hidden ${heroExampleCardStageHeightClass}`}
        {...swipeHandlers}
      >
        {leavingExample ? (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 z-0 ${getHeroExampleLeavingCardClass(isLeavingVisible)}`}
          >
            <HeroExampleMessageCard example={leavingExample} isOverlay />
          </div>
        ) : null}

        {shownExample ? (
          <div
            className={`absolute inset-x-0 top-0 z-[1] pointer-events-auto ${getHeroExampleIncomingCardClass(isIncomingVisible)}`}
          >
            <HeroExampleMessageCard example={shownExample} isOverlay />
          </div>
        ) : null}
      </div>
    </div>
  )
}
