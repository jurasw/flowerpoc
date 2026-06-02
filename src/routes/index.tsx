import { createFileRoute } from '@tanstack/react-router'

import { CreateRoseForm } from '#/components/landing/CreateRoseForm'
import { LandingFeatures } from '#/components/landing/LandingFeatures'
import { LandingFooter } from '#/components/landing/LandingFooter'
import { LandingHeader } from '#/components/landing/LandingHeader'
import { LandingHero } from '#/components/landing/LandingHero'
import { LandingHowItWorks } from '#/components/landing/LandingHowItWorks'
import { LandingPricing } from '#/components/landing/LandingPricing'
import { LandingValueStrip } from '#/components/landing/LandingValueStrip'
import { productConfig } from '#/lib/product-config'
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
  head: () => ({
    meta: [
      {
        title: `${productConfig.productName} — Send a rose that lasts`,
      },
      {
        name: 'description',
        content:
          'Send a personalized digital rose with a private message. One payment, one link, five days of beauty.',
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
  }),
  component: LandingPage,
})

function LandingPage() {
  const { session_id: sessionId, canceled } = Route.useSearch()

  return (
    <div className="min-h-screen bg-black text-stone-100">
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
