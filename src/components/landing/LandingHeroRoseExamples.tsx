import { useEffect, useState } from 'react'

import { HeroExampleMessageCard } from '#/components/landing/HeroExampleMessageCard'
import { useHeroExampleRotation } from '#/hooks/useHeroExampleRotation'
import { heroExampleRotationConfig } from '#/lib/hero-example-rotation-config'
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
  const [renderIndex, setRenderIndex] = useState(activeIndex)
  const [isCardVisible, setIsCardVisible] = useState(true)

  useEffect(() => {
    if (activeIndex === renderIndex) {
      return
    }

    setIsCardVisible(false)

    const timeoutId = window.setTimeout(() => {
      setRenderIndex(activeIndex)
      setIsCardVisible(true)
    }, heroExampleRotationConfig.fadeDurationMs)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [activeIndex, renderIndex])

  const visibleExample = examples[renderIndex]

  return (
    <div aria-live="polite" className={className}>
      <p className="sr-only">{t.hero.examples.title}</p>

      {visibleExample ? (
        <div
          className={`transition-opacity duration-700 ease-in-out ${
            isCardVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <HeroExampleMessageCard example={visibleExample} isOverlay />
        </div>
      ) : null}
    </div>
  )
}
