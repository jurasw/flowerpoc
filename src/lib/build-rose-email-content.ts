import { buildRoseShareUrl } from '#/lib/build-rose-share-url'
import type { Flower } from '#/lib/flower-types'
import { generateRoseQrDataUrl } from '#/lib/generate-rose-qr-data-url'
import { getDictionary } from '#/lib/i18n/dictionaries'
import type { Locale } from '#/lib/i18n/locale'
import { productConfig } from '#/lib/product-config'

export interface RoseEmailContent {
  subject: string
  html: string
}

interface BuildRoseEmailHtmlInput {
  flower: Flower
  locale: Locale
  qrDataUrl: string
  shareUrl: string
  isRecipientDelivery: boolean
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function buildRoseEmailContent(
  input: BuildRoseEmailHtmlInput,
): RoseEmailContent {
  const { flower, locale, qrDataUrl, shareUrl, isRecipientDelivery } = input
  const copy = getDictionary(locale).roseEmail
  const subject = isRecipientDelivery
    ? copy.subjectForRecipient(flower.senderName)
    : copy.subjectForSender
  const intro = isRecipientDelivery
    ? copy.introFromSender(flower.senderName)
    : copy.introOwnRose
  const greetingName = isRecipientDelivery
    ? flower.recipientName
    : flower.senderName

  const html = `<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#050403;color:#f5f5f4;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#050403;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:linear-gradient(180deg,#12080d 0%,#0a0608 100%);border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 12px;text-align:center;">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#b6925a;">${escapeHtml(productConfig.brandName)}</p>
                <h1 style="margin:0;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:34px;line-height:1.15;font-weight:500;font-style:italic;color:#f9d5e5;">${escapeHtml(copy.greeting(greetingName))}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 8px;text-align:center;">
                <p style="margin:0;font-size:16px;line-height:1.6;color:#d6d3d1;">${escapeHtml(intro)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 20px;text-align:center;">
                <p style="margin:0;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:22px;line-height:1.5;font-style:italic;color:#f5f5f4;">&ldquo;${escapeHtml(flower.quote)}&rdquo;</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 28px 24px;">
                <a href="${escapeHtml(shareUrl)}" style="display:inline-block;background-color:#7c1f33;border:1px solid rgba(249,213,229,0.25);border-radius:12px;color:#f5f5f4;font-size:15px;font-weight:600;line-height:1;text-decoration:none;padding:16px 28px;">${escapeHtml(copy.openRoseButton)}</a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 28px 28px;">
                <img src="${qrDataUrl}" alt="" width="200" height="200" style="display:block;width:200px;height:200px;border-radius:16px;border:1px solid rgba(255,255,255,0.1);background-color:#0a0608;padding:8px;" />
                <p style="margin:12px 0 0;font-size:12px;line-height:1.5;color:#a8a29e;">${escapeHtml(copy.qrLabel)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
                <p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:#78716c;">${escapeHtml(copy.footer)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  return { subject, html }
}

export function resolveRoseEmailDelivery(
  flower: Flower,
): { to: string; isRecipientDelivery: boolean } | null {
  if (flower.deliveryMethod === 'email' && flower.recipientEmail) {
    return {
      to: flower.recipientEmail,
      isRecipientDelivery: true,
    }
  }

  return {
    to: flower.senderEmail,
    isRecipientDelivery: false,
  }
}

export async function buildRoseEmailContentForFlower(
  flower: Flower,
  locale: Locale,
): Promise<RoseEmailContent | null> {
  const delivery = resolveRoseEmailDelivery(flower)

  if (!delivery) {
    return null
  }

  const shareUrl = buildRoseShareUrl(flower.id)
  const qrDataUrl = await generateRoseQrDataUrl(shareUrl)

  return buildRoseEmailContent({
    flower,
    locale,
    qrDataUrl,
    shareUrl,
    isRecipientDelivery: delivery.isRecipientDelivery,
  })
}
