import { IphoneMockup } from '#/components/IphoneMockup'
import { FlowerPhonePreviewShell } from '#/components/flower/FlowerPhonePreviewShell'
import { HeroExampleCarouselBody } from '#/components/landing/HeroExampleCarouselBody'
import { HeroExampleProgressPills } from '#/components/landing/HeroExampleProgressPills'
import { useHeroExampleCarouselView } from '#/hooks/useHeroExampleCarouselView'
import { useI18n } from '#/lib/i18n/i18n-context'

export function LandingHeroPhonePanel() {
  const { t } = useI18n()
  const examples = t.hero.examples.items
  const view = useHeroExampleCarouselView(examples.length)

  return (
    <div className="flex w-[300px] flex-col items-center gap-2">
      <p className="sr-only">{t.hero.examples.title}</p>
      <p className="w-full text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-gold/70">
        {t.checkoutSuccess.previewEyebrow}
      </p>

      {examples.length > 1 ? (
        <HeroExampleProgressPills
          activeIndex={view.activeIndex}
          className="mb-0 w-full justify-center"
          labels={examples.map((example) => example.tabLabel)}
          onSelect={view.goToIndex}
          progressCycleKey={view.progressCycleKey}
        />
      ) : null}

      <IphoneMockup className="w-full" isScrollable>
        <FlowerPhonePreviewShell deferRose>
          <HeroExampleCarouselBody
            examples={examples}
            layout="phone"
            showPills={false}
            view={view}
          />
        </FlowerPhonePreviewShell>
      </IphoneMockup>
    </div>
  )
}
