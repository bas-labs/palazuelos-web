const inputClass = "w-full bg-white border border-zinc-200 px-4 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a]/20 focus:outline-none transition-all"

export function ContactForm() {
  return (
    <div className="bg-[#fafaf8] border border-zinc-100 p-8 lg:p-10">
      <h3 className="font-['Playfair_Display'] text-xl font-semibold text-zinc-900 mb-8">Envíanos un mensaje</h3>
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Nombre" className={inputClass} />
          <input placeholder="Empresa" className={inputClass} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Email" type="email" className={inputClass} />
          <input placeholder="Teléfono" className={inputClass} />
        </div>
        <input placeholder="Asunto" className={inputClass} />
        <textarea placeholder="Mensaje" rows={4} className={`${inputClass} resize-none`} />
        <button type="submit"
          className="w-full py-4 bg-[#c41e3a] text-white text-[13px] font-bold tracking-[0.15em] hover:bg-[#a01830] transition-all duration-300 shadow-lg shadow-[#c41e3a]/20 hover:shadow-[#c41e3a]/30 hover:-translate-y-0.5">
          ENVIAR MENSAJE
        </button>
      </form>
    </div>
  )
}
