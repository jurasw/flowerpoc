import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { type Dictionary, getDictionary } from '#/lib/i18n/dictionaries'
import type { Locale } from '#/lib/i18n/locale'

interface I18nContextValue {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

interface I18nProviderProps {
  locale: Locale
  children: React.ReactNode
}

function applyDocumentLocale(locale: Locale): void {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = locale
  document.title = getDictionary(locale).meta.rootTitle
}

export function I18nProvider({
  locale: serverLocale,
  children,
}: I18nProviderProps): React.ReactElement {
  const [activeLocale, setActiveLocale] = useState(serverLocale)

  useEffect(() => {
    setActiveLocale(serverLocale)
  }, [serverLocale])

  const value = useMemo<I18nContextValue>(
    () => ({
      locale: activeLocale,
      t: getDictionary(activeLocale),
      setLocale: (nextLocale: Locale) => {
        setActiveLocale(nextLocale)
        applyDocumentLocale(nextLocale)
      },
    }),
    [activeLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }

  return context
}
