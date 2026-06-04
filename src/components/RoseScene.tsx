import { lazy, memo, Suspense, useEffect, useRef, useState } from 'react'

import type { RoseSceneCanvasProps } from '#/components/RoseSceneCanvas'

const RoseSceneCanvas = lazy(() =>
  import('#/components/RoseSceneCanvas').then((module) => ({
    default: module.RoseSceneCanvas,
  })),
)

function RoseScenePlaceholder() {
  return (
    <div
      aria-busy="true"
      className="absolute inset-0 flex items-center justify-center"
    >
      <p className="text-sm text-rose-200/70">Loading rose…</p>
    </div>
  )
}

const DeferredRoseScene = memo(function DeferredRoseScene({
  className,
  ...canvasProps
}: RoseSceneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldMount, setShouldMount] = useState(false)
  const rootClassName = className ?? 'relative h-full w-full'

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    if (!('IntersectionObserver' in window)) {
      setShouldMount(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldMount(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px' },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={rootClassName}>
      {shouldMount ? (
        <Suspense fallback={<RoseScenePlaceholder />}>
          <RoseSceneCanvas
            {...canvasProps}
            className="absolute inset-0 h-full w-full"
          />
        </Suspense>
      ) : (
        <RoseScenePlaceholder />
      )}
    </div>
  )
})

export const RoseScene = memo(function RoseScene({
  deferUntilVisible = false,
  ...props
}: RoseSceneCanvasProps & { deferUntilVisible?: boolean }) {
  if (deferUntilVisible) {
    return <DeferredRoseScene {...props} />
  }

  return (
    <Suspense fallback={<RoseScenePlaceholder />}>
      <RoseSceneCanvas {...props} />
    </Suspense>
  )
})
