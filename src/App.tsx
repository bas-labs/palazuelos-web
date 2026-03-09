import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Ship, Plane, Truck, Warehouse, Globe, Shield, Clock, ArrowRight,
  Phone, Mail, MapPin, ChevronDown, Menu, X, Anchor, FileCheck,
  Container, Scale, BarChart3, Users, ArrowUpRight
} from 'lucide-react'

/* ─── ANIMATED COUNTER ─── */
function Counter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── REVEAL ANIMATION ─── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── SECTION LABEL ─── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-8 h-[2px] bg-[#c41e3a]" />
      <span className="text-[11px] tracking-[0.35em] uppercase font-semibold text-[#c41e3a]">{text}</span>
    </div>
  )
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'Historia', href: '#historia' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Empresas', href: '#empresas' },
    { label: 'Cobertura', href: '#cobertura' },
    { label: 'Contacto', href: '#contacto' },
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl shadow-[0_1px_30px_rgba(0,0,0,0.06)]'
          : 'bg-white/80 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#c41e3a] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="font-['Playfair_Display'] text-white text-lg font-bold">P</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-['Playfair_Display'] text-[15px] font-bold tracking-[0.08em] text-zinc-900">PALAZUELOS</div>
              <div className="text-[9px] tracking-[0.4em] uppercase -mt-0.5 text-zinc-400">Grupo Logístico</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="text-[13px] tracking-wide text-zinc-500 hover:text-zinc-900 transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#c41e3a] hover:after:w-full after:transition-all after:duration-300">
                {l.label}
              </a>
            ))}
            <a href="#contacto"
              className="ml-2 px-7 py-2.5 bg-[#c41e3a] text-white text-[12px] font-semibold tracking-[0.15em] hover:bg-[#a01830] transition-all duration-300 hover:shadow-lg hover:shadow-[#c41e3a]/25">
              COTIZAR
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-zinc-900">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-zinc-100 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="block text-lg text-zinc-700 hover:text-[#c41e3a] transition-colors">{l.label}</a>
              ))}
              <a href="#contacto" onClick={() => setOpen(false)}
                className="inline-block mt-4 px-6 py-3 bg-[#c41e3a] text-white font-semibold tracking-wider text-sm">COTIZAR</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ─── HERO ─── */
function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-white">
      {/* Subtle warm texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#fdfcfa] to-[#f8f5f0]" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c41e3a 0.5px, transparent 0)', backgroundSize: '48px 48px' }}
      />
      {/* Soft red glow accents */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#c41e3a]/[0.04] blur-[200px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c41e3a]/[0.03] blur-[150px] rounded-full" />
      {/* Decorative vertical line */}
      <div className="absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-zinc-200/50 to-transparent" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
          <div className="pt-28 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <SectionLabel text="Desde 1920" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-['Playfair_Display'] text-[clamp(3rem,8vw,6.5rem)] font-bold text-zinc-900 leading-[0.92] mb-8 tracking-tight"
            >
              Movemos
              <br />
              <span className="relative inline-block">
                <span className="text-[#c41e3a]">el mundo</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#c41e3a]/25 origin-left"
                />
              </span>
              <br />
              por ti
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-[17px] text-zinc-500 max-w-md leading-[1.8] mb-12 font-light"
            >
              Más de un siglo facilitando el comercio exterior de México. Agentes aduanales, freight forwarding y logística integral con infraestructura propia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-5"
            >
              <a href="#servicios"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#c41e3a] text-white text-[13px] font-semibold tracking-[0.12em] hover:bg-[#a01830] transition-all duration-300 shadow-xl shadow-[#c41e3a]/20 hover:shadow-[#c41e3a]/35 hover:-translate-y-0.5">
                NUESTROS SERVICIOS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#historia"
                className="inline-flex items-center gap-3 px-8 py-4 text-zinc-600 text-[13px] font-medium tracking-[0.12em] hover:text-zinc-900 border border-zinc-300 hover:border-[#c41e3a] transition-all duration-300 hover:-translate-y-0.5">
                NUESTRA HISTORIA
              </a>
            </motion.div>
          </div>

          {/* Stats panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-[1px] bg-zinc-200/70 overflow-hidden shadow-xl shadow-zinc-200/40">
              {[
                { num: 100, suffix: '+', label: 'Años de experiencia', icon: Clock },
                { num: 6, suffix: '', label: 'Empresas especializadas', icon: Users },
                { num: 50, suffix: '+', label: 'Países conectados', icon: Globe },
                { num: 24, suffix: '/7', label: 'Operación continua', icon: BarChart3 },
              ].map(({ num, suffix, label, icon: Icon }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                  className="bg-white p-8 group hover:bg-[#fafaf8] transition-all duration-500"
                >
                  <Icon className="w-5 h-5 text-[#c41e3a]/60 mb-5 group-hover:text-[#c41e3a] transition-colors duration-500" />
                  <div className="font-['Playfair_Display'] text-4xl font-bold text-zinc-900 mb-2 tracking-tight">
                    <Counter end={num} suffix={suffix} />
                  </div>
                  <div className="text-[13px] text-zinc-400 font-light">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="lg:hidden mt-16 grid grid-cols-2 gap-4"
        >
          {[
            { num: 100, suffix: '+', label: 'Años' },
            { num: 6, label: 'Empresas' },
            { num: 50, suffix: '+', label: 'Países' },
            { num: 24, suffix: '/7', label: 'Operación' },
          ].map(({ num, suffix = '', label }, i) => (
            <div key={i} className="bg-white border border-zinc-200/70 p-5 text-center shadow-sm">
              <div className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900"><Counter end={num} suffix={suffix} /></div>
              <div className="text-[11px] text-zinc-400 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
          <ChevronDown className="w-5 h-5 text-zinc-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─── OEA CERTIFICATIONS BAR ─── */
function Certifications() {
  return (
    <section className="relative py-5 bg-[#c41e3a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
        {[
          { icon: Shield, text: 'OPERADOR ECONÓMICO AUTORIZADO' },
          { icon: FileCheck, text: 'CERTIFICADO POR EL SAT' },
          { icon: Scale, text: 'MÁS DE 100 AÑOS' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {i > 0 && <div className="w-[1px] h-5 bg-white/20 hidden sm:block -ml-8" />}
            <item.icon className="w-4 h-4 text-white/80" />
            <span className="text-[10px] sm:text-xs font-semibold text-white tracking-wider">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── HISTORIA ─── */
function Historia() {
  const milestones = [
    { year: '1920', text: 'Fundación como agencia aduanal en el Puerto de Veracruz por Don Alfredo Palazuelos Leycegui' },
    { year: '1960', text: 'Expansión a los principales puertos y fronteras de México' },
    { year: '1990', text: 'Creación de Trip Mexicana (transporte) y ALMAN (almacenaje fiscal)' },
    { year: '2000', text: 'Apertura de oficina en Valencia, España. Red global de agentes internacionales' },
    { year: '2010', text: 'Certificación OEA por el SAT. Integración de FRIMAN y OCUPA' },
    { year: 'Hoy', text: 'Palazuelos Logistics: freight forwarding integral con infraestructura 100% propia' },
  ]

  return (
    <section id="historia" className="relative py-32 bg-[#fafaf8] overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f5f0ea]/40 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
        <Reveal>
          <SectionLabel text="Nuestra Historia" />
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-zinc-900 mb-5 tracking-tight leading-[1.05]">
            Un siglo construyendo<br /><span className="text-[#c41e3a]">prestigio</span>
          </h2>
          <p className="text-zinc-500 max-w-xl text-[17px] leading-[1.8] mb-20 font-light">
            Desde 1920, Grupo Palazuelos ha crecido de una agencia aduanal en Veracruz a un grupo logístico integral con presencia internacional.
          </p>
        </Reveal>

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
      </div>
    </section>
  )
}

/* ─── SERVICIOS ─── */
function Servicios() {
  const services = [
    { icon: Anchor, title: 'Despacho Aduanal', desc: 'Gestión integral de trámites aduanales en todos los puertos y fronteras de México.' },
    { icon: Ship, title: 'Freight Forwarding Marítimo', desc: 'Consolidación y transporte marítimo internacional con agentes en los principales puertos del mundo.' },
    { icon: Plane, title: 'Freight Forwarding Aéreo', desc: 'Envíos aéreos para cargas urgentes y de alto valor con seguimiento en tiempo real.' },
    { icon: Truck, title: 'Transporte Terrestre', desc: 'Flota propia (Trip Mexicana) para distribución nacional puerta a puerta.' },
    { icon: Warehouse, title: 'Almacenaje Fiscal', desc: 'Almacenes generales y fiscales (ALMAN) con capacidad refrigerada (FRIMAN) en Manzanillo.' },
    { icon: Container, title: 'Maniobras Portuarias', desc: 'Operación de maniobras (OCUPA) en el puerto de Manzanillo con equipo especializado.' },
    { icon: FileCheck, title: 'Asesoría en Permisos', desc: 'Trámites ante SAGARPA, SEMARNAT y COFEPRIS. Avisos automáticos de importación.' },
    { icon: Globe, title: 'Servicio Puerta a Puerta', desc: 'Recolección y entrega de mercancías en cualquier parte del mundo.' },
  ]

  return (
    <section id="servicios" className="relative py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <Reveal>
          <SectionLabel text="Servicios" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-zinc-900 tracking-tight leading-[1.05]">
              Toda la cadena<br /><span className="text-[#c41e3a]">logística</span>
            </h2>
            <p className="text-zinc-500 max-w-md text-[15px] leading-[1.8] font-light lg:text-right">
              A diferencia de nuestros competidores, cubrimos cada eslabón con infraestructura propia — desde el despacho aduanal hasta la entrega final.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group bg-[#fafaf8] p-7 h-full hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-500 border border-zinc-100/80 hover:border-zinc-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#c41e3a] group-hover:w-full transition-all duration-700 ease-out" />
                <div className="w-11 h-11 bg-white group-hover:bg-[#c41e3a]/[0.06] flex items-center justify-center mb-6 transition-colors duration-500 border border-zinc-100 group-hover:border-[#c41e3a]/10">
                  <s.icon className="w-[18px] h-[18px] text-zinc-400 group-hover:text-[#c41e3a] transition-colors duration-500" />
                </div>
                <h3 className="font-['Playfair_Display'] text-[17px] font-semibold text-zinc-900 mb-3 leading-snug">{s.title}</h3>
                <p className="text-[13px] text-zinc-500 leading-[1.7] font-light">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── EMPRESAS ─── */
function Empresas() {
  const companies = [
    { name: 'Palazuelos Logistics', role: 'Freight Forwarding', desc: 'Eje central del grupo. Integra todos los servicios logísticos con oficina en Valencia, España y red global de agentes.' },
    { name: 'Trip Mexicana', role: 'Transporte Terrestre', desc: 'Flota propia de transporte para distribución nacional con cobertura punto a punto.' },
    { name: 'OCUPA', role: 'Maniobras Portuarias', desc: 'Operaciones de maniobra y carga en el puerto de Manzanillo.' },
    { name: 'ALMAN', role: 'Almacenaje General y Fiscal', desc: 'Almacén fuera de puerto con capacidad de almacenaje fiscal regulado.' },
    { name: 'FRIMAN', role: 'Frigorífico', desc: 'Cadena de frío dentro del puerto de Manzanillo para productos perecederos.' },
  ]

  return (
    <section id="empresas" className="relative py-32 bg-[#fafaf8] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c41e3a 0.5px, transparent 0)', backgroundSize: '32px 32px' }}
      />
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#c41e3a]/[0.03] blur-[200px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
        <Reveal>
          <SectionLabel text="Nuestras Empresas" />
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-zinc-900 mb-5 tracking-tight leading-[1.05]">
            Infraestructura<br /><span className="text-[#c41e3a]">100% propia</span>
          </h2>
          <p className="text-zinc-500 max-w-xl text-[17px] leading-[1.8] mb-20 font-light">
            Un ecosistema de empresas especializadas que nos permite controlar cada etapa del proceso logístico.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {companies.slice(0, 3).map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group relative bg-white border border-zinc-100 hover:border-[#c41e3a]/15 p-9 h-full transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-[#c41e3a]/40 group-hover:to-transparent transition-all duration-700" />
                <div className="text-[10px] tracking-[0.3em] text-[#c41e3a] uppercase mb-4 font-semibold">{c.role}</div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mb-4 tracking-tight">{c.name}</h3>
                <p className="text-zinc-500 text-[14px] leading-[1.7] font-light">{c.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-zinc-300 group-hover:text-[#c41e3a] transition-colors duration-500">
                  <div className="w-6 h-[1px] bg-current" />
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-5 lg:max-w-[calc(66.666%-0.208rem)] lg:mx-auto">
          {companies.slice(3).map((c, i) => (
            <Reveal key={i + 3} delay={(i + 3) * 0.1}>
              <div className="group relative bg-white border border-zinc-100 hover:border-[#c41e3a]/15 p-9 h-full transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-[#c41e3a]/40 group-hover:to-transparent transition-all duration-700" />
                <div className="text-[10px] tracking-[0.3em] text-[#c41e3a] uppercase mb-4 font-semibold">{c.role}</div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mb-4 tracking-tight">{c.name}</h3>
                <p className="text-zinc-500 text-[14px] leading-[1.7] font-light">{c.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-zinc-300 group-hover:text-[#c41e3a] transition-colors duration-500">
                  <div className="w-6 h-[1px] bg-current" />
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── COBERTURA ─── */
function Cobertura() {
  const modes = [
    { icon: Ship, label: 'Marítimo', ports: 'Veracruz, Manzanillo, Lázaro Cárdenas, Altamira' },
    { icon: Plane, label: 'Aéreo', ports: 'CDMX, Guadalajara, Monterrey + red global' },
    { icon: Truck, label: 'Terrestre', ports: 'Cobertura nacional puerta a puerta' },
  ]

  return (
    <section id="cobertura" className="relative py-32 bg-white">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <Reveal>
          <SectionLabel text="Cobertura" />
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-zinc-900 mb-5 tracking-tight leading-[1.05]">
            Conectamos México<br /><span className="text-[#c41e3a]">con el mundo</span>
          </h2>
          <p className="text-zinc-500 max-w-xl text-[17px] leading-[1.8] mb-20 font-light">
            Oficina propia en Valencia, España y una red global de agentes para el manejo internacional de su carga.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-5">
          {modes.map((m, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className="group relative bg-[#fafaf8] p-10 h-[280px] flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-zinc-100 hover:border-[#c41e3a]/15 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-[#c41e3a] transition-all duration-700" />
                <div className="w-16 h-16 mx-auto mb-6 bg-white flex items-center justify-center border border-zinc-100 group-hover:border-[#c41e3a]/15 group-hover:bg-[#c41e3a]/[0.04] transition-all duration-500">
                  <m.icon className="w-6 h-6 text-[#c41e3a]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mb-3 tracking-tight">{m.label}</h3>
                <p className="text-zinc-500 text-[14px] font-light leading-relaxed">{m.ports}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { num: 4, label: 'Puertos principales' },
              { num: 50, label: 'Países conectados', suffix: '+' },
              { num: 1, label: 'Oficina en Europa' },
              { num: 100, label: '% Infraestructura propia' },
            ].map((s, i) => (
              <div key={i} className="py-6">
                <div className="font-['Playfair_Display'] text-3xl font-bold text-[#c41e3a]">
                  <Counter end={s.num} suffix={s.suffix || ''} />
                </div>
                <div className="text-sm text-zinc-500 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── CTA ─── */
function CTA() {
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
            <a href="#contacto"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#c41e3a] text-[13px] font-bold tracking-[0.1em] hover:bg-zinc-50 transition-all duration-300 shadow-lg hover:-translate-y-0.5">
              SOLICITAR COTIZACIÓN
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+529291234567"
              className="inline-flex items-center gap-3 px-10 py-4 border-2 border-white/30 text-white text-[13px] font-semibold tracking-[0.1em] hover:border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
              <Phone className="w-4 h-4" /> LLAMAR AHORA
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── CONTACTO ─── */
function Contacto() {
  return (
    <section id="contacto" className="relative py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <SectionLabel text="Contacto" />
              <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-zinc-900 mb-5 tracking-tight leading-[1.05]">
                Hablemos de<br /><span className="text-[#c41e3a]">tu proyecto</span>
              </h2>
              <p className="text-zinc-500 text-[17px] leading-[1.8] mb-12 font-light">
                Nuestro equipo de especialistas está listo para asesorarte en cada paso de tu operación de comercio exterior.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: 'Oficina Principal', text: 'Puerto de Veracruz, México' },
                  { icon: Globe, label: 'Oficina Europa', text: 'Valencia, España' },
                  { icon: Phone, label: 'Teléfono', text: '+52 (229) 123 4567' },
                  { icon: Mail, label: 'Email', text: 'contacto@palazuelos.mx' },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 shrink-0 bg-[#fafaf8] border border-zinc-100 flex items-center justify-center group-hover:border-[#c41e3a]/15 group-hover:bg-[#c41e3a]/[0.04] transition-all duration-500">
                      <c.icon className="w-4 h-4 text-[#c41e3a]" />
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase mb-0.5">{c.label}</div>
                      <div className="text-zinc-900 text-[15px] font-medium">{c.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="bg-[#fafaf8] border border-zinc-100 p-8 lg:p-10">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-zinc-900 mb-8">Cotizador rápido</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Nombre"
                    className="w-full bg-white border border-zinc-200 px-4 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a]/20 focus:outline-none transition-all" />
                  <input placeholder="Empresa"
                    className="w-full bg-white border border-zinc-200 px-4 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a]/20 focus:outline-none transition-all" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Email" type="email"
                    className="w-full bg-white border border-zinc-200 px-4 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a]/20 focus:outline-none transition-all" />
                  <input placeholder="Teléfono"
                    className="w-full bg-white border border-zinc-200 px-4 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a]/20 focus:outline-none transition-all" />
                </div>
                <select className="w-full bg-white border border-zinc-200 px-4 py-3.5 text-sm text-zinc-500 focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a]/20 focus:outline-none transition-all appearance-none">
                  <option>Tipo de servicio</option>
                  <option>Importación</option>
                  <option>Exportación</option>
                  <option>Freight Forwarding</option>
                  <option>Transporte Terrestre</option>
                  <option>Almacenaje</option>
                  <option>Otro</option>
                </select>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Origen"
                    className="w-full bg-white border border-zinc-200 px-4 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a]/20 focus:outline-none transition-all" />
                  <input placeholder="Destino"
                    className="w-full bg-white border border-zinc-200 px-4 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a]/20 focus:outline-none transition-all" />
                </div>
                <textarea placeholder="Descripción de la mercancía" rows={3}
                  className="w-full bg-white border border-zinc-200 px-4 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a]/20 focus:outline-none transition-all resize-none" />
                <button type="submit"
                  className="w-full py-4 bg-[#c41e3a] text-white text-[13px] font-bold tracking-[0.15em] hover:bg-[#a01830] transition-all duration-300 shadow-lg shadow-[#c41e3a]/20 hover:shadow-[#c41e3a]/30 hover:-translate-y-0.5">
                  ENVIAR COTIZACIÓN
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#c41e3a] flex items-center justify-center">
                <span className="font-['Playfair_Display'] text-white text-sm font-bold">P</span>
              </div>
              <span className="font-['Playfair_Display'] text-zinc-900 font-bold tracking-wide">PALAZUELOS</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              Marítimo · Aéreo · Terrestre<br />
              Facilitando el comercio exterior de México desde 1920.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.25em] text-[#c41e3a] uppercase mb-5 font-semibold">Servicios</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="hover:text-zinc-900 transition-colors cursor-pointer">Despacho Aduanal</li>
              <li className="hover:text-zinc-900 transition-colors cursor-pointer">Freight Forwarding</li>
              <li className="hover:text-zinc-900 transition-colors cursor-pointer">Transporte Terrestre</li>
              <li className="hover:text-zinc-900 transition-colors cursor-pointer">Almacenaje</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.25em] text-[#c41e3a] uppercase mb-5 font-semibold">Empresas</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="hover:text-zinc-900 transition-colors cursor-pointer">Palazuelos Logistics</li>
              <li className="hover:text-zinc-900 transition-colors cursor-pointer">Trip Mexicana</li>
              <li className="hover:text-zinc-900 transition-colors cursor-pointer">OCUPA</li>
              <li className="hover:text-zinc-900 transition-colors cursor-pointer">ALMAN · FRIMAN</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.25em] text-[#c41e3a] uppercase mb-5 font-semibold">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-200 pt-8 flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs text-zinc-400">© {new Date().getFullYear()} AJ Palazuelos S.C. Todos los derechos reservados.</p>
          <p className="text-xs text-zinc-400">Operador Económico Autorizado · Certificado por el SAT</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── APP ─── */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Certifications />
      <Historia />
      <Servicios />
      <Empresas />
      <Cobertura />
      <CTA />
      <Contacto />
      <Footer />
    </>
  )
}
