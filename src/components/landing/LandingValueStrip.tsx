import { Link2, Lock, Sparkles } from 'lucide-react'

import { useI18n } from '#/lib/i18n/i18n-context'
import { productConfig } from '#/lib/product-config'

export function LandingValueStrip() {
  const { t } = useI18n()

  const valueItems = [
    {
      icon: Lock,
      label: t.valueStrip.privateLink.label,
      description: t.valueStrip.privateLink.description,
    },
    {
      icon: Sparkles,
      label: t.valueStrip.freshness.label(productConfig.lifespanDays),
      description: t.valueStrip.freshness.description,
    },
    {
      icon: Link2,
      label: t.valueStrip.personalMessage.label,
      description: t.valueStrip.personalMessage.description,
    },
  ]

  return (
    <section className="border-y border-white/5 bg-white/[0.02] px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        {valueItems.map((item) => (
          <div className="flex items-start gap-4" key={item.label}>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
              <item.icon className="size-4 text-rose-300/90" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-medium text-stone-100">{item.label}</p>
              <p className="mt-1 text-sm text-stone-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
