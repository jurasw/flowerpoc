import { createFileRoute, Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { Check, Copy, Flower2 } from 'lucide-react'
import { useState } from 'react'

import { RoseScene } from '#/components/RoseScene'
import { roseModelUrl } from '#/lib/roseModel'
import type { CreateFlowerResult } from '#/lib/flower-types'
import { createFlower } from '#/server/flowers'

export const Route = createFileRoute('/')({
  head: () => ({
    links: [
      {
        rel: 'preload',
        href: roseModelUrl,
        as: 'fetch',
        crossOrigin: 'anonymous',
      },
    ],
  }),
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
    <div className="min-h-screen bg-black text-stone-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10 lg:min-h-[calc(100vh-5rem)] lg:flex-row lg:items-stretch lg:gap-14 lg:py-12">
        <section className="flex flex-1 flex-col lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-rose-300/90">
              <Flower2 className="size-5" strokeWidth={1.5} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em]">
                Maison de Rose
              </p>
            </div>

            <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-white sm:text-6xl">
              Send a rose
              <br />
              <span className="italic text-rose-300">that lasts.</span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-stone-400">
              A single, hand-rendered rose paired with a message meant only for
              them. Compose it below and share a private link.
            </p>
          </div>

          <form
            className="mt-8 flex flex-1 flex-col gap-5 lg:mt-10 lg:min-h-0 lg:justify-end"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                  Your name
                </span>
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-rose-300/40 focus:ring-2 focus:ring-rose-300/10"
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
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-rose-300/40 focus:ring-2 focus:ring-rose-300/10"
                  maxLength={80}
                  onChange={(event) => setRecipientName(event.target.value)}
                  placeholder="Someone special"
                  required
                  value={recipientName}
                />
              </label>
            </div>

            <label className="flex min-h-0 flex-1 flex-col space-y-2">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                Your message
              </span>
              <textarea
                className="min-h-36 w-full flex-1 resize-none rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-rose-300/40 focus:ring-2 focus:ring-rose-300/10 lg:min-h-0"
                maxLength={500}
                onChange={(event) => setQuote(event.target.value)}
                placeholder="Write something only they should read..."
                required
                value={quote}
              />
            </label>

            {error ? (
              <p className="rounded-lg border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </p>
            ) : null}

            <button
              className="inline-flex w-full shrink-0 items-center justify-center rounded-lg bg-wine px-5 py-3.5 text-sm font-medium tracking-wide text-white shadow-lg shadow-wine/20 transition hover:bg-wine-deep disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Creating your rose…' : 'Generate share link'}
            </button>
          </form>

          {result ? (
            <div className="mt-6 shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="font-serif text-lg italic text-stone-100">
                Your rose is ready.
              </p>
              <p className="mt-1 text-sm text-stone-400">
                Copy the link below and send it by email.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  className="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-stone-300"
                  readOnly
                  value={shareUrl}
                />
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-medium text-stone-200 transition hover:border-rose-300/40 hover:text-rose-200"
                  onClick={handleCopyLink}
                  type="button"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? 'Copied' : 'Copy link'}
                </button>
              </div>
              <Link
                className="mt-4 inline-block text-sm font-medium text-rose-300 underline-offset-4 hover:underline"
                params={{ id: result.id }}
                to="/flower/$id"
              >
                Preview what they will see →
              </Link>
            </div>
          ) : null}
        </section>

        <section className="flex flex-col lg:min-h-0 lg:flex-1">
          <div className="relative h-[min(340px,48svh)] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1012] via-[#120a0c] to-[#0a0608] p-1 shadow-2xl shadow-black/60 ring-1 ring-white/10 sm:h-[380px] lg:flex lg:h-auto lg:min-h-[480px] lg:flex-1">
            <div className="pointer-events-none absolute inset-x-10 -top-24 h-64 rounded-full bg-wine/25 blur-[110px]" />
            <RoseScene
              className="absolute inset-0"
              deferUntilVisible
            />
            <span className="pointer-events-none absolute left-6 top-6 text-[11px] font-medium uppercase tracking-[0.3em] text-gold/70">
              Preview
            </span>
          </div>
          <p className="mt-4 shrink-0 text-center text-sm text-stone-500">
            Drag to rotate. Each rose stays fresh for five days from the moment
            its link is created.
          </p>
        </section>
      </div>
    </div>
  )
}
