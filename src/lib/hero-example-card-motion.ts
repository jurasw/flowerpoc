const heroExampleCardMotionEaseClass =
  'ease-in-out motion-reduce:transition-none motion-reduce:duration-150'

const heroExampleCardMotionBaseClass = `transition-opacity duration-600 ${heroExampleCardMotionEaseClass}`

export function getHeroExampleLeavingCardClass(isVisible: boolean): string {
  return `${heroExampleCardMotionBaseClass} ${isVisible ? 'opacity-100' : 'opacity-0'}`
}

export function getHeroExampleIncomingCardClass(isVisible: boolean): string {
  return `${heroExampleCardMotionBaseClass} ${isVisible ? 'opacity-100' : 'opacity-0'}`
}
