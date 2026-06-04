import { Play } from 'lucide-react'
import type { ReactNode } from 'react'

interface VoiceWaveformIconButtonProps {
  ariaLabel: string
  children: ReactNode
  className: string
  disabled?: boolean
  onClick: () => void
  size?: 'sm' | 'md'
}

const voiceWaveformIconButtonSizeClass = {
  sm: 'size-11 sm:size-9',
  md: 'size-11 sm:size-10',
} as const

const voiceWaveformIconButtonBaseClass =
  'relative z-10 inline-flex shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-full border transition pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50'

export function VoiceWaveformIconButton({
  ariaLabel,
  children,
  className,
  disabled = false,
  onClick,
  size = 'md',
}: VoiceWaveformIconButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={`${voiceWaveformIconButtonBaseClass} ${voiceWaveformIconButtonSizeClass[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

interface VoicePlayIconProps {
  className: string
}

export function VoicePlayIcon({ className }: VoicePlayIconProps) {
  return (
    <span className="inline-flex items-center justify-center">
      <Play className={className} />
    </span>
  )
}
