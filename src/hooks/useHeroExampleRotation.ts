import { useEffect, useState } from 'react'

import { heroExampleRotationConfig } from '#/lib/hero-example-rotation-config'

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useHeroExampleRotation(itemCount: number): number {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (itemCount <= 1 || prefersReducedMotion()) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % itemCount)
    }, heroExampleRotationConfig.intervalMs)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [itemCount])

  return activeIndex
}
