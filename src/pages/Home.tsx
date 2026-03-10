import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Ship, Plane, Truck, Clock, Users, Globe, BarChart3,
  ChevronDown, MapPin, Phone, Mail, ArrowRight, Shield, FileCheck, Scale,
} from 'lucide-react'

import { services } from '@/data/services'
import { companies } from '@/data/companies'
import { milestones } from '@/data/milestones'
import { Reveal } from '@/components/ui/Reveal'
import { Counter } from '@/components/ui/Counter'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTA } from '@/components/ui/CTA'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { CompanyCard } from '@/components/cards/CompanyCard'
import { QuoteForm } from '@/components/forms/QuoteForm'

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <>
      <Helmet>
        <title>Grupo Palazuelos | Agentes Aduanales desde 1920</title>
        <meta
          name="description"
          content="Más de 100 años facilitando el comercio exterior de México. Agentes aduanales, freight forwarding, transporte terrestre y logística integral con infraestructura propia."
        />
        <meta
          name="keywords"
          content="agentes aduanales, freight forwarding, comercio exterior, logística México, despacho aduanal, transporte terrestre, OEA"
        />
        <link rel="canonical" href="https://www.palazuelos.mx" />
      </Helmet>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100svh-5rem)] flex items-center overflow-hidden bg-white"
      >
        {/* Subtle warm texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#fdfcfa] to-[#f8f5f0]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #c41e3a 0.5px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Soft red glow accents */}
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#c41e3a]/[0.04] blur-[200px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c41e3a]/[0.03] blur-[150px] rounded-full" />
        {/* Decorative vertical line */}
        <div className="absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-zinc-200/50 to-transparent" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
            <div>
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
                Más de un siglo facilitando el comercio exterior de México.
                Agentes aduanales, freight forwarding y logística integral con
                infraestructura propia.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-wrap gap-5"
              >
                <Link
                  to="/servicios"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-[#c41e3a] text-white text-[13px] font-semibold tracking-[0.12em] hover:bg-[#a01830] transition-all duration-300 shadow-xl shadow-[#c41e3a]/20 hover:shadow-[#c41e3a]/35 hover:-translate-y-0.5"
                >
                  NUESTROS SERVICIOS
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/nosotros"
                  className="inline-flex items-center gap-3 px-8 py-4 text-zinc-600 text-[13px] font-medium tracking-[0.12em] hover:text-zinc-900 border border-zinc-300 hover:border-[#c41e3a] transition-all duration-300 hover:-translate-y-0.5"
                >
                  NUESTRA HISTORIA
                </Link>
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
              { num: 6, suffix: '', label: 'Empresas' },
              { num: 50, suffix: '+', label: 'Países' },
              { num: 24, suffix: '/7', label: 'Operación' },
            ].map(({ num, suffix = '', label }, i) => (
              <div key={i} className="bg-white border border-zinc-200/70 p-5 text-center shadow-sm">
                <div className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900">
                  <Counter end={num} suffix={suffix} />
                </div>
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

      {/* ─── CERTIFICATIONS BAR ─── */}
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

      {/* ─── HISTORIA PREVIEW ─── */}
      <section className="relative py-32 bg-[#fafaf8] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f5f0ea]/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal>
            <SectionLabel text="Nuestra Historia" />
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-zinc-900 mb-5 tracking-tight leading-[1.05]">
              Un siglo construyendo<br />
              <span className="text-[#c41e3a]">prestigio</span>
            </h2>
            <p className="text-zinc-500 max-w-xl text-[17px] leading-[1.8] mb-20 font-light">
              Desde 1920, Grupo Palazuelos ha crecido de una agencia aduanal en
              Veracruz a un grupo logístico integral con presencia internacional.
            </p>
          </Reveal>

          <div className="relative">
            <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#c41e3a]/20 via-[#c41e3a]/10 to-transparent" />
            {milestones.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className={`relative flex flex-col lg:flex-row items-start gap-8 mb-16 last:mb-0 ${
                    i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`lg:w-1/2 pl-14 lg:pl-0 ${i % 2 === 0 ? 'lg:text-right lg:pr-20' : 'lg:pl-20'}`}>
                    <div className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-[#c41e3a]/70 mb-3">
                      {m.year}
                    </div>
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

          <Reveal delay={0.4}>
            <div className="mt-16 text-center">
              <Link
                to="/nosotros"
                className="group inline-flex items-center gap-3 px-8 py-4 text-zinc-600 text-[13px] font-medium tracking-[0.12em] hover:text-zinc-900 border border-zinc-300 hover:border-[#c41e3a] transition-all duration-300 hover:-translate-y-0.5"
              >
                CONOCER MÁS DE NUESTRA HISTORIA
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SERVICIOS PREVIEW ─── */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal>
            <SectionLabel text="Servicios" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
              <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-zinc-900 tracking-tight leading-[1.05]">
                Toda la cadena<br />
                <span className="text-[#c41e3a]">logística</span>
              </h2>
              <p className="text-zinc-500 max-w-md text-[15px] leading-[1.8] font-light lg:text-right">
                A diferencia de nuestros competidores, cubrimos cada eslabón con
                infraestructura propia — desde el despacho aduanal hasta la
                entrega final.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.05}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-16 text-center">
              <Link
                to="/servicios"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#c41e3a] text-white text-[13px] font-semibold tracking-[0.12em] hover:bg-[#a01830] transition-all duration-300 shadow-xl shadow-[#c41e3a]/20 hover:shadow-[#c41e3a]/35 hover:-translate-y-0.5"
              >
                VER TODOS LOS SERVICIOS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── EMPRESAS ─── */}
      <section className="relative py-32 bg-[#fafaf8] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #c41e3a 0.5px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#c41e3a]/[0.03] blur-[200px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal>
            <SectionLabel text="Nuestras Empresas" />
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-zinc-900 mb-5 tracking-tight leading-[1.05]">
              Infraestructura<br />
              <span className="text-[#c41e3a]">100% propia</span>
            </h2>
            <p className="text-zinc-500 max-w-xl text-[17px] leading-[1.8] mb-20 font-light">
              Un ecosistema de empresas especializadas que nos permite controlar
              cada etapa del proceso logístico.
            </p>
          </Reveal>

          {/* First row: 3 cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {companies.slice(0, 3).map((company, i) => (
              <Reveal key={company.slug} delay={i * 0.1}>
                <CompanyCard company={company} />
              </Reveal>
            ))}
          </div>

          {/* Second row: 2 cards centered */}
          <div className="grid md:grid-cols-2 gap-5 mt-5 lg:max-w-[calc(66.666%-0.208rem)] lg:mx-auto">
            {companies.slice(3, 5).map((company, i) => (
              <Reveal key={company.slug} delay={(i + 3) * 0.1}>
                <CompanyCard company={company} />
              </Reveal>
            ))}
          </div>

          {/* Third row: remaining cards */}
          <div className="grid md:grid-cols-2 gap-5 mt-5 lg:max-w-[calc(66.666%-0.208rem)] lg:mx-auto">
            {companies.slice(5).map((company, i) => (
              <Reveal key={company.slug} delay={(i + 5) * 0.1}>
                <CompanyCard company={company} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COBERTURA ─── */}
      <section className="relative py-32 bg-white">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal>
            <SectionLabel text="Cobertura" />
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-zinc-900 mb-5 tracking-tight leading-[1.05]">
              Conectamos México<br />
              <span className="text-[#c41e3a]">con el mundo</span>
            </h2>
            <p className="text-zinc-500 max-w-xl text-[17px] leading-[1.8] mb-20 font-light">
              Oficina propia en Valencia, España y una red global de agentes
              para el manejo internacional de su carga.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-5">
            {[
              { icon: Ship, label: 'Marítimo', ports: 'Veracruz, Manzanillo, Lázaro Cárdenas, Altamira' },
              { icon: Plane, label: 'Aéreo', ports: 'CDMX, Guadalajara, Monterrey + red global' },
              { icon: Truck, label: 'Terrestre', ports: 'Cobertura nacional puerta a puerta' },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="group relative bg-[#fafaf8] p-10 h-[280px] flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-zinc-100 hover:border-[#c41e3a]/15 overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-[#c41e3a] transition-all duration-700" />
                  <div className="w-16 h-16 mx-auto mb-6 bg-white flex items-center justify-center border border-zinc-100 group-hover:border-[#c41e3a]/15 group-hover:bg-[#c41e3a]/[0.04] transition-all duration-500">
                    <m.icon className="w-6 h-6 text-[#c41e3a]" />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mb-3 tracking-tight">
                    {m.label}
                  </h3>
                  <p className="text-zinc-500 text-[14px] font-light leading-relaxed">{m.ports}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { num: 4, label: 'Puertos principales', suffix: '' },
                { num: 50, label: 'Países conectados', suffix: '+' },
                { num: 1, label: 'Oficina en Europa', suffix: '' },
                { num: 100, label: '% Infraestructura propia', suffix: '' },
              ].map((s, i) => (
                <div key={i} className="py-6">
                  <div className="font-['Playfair_Display'] text-3xl font-bold text-[#c41e3a]">
                    <Counter end={s.num} suffix={s.suffix} />
                  </div>
                  <div className="text-sm text-zinc-500 mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CTA />

      {/* ─── CONTACTO ─── */}
      <section id="contacto" className="relative py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal>
                <SectionLabel text="Contacto" />
                <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-zinc-900 mb-5 tracking-tight leading-[1.05]">
                  Hablemos de<br />
                  <span className="text-[#c41e3a]">tu proyecto</span>
                </h2>
                <p className="text-zinc-500 text-[17px] leading-[1.8] mb-12 font-light">
                  Nuestro equipo de especialistas está listo para asesorarte en
                  cada paso de tu operación de comercio exterior.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      label: 'Corporativo CDMX',
                      text: 'Bosque de Cidros 46 Int. 403',
                    },
                    {
                      icon: Globe,
                      label: 'Europa',
                      text: 'Valencia, España',
                    },
                    {
                      icon: Phone,
                      label: 'Teléfono',
                      text: '(55) 55 11 11 07',
                    },
                    {
                      icon: Mail,
                      label: 'Email',
                      text: 'erikasistemas@palazuelos.mx',
                    },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-11 h-11 shrink-0 bg-[#fafaf8] border border-zinc-100 flex items-center justify-center group-hover:border-[#c41e3a]/15 group-hover:bg-[#c41e3a]/[0.04] transition-all duration-500">
                        <c.icon className="w-4 h-4 text-[#c41e3a]" />
                      </div>
                      <div>
                        <div className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase mb-0.5">
                          {c.label}
                        </div>
                        <div className="text-zinc-900 text-[15px] font-medium">{c.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3}>
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
