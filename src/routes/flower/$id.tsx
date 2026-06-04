import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Heart, Sparkles } from 'lucide-react'

import { VoiceMessagePlayer } from '#/components/flower/VoiceMessagePlayer'
import { RoseScene } from '#/components/RoseScene'
import { useI18n } from '#/lib/i18n/i18n-context'
import { roseModelUrl } from '#/lib/roseModel'
import { getFlower } from '#/server/flowers'

export const Route = createFileRoute('/flower/$id')({
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
  loader: async ({ params }) => {
    const flower = await getFlower({ data: { id: params.id } })

    if (!flower) {
      throw notFound()
    }

    return flower
  },
  component: FlowerViewPage,
})

function FlowerLastingBadge({
  bloomedOn,
}: {
  bloomedOn: string
}): React.ReactElement {
  const { t } = useI18n()

  return (
    <div
      aria-label={t.flower.lasting.ariaLabel(bloomedOn)}
      className="flex items-center gap-2 rounded-[2rem] border border-white/10 bg-black/55 px-2.5 py-1.5 shadow-lg shadow-black/50 backdrop-blur-md"
      role="img"
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
        <Sparkles className="size-3 text-rose-300/90" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 text-[10px] font-medium uppercase leading-snug tracking-[0.12em]">
        <p className="text-stone-100">{t.flower.lasting.label}</p>
        <p className="mt-0.5 text-stone-500">
          {t.flower.lasting.bloomedOn(bloomedOn)}
        </p>
      </div>
    </div>
  )
}

function FlowerMessageCard({
  flower,
}: {
  flower: {
    recipientName: string
    senderName: string
    quote: string
    voiceMessageId?: string
  }
}) {
  const { t } = useI18n()

  return (
    <article className="relative z-10 mx-auto w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#100d0f]/90 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:max-w-2xl sm:p-9 lg:bg-white/[0.04] lg:min-h-0">
      <div className="flex items-center gap-2.5 text-gold">
        <Heart className="size-3.5 fill-gold/80 text-gold" />
        <p className="text-[11px] font-medium uppercase tracking-[0.3em]">
          {t.flower.forRecipient(flower.recipientName)}
        </p>
      </div>

      <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.05] text-white sm:text-5xl">
        <span className="italic text-rose-200">{flower.senderName}</span>
        {t.flower.senderGaveRoseSuffix}
      </h1>

      <div className="mt-7 h-px w-16 bg-gradient-to-r from-gold/70 to-transparent" />

      <blockquote className="mt-7 font-serif text-2xl leading-relaxed text-stone-50 sm:text-3xl">
        <span className="italic">“{flower.quote}”</span>
      </blockquote>

      <p className="mt-6 text-right text-sm tracking-wide text-rose-200/70">
        — {flower.senderName}
      </p>

      {flower.voiceMessageId ? (
        <VoiceMessagePlayer voiceMessageId={flower.voiceMessageId} />
      ) : null}
    </article>
  )
}

function FlowerViewPage() {
  const flower = Route.useLoaderData()
  const { locale, t } = useI18n()
  const bloomedOn = new Date(flower.createdAt).toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[radial-gradient(circle_at_50%_22%,#171316_0%,#0f0c0e_50%,#080708_100%)] text-stone-100">
      <div className="pointer-events-none absolute top-[18%] right-[12%] h-72 w-72 rounded-full bg-wine/20 blur-[130px] sm:h-96 sm:w-96" />

      <main className="relative z-10 mx-auto w-full max-w-xl px-5 pb-10 sm:max-w-2xl sm:px-8 lg:max-w-4xl lg:px-12 lg:pb-12 xl:max-w-5xl xl:px-16">
        <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[72svh] px-5 pt-3 sm:px-8 lg:pointer-events-auto lg:static lg:z-auto lg:h-auto lg:px-0 lg:pt-5">
          <div className="pointer-events-none absolute left-1/2 top-[42%] h-[70%] w-[85%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,225,210,0.16)_0%,rgba(255,200,180,0.06)_40%,transparent_70%)] blur-2xl lg:top-[38%] lg:h-[65%] lg:w-[75%] lg:max-w-2xl" />
          <RoseScene className="relative h-full w-full lg:mx-auto lg:h-[min(64dvh,680px)] xl:h-[min(68dvh,760px)] 2xl:h-[min(72dvh,840px)]" />
        </div>

        <div
          aria-hidden="true"
          className="h-[calc(72svh-4.5rem)] shrink-0 lg:hidden"
        />

        <section className="relative z-10 lg:-mt-2">
          <FlowerMessageCard flower={flower} />

          <div className="mx-auto mt-4 flex w-full max-w-xl items-center justify-between gap-4 sm:max-w-2xl">
            <FlowerLastingBadge bloomedOn={bloomedOn} />
            <Link
              className="shrink-0 pr-1 text-right text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400 underline-offset-4 transition hover:text-rose-200 hover:underline sm:pr-1.5 sm:text-xs sm:tracking-[0.2em]"
              to="/"
            >
              {t.flower.sendYourOwn}
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
