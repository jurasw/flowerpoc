import { useEffect } from 'react'

import { scrollToAnchor } from '#/lib/scroll-to-anchor'

export function useLandingAnchorScroll(): void {
  useEffect(() => {
    function handleClick(event: MouseEvent): void {
      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest('a[href^="#"]')

      if (!(anchor instanceof HTMLAnchorElement)) {
        return
      }

      const hash = anchor.getAttribute('href')

      if (!hash || hash === '#') {
        return
      }

      const anchorId = hash.slice(1)

      if (!document.getElementById(anchorId)) {
        return
      }

      event.preventDefault()
      scrollToAnchor(anchorId)

      if (window.history.replaceState) {
        window.history.replaceState(null, '', hash)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])
}
