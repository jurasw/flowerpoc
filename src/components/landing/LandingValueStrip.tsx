import { Link2, Lock, Sparkles } from 'lucide-react'

import { productConfig } from '#/lib/product-config'

const valueItems = [
  {
    icon: Lock,
    label: 'Private link',
    description: 'Only they can open it',
  },
  {
    icon: Sparkles,
    label: `${productConfig.lifespanDays}-day freshness`,
    description: 'A rose that fades with time',
  },
  {
    icon: Link2,
    label: 'Personal message',
    description: 'Words meant for one person',
  },
]

export function LandingValueStrip() {
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
