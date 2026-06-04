import { useEffect } from 'react'

import { scrollToAnchor } from '#/lib/scroll-to-anchor'

function clearUrlHash(): void {
  const { pathname, search } = window.location
  window.history.replaceState(window.history.state, '', `${pathname}${search}`)
}

function getAnchorIdFromHash(hash: string): string | null {
  if (!hash || hash === '#') {
    return null
  }

  const anchorId = hash.slice(1)

  if (!document.getElementById(anchorId)) {
    return null
  }

  return anchorId
}

export function useLandingAnchorScroll(): void {
  useEffect(() => {
    const initialAnchorId = getAnchorIdFromHash(window.location.hash)

    if (initialAnchorId) {
      scrollToAnchor(initialAnchorId)
      clearUrlHash()
    }

    function handleClick(event: MouseEvent): void {
      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest('a[href^="#"]')

      if (!(anchor instanceof HTMLAnchorElement)) {
        return
      }

      const anchorId = getAnchorIdFromHash(anchor.getAttribute('href') ?? '')

      if (!anchorId) {
        return
      }

      event.preventDefault()
      scrollToAnchor(anchorId)
      clearUrlHash()
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])
}
