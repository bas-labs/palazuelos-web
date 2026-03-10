import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Company } from '@/data/companies'

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Link to={`/empresas/${company.slug}`} className="group relative bg-white border border-zinc-100 hover:border-[#c41e3a]/15 p-9 h-full block transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-[#c41e3a]/40 group-hover:to-transparent transition-all duration-700" />
      <div className="h-12 mb-6 flex items-center">
        <img src={company.logo} alt={company.name} className="h-full w-auto object-contain" />
      </div>
      <div className="text-[10px] tracking-[0.3em] text-[#c41e3a] uppercase mb-4 font-semibold">{company.role}</div>
      <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mb-4 tracking-tight">{company.name}</h3>
      <p className="text-zinc-500 text-[14px] leading-[1.7] font-light">{company.shortDesc}</p>
      <div className="mt-8 flex items-center gap-2 text-zinc-300 group-hover:text-[#c41e3a] transition-colors duration-500">
        <div className="w-6 h-[1px] bg-current" />
        <ArrowUpRight className="w-3 h-3" />
      </div>
    </Link>
  )
}
