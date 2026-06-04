import type { ReactNode } from 'react'

import { IphoneDynamicIsland } from '#/components/IphoneDynamicIsland'

interface IphoneMockupProps {
  children: ReactNode
  className?: string
  isScrollable?: boolean
}

export function IphoneMockup({
  children,
  className = '',
  isScrollable = false,
}: IphoneMockupProps) {
  return (
    <div className={`relative w-full max-w-[300px] ${className}`}>
      <div className="rounded-[2.75rem] border-[5px] border-stone-600/90 bg-stone-800 p-[7px]">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.35rem] bg-[#080708]">
          <IphoneDynamicIsland />
          <div
            className={
              isScrollable
                ? 'absolute inset-0 overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                : 'absolute inset-0 flex h-full min-h-0 flex-col overflow-hidden'
            }
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
