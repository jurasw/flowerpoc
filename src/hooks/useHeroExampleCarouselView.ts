import { useHeroExampleCardTransition } from '#/hooks/useHeroExampleCardTransition'
import { useHeroExampleCarousel } from '#/hooks/useHeroExampleCarousel'
import { useHeroExampleSwipe } from '#/hooks/useHeroExampleSwipe'
import type { HeroExampleSlideDirection } from '#/lib/hero-example-slide-direction'

export interface HeroExampleCarouselView {
  activeIndex: number
  progressCycleKey: number
  slideDirection: HeroExampleSlideDirection
  shownIndex: number
  leavingIndex: number | null
  isLeavingVisible: boolean
  isIncomingVisible: boolean
  goToIndex: (index: number) => void
  goNext: () => void
  goPrev: () => void
  swipeHandlers: ReturnType<typeof useHeroExampleSwipe>
}

export function useHeroExampleCarouselView(
  itemCount: number,
): HeroExampleCarouselView {
  const {
    activeIndex,
    progressCycleKey,
    slideDirection,
    goToIndex,
    goNext,
    goPrev,
  } = useHeroExampleCarousel(itemCount)
  const { shownIndex, leavingIndex, isLeavingVisible, isIncomingVisible } =
    useHeroExampleCardTransition(activeIndex)
  const swipeHandlers = useHeroExampleSwipe({
    isEnabled: itemCount > 1,
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
  })

  return {
    activeIndex,
    progressCycleKey,
    slideDirection,
    shownIndex,
    leavingIndex,
    isLeavingVisible,
    isIncomingVisible,
    goToIndex,
    goNext,
    goPrev,
    swipeHandlers,
  }
}
