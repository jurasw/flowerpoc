import QRCode from 'qrcode'
import { useEffect, useState } from 'react'

interface FlowerShareQrCodeProps {
  shareUrl: string
  label: string
}

export function FlowerShareQrCode({ shareUrl, label }: FlowerShareQrCodeProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!shareUrl) {
      setDataUrl(null)
      return
    }

    let isCancelled = false

    QRCode.toDataURL(shareUrl, {
      margin: 1,
      width: 200,
      color: { dark: '#f5f5f4', light: '#0a0608' },
    })
      .then((url) => {
        if (!isCancelled) {
          setDataUrl(url)
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setDataUrl(null)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [shareUrl])

  if (!dataUrl) {
    return null
  }

  return (
    <figure className="flex flex-col items-center gap-2">
      <img
        alt=""
        className="size-[200px] rounded-xl border border-white/10 bg-black/40 p-2"
        height={200}
        src={dataUrl}
        width={200}
      />
      <figcaption className="text-center text-xs text-stone-500">{label}</figcaption>
    </figure>
  )
}
