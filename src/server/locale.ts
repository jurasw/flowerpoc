import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'

import { detectLocale, type Locale } from '#/lib/i18n/locale'

export const getLocale = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Locale> => {
    const acceptLanguage = getRequestHeader('accept-language')

    if (typeof navigator !== 'undefined') {
      return detectLocale(acceptLanguage, navigator.languages)
    }

    return detectLocale(acceptLanguage)
  },
)
