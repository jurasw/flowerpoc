import { createServerFn } from '@tanstack/react-start'
import {
  getCookie,
  getRequestHeader,
  setCookie,
} from '@tanstack/react-start/server'

import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
  LOCALE_COOKIE,
} from '#/lib/i18n/locale'

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

export const getLocale = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Locale> => {
    const cookieLocale = getCookie(LOCALE_COOKIE)

    if (isLocale(cookieLocale)) {
      return cookieLocale
    }

    const acceptLanguage = getRequestHeader('accept-language')

    if (acceptLanguage?.toLowerCase().includes('pl')) {
      return 'pl'
    }

    return DEFAULT_LOCALE
  },
)

export const setLocale = createServerFn({ method: 'POST' })
  .inputValidator((data: { locale: string }): { locale: Locale } => {
    if (!isLocale(data.locale)) {
      throw new Error('Unsupported locale.')
    }

    return { locale: data.locale }
  })
  .handler(async ({ data }): Promise<{ locale: Locale }> => {
    setCookie(LOCALE_COOKIE, data.locale, {
      path: '/',
      maxAge: COOKIE_MAX_AGE_SECONDS,
      sameSite: 'lax',
    })

    return { locale: data.locale }
  })
