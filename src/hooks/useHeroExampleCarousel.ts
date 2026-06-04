import { useCallback, useEffect, useRef, useState } from 'react'

import { heroExampleRotationConfig } from '#/lib/hero-example-rotation-config'
import {
  getHeroExampleSlideDirection,
  type HeroExampleSlideDirection,
} from '#/lib/hero-example-slide-direction'

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

interface HeroExampleCarouselState {
  activeIndex: number
  progressCycleKey: number
  slideDirection: HeroExampleSlideDirection
  goToIndex: (index: number) => void
  goNext: () => void
  goPrev: () => void
}

export function useHeroExampleCarousel(
  itemCount: number,
): HeroExampleCarouselState {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progressCycleKey, setProgressCycleKey] = useState(0)
  const [slideDirection, setSlideDirection] =
    useState<HeroExampleSlideDirection>('forward')
  const activeIndexRef = useRef(activeIndex)

  const applyIndex = useCallback(
    (nextIndex: number) => {
      if (itemCount <= 0) {
        return
      }

      const normalizedIndex =
        ((nextIndex % itemCount) + itemCount) % itemCount
      const currentIndex = activeIndexRef.current

      if (normalizedIndex === currentIndex) {
        return
      }

      setSlideDirection(
        getHeroExampleSlideDirection(
          currentIndex,
          normalizedIndex,
          itemCount,
        ),
      )
      activeIndexRef.current = normalizedIndex
      setProgressCycleKey((cycleKey) => cycleKey + 1)
      setActiveIndex(normalizedIndex)
    },
    [itemCount],
  )

  const goToIndex = useCallback(
    (index: number) => {
      applyIndex(index)
    },
    [applyIndex],
  )

  const goNext = useCallback(() => {
    if (itemCount <= 1) {
      return
    }

    applyIndex(activeIndexRef.current + 1)
  }, [applyIndex, itemCount])

  const goPrev = useCallback(() => {
    if (itemCount <= 1) {
      return
    }

    applyIndex(activeIndexRef.current - 1)
  }, [applyIndex, itemCount])

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    if (itemCount <= 1 || prefersReducedMotion()) {
      return
    }

    const intervalId = window.setInterval(() => {
      goNext()
    }, heroExampleRotationConfig.intervalMs)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [activeIndex, goNext, itemCount])

  return {
    activeIndex,
    progressCycleKey,
    slideDirection,
    goToIndex,
    goNext,
    goPrev,
  }
}
