import { useRef, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Ship, Plane, Truck, Clock, Users, Globe, BarChart3,
  ChevronDown, MapPin, Phone, Mail, ArrowRight, Shield, FileCheck, Scale,
} from 'lucide-react'

import { services } from '@/data/services'
import { companies } from '@/data/companies'
import { milestones } from '@/data/milestones'
import { Counter } from '@/components/ui/Counter'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTA } from '@/components/ui/CTA'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { CompanyCard } from '@/components/cards/CompanyCard'
import { QuoteForm } from '@/components/forms/QuoteForm'

gsap.registerPlugin(ScrollTrigger)

/* ── Magnetic Button ── */
function MagneticLink({ to, children, className }: { to: string; children: React.ReactNode; className: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(ref.current, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' })
  }, [])
  const handleLeave = useCallback(() => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' })
  }, [])
  return <Link ref={ref} to={to} className={className} onMouseMove={handleMove} onMouseLeave={handleLeave}>{children}</Link>
}

/* ── Marquee ── */
function Marquee() {
  const track = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (!track.current) return
    const w = track.current.scrollWidth / 2
    gsap.to(track.current, { x: -w, duration: 30, ease: 'none', repeat: -1 })
  }, { scope: track })

  const items = 'FREIGHT FORWARDING • DESPACHO ADUANAL • TRANSPORTE TERRESTRE • LOGÍSTICA INTEGRAL • OEA CERTIFICADO • COMERCIO EXTERIOR • '
  return (
    <div className="overflow-hidden py-6 bg-white border-y border-zinc-100">
      <div ref={track} className="flex whitespace-nowrap">
        {[0,1,2,3].map(i => (
          <span key={i} className="text-[clamp(1rem,3vw,1.5rem)] font-light tracking-[0.2em] text-zinc-300 uppercase px-4 shrink-0">
            {items}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const heroTextRef = useRef<HTMLHeadingElement>(null)
  const servicesTrackRef = useRef<HTMLDivElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const redLineRef = useRef<HTMLDivElement>(null)
  const statsOverlayRef = useRef<HTMLDivElement>(null)
  const statsPinRef = useRef<HTMLElement>(null)
  const giantCounterRef = useRef<HTMLSpanElement>(null)
  const giantCounterNumRef = useRef<HTMLDivElement>(null)

  /* ── Hero: line-by-line reveal (overflow-hidden mask) ── */
  useGSAP(() => {
    if (!heroTextRef.current) return
    const lines = heroTextRef.current.querySelectorAll('[data-hero-line]')
    gsap.fromTo(lines,
      { yPercent: 110, rotate: 3 },
      {
        yPercent: 0,
        rotate: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.3,
        ease: 'power4.out',
      }
    )
  }, { scope: heroTextRef })

  /* ── Hero paragraph entrance (after char reveal) ── */
  useGSAP(() => {
    const heroPara = containerRef.current?.querySelector('[data-hero-para]')
    if (!heroPara) return
    gsap.fromTo(heroPara,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: 'power2.out' }
    )
  }, { scope: containerRef })

  /* ── Hero parallax layers ── */
  useGSAP(() => {
    if (!heroRef.current) return
    const layers = heroRef.current.querySelectorAll('[data-parallax]')
    layers.forEach(layer => {
      const speed = parseFloat((layer as HTMLElement).dataset.parallax || '0')
      gsap.to(layer, {
        y: speed * 200,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  }, { scope: heroRef })

  /* ── Hero exit: scale down + fade as user scrolls past ── */
  useGSAP(() => {
    if (!heroRef.current) return
    const content = heroRef.current.querySelector('.relative.z-10')
    if (!content) return
    gsap.to(content, {
      scale: 0.92,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'center center',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: heroRef })

  /* ── Stat boxes float up with 3D ── */
  useGSAP(() => {
    const boxes = containerRef.current?.querySelectorAll('[data-stat-box]')
    if (!boxes?.length) return
    gsap.fromTo(boxes,
      { rotateX: 15, y: 60, opacity: 0, transformOrigin: 'bottom center' },
      {
        rotateX: 0, y: 0, opacity: 1,
        stagger: 0.12, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: boxes[0], start: 'top 85%', once: true },
      }
    )
  }, { scope: containerRef })

  /* ── Horizontal scroll services (sticky approach — no GSAP pin) ── */
  useGSAP(() => {
    if (!servicesTrackRef.current || !servicesSectionRef.current) return

    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': () => {
        const track = servicesTrackRef.current!
        const totalScroll = track.scrollWidth - window.innerWidth

        // Set the wrapper height so there's enough scroll distance
        gsap.set(servicesSectionRef.current, { height: totalScroll + window.innerHeight })

        gsap.to(track, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: servicesSectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      },
      '(max-width: 1023px)': () => {
        const cards = servicesTrackRef.current!.querySelectorAll('[data-service-card]')
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: cards[0], start: 'top 85%', once: true } },
        )
      },
    })
  }, { scope: servicesSectionRef })

  /* ── Red line that grows across viewport on scroll ── */
  useGSAP(() => {
    if (!redLineRef.current) return
    gsap.fromTo(redLineRef.current, { scaleX: 0 }, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  }, { scope: containerRef })

  /* ── Pinned giant counter section — scroll-scrubbed ── */
  useGSAP(() => {
    if (!statsPinRef.current || !statsOverlayRef.current || !giantCounterRef.current || !giantCounterNumRef.current) return

    const counterObj = { val: 0 }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: statsPinRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: true,
      },
    })

    // Phase 1 (0-70%): Count 0→100 with scale growth
    tl.fromTo(giantCounterNumRef.current,
      { scale: 0.8, opacity: 0.7 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'none' },
      0
    )
    tl.to(counterObj, {
      val: 100, duration: 0.7, ease: 'none',
      onUpdate: () => {
        if (giantCounterRef.current) giantCounterRef.current.textContent = Math.floor(counterObj.val) + '+'
      },
    }, 0)

    // Phase 2 (70-100%): "Años de experiencia" slides up
    tl.fromTo(statsOverlayRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' })
  }, { scope: statsPinRef })

  /* ── Section clip-path wipe transitions ── */
  useGSAP(() => {
    const sections = containerRef.current?.querySelectorAll('[data-section-reveal]')
    if (!sections) return
    sections.forEach(section => {
      gsap.fromTo(section,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        }
      )
    })
  }, { scope: containerRef })

  /* ── Staggered card reveals (companies) ── */
  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll('[data-company-card]')
    if (!cards?.length) return
    const parent = cards[0].parentElement
    if (parent) gsap.set(parent, { perspective: 800 })
    gsap.fromTo(cards,
      { y: 80, opacity: 0, rotateX: 8 },
      {
        y: 0, opacity: 1, rotateX: 0,
        stagger: 0.08, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: cards[0], start: 'top 80%', once: true },
      }
    )
  }, { scope: containerRef })

  /* ── Coverage cards — clip-path wipe-up ── */
  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll('[data-coverage-card]')
    if (!cards?.length) return
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0 0 0 0)',
          duration: 0.9,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 80%', once: true },
        }
      )
    })
  }, { scope: containerRef })

  /* ── Section headings: slide in + clip reveal ── */
  useGSAP(() => {
    const headings = containerRef.current?.querySelectorAll('[data-heading-reveal]')
    if (!headings) return
    headings.forEach(h => {
      gsap.fromTo(h,
        { x: -80, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)',
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: h, start: 'top 80%', once: true },
        }
      )
    })
  }, { scope: containerRef })

  /* ── Paragraph reveals ── */
  useGSAP(() => {
    const paras = containerRef.current?.querySelectorAll('[data-para-reveal]')
    if (!paras) return
    paras.forEach(p => {
      const el = p as HTMLElement
      // Skip paragraphs handled by dedicated hooks
      if (el.hasAttribute('data-hero-para')) return
      gsap.fromTo(p,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: p, start: 'top 85%', once: true },
        }
      )
    })
  }, { scope: containerRef })

  /* ── Historia timeline: line draw + milestone reveals ── */
  useGSAP(() => {
    // Timeline line draw
    const timelineLine = containerRef.current?.querySelector('[data-timeline-line]')
    if (timelineLine) {
      gsap.fromTo(timelineLine,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: timelineLine, start: 'top 80%', end: 'bottom 80%', scrub: true },
        }
      )
    }

    // Per-milestone orchestrated reveals
    const milestoneEls = containerRef.current?.querySelectorAll('[data-milestone]')
    if (!milestoneEls) return
    milestoneEls.forEach((ms, i) => {
      const dot = ms.querySelector('[data-milestone-dot]')
      const year = ms.querySelector('[data-milestone-year]')
      const text = ms.querySelector('[data-milestone-text]')
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ms, start: 'top 90%', once: true },
      })
      if (dot) tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' })
      if (year) tl.fromTo(year, { x: i % 2 === 0 ? -60 : 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2')
      if (text) tl.fromTo(text, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative">
      {/* ── Global red progress line ── */}
      <div ref={redLineRef} className="fixed top-20 left-0 w-full h-[2px] bg-[#c41e3a] z-50 origin-left" style={{ transform: 'scaleX(0)' }} />

      <Helmet>
        <title>Grupo Palazuelos | Agentes Aduanales desde 1920</title>
        <meta name="description" content="Más de 100 años facilitando el comercio exterior de México. Agentes aduanales, freight forwarding, transporte terrestre y logística integral con infraestructura propia." />
        <meta name="keywords" content="agentes aduanales, freight forwarding, comercio exterior, logística México, despacho aduanal, transporte terrestre, OEA" />
        <link rel="canonical" href="https://www.palazuelos.mx" />
      </Helmet>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-[100svh] flex items-end overflow-hidden bg-white">
        {/* Parallax depth layers */}
        <div data-parallax="0.1" className="absolute inset-0 bg-gradient-to-br from-white via-[#fdfcfa] to-[#f8f5f0]" />
        <div data-parallax="0.2" className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c41e3a 0.5px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div data-parallax="0.4" className="absolute top-1/4 -right-[100px] w-[700px] h-[700px] bg-[#c41e3a]/[0.06] blur-[250px] rounded-full" />
        <div data-parallax="0.3" className="absolute -bottom-[200px] -left-[100px] w-[500px] h-[500px] bg-[#c41e3a]/[0.04] blur-[180px] rounded-full" />
        {/* Architectural vertical lines */}
        <div data-parallax="0.15" className="absolute top-0 right-[28%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-zinc-200/40 to-transparent" />
        <div data-parallax="0.25" className="absolute top-0 right-[62%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-zinc-100/30 to-transparent" />

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-20 pb-24 lg:pb-16">
          <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-16 lg:gap-8 items-center">
            <div>
              {/* Offset label */}
              <div className="mb-10 lg:-ml-1">
                <SectionLabel text="Desde 1920" />
              </div>

              {/* MASSIVE hero text */}
              <h1
                ref={heroTextRef}
                className="font-['Playfair_Display'] text-[clamp(3.5rem,10vw,8rem)] font-bold text-zinc-900 leading-[0.95] mb-10 tracking-[-0.03em] lg:-ml-2"
              >
                <span className="block overflow-hidden pb-2">
                  <span data-hero-line className="block">Movemos</span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span data-hero-line className="block text-[#c41e3a]">
                    el mundo
                  </span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span data-hero-line className="block text-[clamp(2.5rem,7vw,5.5rem)] mt-2 text-zinc-400 font-light italic">
                    por ti
                  </span>
                </span>
              </h1>

              <p data-para-reveal data-hero-para className="text-[17px] text-zinc-500 max-w-lg leading-[1.9] mb-14 font-light lg:ml-1">
                Más de un siglo facilitando el comercio exterior de México.
                Agentes aduanales, freight forwarding y logística integral con
                infraestructura propia.
              </p>

              <div className="flex flex-wrap gap-5 lg:ml-1">
                <MagneticLink
                  to="/servicios"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-[#c41e3a] text-white text-[13px] font-semibold tracking-[0.15em] hover:bg-[#a01830] transition-colors duration-300 shadow-2xl shadow-[#c41e3a]/25"
                >
                  NUESTROS SERVICIOS
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </MagneticLink>
                <MagneticLink
                  to="/nosotros"
                  className="inline-flex items-center gap-3 px-10 py-5 text-zinc-600 text-[13px] font-medium tracking-[0.15em] hover:text-zinc-900 border border-zinc-300 hover:border-[#c41e3a] transition-all duration-300"
                >
                  NUESTRA HISTORIA
                </MagneticLink>
              </div>
            </div>

            {/* Stats panel — asymmetric offset */}
            <div className="hidden lg:block lg:translate-y-12">
              <div className="grid grid-cols-2 gap-[1px] bg-zinc-200/50 shadow-2xl shadow-zinc-200/30" style={{ perspective: '1000px' }}>
                {[
                  { num: 100, suffix: '+', label: 'Años de experiencia', icon: Clock },
                  { num: 6, suffix: '', label: 'Empresas especializadas', icon: Users },
                  { num: 50, suffix: '+', label: 'Países conectados', icon: Globe },
                  { num: 24, suffix: '/7', label: 'Operación continua', icon: BarChart3 },
                ].map(({ num, suffix, label, icon: Icon }, i) => (
                  <div key={i} data-stat-box className="bg-white p-8 group hover:bg-[#fafaf8] transition-all duration-500">
                    <Icon className="w-5 h-5 text-[#c41e3a]/50 mb-5 group-hover:text-[#c41e3a] transition-colors duration-500" />
                    <div className="font-['Playfair_Display'] text-4xl font-bold text-zinc-900 mb-2 tracking-tight">
                      <Counter end={num} suffix={suffix} />
                    </div>
                    <div className="text-[13px] text-zinc-400 font-light">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile stats */}
          <div className="lg:hidden mt-16 grid grid-cols-2 gap-4">
            {[
              { num: 100, suffix: '+', label: 'Años' },
              { num: 6, suffix: '', label: 'Empresas' },
              { num: 50, suffix: '+', label: 'Países' },
              { num: 24, suffix: '/7', label: 'Operación' },
            ].map(({ num, suffix = '', label }, i) => (
              <div key={i} data-stat-box className="bg-white border border-zinc-200/70 p-5 text-center shadow-sm">
                <div className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900">
                  <Counter end={num} suffix={suffix} />
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <ChevronDown className="w-5 h-5 text-zinc-400" />
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <Marquee />

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

      {/* ─── PINNED GIANT COUNTER ─── */}
      <section ref={statsPinRef} className="relative h-[100vh] flex items-center justify-center bg-[#fafaf8] overflow-hidden">
        <div className="text-center select-none">
          <div ref={giantCounterNumRef} className="font-['Playfair_Display'] text-[clamp(8rem,30vw,22rem)] font-bold text-zinc-200 leading-none tracking-tighter">
            <span ref={giantCounterRef}>0+</span>
          </div>
          <div ref={statsOverlayRef} className="opacity-0 -mt-16 relative z-10">
            <p className="text-[clamp(1rem,2.5vw,1.8rem)] text-[#c41e3a] font-medium tracking-[0.15em] uppercase">Años de experiencia</p>
          </div>
        </div>
        {/* Decorative architectural lines */}
        <div className="absolute top-0 left-[15%] w-[1px] h-full bg-zinc-200/30" />
        <div className="absolute top-0 right-[22%] w-[1px] h-full bg-zinc-200/20" />
      </section>

      {/* ─── HISTORIA PREVIEW ─── */}
      <section className="relative pt-48 pb-96 bg-[#fafaf8]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f5f0ea]/40 to-transparent" />
        <div className="relative max-w-[90rem] mx-auto px-6 lg:px-20">
          <div className="lg:ml-[10%]">
            <SectionLabel text="Nuestra Historia" />
            <h2 data-heading-reveal className="font-['Playfair_Display'] text-[clamp(2.5rem,7vw,5rem)] font-bold text-zinc-900 mb-5 tracking-tight leading-[1]">
              Un siglo construyendo<br />
              <span className="text-[#c41e3a]">prestigio</span>
            </h2>
            <p data-para-reveal className="text-zinc-500 max-w-xl text-[17px] leading-[1.8] mb-24 font-light">
              Desde 1920, Grupo Palazuelos ha crecido de una agencia aduanal en
              Veracruz a un grupo logístico integral con presencia internacional.
            </p>
          </div>

          <div className="relative">
            <div data-timeline-line className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-[1px] bg-[#c41e3a]/15" />
            {milestones.map((m, i) => (
              <div
                key={i}
                data-milestone
                className={`relative flex flex-col lg:flex-row items-start gap-8 mb-20 last:mb-0 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className={`lg:w-1/2 pl-14 lg:pl-0 ${i % 2 === 0 ? 'lg:text-right lg:pr-20' : 'lg:pl-20'}`}>
                  <div data-milestone-year className="font-['Playfair_Display'] text-3xl lg:text-5xl font-bold text-[#c41e3a]/60 mb-3">
                    {m.year}
                  </div>
                  <p data-milestone-text className="text-zinc-600 leading-relaxed text-[15px]">{m.text}</p>
                </div>
                <div className="absolute left-[14px] lg:left-1/2 lg:-translate-x-1/2 top-2">
                  <div data-milestone-dot className="w-[11px] h-[11px] rounded-full bg-[#c41e3a] ring-4 ring-[#fafaf8] shadow-sm" />
                </div>
                <div className="lg:w-1/2" />
              </div>
            ))}
          </div>

          <div className="mt-20 lg:ml-[10%]">
            <MagneticLink
              to="/nosotros"
              className="group inline-flex items-center gap-3 px-10 py-5 text-zinc-600 text-[13px] font-medium tracking-[0.15em] hover:text-zinc-900 border border-zinc-300 hover:border-[#c41e3a] transition-all duration-300"
            >
              CONOCER MÁS DE NUESTRA HISTORIA
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </MagneticLink>
          </div>
        </div>
      </section>

      {/* ─── SERVICIOS — HORIZONTAL SCROLL ─── */}
      <section ref={servicesSectionRef} className="relative bg-white">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Header pinned at left */}
          <div className="px-6 lg:px-20 mb-16">
            <SectionLabel text="Servicios" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 data-heading-reveal className="font-['Playfair_Display'] text-[clamp(2.5rem,7vw,5rem)] font-bold text-zinc-900 tracking-tight leading-[1]">
                Toda la cadena<br />
                <span className="text-[#c41e3a]">logística</span>
              </h2>
              <p data-para-reveal className="text-zinc-500 max-w-md text-[15px] leading-[1.8] font-light lg:text-right">
                A diferencia de nuestros competidores, cubrimos cada eslabón con
                infraestructura propia — desde el despacho aduanal hasta la
                entrega final.
              </p>
            </div>
          </div>

          {/* Horizontal track */}
          <div ref={servicesTrackRef} className="flex gap-6 pl-6 lg:pl-20 pr-[30vw]">
            {services.map((service) => (
              <div key={service.slug} data-service-card className="w-[340px] shrink-0">
                <ServiceCard service={service} />
              </div>
            ))}
            {/* End spacer with CTA */}
            <div className="w-[340px] shrink-0 flex items-center justify-center">
              <MagneticLink
                to="/servicios"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-[#c41e3a] text-white text-[13px] font-semibold tracking-[0.15em] hover:bg-[#a01830] transition-colors duration-300 shadow-2xl shadow-[#c41e3a]/25"
              >
                VER TODOS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EMPRESAS ─── */}
      <section data-section-reveal className="relative py-48 bg-[#fafaf8] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c41e3a 0.5px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#c41e3a]/[0.03] blur-[200px] rounded-full" />

        <div className="relative max-w-[90rem] mx-auto px-6 lg:px-20">
          <div className="lg:ml-[5%]">
            <SectionLabel text="Nuestras Empresas" />
            <h2 data-heading-reveal className="font-['Playfair_Display'] text-[clamp(2.5rem,7vw,5rem)] font-bold text-zinc-900 mb-5 tracking-tight leading-[1]">
              Infraestructura<br />
              <span className="text-[#c41e3a]">100% propia</span>
            </h2>
            <p data-para-reveal className="text-zinc-500 max-w-xl text-[17px] leading-[1.8] mb-24 font-light">
              Un ecosistema de empresas especializadas que nos permite controlar
              cada etapa del proceso logístico.
            </p>
          </div>

          {/* First row: 3 cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {companies.slice(0, 3).map((company) => (
              <div key={company.slug} data-company-card>
                <CompanyCard company={company} />
              </div>
            ))}
          </div>

          {/* Second row: 2 cards centered */}
          <div className="grid md:grid-cols-2 gap-5 mt-5 lg:max-w-[calc(66.666%-0.208rem)] lg:mx-auto">
            {companies.slice(3, 5).map((company) => (
              <div key={company.slug} data-company-card>
                <CompanyCard company={company} />
              </div>
            ))}
          </div>

          {/* Third row: remaining */}
          <div className="grid md:grid-cols-2 gap-5 mt-5 lg:max-w-[calc(66.666%-0.208rem)] lg:mx-auto">
            {companies.slice(5).map((company) => (
              <div key={company.slug} data-company-card>
                <CompanyCard company={company} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COBERTURA ─── */}
      <section data-section-reveal className="relative py-48 bg-white">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        <div className="max-w-[90rem] mx-auto px-6 lg:px-20">
          <div className="lg:ml-[8%]">
            <SectionLabel text="Cobertura" />
            <h2 data-heading-reveal className="font-['Playfair_Display'] text-[clamp(2.5rem,7vw,5rem)] font-bold text-zinc-900 mb-5 tracking-tight leading-[1]">
              Conectamos México<br />
              <span className="text-[#c41e3a]">con el mundo</span>
            </h2>
            <p data-para-reveal className="text-zinc-500 max-w-xl text-[17px] leading-[1.8] mb-24 font-light">
              Oficina propia en Valencia, España y una red global de agentes
              para el manejo internacional de su carga.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {[
              { icon: Ship, label: 'Marítimo', ports: 'Veracruz, Manzanillo, Lázaro Cárdenas, Altamira' },
              { icon: Plane, label: 'Aéreo', ports: 'CDMX, Guadalajara, Monterrey + red global' },
              { icon: Truck, label: 'Terrestre', ports: 'Cobertura nacional puerta a puerta' },
            ].map((m, i) => (
              <div key={i} data-coverage-card className="group relative bg-[#fafaf8] p-12 h-[300px] flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-zinc-100 hover:border-[#c41e3a]/15 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-[#c41e3a] transition-all duration-700" />
                <div className="w-16 h-16 mx-auto mb-6 bg-white flex items-center justify-center border border-zinc-100 group-hover:border-[#c41e3a]/15 group-hover:bg-[#c41e3a]/[0.04] transition-all duration-500">
                  <m.icon className="w-6 h-6 text-[#c41e3a]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mb-3 tracking-tight">
                  {m.label}
                </h3>
                <p className="text-zinc-500 text-[14px] font-light leading-relaxed">{m.ports}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
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
        </div>
      </section>

      {/* ─── CTA (with parallax background) ─── */}
      <CTA />

      {/* ─── CONTACTO ─── */}
      <section data-section-reveal id="contacto" className="relative py-40 bg-white">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="lg:ml-[5%]">
              <SectionLabel text="Contacto" />
              <h2 data-heading-reveal className="font-['Playfair_Display'] text-[clamp(2.5rem,7vw,5rem)] font-bold text-zinc-900 mb-5 tracking-tight leading-[1]">
                Hablemos de<br />
                <span className="text-[#c41e3a]">tu proyecto</span>
              </h2>
              <p data-para-reveal className="text-zinc-500 text-[17px] leading-[1.8] mb-14 font-light">
                Nuestro equipo de especialistas está listo para asesorarte en
                cada paso de tu operación de comercio exterior.
              </p>

              <div className="space-y-7">
                {[
                  { icon: MapPin, label: 'Corporativo CDMX', text: 'Bosque de Cidros 46 Int. 403' },
                  { icon: Globe, label: 'Europa', text: 'Valencia, España' },
                  { icon: Phone, label: 'Teléfono', text: '(55) 55 11 11 07' },
                  { icon: Mail, label: 'Email', text: 'erikasistemas@palazuelos.mx' },
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
            </div>

            <div data-para-reveal>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
