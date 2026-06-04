import { Heart } from 'lucide-react'

import { HeroExampleVoicePreview } from '#/components/landing/HeroExampleVoicePreview'
import { buildHeroExampleVoicePeaks } from '#/lib/hero-example-voice-peaks'
import { useI18n } from '#/lib/i18n/i18n-context'

export interface HeroExampleItem {
  id: string
  tabLabel: string
  recipientName: string
  senderName: string
  quote: string
  hasVoice: boolean
  voiceDurationSeconds?: number
  voicePeaksSeed?: number
}

interface HeroExampleMessageCardProps {
  example: HeroExampleItem
  isOverlay?: boolean
}

export function HeroExampleMessageCard({
  example,
  isOverlay = false,
}: HeroExampleMessageCardProps) {
  const { t } = useI18n()
  const voicePeaks =
    example.hasVoice && example.voicePeaksSeed !== undefined
      ? buildHeroExampleVoicePeaks(example.voicePeaksSeed)
      : []

  return (
    <article
      className={
        isOverlay
          ? 'rounded-[1.75rem] border border-ivory/25 bg-ivory/12 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-5'
          : 'rounded-2xl border border-white/10 bg-[#100d0f]/95 p-5 shadow-xl shadow-black/30'
      }
    >
      <div className="flex items-center gap-2 text-gold">
        <Heart className="size-3 fill-gold/80 text-gold" />
        <p className="text-[10px] font-medium uppercase tracking-[0.28em]">
          {t.flower.forRecipient(example.recipientName)}
        </p>
      </div>

      <h3 className="mt-4 font-serif text-2xl font-medium leading-tight text-white sm:text-[1.65rem]">
        <span className="italic text-rose-200">{example.senderName}</span>
        {t.flower.senderGaveRoseSuffix}
      </h3>

      <div className="mt-5 h-px w-12 bg-gradient-to-r from-gold/70 to-transparent" />

      <blockquote className="mt-5 break-words font-serif text-base leading-relaxed text-stone-50 sm:text-lg md:text-xl">
        <span className="italic">“{example.quote}”</span>
      </blockquote>

      <p className="mt-4 text-right text-xs tracking-wide text-rose-200/70">
        — {example.senderName}
      </p>

      {example.hasVoice &&
      example.voiceDurationSeconds !== undefined &&
      example.voicePeaksSeed !== undefined ? (
        <HeroExampleVoicePreview
          demoHint={t.hero.examples.demoVoiceHint}
          durationSeconds={example.voiceDurationSeconds}
          isMilky
          label={t.flower.voice.label}
          pauseLabel={t.flower.voice.pause}
          peaks={voicePeaks}
          playLabel={t.flower.voice.play}
        />
      ) : null}
    </article>
  )
}
