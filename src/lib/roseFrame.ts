export interface RoseFrameSettings {
  fillRatio: number
  verticalFocus: number
}

export function getRoseFrameSettings(isDesktop: boolean): RoseFrameSettings {
  if (isDesktop) {
    return { fillRatio: 0.85, verticalFocus: 0.62 }
  }

  return { fillRatio: 0.8, verticalFocus: 0.7 }
}
