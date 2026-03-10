import { useRef } from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!bgRef.current || !sectionRef.current) return
    gsap.fromTo(bgRef.current, { y: -60 }, {
      y: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: sectionRef })

  // Magnetic button helper
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' })
  }
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' })
  }

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden">
      <div ref={bgRef} className="absolute -inset-20 bg-[#c41e3a]" />
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #fff 35px, #fff 36px)' }}
      />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[200px] rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-['Playfair_Display'] text-[clamp(2.5rem,6vw,4rem)] font-bold text-white mb-6 leading-tight">
          ¿Listo para mover tu carga?
        </h2>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Cotiza con nosotros y descubre por qué más de 100 años de experiencia hacen la diferencia.
        </p>
        <div className="flex flex-wrap justify-center gap-5">
          <Link to="/cotizador"
            onMouseMove={handleMove} onMouseLeave={handleLeave}
            className="group inline-flex items-center gap-3 px-12 py-5 bg-white text-[#c41e3a] text-[13px] font-bold tracking-[0.12em] hover:bg-zinc-50 transition-colors duration-300 shadow-lg">
            SOLICITAR COTIZACIÓN
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="tel:+525555111107"
            onMouseMove={handleMove} onMouseLeave={handleLeave}
            className="inline-flex items-center gap-3 px-12 py-5 border-2 border-white/30 text-white text-[13px] font-semibold tracking-[0.12em] hover:border-white hover:bg-white/10 transition-all duration-300">
            <Phone className="w-4 h-4" /> LLAMAR AHORA
          </a>
        </div>
      </div>
    </section>
  )
}
