import { heroExampleRotationConfig } from '#/lib/hero-example-rotation-config'

interface HeroExampleProgressPillsProps {
  activeIndex: number
  className?: string
  labels: readonly string[]
  onSelect: (index: number) => void
  progressCycleKey: number
}

export function HeroExampleProgressPills({
  activeIndex,
  className = '',
  labels,
  onSelect,
  progressCycleKey,
}: HeroExampleProgressPillsProps) {
  const durationMs = heroExampleRotationConfig.intervalMs

  return (
    <div
      aria-label={labels.join(', ')}
      className={`relative z-30 mb-3 flex items-center justify-start gap-2.5 pointer-events-auto sm:mb-4 lg:mb-4 lg:gap-3 ${className}`}
      role="tablist"
    >
      {labels.map((label, index) => {
        const isActive = index === activeIndex

        return (
          <button
            aria-label={label}
            aria-selected={isActive}
            className="cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-soft/60"
            key={`${label}-${index}`}
            onClick={() => {
              onSelect(index)
            }}
            role="tab"
            type="button"
          >
            <span className="relative block h-1 w-9 overflow-hidden rounded-full bg-rose-soft/20 sm:w-10 lg:h-1.5 lg:w-12">
              <span
                className={`absolute inset-y-0 left-0 w-full origin-left rounded-full bg-rose-soft motion-reduce:transition-none ${
                  isActive
                    ? 'hero-example-pill-fill'
                    : 'scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'
                }`}
                key={isActive ? progressCycleKey : `idle-${index}`}
                style={
                  isActive
                    ? {
                        animationDuration: `${durationMs}ms`,
                      }
                    : undefined
                }
              />
            </span>
          </button>
        )
      })}
    </div>
  )
}
