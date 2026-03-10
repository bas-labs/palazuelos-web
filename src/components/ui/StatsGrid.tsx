import { Counter } from './Counter'
import { Reveal } from './Reveal'

interface Stat {
  num: number
  suffix?: string
  label: string
}

export function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <Reveal delay={0.3}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <div key={i} className="py-6">
            <div className="font-['Playfair_Display'] text-3xl font-bold text-[#c41e3a]">
              <Counter end={s.num} suffix={s.suffix || ''} />
            </div>
            <div className="text-sm text-zinc-500 mt-2">{s.label}</div>
          </div>
        ))}
      </div>
    </Reveal>
  )
}
