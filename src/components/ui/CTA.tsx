import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

export function CTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#c41e3a]" />
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #fff 35px, #fff 36px)' }}
      />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[200px] rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <Reveal>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white mb-6 leading-tight">
            ¿Listo para mover tu carga?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Cotiza con nosotros y descubre por qué más de 100 años de experiencia hacen la diferencia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/cotizador"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#c41e3a] text-[13px] font-bold tracking-[0.1em] hover:bg-zinc-50 transition-all duration-300 shadow-lg hover:-translate-y-0.5">
              SOLICITAR COTIZACIÓN
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:+525555111107"
              className="inline-flex items-center gap-3 px-10 py-4 border-2 border-white/30 text-white text-[13px] font-semibold tracking-[0.1em] hover:border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
              <Phone className="w-4 h-4" /> LLAMAR AHORA
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
