import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  headingClipReveal,
  paraReveal,
  sectionClipWipe,
  cards3DReveal,
  cardsClipWipe,
  statBoxFloat,
  parallaxBg,
} from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scans a container for data-* attributes and auto-wires GSAP animations.
 * Call once per page with a ref to the outermost container.
 *
 * Supported attributes:
 * - [data-heading-reveal]   → heading clip-path slide-in
 * - [data-para-reveal]      → paragraph fade-up
 * - [data-section-reveal]   → section clip-path wipe
 * - [data-card-3d]          → 3D card reveal (grouped by [data-card-3d-group] parent)
 * - [data-card-clip]        → clip-path wipe cards
 * - [data-stat-float]       → stat box 3D float
 * - [data-parallax-bg]      → parallax background
 */
export function useScrollAnimations(
  containerRef: React.RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clean up previous context (for route changes)
    if (ctxRef.current) {
      ctxRef.current.revert()
    }

    ctxRef.current = gsap.context(() => {
      // Heading clip reveals
      container.querySelectorAll('[data-heading-reveal]').forEach(el => {
        headingClipReveal(el)
      })

      // Paragraph reveals
      container.querySelectorAll('[data-para-reveal]').forEach(el => {
        paraReveal(el)
      })

      // Section clip wipes
      container.querySelectorAll('[data-section-reveal]').forEach(el => {
        sectionClipWipe(el)
      })

      // 3D card reveals — grouped by parent
      const cardGroups = container.querySelectorAll('[data-card-3d-group]')
      if (cardGroups.length) {
        cardGroups.forEach(group => {
          const cards = Array.from(group.querySelectorAll('[data-card-3d]'))
          if (cards.length) cards3DReveal(cards)
        })
      } else {
        // Fallback: all data-card-3d in container as one group
        const allCards = Array.from(container.querySelectorAll('[data-card-3d]'))
        if (allCards.length) cards3DReveal(allCards)
      }

      // Clip-path wipe cards
      const clipCards = Array.from(container.querySelectorAll('[data-card-clip]'))
      if (clipCards.length) cardsClipWipe(clipCards)

      // Stat box float
      const statBoxes = Array.from(container.querySelectorAll('[data-stat-float]'))
      if (statBoxes.length) statBoxFloat(statBoxes)

      // Parallax backgrounds
      container.querySelectorAll('[data-parallax-bg]').forEach(el => {
        const trigger = el.closest('section') || el.parentElement || el
        parallaxBg(el, trigger)
      })
    }, container)

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert()
        ctxRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, ...deps])
}
