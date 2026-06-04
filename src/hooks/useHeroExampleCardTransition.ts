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
  const [isLeavingVisible, setIsLeavingVisible] = useState(false)
  const [isIncomingVisible, setIsIncomingVisible] = useState(true)
  const transitionTimeoutRef = useRef<number | undefined>(undefined)
  const transitionFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (activeIndex === shownIndex) {
      return
    }

    setLeavingIndex(shownIndex)
    setShownIndex(activeIndex)
    setIsLeavingVisible(true)
    setIsIncomingVisible(false)

    window.clearTimeout(transitionTimeoutRef.current)
    cancelAnimationFrame(transitionFrameRef.current ?? 0)

    transitionFrameRef.current = requestAnimationFrame(() => {
      transitionFrameRef.current = requestAnimationFrame(() => {
        setIsLeavingVisible(false)
        setIsIncomingVisible(true)
      })
    })

    transitionTimeoutRef.current = window.setTimeout(() => {
      setLeavingIndex(null)
      setIsLeavingVisible(false)
    }, heroExampleRotationConfig.transitionDurationMs)

    return () => {
      window.clearTimeout(transitionTimeoutRef.current)
      cancelAnimationFrame(transitionFrameRef.current ?? 0)
    }
  }, [activeIndex, shownIndex])

  return {
    shownIndex,
    leavingIndex,
    isLeavingVisible,
    isIncomingVisible,
  }
}
