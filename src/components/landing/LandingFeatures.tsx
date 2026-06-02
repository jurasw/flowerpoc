import { Clock, Heart, Link2, Rotate3d } from 'lucide-react'

import { productConfig } from '#/lib/product-config'

const features = [
  {
    icon: Rotate3d,
    title: 'Hand-rendered 3D rose',
    description:
      'A beautiful rose they can rotate and admire from every angle in the browser.',
  },
  {
    icon: Heart,
    title: 'A message just for them',
    description:
      'Your words appear on an elegant card beneath the rose — intimate and personal.',
  },
  {
    icon: Clock,
    title: 'Ephemeral by design',
    description: `Each rose stays fresh for ${productConfig.lifespanDays} days, then gently wilts — like the real thing.`,
  },
  {
    icon: Link2,
    title: 'One private link',
    description:
      'No app to download. Send a single URL and they see their rose instantly.',
  },
]

export function LandingFeatures() {
  return (
    <section
      className="border-t border-white/5 bg-[radial-gradient(ellipse_at_center,_rgba(124,31,51,0.08)_0%,_transparent_70%)] px-6 py-20 sm:py-24"
      id="features"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-gold/70">
          Features
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl font-medium text-white sm:text-5xl">
          More than a message
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-stone-500">
          A digital gift that feels considered, beautiful, and deeply personal.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <article
              className="rounded-[2rem] border border-white/10 bg-[#100d0f]/60 p-8 backdrop-blur-xl"
              key={feature.title}
            >
              <span className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <feature.icon
                  className="size-5 text-rose-300/90"
                  strokeWidth={1.5}
                />
              </span>
              <h3 className="mt-5 font-serif text-2xl text-stone-100">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
