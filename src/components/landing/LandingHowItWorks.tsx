import { CreditCard, PenLine, Share2 } from 'lucide-react'

const steps = [
  {
    icon: PenLine,
    step: '01',
    title: 'Compose',
    description:
      'Write their name, your name, and a message only they should read.',
  },
  {
    icon: CreditCard,
    step: '02',
    title: 'Pay',
    description:
      'One simple payment. No subscription, no account required.',
  },
  {
    icon: Share2,
    step: '03',
    title: 'Share',
    description:
      'Copy the private link and send it by text, email, or however you choose.',
  },
]

export function LandingHowItWorks() {
  return (
    <section className="px-6 py-20 sm:py-24" id="how-it-works">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-gold/70">
          How it works
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl font-medium text-white sm:text-5xl">
          Three steps to something unforgettable
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <article
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur"
              key={step.step}
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-stone-600">
                {step.step}
              </span>
              <span className="mt-6 flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <step.icon className="size-5 text-rose-300/90" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-serif text-2xl text-stone-100">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
