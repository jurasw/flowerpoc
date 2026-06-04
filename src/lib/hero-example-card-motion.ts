const heroExampleCardMotionEaseClass =
  'ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity motion-reduce:duration-150'

const heroExampleCardMotionBaseClass = `transition-[transform,opacity] duration-800 ${heroExampleCardMotionEaseClass}`

const heroExampleCardMotionReducedTransformClass =
  'motion-reduce:translate-y-0 motion-reduce:scale-100'

export function getHeroExampleLeavingCardClass(isVisible: boolean): string {
  const restingClass =
    'translate-y-0 scale-100 opacity-100 motion-reduce:opacity-100'
  const hiddenClass =
    'translate-y-5 scale-[0.98] opacity-0 motion-reduce:opacity-0'

  return `${heroExampleCardMotionBaseClass} ${heroExampleCardMotionReducedTransformClass} ${isVisible ? restingClass : hiddenClass}`
}

export function getHeroExampleIncomingCardClass(isVisible: boolean): string {
  const restingClass =
    'translate-y-0 scale-100 opacity-100 motion-reduce:opacity-100'
  const hiddenClass =
    'translate-y-7 scale-[0.97] opacity-0 motion-reduce:opacity-0'

  return `${heroExampleCardMotionBaseClass} ${heroExampleCardMotionReducedTransformClass} ${isVisible ? restingClass : hiddenClass}`
}
