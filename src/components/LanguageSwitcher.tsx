import { useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'

import { useI18n } from '#/lib/i18n/i18n-context'
import { type Locale, LOCALE_LABELS, LOCALES } from '#/lib/i18n/locale'
import { setLocale } from '#/server/locale'

export function LanguageSwitcher(): React.ReactElement {
  const { locale } = useI18n()
  const router = useRouter()
  const setLocaleFn = useServerFn(setLocale)
  const [isPending, setIsPending] = useState(false)

  async function handleSelect(next: Locale): Promise<void> {
    if (next === locale || isPending) {
      return
    }

    setIsPending(true)

    try {
      await setLocaleFn({ data: { locale: next } })
      await router.invalidate()
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-white/10 bg-white/[0.04] p-0.5">
      {LOCALES.map((option) => (
        <button
          aria-pressed={option === locale}
          className={`rounded-md px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition disabled:cursor-not-allowed ${
            option === locale
              ? 'bg-wine text-white'
              : 'text-stone-400 hover:text-stone-200'
          }`}
          disabled={isPending}
          key={option}
          onClick={() => handleSelect(option)}
          title={LOCALE_LABELS[option]}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
