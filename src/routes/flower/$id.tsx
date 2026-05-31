import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Heart } from 'lucide-react'

import { RoseScene } from '#/components/RoseScene'
import { FLOWER_LIFESPAN_DAYS, getFlowerLifecycle } from '#/lib/flower-lifecycle'
import { getFlower } from '#/server/flowers'

export const Route = createFileRoute('/flower/$id')({
  loader: async ({ params }) => {
    const flower = await getFlower({ data: { id: params.id } })

    if (!flower) {
      throw notFound()
    }

    return flower
  },
  component: FlowerViewPage,
})

function FlowerViewPage() {
  const flower = Route.useLoaderData()
  const lifecycle = getFlowerLifecycle(flower.createdAt)

  const bloomedOn = new Date(flower.createdAt).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_30%,#171316_0%,#0f0c0e_50%,#080708_100%)] text-stone-100">
      <div className="pointer-events-none absolute top-1/3 right-[12%] h-96 w-96 rounded-full bg-wine/20 blur-[130px]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center gap-8 px-5 py-12 lg:flex-row lg:gap-12 lg:px-10">
        <div className="relative flex w-full flex-1 items-center justify-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,225,210,0.16)_0%,rgba(255,200,180,0.06)_40%,transparent_70%)] blur-2xl" />
          <RoseScene className="relative h-[42vh] w-full max-w-xl sm:h-[52vh] lg:h-[78vh]" />
        </div>

        <div className="flex w-full flex-1 items-center justify-center lg:justify-start">
          <article className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
            <div className="flex items-center gap-2.5 text-gold">
              <Heart className="size-3.5 fill-gold/80 text-gold" />
              <p className="text-[11px] font-medium uppercase tracking-[0.3em]">
                For {flower.recipientName}
              </p>
            </div>

            <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.05] text-white sm:text-5xl">
              A rose from{' '}
              <span className="italic text-rose-200">{flower.senderName}</span>
            </h1>

            <div className="mt-7 h-px w-16 bg-gradient-to-r from-gold/70 to-transparent" />

            <blockquote className="mt-7 font-serif text-2xl leading-relaxed text-stone-50 sm:text-3xl">
              <span className="italic">“{flower.quote}”</span>
            </blockquote>

            <p className="mt-6 text-right text-sm tracking-wide text-rose-200/70">
              — {flower.senderName}
            </p>

            <div className="mt-9 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.12em] text-stone-400 sm:flex-row sm:items-center sm:justify-between">
              {lifecycle.isExpired ? (
                <p className="text-gold/90">
                  Wilted after {FLOWER_LIFESPAN_DAYS} days
                </p>
              ) : (
                <p className="flex items-center gap-2">
                  <span className="inline-block size-1.5 animate-pulse rounded-full bg-rose-400" />
                  {lifecycle.daysRemaining === 1
                    ? '1 day of freshness left'
                    : `${lifecycle.daysRemaining} days of freshness left`}
                </p>
              )}
              <p>Bloomed {bloomedOn}</p>
            </div>
          </article>
        </div>
      </div>

      <Link
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs font-medium uppercase tracking-[0.2em] text-stone-400 underline-offset-4 transition hover:text-rose-200 hover:underline"
        to="/"
      >
        Send your own rose
      </Link>
    </div>
  )
}
