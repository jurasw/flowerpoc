import { Flower2 } from 'lucide-react'

import { useI18n } from '#/lib/i18n/i18n-context'
import { productConfig } from '#/lib/product-config'

export function LandingFooter() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-white/5 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5 text-rose-300/70">
          <Flower2 className="size-4" strokeWidth={1.5} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">
            {productConfig.brandName}
          </span>
        </div>
        <p className="text-xs text-stone-600">{t.footer.tagline}</p>
      </div>
    </footer>
  )
}
