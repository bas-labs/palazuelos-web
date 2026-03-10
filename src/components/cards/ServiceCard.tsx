import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@/data/services'

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <Link to={`/servicios/${service.slug}`} className="group bg-[#fafaf8] p-7 h-full block hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-500 border border-zinc-100/80 hover:border-zinc-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#c41e3a] group-hover:w-full transition-all duration-700 ease-out" />
      <div className="w-11 h-11 bg-white group-hover:bg-[#c41e3a]/[0.06] flex items-center justify-center mb-6 transition-colors duration-500 border border-zinc-100 group-hover:border-[#c41e3a]/10">
        <Icon className="w-[18px] h-[18px] text-zinc-400 group-hover:text-[#c41e3a] transition-colors duration-500" />
      </div>
      <h3 className="font-['Playfair_Display'] text-[17px] font-semibold text-zinc-900 mb-3 leading-snug">{service.title}</h3>
      <p className="text-[13px] text-zinc-500 leading-[1.7] font-light mb-4">{service.shortDesc}</p>
      <span className="inline-flex items-center gap-2 text-[12px] text-zinc-400 group-hover:text-[#c41e3a] font-medium tracking-wide transition-colors duration-500">
        Ver más <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  )
}
