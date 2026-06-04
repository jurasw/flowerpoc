import {
  buildRoseEmailContentForFlower,
  resolveRoseEmailDelivery,
} from '#/lib/build-rose-email-content'
import type { Flower } from '#/lib/flower-types'
import type { Locale } from '#/lib/i18n/locale'
import { resolveLocale } from '#/lib/i18n/locale'
import {
  getResendClient,
  getResendFromAddress,
  isResendConfigured,
} from '#/lib/resend-client'

export async function sendRoseDeliveryEmail(
  flower: Flower,
  localeInput?: unknown,
): Promise<boolean> {
  if (!isResendConfigured()) {
    return false
  }

  const delivery = resolveRoseEmailDelivery(flower)

  if (!delivery) {
    return false
  }

  const locale: Locale = resolveLocale(localeInput)
  const content = await buildRoseEmailContentForFlower(flower, locale)

  if (!content) {
    return false
  }

  const resend = getResendClient()
  const result = await resend.emails.send({
    from: getResendFromAddress(),
    to: [delivery.to],
    subject: content.subject,
    html: content.html,
  })

  return !result.error
}
