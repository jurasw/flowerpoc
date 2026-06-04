import { memo } from 'react'
import { Heart } from 'lucide-react'

import { RoseScene } from '#/components/RoseScene'
import { VoiceWaveformPlayer } from '#/components/voice/VoiceWaveformPlayer'
import { flowerPhoneRoseFrameSettings } from '#/components/flower/FlowerPhonePreviewShell'
import { useI18n } from '#/lib/i18n/i18n-context'

interface CreateRosePreviewPanelProps {
  senderName: string
  recipientName: string
  quote: string
  voiceBlob: Blob | null
}

function resolvePreviewText(value: string, fallback: string): string {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : fallback
}

export const CreateRosePreviewPanel = memo(function CreateRosePreviewPanel({
  senderName,
  recipientName,
  quote,
  voiceBlob,
}: CreateRosePreviewPanelProps) {
  const { t } = useI18n()
  const form = t.createForm
  const displaySender = resolvePreviewText(senderName, form.senderPlaceholder)
  const displayRecipient = resolvePreviewText(
    recipientName,
    form.recipientPlaceholder,
  )
  const displayQuote = resolvePreviewText(quote, form.messagePlaceholder)
  const isSenderPlaceholder = senderName.trim().length === 0
  const isRecipientPlaceholder = recipientName.trim().length === 0
  const isQuotePlaceholder = quote.trim().length === 0

  return (
    <section className="flex min-h-0 flex-col lg:flex-1">
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2rem] bg-[#080708] shadow-2xl shadow-black/60 ring-1 ring-white/10 sm:min-h-[380px] lg:min-h-[480px]">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-64 rounded-full bg-wine/20 blur-[110px]" />
        <div className="relative min-h-[min(240px,36svh)] flex-1 sm:min-h-[280px]">
          <RoseScene
            className="absolute inset-x-0 bottom-4 top-2"
            deferUntilVisible
            frameSettings={flowerPhoneRoseFrameSettings}
          />
        </div>

        <div className="relative z-10 -mt-20 shrink-0 px-4 pb-4 sm:px-5 sm:pb-5">
          <article className="rounded-[1.75rem] border border-white/10 bg-[#100d0f]/95 shadow-xl shadow-black/40 backdrop-blur-xl">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-gold">
                <Heart className="size-3 fill-gold/80 text-gold" />
                <p
                  className={
                    isRecipientPlaceholder
                      ? 'text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500'
                      : 'text-[10px] font-medium uppercase tracking-[0.28em]'
                  }
                >
                  {t.flower.forRecipient(displayRecipient)}
                </p>
              </div>

              <h3 className="mt-4 font-serif text-2xl font-medium leading-tight text-white sm:text-[1.65rem]">
                <span
                  className={
                    isSenderPlaceholder
                      ? 'italic text-stone-500'
                      : 'italic text-rose-soft'
                  }
                >
                  {displaySender}
                </span>
                {t.flower.senderGaveRoseSuffix}
              </h3>

              <div className="mt-5 h-px w-12 bg-gradient-to-r from-gold/70 to-transparent" />

              <blockquote
                className={
                  isQuotePlaceholder
                    ? 'mt-5 break-words font-serif text-base leading-relaxed text-stone-500 sm:text-lg'
                    : 'mt-5 break-words font-serif text-base leading-relaxed text-stone-50 sm:text-lg md:text-xl'
                }
              >
                <span className="italic">“{displayQuote}”</span>
              </blockquote>

              {voiceBlob ? (
                <div className="mt-5 w-full min-w-0">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                    {t.flower.voice.label}
                  </p>
                  <VoiceWaveformPlayer
                    audioBlob={voiceBlob}
                    loadingLabel={form.voice.waveformLoading}
                    pauseLabel={form.voice.pausePreview}
                    playLabel={form.voice.playPreview}
                  />
                </div>
              ) : null}
            </div>
          </article>
        </div>
      </div>

      <p className="mt-4 shrink-0 text-center text-sm text-stone-500">
        {form.preview.caption}
      </p>
    </section>
  )
})
