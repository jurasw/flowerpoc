import { Flower2 } from 'lucide-react'

import { productConfig } from '#/lib/product-config'

export function LandingFooter() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5 text-rose-300/70">
          <Flower2 className="size-4" strokeWidth={1.5} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">
            {productConfig.brandName}
          </span>
        </div>
        <p className="text-xs text-stone-600">
          A digital gift for someone who deserves more than a text.
        </p>
      </div>
    </footer>
  )
}
