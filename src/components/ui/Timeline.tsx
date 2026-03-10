import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { Milestone } from '@/data/milestones'

gsap.registerPlugin(ScrollTrigger)

export function Timeline({ milestones }: { milestones: Milestone[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    // Line draw (scrubbed)
    const line = containerRef.current.querySelector('[data-timeline-line]')
    if (line) {
      gsap.fromTo(line,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: line, start: 'top 80%', end: 'bottom 80%', scrub: true },
        }
      )
    }

    // Per-milestone orchestrated reveals
    const milestoneEls = containerRef.current.querySelectorAll('[data-milestone]')
    milestoneEls.forEach((ms, i) => {
      const dot = ms.querySelector('[data-milestone-dot]')
      const year = ms.querySelector('[data-milestone-year]')
      const text = ms.querySelector('[data-milestone-text]')
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ms, start: 'top 90%', once: true },
      })
      if (dot) tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' })
      if (year) tl.fromTo(year, { x: i % 2 === 0 ? -60 : 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2')
      if (text) tl.fromTo(text, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative">
      <div data-timeline-line className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#c41e3a]/20 via-[#c41e3a]/10 to-transparent" />
      {milestones.map((m, i) => (
        <div
          key={i}
          data-milestone
          className={`relative flex flex-col lg:flex-row items-start gap-8 mb-16 last:mb-0 ${
            i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
          }`}
        >
          <div className={`lg:w-1/2 pl-14 lg:pl-0 ${i % 2 === 0 ? 'lg:text-right lg:pr-20' : 'lg:pl-20'}`}>
            <div data-milestone-year className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#c41e3a]/70 mb-3">{m.year}</div>
            <p data-milestone-text className="text-zinc-600 leading-relaxed text-[15px]">{m.text}</p>
          </div>
          <div className="absolute left-[14px] lg:left-1/2 lg:-translate-x-1/2 top-2">
            <div data-milestone-dot className="w-[11px] h-[11px] rounded-full bg-[#c41e3a] ring-4 ring-[#fafaf8] shadow-sm" />
          </div>
          <div className="lg:w-1/2" />
        </div>
      ))}
    </div>
  )
}
