const landingHeaderOffsetPx = 80

export function scrollToAnchor(anchorId: string): void {
  const normalizedId = anchorId.replace(/^#/, '')
  const target = document.getElementById(normalizedId)

  if (!target) {
    return
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  const top =
    target.getBoundingClientRect().top +
    window.scrollY -
    landingHeaderOffsetPx

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  })
}
