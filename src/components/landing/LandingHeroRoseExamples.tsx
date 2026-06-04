import { HeroExampleCarouselBody } from '#/components/landing/HeroExampleCarouselBody'
import { useHeroExampleCarouselView } from '#/hooks/useHeroExampleCarouselView'
import { useI18n } from '#/lib/i18n/i18n-context'

interface LandingHeroRoseExamplesProps {
  className?: string
  layout?: 'desktop' | 'phone'
}

export function LandingHeroRoseExamples({
  className = '',
  layout = 'desktop',
}: LandingHeroRoseExamplesProps) {
  const { t } = useI18n()
  const examples = t.hero.examples.items
  const view = useHeroExampleCarouselView(examples.length)

  return (
    <div
      aria-live="polite"
      className={`flex w-full flex-col items-start ${className}`}
    >
      <p className="sr-only">{t.hero.examples.title}</p>
      <HeroExampleCarouselBody examples={examples} layout={layout} view={view} />
    </div>
  )
}
