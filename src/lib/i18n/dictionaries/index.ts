import { en, type Dictionary } from '#/lib/i18n/dictionaries/en'
import { pl } from '#/lib/i18n/dictionaries/pl'
import type { Locale } from '#/lib/i18n/locale'

const dictionaries: Record<Locale, Dictionary> = {
  en,
  pl,
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
