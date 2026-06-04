import { useEffect, useRef, useState } from 'react'

import { heroExampleRotationConfig } from '#/lib/hero-example-rotation-config'

interface HeroExampleCardTransitionState {
  shownIndex: number
  leavingIndex: number | null
  isLeavingVisible: boolean
  isIncomingVisible: boolean
}

export function useHeroExampleCardTransition(
  activeIndex: number,
): HeroExampleCardTransitionState {
  const [shownIndex, setShownIndex] = useState(activeIndex)
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null)
  const [isLeavingVisible, setIsLeavingVisible] = useState(true)
  const [isIncomingVisible, setIsIncomingVisible] = useState(true)
  const shownIndexRef = useRef(activeIndex)
  const startFrameRef = useRef<number | undefined>(undefined)
  const endTimeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (activeIndex === shownIndexRef.current) {
      return
    }

    const previousIndex = shownIndexRef.current
    shownIndexRef.current = activeIndex

    setLeavingIndex(previousIndex)
    setShownIndex(activeIndex)
    setIsLeavingVisible(true)
    setIsIncomingVisible(false)

    cancelAnimationFrame(startFrameRef.current ?? 0)
    window.clearTimeout(endTimeoutRef.current)

    startFrameRef.current = requestAnimationFrame(() => {
      setIsLeavingVisible(false)
      setIsIncomingVisible(true)
    })

    endTimeoutRef.current = window.setTimeout(() => {
      setLeavingIndex(null)
      setIsLeavingVisible(true)
    }, heroExampleRotationConfig.transitionDurationMs)

    return () => {
      cancelAnimationFrame(startFrameRef.current ?? 0)
      window.clearTimeout(endTimeoutRef.current)
    }
  }, [activeIndex])

  return {
    shownIndex,
    leavingIndex,
    isLeavingVisible,
    isIncomingVisible,
  }
}
