export type HeroExampleSlideDirection = 'forward' | 'backward'

export function getHeroExampleSlideDirection(
  fromIndex: number,
  toIndex: number,
  itemCount: number,
): HeroExampleSlideDirection {
  if (fromIndex === toIndex || itemCount <= 1) {
    return 'forward'
  }

  const forwardSteps = (toIndex - fromIndex + itemCount) % itemCount
  const backwardSteps = (fromIndex - toIndex + itemCount) % itemCount

  return forwardSteps <= backwardSteps ? 'forward' : 'backward'
}
