export const LOCALES = ['en', 'pl'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_COOKIE = 'locale'

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  pl: 'Polski',
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && LOCALES.includes(value as Locale)
}

export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE
}
