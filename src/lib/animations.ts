import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Heading clip-path reveal ── */
export function headingClipReveal(el: Element) {
  return gsap.fromTo(el,
    { x: -80, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    {
      x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)',
      duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    }
  )
}

/* ── Paragraph reveal ── */
export function paraReveal(el: Element) {
  return gsap.fromTo(el,
    { y: 30, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    }
  )
}

/* ── Section clip-path wipe ── */
export function sectionClipWipe(el: Element) {
  return gsap.fromTo(el,
    { clipPath: 'inset(0 0 100% 0)' },
    {
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.4, ease: 'power3.inOut',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    }
  )
}

/* ── 3D card reveals with stagger ── */
export function cards3DReveal(cards: Element[]) {
  if (!cards.length) return
  const parent = cards[0].parentElement
  if (parent) gsap.set(parent, { perspective: 800 })
  return gsap.fromTo(cards,
    { y: 80, opacity: 0, rotateX: 8 },
    {
      y: 0, opacity: 1, rotateX: 0,
      stagger: 0.08, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: cards[0], start: 'top 80%', once: true },
    }
  )
}

/* ── Cards clip-path wipe ── */
export function cardsClipWipe(cards: Element[]) {
  if (!cards.length) return
  cards.forEach((card, i) => {
    gsap.fromTo(card,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0 0 0 0)',
        duration: 0.9, delay: i * 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 80%', once: true },
      }
    )
  })
}

/* ── Stat box 3D float ── */
export function statBoxFloat(boxes: Element[]) {
  if (!boxes.length) return
  return gsap.fromTo(boxes,
    { rotateX: 15, y: 60, opacity: 0, transformOrigin: 'bottom center' },
    {
      rotateX: 0, y: 0, opacity: 1,
      stagger: 0.12, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: boxes[0], start: 'top 85%', once: true },
    }
  )
}

/* ── Timeline line draw (scrubbed) ── */
export function timelineLineDraw(line: Element) {
  return gsap.fromTo(line,
    { scaleY: 0, transformOrigin: 'top center' },
    {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: line, start: 'top 80%', end: 'bottom 80%', scrub: true },
    }
  )
}

/* ── Milestone orchestrated reveal ── */
export function milestoneReveal(el: Element, i: number) {
  const dot = el.querySelector('[data-milestone-dot]')
  const year = el.querySelector('[data-milestone-year]')
  const text = el.querySelector('[data-milestone-text]')
  const tl = gsap.timeline({
    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
  })
  if (dot) tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' })
  if (year) tl.fromTo(year, { x: i % 2 === 0 ? -60 : 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2')
  if (text) tl.fromTo(text, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
  return tl
}

/* ── Parallax background ── */
export function parallaxBg(target: Element, trigger: Element, dist = 60) {
  return gsap.fromTo(target,
    { y: -dist },
    {
      y: dist, ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
    }
  )
}

/* ── Banner image parallax ── */
export function bannerImageParallax(img: Element, trigger: Element) {
  return gsap.fromTo(img,
    { y: -40, scale: 1.08 },
    {
      y: 40, scale: 1, ease: 'none',
      scrollTrigger: { trigger, start: 'top top', end: 'bottom top', scrub: true },
    }
  )
}

/* ── Banner title reveal (on mount) ── */
export function bannerTitleReveal(el: Element) {
  return gsap.fromTo(el,
    { yPercent: 100, rotate: 2 },
    { yPercent: 0, rotate: 0, duration: 1, delay: 0.15, ease: 'power4.out' }
  )
}

/* ── Slide from right (for sidebars) ── */
export function slideFromRight(el: Element) {
  return gsap.fromTo(el,
    { x: 60, opacity: 0 },
    {
      x: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    }
  )
}

/* ── Map image reveal (clip + scale) ── */
export function mapImageReveal(el: Element) {
  return gsap.fromTo(el,
    { clipPath: 'inset(0 0 100% 0)', scale: 1.05 },
    {
      clipPath: 'inset(0 0 0% 0)', scale: 1,
      duration: 1.4, ease: 'power3.inOut',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    }
  )
}

/* ── OEA card orchestrated reveal ── */
export function oeaCardReveal(card: Element) {
  const icon = card.querySelector('[data-oea-icon]')
  const text = card.querySelector('[data-oea-text]')
  const tl = gsap.timeline({
    scrollTrigger: { trigger: card, start: 'top 80%', once: true },
  })
  tl.fromTo(card,
    { clipPath: 'inset(0 0 100% 0)' },
    { clipPath: 'inset(0 0 0% 0)', duration: 1, ease: 'power3.inOut' }
  )
  if (icon) tl.fromTo(icon, { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.3')
  if (text) tl.fromTo(text, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
  return tl
}
