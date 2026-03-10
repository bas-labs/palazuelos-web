import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Counter } from './Counter'

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  num: number
  suffix?: string
  label: string
}

export function StatsGrid({ stats }: { stats: Stat[] }) {
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!gridRef.current) return
    const boxes = gridRef.current.querySelectorAll('[data-stat-float]')
    if (!boxes.length) return
    gsap.set(gridRef.current, { perspective: 800 })
    gsap.fromTo(boxes,
      { rotateX: 15, y: 60, opacity: 0, transformOrigin: 'bottom center' },
      {
        rotateX: 0, y: 0, opacity: 1,
        stagger: 0.12, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: boxes[0], start: 'top 85%', once: true },
      }
    )
  }, { scope: gridRef })

  return (
    <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
      {stats.map((s, i) => (
        <div key={i} data-stat-float className="py-6">
          <div className="font-['Playfair_Display'] text-3xl font-bold text-[#c41e3a]">
            <Counter end={s.num} suffix={s.suffix || ''} />
          </div>
          <div className="text-sm text-zinc-500 mt-2">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
