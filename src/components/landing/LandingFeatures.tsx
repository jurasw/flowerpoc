import { Heart, Link2, Rotate3d, Sparkles } from 'lucide-react'

import { useI18n } from '#/lib/i18n/i18n-context'

export function LandingFeatures() {
  const { t } = useI18n()

  const features = [
    {
      icon: Rotate3d,
      title: t.features.rose.title,
      description: t.features.rose.description,
    },
    {
      icon: Heart,
      title: t.features.message.title,
      description: t.features.message.description,
    },
    {
      icon: Sparkles,
      title: t.features.lasting.title,
      description: t.features.lasting.description,
    },
    {
      icon: Link2,
      title: t.features.link.title,
      description: t.features.link.description,
    },
  ]

  return (
    <section
      className="border-t border-white/5 bg-[radial-gradient(ellipse_at_center,_rgba(124,31,51,0.08)_0%,_transparent_70%)] px-4 py-20 sm:px-6 sm:py-24"
      id="features"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-gold/70">
          {t.features.eyebrow}
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl font-medium text-white sm:text-5xl">
          {t.features.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-stone-500">
          {t.features.subtitle}
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
