import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Ship, Plane, Truck, Warehouse, Globe, Shield, Clock, ArrowRight,
  Phone, Mail, MapPin, ChevronDown, Menu, X, Anchor, FileCheck,
  Container, Scale, BarChart3, Users, ArrowUpRight
} from 'lucide-react'

// ─── ANIMATED COUNTER ───
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

// ─── REVEAL (IntersectionObserver + CSS transition with fallback) ───
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fallback = setTimeout(() => setVisible(true), 1500 + delay * 1000)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } }, { threshold: 0.08 })
    io.observe(el)
    return () => { io.disconnect(); clearTimeout(fallback) }
  }, [delay])

  return (
    <div ref={ref} className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >{children}</div>
  )
}

// ─── SECTION LABEL ───
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-[1.5px] bg-[#c41e3a]" />
      <span className="text-[#c41e3a] text-[11px] tracking-[0.35em] uppercase font-semibold">{text}</span>
    </div>
  )
}

// ─── NAVBAR ───
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
        scrolled ? 'bg-white/90 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.04)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#c41e3a] rounded-sm flex items-center justify-center">
              <span className="font-['Playfair_Display'] text-white text-lg font-bold">P</span>
            </div>
            <div className="hidden sm:block">
              <div className={`font-['Playfair_Display'] text-[15px] font-bold tracking-[0.08em] transition-colors ${scrolled ? 'text-zinc-900' : 'text-white'}`}>PALAZUELOS</div>
              <div className={`text-[9px] tracking-[0.4em] uppercase -mt-0.5 transition-colors ${scrolled ? 'text-zinc-400' : 'text-white/50'}`}>Grupo Logístico</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className={`text-[13px] tracking-wide transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#c41e3a] hover:after:w-full after:transition-all ${scrolled ? 'text-zinc-400 hover:text-zinc-900' : 'text-white/60 hover:text-white'}`}>
                {l.label}
              </a>
            ))}
            <a href="#contacto"
              className="ml-2 px-7 py-2.5 bg-[#c41e3a] text-white text-[12px] font-semibold tracking-[0.15em] hover:bg-[#a01830] transition-all duration-300 hover:shadow-lg hover:shadow-[#c41e3a]/20">
              COTIZAR
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className={`lg:hidden ${scrolled ? 'text-zinc-900' : 'text-white'}`}>
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
            className="lg:hidden bg-white border-t border-zinc-100"
          >
            <div className="px-6 py-6 space-y-4">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="block text-lg text-zinc-700 hover:text-[#c41e3a]">{l.label}</a>
              ))}
              <a href="#contacto" onClick={() => setOpen(false)}
                className="inline-block mt-4 px-6 py-3 bg-[#c41e3a] text-white font-semibold">COTIZAR</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ─── HERO ───
function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-zinc-950">
      {/* Dot grid texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />
      {/* Red glow accents */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#c41e3a]/8 blur-[200px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c41e3a]/5 blur-[150px] rounded-full" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
          <div className="pt-24 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="w-10 h-[1.5px] bg-[#c41e3a]" />
              <span className="text-[#c41e3a]/80 text-[11px] tracking-[0.4em] uppercase font-medium">Desde 1920</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-['Playfair_Display'] text-[clamp(3rem,8vw,6.5rem)] font-bold text-white leading-[0.92] mb-8 tracking-tight"
            >
              Movemos
              <br />
              <span className="relative inline-block">
                <span className="text-[#c41e3a]">el mundo</span>
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#c41e3a]/30" />
              </span>
              <br />
              por ti
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-[17px] text-zinc-400 max-w-md leading-[1.7] mb-12 font-light"
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
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#c41e3a] text-white text-[13px] font-semibold tracking-[0.12em] hover:bg-[#a01830] transition-all duration-300 shadow-2xl shadow-[#c41e3a]/25 hover:shadow-[#c41e3a]/40">
                NUESTROS SERVICIOS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#historia"
                className="inline-flex items-center gap-3 px-8 py-4 text-zinc-400 text-[13px] font-medium tracking-[0.12em] hover:text-white border border-zinc-700 hover:border-zinc-500 transition-all duration-300">
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
            <div className="grid grid-cols-2 gap-[1px] bg-white/[0.06] overflow-hidden">
              {[
                { num: 100, suffix: '+', label: 'Años de experiencia', icon: Clock },
                { num: 6, suffix: '', label: 'Empresas especializadas', icon: Users },
                { num: 50, suffix: '+', label: 'Países conectados', icon: Globe },
                { num: 24, suffix: '/7', label: 'Operación continua', icon: BarChart3 },
              ].map(({ num, suffix, label, icon: Icon }, i) => (
                <div key={i} className="bg-white/[0.03] backdrop-blur-sm p-8 group hover:bg-white/[0.06] transition-all duration-500">
                  <Icon className="w-5 h-5 text-[#c41e3a]/60 mb-5 group-hover:text-[#c41e3a] transition-colors" />
                  <div className="font-['Playfair_Display'] text-4xl font-bold text-white mb-2 tracking-tight">
                    <Counter end={num} suffix={suffix} />
                  </div>
                  <div className="text-[13px] text-zinc-500 font-light">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown className="w-5 h-5 text-zinc-600" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── OEA CERTIFICATIONS ───
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
            {i > 0 && <div className="w-[1px] h-5 bg-white/20 hidden sm:block -ml-8 mr-0" />}
            <item.icon className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold text-white tracking-wider">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── HISTORIA ───
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
    <section id="historia" className="relative py-32 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zinc-50 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
        <Reveal>
          <SectionLabel text="Nuestra Historia" />
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 mb-5 tracking-tight leading-[1.05]">
            Un siglo construyendo<br /><span className="text-[#c41e3a]">prestigio</span>
          </h2>
          <p className="text-zinc-400 max-w-xl text-[17px] leading-[1.7] mb-20 font-light">
            Desde 1920, Grupo Palazuelos ha crecido de una agencia aduanal en Veracruz a un grupo logístico integral con presencia internacional.
          </p>
        </Reveal>

        <div className="relative">
          <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-200" />
          {milestones.map((m, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={`relative flex flex-col lg:flex-row items-start gap-8 mb-16 last:mb-0 ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                <div className={`lg:w-1/2 pl-14 lg:pl-0 ${i % 2 === 0 ? 'lg:text-right lg:pr-20' : 'lg:pl-20'}`}>
                  <div className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#c41e3a]/80 mb-3">{m.year}</div>
                  <p className="text-zinc-500 leading-relaxed text-[15px]">{m.text}</p>
                </div>
                <div className="absolute left-[14px] lg:left-1/2 lg:-translate-x-1/2 top-2">
                  <div className="w-[11px] h-[11px] rounded-full bg-[#c41e3a] ring-[3px] ring-white shadow-sm" />
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

// ─── SERVICIOS ───
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
    <section id="servicios" className="relative py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <Reveal>
          <SectionLabel text="Servicios" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.05]">
              Toda la cadena<br /><span className="text-[#c41e3a]">logística</span>
            </h2>
            <p className="text-zinc-400 max-w-md text-[15px] leading-[1.7] font-light lg:text-right">
              A diferencia de nuestros competidores, cubrimos cada eslabón con infraestructura propia — desde el despacho aduanal hasta la entrega final.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group bg-white p-7 hover:shadow-xl hover:shadow-zinc-200/60 transition-all duration-500 border border-transparent hover:border-zinc-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#c41e3a] group-hover:w-full transition-all duration-500" />
                <div className="w-11 h-11 bg-zinc-100 group-hover:bg-[#c41e3a]/5 flex items-center justify-center mb-6 transition-colors duration-300">
                  <s.icon className="w-[18px] h-[18px] text-zinc-400 group-hover:text-[#c41e3a] transition-colors duration-300" />
                </div>
                <h3 className="font-['Playfair_Display'] text-[17px] font-semibold text-zinc-900 mb-2.5 leading-snug">{s.title}</h3>
                <p className="text-[13px] text-zinc-400 leading-[1.65] font-light">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── EMPRESAS ───
function Empresas() {
  const companies = [
    { name: 'Palazuelos Logistics', role: 'Freight Forwarding', desc: 'Eje central del grupo. Integra todos los servicios logísticos con oficina en Valencia, España y red global de agentes.' },
    { name: 'Trip Mexicana', role: 'Transporte Terrestre', desc: 'Flota propia de transporte para distribución nacional con cobertura punto a punto.' },
    { name: 'OCUPA', role: 'Maniobras Portuarias', desc: 'Operaciones de maniobra y carga en el puerto de Manzanillo.' },
    { name: 'ALMAN', role: 'Almacenaje General y Fiscal', desc: 'Almacén fuera de puerto con capacidad de almacenaje fiscal regulado.' },
    { name: 'FRIMAN', role: 'Frigorífico', desc: 'Cadena de frío dentro del puerto de Manzanillo para productos perecederos.' },
  ]

  return (
    <section id="empresas" className="relative py-32 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c41e3a]/6 blur-[150px] rounded-full" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
        <Reveal>
          <SectionLabel text="Nuestras Empresas" />
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
            Infraestructura<br /><span className="text-[#c41e3a]">100% propia</span>
          </h2>
          <p className="text-zinc-500 max-w-xl text-[17px] leading-[1.7] mb-20 font-light">
            Un ecosistema de empresas especializadas que nos permite controlar cada etapa del proceso logístico.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group relative bg-white/[0.02] border border-white/[0.06] hover:border-[#c41e3a]/30 p-9 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04] overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#c41e3a]/0 group-hover:border-[#c41e3a]/20 transition-all duration-500" />
                <div className="text-[10px] tracking-[0.3em] text-[#c41e3a]/70 uppercase mb-4 font-semibold">{c.role}</div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-4 tracking-tight">{c.name}</h3>
                <p className="text-zinc-500 text-[14px] leading-[1.7] font-light">{c.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-zinc-600 group-hover:text-[#c41e3a] transition-colors duration-300">
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

// ─── COBERTURA ───
function Cobertura() {
  const modes = [
    { icon: Ship, label: 'Marítimo', ports: 'Veracruz, Manzanillo, Lázaro Cárdenas, Altamira' },
    { icon: Plane, label: 'Aéreo', ports: 'CDMX, Guadalajara, Monterrey + red global' },
    { icon: Truck, label: 'Terrestre', ports: 'Cobertura nacional puerta a puerta' },
  ]

  return (
    <section id="cobertura" className="relative py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <Reveal>
          <SectionLabel text="Cobertura" />
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 mb-5 tracking-tight leading-[1.05]">
            Conectamos México<br /><span className="text-[#c41e3a]">con el mundo</span>
          </h2>
          <p className="text-zinc-400 max-w-xl text-[17px] leading-[1.7] mb-20 font-light">
            Oficina propia en Valencia, España y una red global de agentes para el manejo internacional de su carga.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6">
          {modes.map((m, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="group relative bg-zinc-50 p-10 text-center transition-all duration-500 hover:bg-zinc-100/80 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-[#c41e3a] transition-all duration-500" />
                <div className="w-14 h-14 mx-auto mb-6 bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                  <m.icon className="w-6 h-6 text-[#c41e3a]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mb-3 tracking-tight">{m.label}</h3>
                <p className="text-zinc-400 text-[14px] font-light">{m.ports}</p>
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
              <div key={i}>
                <div className="font-['Playfair_Display'] text-3xl font-bold text-[#c41e3a]">
                  <Counter end={s.num} suffix={s.suffix || ''} />
                </div>
                <div className="text-sm text-zinc-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── CTA ───
function CTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#c41e3a]" />
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #fff 35px, #fff 36px)',
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <Reveal>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            ¿Listo para mover tu carga?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Cotiza con nosotros y descubre por qué más de 100 años de experiencia hacen la diferencia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contacto"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#c41e3a] font-semibold tracking-wide hover:bg-zinc-100 transition-all shadow-lg">
              SOLICITAR COTIZACIÓN
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+529291234567"
              className="inline-flex items-center gap-3 px-10 py-4 border-2 border-white/40 text-white hover:border-white hover:bg-white/10 transition-all">
              <Phone className="w-4 h-4" /> LLAMAR AHORA
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── CONTACTO ───
function Contacto() {
  return (
    <section id="contacto" className="relative py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[2px] bg-[#c41e3a]" />
                <span className="text-[#c41e3a] text-sm tracking-[0.3em] uppercase font-semibold">Contacto</span>
              </div>
              <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-zinc-900 mb-4">
                Hablemos de<br /><span className="text-[#c41e3a]">tu proyecto</span>
              </h2>
              <p className="text-zinc-500 text-lg leading-relaxed mb-12">
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
                    <div className="w-10 h-10 shrink-0 bg-[#c41e3a]/5 rounded-sm flex items-center justify-center group-hover:bg-[#c41e3a]/10 transition-colors">
                      <c.icon className="w-4 h-4 text-[#c41e3a]" />
                    </div>
                    <div>
                      <div className="text-xs tracking-widest text-zinc-400 uppercase">{c.label}</div>
                      <div className="text-zinc-900 font-medium">{c.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="bg-zinc-50 border border-zinc-100 p-8 lg:p-10 rounded-sm">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-zinc-900 mb-6">Cotizador rápido</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Nombre" className="w-full bg-white border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:outline-none transition-colors rounded-sm" />
                  <input placeholder="Empresa" className="w-full bg-white border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:outline-none transition-colors rounded-sm" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Email" type="email" className="w-full bg-white border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:outline-none transition-colors rounded-sm" />
                  <input placeholder="Teléfono" className="w-full bg-white border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:outline-none transition-colors rounded-sm" />
                </div>
                <select className="w-full bg-white border border-zinc-200 px-4 py-3 text-sm text-zinc-400 focus:border-[#c41e3a] focus:outline-none transition-colors rounded-sm">
                  <option>Tipo de servicio</option>
                  <option>Importación</option>
                  <option>Exportación</option>
                  <option>Freight Forwarding</option>
                  <option>Transporte Terrestre</option>
                  <option>Almacenaje</option>
                  <option>Otro</option>
                </select>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Origen" className="w-full bg-white border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:outline-none transition-colors rounded-sm" />
                  <input placeholder="Destino" className="w-full bg-white border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:outline-none transition-colors rounded-sm" />
                </div>
                <textarea placeholder="Descripción de la mercancía" rows={3} className="w-full bg-white border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#c41e3a] focus:outline-none transition-colors resize-none rounded-sm" />
                <button type="submit"
                  className="w-full py-4 bg-[#c41e3a] text-white font-semibold tracking-wide hover:bg-[#a01830] transition-colors rounded-sm shadow-lg shadow-[#c41e3a]/20">
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

// ─── FOOTER ───
function Footer() {
  return (
    <footer className="bg-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#c41e3a] rounded-sm flex items-center justify-center">
                <span className="font-['Playfair_Display'] text-white text-sm font-bold">P</span>
              </div>
              <span className="font-['Playfair_Display'] text-white font-bold">PALAZUELOS</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Marítimo · Aéreo · Terrestre<br />
              Facilitando el comercio exterior de México desde 1920.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] text-[#c41e3a] uppercase mb-4 font-semibold">Servicios</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="hover:text-white transition-colors cursor-pointer">Despacho Aduanal</li>
              <li className="hover:text-white transition-colors cursor-pointer">Freight Forwarding</li>
              <li className="hover:text-white transition-colors cursor-pointer">Transporte Terrestre</li>
              <li className="hover:text-white transition-colors cursor-pointer">Almacenaje</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] text-[#c41e3a] uppercase mb-4 font-semibold">Empresas</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="hover:text-white transition-colors cursor-pointer">Palazuelos Logistics</li>
              <li className="hover:text-white transition-colors cursor-pointer">Trip Mexicana</li>
              <li className="hover:text-white transition-colors cursor-pointer">OCUPA</li>
              <li className="hover:text-white transition-colors cursor-pointer">ALMAN · FRIMAN</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] text-[#c41e3a] uppercase mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-8 flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} AJ Palazuelos S.C. Todos los derechos reservados.</p>
          <p className="text-xs text-zinc-600">Operador Económico Autorizado · Certificado por el SAT</p>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ───
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
