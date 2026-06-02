import { Flower2 } from 'lucide-react'

import { productConfig } from '#/lib/product-config'

const navLinks = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
]

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          className="flex items-center gap-2.5 text-rose-300/90 transition hover:text-rose-200"
          href="#top"
        >
          <Flower2 className="size-5" strokeWidth={1.5} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">
            {productConfig.brandName}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500 transition hover:text-stone-300"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          className="inline-flex items-center justify-center rounded-lg bg-wine px-4 py-2 text-xs font-medium tracking-wide text-white transition hover:bg-wine-deep"
          href="#create"
        >
          Send a rose
        </a>
      </div>
    </header>
  )
}
