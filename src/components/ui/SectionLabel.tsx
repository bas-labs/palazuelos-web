export function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-8 h-[2px] bg-[#c41e3a]" />
      <span className="text-[11px] tracking-[0.35em] uppercase font-semibold text-[#c41e3a]">{text}</span>
    </div>
  )
}
