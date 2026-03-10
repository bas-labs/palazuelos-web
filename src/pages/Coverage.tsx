import { useRef } from 'react'
import { Ship, Plane, Truck, MapPin } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PageBanner } from '@/components/layout/PageBanner'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StatsGrid } from '@/components/ui/StatsGrid'
import { CTA } from '@/components/ui/CTA'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

gsap.registerPlugin(ScrollTrigger)

const transportModes = [
  {
    icon: Ship,
    title: 'Marítimo',
    description: 'Operaciones en los principales puertos de México con conexiones globales.',
    ports: ['Veracruz', 'Manzanillo', 'Lázaro Cárdenas', 'Altamira'],
  },
  {
    icon: Plane,
    title: 'Aéreo',
    description: 'Servicio aéreo desde los principales aeropuertos del país y red global de agentes.',
    ports: ['CDMX (AICM)', 'Guadalajara', 'Monterrey', 'Red global'],
  },
  {
    icon: Truck,
    title: 'Terrestre',
    description: 'Cobertura nacional puerta a puerta con flota propia y rastreo satelital.',
    ports: ['Cobertura nacional puerta a puerta'],
  },
]

const officeLocations = [
  { city: 'CDMX', description: 'Oficina corporativa y centro de operaciones nacional.' },
  { city: 'Manzanillo', description: 'Puerto principal del Pacífico mexicano.' },
  { city: 'Veracruz', description: 'Puerto histórico del Golfo de México.' },
  { city: 'Lázaro Cárdenas', description: 'Puerto estratégico del Pacífico.' },
  { city: 'Valencia, España', description: 'Oficina europea para operaciones internacionales.' },
]

const stats = [
  { num: 4, label: 'Puertos' },
  { num: 50, suffix: '+', label: 'Países' },
  { num: 1, label: 'Oficina europea' },
  { num: 100, suffix: '%', label: 'Infraestructura propia' },
]

export default function Coverage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useScrollAnimations(containerRef)

  useGSAP(() => {
    if (!mapRef.current) return
    gsap.fromTo(mapRef.current,
      { clipPath: 'inset(0 0 100% 0)', scale: 1.05 },
      { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.4, ease: 'power3.inOut',
        scrollTrigger: { trigger: mapRef.current, start: 'top 80%', once: true } }
    )
  }, { scope: mapRef })

  return (
    <div ref={containerRef}>
      <Helmet>
        <title>Cobertura — Grupo Palazuelos</title>
        <meta
          name="description"
          content="Conoce la cobertura nacional e internacional de Grupo Palazuelos. Operaciones marítimas, aéreas y terrestres en los principales puertos y ciudades de México."
        />
      </Helmet>

      {/* ── Banner ──────────────────────────────────────────── */}
      <PageBanner
        image="/images/gallery/bannServicios.jpg"
        title="Cobertura"
        breadcrumbs={[{ label: 'Cobertura' }]}
      />

      {/* ── Modos de Transporte ────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <SectionLabel text="Modos de Transporte" data-heading-reveal />
          <h2 data-heading-reveal className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-16 max-w-3xl leading-tight">
            Conectamos México con el mundo
          </h2>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {transportModes.map((mode) => (
              <div key={mode.title} data-card-clip className="bg-[#fafaf8] border border-zinc-100 p-8 lg:p-10 h-full hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:border-zinc-200 transition-all duration-500">
                <div className="w-12 h-12 flex items-center justify-center bg-[#c41e3a]/10 text-[#c41e3a] mb-6">
                  <mode.icon className="w-6 h-6" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mb-4">
                  {mode.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed text-[15px] mb-6">
                  {mode.description}
                </p>
                <ul className="space-y-2">
                  {mode.ports.map((port) => (
                    <li key={port} className="flex items-center gap-2 text-zinc-500 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#c41e3a] rounded-full shrink-0" />
                      {port}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mapa de Cobertura ──────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <SectionLabel text="Nuestra Red" data-heading-reveal />
          <h2 data-heading-reveal className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-12 max-w-3xl leading-tight">
            Presencia estratégica
          </h2>
          <div ref={mapRef} className="relative overflow-hidden border border-zinc-200 shadow-sm">
            <img
              src="/images/gallery/mapaCobertura.jpg"
              alt="Mapa de cobertura de Grupo Palazuelos"
              className="w-full h-auto"
            />
          </div>
          <p data-para-reveal className="text-zinc-500 text-sm mt-4 text-center">
            Red de operaciones de Grupo Palazuelos en México y el mundo.
          </p>
        </div>
      </section>

      {/* ── Oficinas ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <SectionLabel text="Nuestras Oficinas" data-heading-reveal />
          <h2 data-heading-reveal className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-16 max-w-3xl leading-tight">
            Ubicaciones estratégicas
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-card-3d-group>
            {officeLocations.map((office) => (
              <div key={office.city} data-card-3d className="bg-[#fafaf8] border border-zinc-100 p-8 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:border-zinc-200 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-[#c41e3a] shrink-0" />
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-zinc-900 tracking-tight">
                    {office.city}
                  </h3>
                </div>
                <p className="text-zinc-500 text-[15px] leading-relaxed">
                  {office.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Estadísticas ───────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <SectionLabel text="En Números" data-heading-reveal />
          <h2 data-heading-reveal className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-16 max-w-3xl leading-tight">
            Nuestra cobertura en cifras
          </h2>
          <StatsGrid stats={stats} />
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <CTA />
    </div>
  )
}
