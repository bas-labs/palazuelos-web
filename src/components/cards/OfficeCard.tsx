import { MapPin, Phone as PhoneIcon } from 'lucide-react'
import type { Office } from '@/data/offices'

export function OfficeCard({ office }: { office: Office }) {
  return (
    <div className="group bg-[#fafaf8] border border-zinc-100 p-8 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:border-zinc-200 transition-all duration-500">
      <h3 className="font-['Playfair_Display'] text-xl font-bold text-zinc-900 mb-4 tracking-tight">{office.label}</h3>
      <div className="flex items-start gap-3 mb-4">
        <MapPin className="w-4 h-4 text-[#c41e3a] mt-0.5 shrink-0" />
        <p className="text-[14px] text-zinc-500 leading-relaxed font-light">{office.address}</p>
      </div>
      <div className="space-y-2">
        {office.phones.map((phone, i) => (
          <div key={i} className="flex items-center gap-3">
            <PhoneIcon className="w-3.5 h-3.5 text-[#c41e3a] shrink-0" />
            <a href={`tel:${phone.replace(/\s|\(|\)/g, '')}`} className="text-[14px] text-zinc-600 hover:text-[#c41e3a] transition-colors">{phone}</a>
          </div>
        ))}
      </div>
    </div>
  )
}
