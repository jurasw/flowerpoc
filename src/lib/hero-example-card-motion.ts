import type { HeroExampleSlideDirection } from '#/lib/hero-example-slide-direction'

const heroExampleCardMotionEaseClass =
  'ease-in-out motion-reduce:transition-none motion-reduce:duration-150'

function getHeroExampleCardMotionBaseClass(useSlideMotion: boolean): string {
  if (useSlideMotion) {
    return `transition-[opacity,transform] duration-600 ${heroExampleCardMotionEaseClass}`
  }

  return `transition-opacity duration-700 ease-out ${heroExampleCardMotionEaseClass}`
}

function getHeroExampleLeavingOffsetClass(
  isVisible: boolean,
  slideDirection: HeroExampleSlideDirection,
  useSlideMotion: boolean,
): string {
  if (!useSlideMotion) {
    return ''
  }

  if (isVisible) {
    return 'translate-x-0'
  }

  return slideDirection === 'forward'
    ? '-translate-x-6'
    : 'translate-x-6'
}

function getHeroExampleIncomingOffsetClass(
  isVisible: boolean,
  slideDirection: HeroExampleSlideDirection,
  useSlideMotion: boolean,
): string {
  if (!useSlideMotion) {
    return ''
  }

  if (isVisible) {
    return 'translate-x-0'
  }

  return slideDirection === 'forward'
    ? 'translate-x-6'
    : '-translate-x-6'
}

export function getHeroExampleLeavingCardClass(
  isVisible: boolean,
  slideDirection: HeroExampleSlideDirection = 'forward',
  useSlideMotion = false,
): string {
  const offsetClass = getHeroExampleLeavingOffsetClass(
    isVisible,
    slideDirection,
    useSlideMotion,
  )

  return `${getHeroExampleCardMotionBaseClass(useSlideMotion)} ${offsetClass} ${isVisible ? 'opacity-100' : 'opacity-0'}`
}

export function getHeroExampleIncomingCardClass(
  isVisible: boolean,
  slideDirection: HeroExampleSlideDirection = 'forward',
  useSlideMotion = false,
): string {
  const offsetClass = getHeroExampleIncomingOffsetClass(
    isVisible,
    slideDirection,
    useSlideMotion,
  )

  return `${getHeroExampleCardMotionBaseClass(useSlideMotion)} ${offsetClass} ${isVisible ? 'opacity-100' : 'opacity-0'}`
}
