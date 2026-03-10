import { Reveal } from './Reveal'
import type { Milestone } from '@/data/milestones'

export function Timeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="relative">
      <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#c41e3a]/20 via-[#c41e3a]/10 to-transparent" />
      {milestones.map((m, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <div className={`relative flex flex-col lg:flex-row items-start gap-8 mb-16 last:mb-0 ${
            i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
          }`}>
            <div className={`lg:w-1/2 pl-14 lg:pl-0 ${i % 2 === 0 ? 'lg:text-right lg:pr-20' : 'lg:pl-20'}`}>
              <div className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#c41e3a]/70 mb-3">{m.year}</div>
              <p className="text-zinc-600 leading-relaxed text-[15px]">{m.text}</p>
            </div>
            <div className="absolute left-[14px] lg:left-1/2 lg:-translate-x-1/2 top-2">
              <div className="w-[11px] h-[11px] rounded-full bg-[#c41e3a] ring-4 ring-[#fafaf8] shadow-sm" />
            </div>
            <div className="lg:w-1/2" />
          </div>
        </Reveal>
      ))}
    </div>
  )
}
