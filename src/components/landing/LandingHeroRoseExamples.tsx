import { HeroExampleMessageCard } from '#/components/landing/HeroExampleMessageCard'
import { useHeroExampleCardTransition } from '#/hooks/useHeroExampleCardTransition'
import { useHeroExampleRotation } from '#/hooks/useHeroExampleRotation'
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
  const activeIndex = useHeroExampleRotation(examples.length)
  const { shownIndex, leavingIndex, isLeavingVisible, isIncomingVisible } =
    useHeroExampleCardTransition(activeIndex)

  const shownExample = examples[shownIndex]
  const leavingExample =
    leavingIndex === null ? undefined : examples[leavingIndex]

  return (
    <div aria-live="polite" className={className}>
      <p className="sr-only">{t.hero.examples.title}</p>

      <div className="relative isolate grid overflow-hidden [&>*]:col-start-1 [&>*]:row-start-1">
        {leavingExample ? (
          <div
            aria-hidden="true"
            className={`pointer-events-none ${getHeroExampleLeavingCardClass(isLeavingVisible)}`}
          >
            <HeroExampleMessageCard example={leavingExample} isOverlay />
          </div>
        ) : null}

        {shownExample ? (
          <div
            className={`relative z-[1] ${getHeroExampleIncomingCardClass(isIncomingVisible)}`}
          >
            <HeroExampleMessageCard example={shownExample} isOverlay />
          </div>
        ) : null}
      </div>
    </div>
  )
}
