export interface RoseFrameSettings {
  fillRatio: number
  verticalFocus: number
}

export interface RoseInitialOrientation {
  leanX: number
  leanZ: number
  startYaw: number
  azimuthAngle: number
  polarAngle: number
}

export function getRoseFrameSettings(isDesktop: boolean): RoseFrameSettings {
  if (isDesktop) {
    return { fillRatio: 0.85, verticalFocus: 0.62 }
  }

  return { fillRatio: 0.8, verticalFocus: 0.7 }
}

export function getRoseInitialOrientation(): RoseInitialOrientation {
  return {
    leanX: -0.1,
    leanZ: 0.2,
    startYaw: 0.45,
    azimuthAngle: 0.28,
    polarAngle: Math.PI / 2.22,
  }
}

export const roseEntranceDurationSeconds = 2.2
export const roseEntranceStartScaleRatio = 0.1

function easeInOutCubic(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress))
  if (clamped < 0.5) {
    return 4 * clamped ** 3
  }
  return 1 - (-2 * clamped + 2) ** 3 / 2
}

export function getRoseEntranceScale(
  progress: number,
  targetScale: number,
): number {
  const eased = easeInOutCubic(progress)
  const ratio =
    roseEntranceStartScaleRatio + (1 - roseEntranceStartScaleRatio) * eased
  return targetScale * ratio
}
