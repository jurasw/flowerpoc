import { useCallback, useRef, type PointerEvent } from 'react'

const swipeThresholdPx = 52

interface UseHeroExampleSwipeOptions {
  onSwipeLeft: () => void
  onSwipeRight: () => void
  isEnabled: boolean
}

interface HeroExampleSwipeHandlers {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void
  onPointerUp: (event: PointerEvent<HTMLElement>) => void
  onPointerCancel: (event: PointerEvent<HTMLElement>) => void
}

export function useHeroExampleSwipe({
  onSwipeLeft,
  onSwipeRight,
  isEnabled,
}: UseHeroExampleSwipeOptions): HeroExampleSwipeHandlers {
  const pointerStartXRef = useRef<number | null>(null)
  const isTrackingRef = useRef(false)

  const resetTracking = useCallback(() => {
    pointerStartXRef.current = null
    isTrackingRef.current = false
  }, [])

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!isEnabled) {
        return
      }

      pointerStartXRef.current = event.clientX
      isTrackingRef.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    [isEnabled],
  )

  const onPointerUp = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!isTrackingRef.current || pointerStartXRef.current === null) {
        resetTracking()
        return
      }

      const deltaX = event.clientX - pointerStartXRef.current

      if (deltaX <= -swipeThresholdPx) {
        onSwipeLeft()
      } else if (deltaX >= swipeThresholdPx) {
        onSwipeRight()
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }

      resetTracking()
    },
    [onSwipeLeft, onSwipeRight, resetTracking],
  )

  const onPointerCancel = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }

      resetTracking()
    },
    [resetTracking],
  )

  return {
    onPointerDown,
    onPointerUp,
    onPointerCancel,
  }
}
