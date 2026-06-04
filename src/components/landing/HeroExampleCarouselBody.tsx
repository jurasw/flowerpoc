import { HeroExampleMessageCard } from '#/components/landing/HeroExampleMessageCard'
import type { HeroExampleItem } from '#/components/landing/HeroExampleMessageCard'
import { HeroExampleProgressPills } from '#/components/landing/HeroExampleProgressPills'
import type { HeroExampleCarouselView } from '#/hooks/useHeroExampleCarouselView'
import { heroExampleCardStageHeightClass } from '#/lib/hero-example-card-stage'
import {
  getHeroExampleIncomingCardClass,
  getHeroExampleLeavingCardClass,
} from '#/lib/hero-example-card-motion'

interface HeroExampleCarouselBodyProps {
  examples: readonly HeroExampleItem[]
  layout?: 'desktop' | 'phone'
  showPills?: boolean
  view: HeroExampleCarouselView
}

export function HeroExampleCarouselBody({
  examples,
  layout = 'desktop',
  showPills = true,
  view,
}: HeroExampleCarouselBodyProps) {
  const isPhoneLayout = layout === 'phone'
  const {
    activeIndex,
    progressCycleKey,
    slideDirection,
    shownIndex,
    leavingIndex,
    isLeavingVisible,
    isIncomingVisible,
    goToIndex,
    swipeHandlers,
  } = view

  const shownExample = examples[shownIndex]
  const leavingExample =
    leavingIndex === null ? undefined : examples[leavingIndex]
  const phoneStageSizerExample =
    examples.find((example) => example.hasVoice) ?? examples[0]

  return (
    <>
      {showPills && examples.length > 1 ? (
        <HeroExampleProgressPills
          activeIndex={activeIndex}
          className={
            isPhoneLayout
              ? 'mb-2 w-full justify-center gap-2'
              : undefined
          }
          isCompact={isPhoneLayout}
          labels={examples.map((example) => example.tabLabel)}
          onSelect={goToIndex}
          progressCycleKey={progressCycleKey}
        />
      ) : null}

      <div
        className={`relative w-full shrink-0 touch-pan-y ${
          isPhoneLayout
            ? 'overflow-visible'
            : `overflow-hidden ${heroExampleCardStageHeightClass}`
        }`}
        {...swipeHandlers}
      >
        {isPhoneLayout && phoneStageSizerExample ? (
          <div aria-hidden className="pointer-events-none invisible">
            <HeroExampleMessageCard
              example={phoneStageSizerExample}
              variant="phone"
            />
          </div>
        ) : null}

        {leavingExample ? (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 z-0 ${getHeroExampleLeavingCardClass(
              isLeavingVisible,
              slideDirection,
              false,
            )}`}
          >
            <HeroExampleMessageCard
              example={leavingExample}
              isOverlay={!isPhoneLayout}
              variant={isPhoneLayout ? 'phone' : 'default'}
            />
          </div>
        ) : null}

        {shownExample ? (
          <div
            className={`pointer-events-auto absolute inset-x-0 top-0 z-[1] ${getHeroExampleIncomingCardClass(
              isIncomingVisible,
              slideDirection,
              false,
            )}`}
          >
            <HeroExampleMessageCard
              example={shownExample}
              isOverlay={!isPhoneLayout}
              variant={isPhoneLayout ? 'phone' : 'default'}
            />
          </div>
        ) : null}
      </div>
    </>
  )
}
