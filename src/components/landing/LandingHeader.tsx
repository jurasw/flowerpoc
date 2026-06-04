import { Flower2 } from 'lucide-react'

import { useI18n } from '#/lib/i18n/i18n-context'
import { productConfig } from '#/lib/product-config'

const headerNavLinkClassName =
  'shrink-0 text-xs font-medium uppercase tracking-[0.12em] text-stone-500 transition hover:text-stone-300'

export function LandingHeader() {
  const { t } = useI18n()

  const navLinks = [
    { href: '#how-it-works', label: t.header.nav.howItWorks },
    { href: '#features', label: t.header.nav.features },
    { href: '#pricing', label: t.header.nav.pricing },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-4">
          <a
            className="flex min-w-0 items-center gap-2 text-rose-300/90 transition hover:text-rose-200"
            href="#top"
          >
            <Flower2 className="size-5 shrink-0" strokeWidth={1.5} />
            <span className="hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.35em] min-[380px]:inline">
              {productConfig.brandName}
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                className={headerNavLinkClassName}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-wine px-3 py-2 text-[10px] font-medium tracking-wide text-white transition hover:bg-wine-deep sm:px-4 sm:text-xs"
              href="#create"
            >
              {t.header.cta}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
