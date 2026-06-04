import { Heart } from 'lucide-react'

import { FlowerPhonePreviewShell } from '#/components/flower/FlowerPhonePreviewShell'
import { VoiceMessagePlayer } from '#/components/flower/VoiceMessagePlayer'
import type { Flower } from '#/lib/flower-types'
import { useI18n } from '#/lib/i18n/i18n-context'

interface CheckoutFlowerPhonePreviewProps {
  flower: Flower
}

export function CheckoutFlowerPhonePreview({
  flower,
}: CheckoutFlowerPhonePreviewProps) {
  const { t } = useI18n()

  return (
    <FlowerPhonePreviewShell>
      <article className="mx-3 mb-6 rounded-[1.35rem] border border-white/10 bg-[#100d0f]/95 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-gold">
          <Heart className="size-2.5 fill-gold/80 text-gold" />
          <p className="text-[8px] font-medium uppercase tracking-[0.24em]">
            {t.flower.forRecipient(flower.recipientName)}
          </p>
        </div>
        <h1 className="mt-3 font-serif text-xl font-medium leading-tight text-white">
          <span className="italic text-rose-200">{flower.senderName}</span>
          {t.flower.senderGaveRoseSuffix}
        </h1>
        <div className="mt-4 h-px w-10 bg-gradient-to-r from-gold/70 to-transparent" />
        <blockquote className="mt-4 break-words font-serif text-sm leading-relaxed text-stone-50">
          <span className="italic">“{flower.quote}”</span>
        </blockquote>
        <p className="mt-3 text-right text-[10px] tracking-wide text-rose-200/70">
          — {flower.senderName}
        </p>
        {flower.voiceMessageId ? (
          <VoiceMessagePlayer
            className="mt-3"
            voiceMessageId={flower.voiceMessageId}
          />
        ) : null}
      </article>
    </FlowerPhonePreviewShell>
  )
}
