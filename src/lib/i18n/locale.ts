export const LOCALES = ['en', 'pl'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: unknown): value is Locale {
  if (typeof value !== 'string') {
    return false
  }

  return LOCALES.some((locale) => locale === value)
}

export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE
}

function localeFromLanguageTag(tag: string): Locale | null {
  const language = tag.trim().toLowerCase().split('-')[0]

  if (language === 'pl') {
    return 'pl'
  }

  if (language === 'en') {
    return 'en'
  }

  return null
}

export function localeFromAcceptLanguage(
  header: string | undefined | null,
): Locale | null {
  if (!header) {
    return null
  }

  const rankedLanguages = header
    .split(',')
    .map((part) => {
      const [languageTag, ...params] = part.trim().split(';')
      const qualityParam = params
        .map((param) => param.trim())
        .find((param) => param.startsWith('q='))
      const quality = qualityParam
        ? Number.parseFloat(qualityParam.slice(2))
        : 1

      return {
        languageTag,
        quality: Number.isFinite(quality) ? quality : 0,
      }
    })
    .sort((left, right) => right.quality - left.quality)

  for (const { languageTag } of rankedLanguages) {
    const locale = localeFromLanguageTag(languageTag)

    if (locale) {
      return locale
    }
  }

  return null
}

export function localeFromNavigatorLanguages(
  languages: readonly string[],
): Locale | null {
  for (const language of languages) {
    const locale = localeFromLanguageTag(language)

    if (locale) {
      return locale
    }
  }

  return null
}

export function detectLocale(
  acceptLanguage: string | undefined | null,
  navigatorLanguages?: readonly string[],
): Locale {
  const fromAcceptLanguage = localeFromAcceptLanguage(acceptLanguage)

  if (fromAcceptLanguage) {
    return fromAcceptLanguage
  }

  if (navigatorLanguages) {
    const fromNavigator = localeFromNavigatorLanguages(navigatorLanguages)

    if (fromNavigator) {
      return fromNavigator
    }
  }

  return DEFAULT_LOCALE
}
