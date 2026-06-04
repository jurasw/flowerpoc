import QRCode from 'qrcode'

export async function generateRoseQrDataUrl(shareUrl: string): Promise<string> {
  return QRCode.toDataURL(shareUrl, {
    margin: 1,
    width: 240,
    color: { dark: '#f5f5f4', light: '#0a0608' },
  })
}
