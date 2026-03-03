import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Ship, Plane, Truck, Warehouse, Globe, Shield, Clock, ArrowRight,
  Phone, Mail, MapPin, ChevronDown, Menu, X, Anchor, FileCheck,
  Container, Scale, BarChart3, Users
} from 'lucide-react'

// ─── NOISE GRAIN OVERLAY ───
function Grain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  )
}

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

// ─── SECTION REVEAL ───
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-[#d4a853]/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#d4a853] rounded-sm flex items-center justify-center">
              <span className="font-['Playfair_Display'] text-[#d4a853] text-lg font-bold">P</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-['Playfair_Display'] text-white text-lg font-bold tracking-wide">PALAZUELOS</div>
              <div className="text-[10px] tracking-[0.3em] text-[#d4a853]/70 uppercase">Grupo Logístico</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm tracking-wide text-zinc-400 hover:text-[#d4a853] transition-colors duration-300">
                {l.label}
              </a>
            ))}
            <a href="#contacto"
              className="ml-4 px-6 py-2.5 bg-[#d4a853] text-[#0a0e1a] text-sm font-semibold tracking-wide hover:bg-[#e4be6a] transition-colors">
              COTIZAR
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-white">
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
            className="lg:hidden bg-[#0a0e1a]/98 backdrop-blur-xl border-t border-[#d4a853]/10"
          >
            <div className="px-6 py-6 space-y-4">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="block text-lg text-zinc-300 hover:text-[#d4a853]">{l.label}</a>
              ))}
              <a href="#contacto" onClick={() => setOpen(false)}
                className="inline-block mt-4 px-6 py-3 bg-[#d4a853] text-[#0a0e1a] font-semibold">COTIZAR</a>
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#1a2340]" />

      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #d4a853 0px, transparent 1px, transparent 120px)',
        }}
      />

      {/* Gold diagonal accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#d4a853] to-transparent rounded-full blur-[120px]" />
      </div>

      {/* Red accent orb */}
      <div className="absolute bottom-20 left-20 w-[300px] h-[300px] opacity-[0.06]">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#c41e3a] to-transparent rounded-full blur-[100px]" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-[1px] bg-[#d4a853]" />
              <span className="text-[#d4a853] text-sm tracking-[0.3em] uppercase font-medium">Desde 1920</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-['Playfair_Display'] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] mb-8"
            >
              Movemos
              <br />
              <span className="text-[#d4a853]">el mundo</span>
              <br />
              por ti
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-zinc-400 max-w-lg leading-relaxed mb-10"
            >
              Más de un siglo facilitando el comercio exterior de México. Agentes aduanales, freight forwarding y logística integral con infraestructura propia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#servicios"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#d4a853] text-[#0a0e1a] font-semibold tracking-wide hover:bg-[#e4be6a] transition-all">
                NUESTROS SERVICIOS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#historia"
                className="inline-flex items-center gap-3 px-8 py-4 border border-zinc-700 text-zinc-300 hover:border-[#d4a853] hover:text-[#d4a853] transition-all">
                CONOCE NUESTRA HISTORIA
              </a>
            </motion.div>
          </div>

          {/* Stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#d4a853]/5 to-transparent rounded-sm" />
              <div className="relative grid grid-cols-2 gap-[1px] bg-zinc-800/30">
                {[
                  { num: 100, suffix: '+', label: 'Años de experiencia', icon: Clock },
                  { num: 6, suffix: '', label: 'Empresas especializadas', icon: Users },
                  { num: 50, suffix: '+', label: 'Países conectados', icon: Globe },
                  { num: 24, suffix: '/7', label: 'Operación continua', icon: BarChart3 },
                ].map(({ num, suffix, label, icon: Icon }, i) => (
                  <div key={i} className="bg-[#0f1629]/80 backdrop-blur-sm p-8 group hover:bg-[#1a2340]/60 transition-colors">
                    <Icon className="w-5 h-5 text-[#d4a853] mb-4 group-hover:scale-110 transition-transform" />
                    <div className="font-['Playfair_Display'] text-4xl font-bold text-white mb-2">
                      <Counter end={num} suffix={suffix} />
                    </div>
                    <div className="text-sm text-zinc-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown className="w-6 h-6 text-[#d4a853]/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── OEA BADGE + CERTIFICATIONS ───
function Certifications() {
  return (
    <section className="relative py-6 bg-[#d4a853]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-[#0a0e1a]" />
          <span className="text-sm font-semibold text-[#0a0e1a] tracking-wide">OPERADOR ECONÓMICO AUTORIZADO</span>
        </div>
        <div className="w-[1px] h-6 bg-[#0a0e1a]/20 hidden sm:block" />
        <div className="flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-[#0a0e1a]" />
          <span className="text-sm font-semibold text-[#0a0e1a] tracking-wide">CERTIFICADO POR EL SAT</span>
        </div>
        <div className="w-[1px] h-6 bg-[#0a0e1a]/20 hidden sm:block" />
        <div className="flex items-center gap-3">
          <Scale className="w-5 h-5 text-[#0a0e1a]" />
          <span className="text-sm font-semibold text-[#0a0e1a] tracking-wide">DESDE 1920</span>
        </div>
      </div>
    </section>
  )
}

// ─── HISTORIA ───
function Historia() {
  const milestones = [
    { year: '1920', text: 'Fundación como agencia aduanal en el Puerto de Veracruz por Don Alfredo Palazuelos Leycegui' },
    { year: '1960', text: 'Expansión a los principales puertos y fronteras de México' },
    { year: '1990', text: 'Creación de Trip Mexicana (transporte terrestre) y ALMAN (almacenaje fiscal)' },
    { year: '2000', text: 'Apertura de oficina en Valencia, España. Red global de agentes' },
    { year: '2010', text: 'Certificación OEA por el SAT. Integración de FRIMAN (frigorífico) y OCUPA (maniobras)' },
    { year: 'Hoy', text: 'Palazuelos Logistics: servicios integrales de freight forwarding con infraestructura 100% propia' },
  ]

  return (
    <section id="historia" className="relative py-28 bg-[#0f1629]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4a853]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#d4a853]" />
            <span className="text-[#d4a853] text-sm tracking-[0.3em] uppercase">Nuestra Historia</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6">
            Un siglo construyendo<br /><span className="text-[#d4a853]">prestigio</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed mb-16">
            Desde 1920, Grupo Palazuelos ha crecido de una agencia aduanal en Veracruz a un grupo logístico integral con presencia internacional.
          </p>
        </Reveal>

        <div className="relative">
          <div className="absolute left-[18px] lg:left-1/2 top-0 bottom-0 w-[1px] bg-[#d4a853]/20" />
          {milestones.map((m, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={`relative flex flex-col lg:flex-row items-start gap-8 mb-12 ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                <div className={`lg:w-1/2 ${i % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:pl-16'}`}>
                  <div className="font-['Playfair_Display'] text-3xl font-bold text-[#d4a853] mb-2">{m.year}</div>
                  <p className="text-zinc-400 leading-relaxed">{m.text}</p>
                </div>
                <div className="absolute left-[14px] lg:left-1/2 lg:-translate-x-1/2 w-[9px] h-[9px] rounded-full bg-[#d4a853] ring-4 ring-[#0f1629]" />
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
    <section id="servicios" className="relative py-28 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#d4a853]" />
            <span className="text-[#d4a853] text-sm tracking-[0.3em] uppercase">Servicios</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6">
            Toda la cadena<br /><span className="text-[#d4a853]">logística</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed mb-16">
            A diferencia de nuestros competidores, cubrimos cada eslabón con infraestructura propia — desde el despacho aduanal hasta la entrega final.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-zinc-800/20">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="bg-[#0f1629] p-8 h-full group hover:bg-[#1a2340]/60 transition-all duration-500 cursor-default">
                <s.icon className="w-6 h-6 text-[#d4a853] mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-['Playfair_Display'] text-lg font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
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
    { name: 'Palazuelos Logistics', role: 'Freight Forwarding integral', desc: 'Eje central del grupo. Integra todos los servicios logísticos con oficina en Valencia, España.' },
    { name: 'Trip Mexicana', role: 'Transporte Terrestre', desc: 'Flota propia de transporte para distribución nacional con cobertura punto a punto.' },
    { name: 'OCUPA', role: 'Maniobras Portuarias', desc: 'Operaciones de maniobra y carga en el puerto de Manzanillo.' },
    { name: 'ALMAN', role: 'Almacenaje General y Fiscal', desc: 'Almacén fuera de puerto con capacidad de almacenaje fiscal regulado.' },
    { name: 'FRIMAN', role: 'Frigorífico', desc: 'Cadena de frío dentro del puerto de Manzanillo para productos perecederos.' },
  ]

  return (
    <section id="empresas" className="relative py-28 bg-[#0f1629]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4a853]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#d4a853]" />
            <span className="text-[#d4a853] text-sm tracking-[0.3em] uppercase">Nuestras Empresas</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6">
            Infraestructura<br /><span className="text-[#d4a853]">100% propia</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed mb-16">
            Un ecosistema de empresas especializadas que nos permite controlar cada etapa del proceso logístico.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4a853]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative border border-zinc-800 group-hover:border-[#d4a853]/30 p-8 transition-all duration-500">
                  <div className="text-xs tracking-[0.2em] text-[#d4a853]/60 uppercase mb-3">{c.role}</div>
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-3">{c.name}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{c.desc}</p>
                  <div className="mt-6 w-8 h-[2px] bg-[#d4a853]/30 group-hover:w-16 group-hover:bg-[#d4a853] transition-all duration-500" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── COBERTURA (MAP SECTION) ───
function Cobertura() {
  const modes = [
    { icon: Ship, label: 'Marítimo', ports: 'Veracruz, Manzanillo, Lázaro Cárdenas, Altamira' },
    { icon: Plane, label: 'Aéreo', ports: 'CDMX, Guadalajara, Monterrey + red global' },
    { icon: Truck, label: 'Terrestre', ports: 'Cobertura nacional puerta a puerta' },
  ]

  return (
    <section id="cobertura" className="relative py-28 bg-[#0a0e1a] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #d4a853 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#d4a853]" />
            <span className="text-[#d4a853] text-sm tracking-[0.3em] uppercase">Cobertura</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6">
            Conectamos México<br /><span className="text-[#d4a853]">con el mundo</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed mb-16">
            Oficina propia en Valencia, España y una red global de agentes para el manejo internacional de su carga.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {modes.map((m, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="bg-[#0f1629] border border-zinc-800/50 p-10 text-center hover:border-[#d4a853]/20 transition-all duration-500">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#d4a853]/10 flex items-center justify-center">
                  <m.icon className="w-7 h-7 text-[#d4a853]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-3">{m.label}</h3>
                <p className="text-zinc-500 text-sm">{m.ports}</p>
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
                <div className="font-['Playfair_Display'] text-3xl font-bold text-[#d4a853]">
                  <Counter end={s.num} suffix={s.suffix || ''} />
                </div>
                <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#c41e3a] via-[#a01830] to-[#7a1020]" />
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #fff 35px, #fff 36px)',
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <Reveal>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            ¿Listo para mover tu carga?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Cotiza con nosotros y descubre por qué más de 100 años de experiencia hacen la diferencia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contacto"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#0a0e1a] font-semibold tracking-wide hover:bg-[#d4a853] transition-all">
              SOLICITAR COTIZACIÓN
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+529291234567"
              className="inline-flex items-center gap-3 px-10 py-4 border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-all">
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
    <section id="contacto" className="relative py-28 bg-[#0f1629]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4a853]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[1px] bg-[#d4a853]" />
                <span className="text-[#d4a853] text-sm tracking-[0.3em] uppercase">Contacto</span>
              </div>
              <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6">
                Hablemos de<br /><span className="text-[#d4a853]">tu proyecto</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-12">
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
                    <div className="w-10 h-10 shrink-0 bg-[#d4a853]/10 flex items-center justify-center group-hover:bg-[#d4a853]/20 transition-colors">
                      <c.icon className="w-4 h-4 text-[#d4a853]" />
                    </div>
                    <div>
                      <div className="text-xs tracking-widest text-zinc-600 uppercase">{c.label}</div>
                      <div className="text-white">{c.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="bg-[#0a0e1a] border border-zinc-800 p-8 lg:p-10">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-white mb-6">Cotizador rápido</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Nombre" className="w-full bg-[#0f1629] border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#d4a853] focus:outline-none transition-colors" />
                  <input placeholder="Empresa" className="w-full bg-[#0f1629] border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#d4a853] focus:outline-none transition-colors" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Email" type="email" className="w-full bg-[#0f1629] border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#d4a853] focus:outline-none transition-colors" />
                  <input placeholder="Teléfono" className="w-full bg-[#0f1629] border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#d4a853] focus:outline-none transition-colors" />
                </div>
                <select className="w-full bg-[#0f1629] border border-zinc-800 px-4 py-3 text-sm text-zinc-600 focus:border-[#d4a853] focus:outline-none transition-colors">
                  <option>Tipo de servicio</option>
                  <option>Importación</option>
                  <option>Exportación</option>
                  <option>Freight Forwarding</option>
                  <option>Transporte Terrestre</option>
                  <option>Almacenaje</option>
                  <option>Otro</option>
                </select>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Origen" className="w-full bg-[#0f1629] border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#d4a853] focus:outline-none transition-colors" />
                  <input placeholder="Destino" className="w-full bg-[#0f1629] border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#d4a853] focus:outline-none transition-colors" />
                </div>
                <textarea placeholder="Descripción de la mercancía" rows={3} className="w-full bg-[#0f1629] border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#d4a853] focus:outline-none transition-colors resize-none" />
                <button type="submit"
                  className="w-full py-4 bg-[#d4a853] text-[#0a0e1a] font-semibold tracking-wide hover:bg-[#e4be6a] transition-colors">
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
    <footer className="bg-[#070a14] border-t border-zinc-800/50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border-2 border-[#d4a853] rounded-sm flex items-center justify-center">
                <span className="font-['Playfair_Display'] text-[#d4a853] text-sm font-bold">P</span>
              </div>
              <span className="font-['Playfair_Display'] text-white font-bold">PALAZUELOS</span>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Marítimo · Aéreo · Terrestre<br />
              Facilitando el comercio exterior de México desde 1920.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] text-[#d4a853] uppercase mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>Despacho Aduanal</li>
              <li>Freight Forwarding</li>
              <li>Transporte Terrestre</li>
              <li>Almacenaje</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] text-[#d4a853] uppercase mb-4">Empresas</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>Palazuelos Logistics</li>
              <li>Trip Mexicana</li>
              <li>OCUPA</li>
              <li>ALMAN · FRIMAN</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] text-[#d4a853] uppercase mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-[#d4a853] transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="hover:text-[#d4a853] transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800/50 pt-8 flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs text-zinc-700">© {new Date().getFullYear()} AJ Palazuelos S.C. Todos los derechos reservados.</p>
          <p className="text-xs text-zinc-700">Operador Económico Autorizado · Certificado por el SAT</p>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ───
export default function App() {
  return (
    <>
      <Grain />
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
