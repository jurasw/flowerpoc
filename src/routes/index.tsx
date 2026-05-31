import { createFileRoute, Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { Check, Copy, Flower2 } from 'lucide-react'
import { useState } from 'react'

import { RoseScene } from '#/components/RoseScene'
import type { CreateFlowerResult } from '#/lib/flower-types'
import { createFlower } from '#/server/flowers'

export const Route = createFileRoute('/')({
  component: CreateFlowerPage,
})

function CreateFlowerPage() {
  const createFlowerFn = useServerFn(createFlower)
  const [senderName, setSenderName] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [quote, setQuote] = useState('')
  const [result, setResult] = useState<CreateFlowerResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const shareUrl =
    result && typeof window !== 'undefined'
      ? `${window.location.origin}/flower/${result.id}`
      : ''

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setError(null)
    setCopied(false)
    setIsSubmitting(true)

    try {
      const created = await createFlowerFn({
        data: { senderName, recipientName, quote },
      })
      setResult(created)
    } catch (submitError) {
      setResult(null)
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Could not create your flower. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleCopyLink(): Promise<void> {
    if (!shareUrl) {
      return
    }

    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-ivory text-stone-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-12 lg:flex-row lg:items-center lg:gap-16 lg:py-16">
        <section className="flex flex-1 flex-col justify-center">
          <div className="flex items-center gap-2.5 text-wine">
            <Flower2 className="size-5" strokeWidth={1.5} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]">
              Maison de Rose
            </p>
          </div>

          <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-stone-900 sm:text-6xl">
            Send a rose
            <br />
            <span className="italic text-wine">that lasts.</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-stone-500">
            A single, hand-rendered rose paired with a message meant only for
            them. Compose it below and share a private link.
          </p>

          <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                  Your name
                </span>
                <input
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-wine focus:ring-2 focus:ring-wine/15"
                  maxLength={80}
                  onChange={(event) => setSenderName(event.target.value)}
                  placeholder="Dominik"
                  required
                  value={senderName}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                  Their name
                </span>
                <input
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-wine focus:ring-2 focus:ring-wine/15"
                  maxLength={80}
                  onChange={(event) => setRecipientName(event.target.value)}
                  placeholder="Someone special"
                  required
                  value={recipientName}
                />
              </label>
            </div>

            <label className="block space-y-2">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                Your message
              </span>
              <textarea
                className="min-h-32 w-full resize-y rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-wine focus:ring-2 focus:ring-wine/15"
                maxLength={500}
                onChange={(event) => setQuote(event.target.value)}
                placeholder="Write something only they should read..."
                required
                value={quote}
              />
            </label>

            {error ? (
              <p className="rounded-lg border border-wine/25 bg-wine/5 px-4 py-3 text-sm text-wine-deep">
                {error}
              </p>
            ) : null}

            <button
              className="inline-flex w-full items-center justify-center rounded-lg bg-wine px-5 py-3.5 text-sm font-medium tracking-wide text-ivory shadow-sm transition hover:bg-wine-deep disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Creating your rose…' : 'Generate share link'}
            </button>
          </form>

          {result ? (
            <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <p className="font-serif text-lg italic text-stone-800">
                Your rose is ready.
              </p>
              <p className="mt-1 text-sm text-stone-500">
                Copy the link below and send it by email.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  className="flex-1 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600"
                  readOnly
                  value={shareUrl}
                />
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-wine hover:text-wine"
                  onClick={handleCopyLink}
                  type="button"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? 'Copied' : 'Copy link'}
                </button>
              </div>
              <Link
                className="mt-4 inline-block text-sm font-medium text-wine underline-offset-4 hover:underline"
                params={{ id: result.id }}
                to="/flower/$id"
              >
                Preview what they will see →
              </Link>
            </div>
          ) : null}
        </section>

        <section className="flex flex-1 flex-col lg:min-h-[560px]">
          <div className="relative flex-1 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#241015] via-[#1a0d11] to-[#120a0c] p-1 shadow-2xl shadow-wine-deep/30 ring-1 ring-white/5">
            <div className="pointer-events-none absolute inset-x-10 -top-24 h-64 rounded-full bg-wine/30 blur-[110px]" />
            <RoseScene className="relative h-[360px] lg:h-auto lg:min-h-[520px]" />
            <span className="pointer-events-none absolute left-6 top-6 text-[11px] font-medium uppercase tracking-[0.3em] text-gold/80">
              Preview
            </span>
          </div>
          <p className="mt-4 text-center text-sm text-stone-500">
            Drag to rotate. Each rose stays fresh for five days from the moment
            its link is created.
          </p>
        </section>
      </div>
    </div>
  )
}
