import QRCode from 'qrcode'
import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FlowerShareQrDownloadProps {
  shareUrl: string
  label: string
  downloadLabel: string
  downloadFileName: string
}

export function FlowerShareQrDownload({
  shareUrl,
  label,
  downloadLabel,
  downloadFileName,
}: FlowerShareQrDownloadProps) {
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

  function handleDownload(): void {
    if (!dataUrl) {
      return
    }

    const link = document.createElement('a')
    link.href = dataUrl
    link.download = downloadFileName
    link.click()
  }

  if (!dataUrl) {
    return null
  }

  return (
    <figure className="flex flex-col items-center gap-3">
      <img
        alt=""
        className="size-[200px] rounded-xl border border-white/10 bg-black/40 p-2"
        height={200}
        src={dataUrl}
        width={200}
      />
      <figcaption className="text-center text-xs text-stone-500">{label}</figcaption>
      <button
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-stone-200 transition hover:border-rose-300/40 hover:text-rose-200"
        onClick={handleDownload}
        type="button"
      >
        <Download className="size-4" />
        {downloadLabel}
      </button>
    </figure>
  )
}
