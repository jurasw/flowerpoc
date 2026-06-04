import { createContext, useContext, useMemo } from 'react'

import { type Dictionary, getDictionary } from '#/lib/i18n/dictionaries'
import type { Locale } from '#/lib/i18n/locale'

interface I18nContextValue {
  locale: Locale
  t: Dictionary
}

const I18nContext = createContext<I18nContextValue | null>(null)

interface I18nProviderProps {
  locale: Locale
  children: React.ReactNode
}

export function I18nProvider({
  locale,
  children,
}: I18nProviderProps): React.ReactElement {
  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: getDictionary(locale),
    }),
    [locale],
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
