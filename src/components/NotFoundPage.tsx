import { Link } from '@tanstack/react-router'
import { Flower2 } from 'lucide-react'

import { useI18n } from '#/lib/i18n/i18n-context'

export function NotFoundPage() {
  const { t } = useI18n()

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_22%,#171316_0%,#0f0c0e_50%,#080708_100%)] px-6 text-center text-stone-100">
      <Flower2 className="size-8 text-rose-300/80" strokeWidth={1.5} />
      <h1 className="mt-6 font-serif text-4xl font-medium text-white">
        {t.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-stone-400">
        {t.notFound.description}
      </p>
      <Link
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-wine px-5 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-wine-deep"
        to="/"
      >
        {t.notFound.cta}
      </Link>
    </div>
  )
}
