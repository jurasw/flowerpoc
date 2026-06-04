import { createFileRoute } from '@tanstack/react-router'

import { useLandingAnchorScroll } from '#/hooks/useLandingAnchorScroll'
import { CreateRoseForm } from '#/components/landing/CreateRoseForm'
import { LandingFeatures } from '#/components/landing/LandingFeatures'
import { LandingFooter } from '#/components/landing/LandingFooter'
import { LandingHeader } from '#/components/landing/LandingHeader'
import { LandingHero } from '#/components/landing/LandingHero'
import { LandingHowItWorks } from '#/components/landing/LandingHowItWorks'
import { LandingPricing } from '#/components/landing/LandingPricing'
import { LandingValueStrip } from '#/components/landing/LandingValueStrip'
import { getDictionary } from '#/lib/i18n/dictionaries'
import type { Locale } from '#/lib/i18n/locale'
import { roseModelUrl } from '#/lib/roseModel'

interface HomeSearch {
  session_id?: string
  canceled?: string
}

function parseHomeSearch(search: Record<string, unknown>): HomeSearch {
  const sessionId =
    typeof search.session_id === 'string' ? search.session_id : undefined
  const canceled =
    search.canceled === '1' || search.canceled === 1 ? '1' : undefined

  return { session_id: sessionId, canceled }
}

export const Route = createFileRoute('/')({
  validateSearch: parseHomeSearch,
  loader: ({ context }): { locale: Locale } => ({ locale: context.locale }),
  head: ({ loaderData }) => {
    const t = getDictionary(loaderData?.locale ?? 'en')

    return {
      meta: [
        {
          title: t.meta.homeTitle(t.checkout.productName),
        },
        {
          name: 'description',
          content: t.meta.homeDescription,
        },
      ],
      links: [
        {
          rel: 'preload',
          href: roseModelUrl,
          as: 'fetch',
          crossOrigin: 'anonymous',
        },
      ],
    }
  },
  component: LandingPage,
})

function LandingPage() {
  const { session_id: sessionId, canceled } = Route.useSearch()
  useLandingAnchorScroll()

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-stone-100">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingValueStrip />
        <LandingHowItWorks />
        <LandingFeatures />
        <LandingPricing />
        <CreateRoseForm
          isCanceled={canceled === '1'}
          sessionId={sessionId}
        />
      </main>
      <LandingFooter />
    </div>
  )
}
