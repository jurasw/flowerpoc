import type { ReactNode } from 'react'

import { RoseScene } from '#/components/RoseScene'

export const flowerPhoneRoseFrameSettings = {
  fillRatio: 0.72,
  verticalFocus: 0.48,
}

interface FlowerPhonePreviewShellProps {
  children: ReactNode
  deferRose?: boolean
}

export function FlowerPhonePreviewShell({
  children,
  deferRose = false,
}: FlowerPhonePreviewShellProps) {
  return (
    <div className="relative min-h-full bg-[#080708] text-stone-100">
      <div className="relative h-[248px] bg-[#080708]">
        <RoseScene
          className="absolute inset-x-0 bottom-0 top-11"
          deferUntilVisible={deferRose}
          frameSettings={flowerPhoneRoseFrameSettings}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
