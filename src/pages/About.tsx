import { Shield, Target, Eye, Heart, CheckCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { PageBanner } from '@/components/layout/PageBanner'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Timeline } from '@/components/ui/Timeline'
import { CTA } from '@/components/ui/CTA'
import { milestones } from '@/data/milestones'

const valores = [
  'Calidad en el servicio, cultura del trabajo que nos hace conscientes del impacto de nuestra operación en la satisfacción del cliente.',
  'Productividad, norma de desempeño de las áreas dentro del ciclo del negocio.',
  'Eficiencia, convicción de la optimización de recursos empleados para el cumplimiento de los objetivos.',
  'Trabajo en equipo, integración del trabajo participativo de los colaboradores.',
  'Honestidad, conducta que proporciona a nuestros clientes confianza.',
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>Nosotros — Grupo Palazuelos</title>
        <meta
          name="description"
          content="Conoce la historia, misión, visión y valores de Grupo Palazuelos. Más de 100 años de experiencia en comercio exterior y logística internacional."
        />
      </Helmet>

      {/* ── Banner ──────────────────────────────────────────── */}
      <PageBanner
        image="/images/gallery/bannNosotros.jpg"
        title="Nosotros"
        breadcrumbs={[{ label: 'Nosotros' }]}
      />

      {/* ── Quiénes Somos ───────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal>
            <SectionLabel text="Quiénes Somos" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-8 max-w-3xl leading-tight">
              De Puerta a Puerta
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-zinc-600 text-lg leading-relaxed max-w-4xl">
              De Puerta a Puerta somos un grupo especializado en el Comercio Exterior y Logística
              Internacional, principalmente en los ramos de Agencia Aduanal, Transporte Terrestre,
              Maniobras, Almacenaje, y Freight Forwarding Internacional Marítimo, Aéreo y Terrestre.
              El Grupo esta conformado por empresas altamente calificadas en los ramos mencionados,
              por lo cual hacemos todo con infraestructura propia lo que nos permite dar un servicio
              más Ágil, Confiable, Competitivo y de Mayor Calidad, logrando así ser una empresa muy
              atractiva para el manejo integral de su carga.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Misión / Visión / Valores ───────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal>
            <SectionLabel text="Nuestra Filosofía" />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-4">
            {/* Misión */}
            <Reveal delay={0.1}>
              <div className="bg-white p-8 lg:p-10 shadow-sm border border-zinc-100 h-full">
                <div className="w-12 h-12 flex items-center justify-center bg-[#c41e3a]/10 text-[#c41e3a] mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mb-4">
                  Misión
                </h3>
                <p className="text-zinc-600 leading-relaxed text-[15px]">
                  Promover, orientar y facilitar el comercio exterior, proporcionando servicios con
                  estándares de calidad mundial, buscando siempre exceder las expectativas de nuestros
                  clientes.
                </p>
              </div>
            </Reveal>

            {/* Visión */}
            <Reveal delay={0.2}>
              <div className="bg-white p-8 lg:p-10 shadow-sm border border-zinc-100 h-full">
                <div className="w-12 h-12 flex items-center justify-center bg-[#c41e3a]/10 text-[#c41e3a] mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mb-4">
                  Visión
                </h3>
                <p className="text-zinc-600 leading-relaxed text-[15px]">
                  Ser grupo líder en su ramo.
                </p>
              </div>
            </Reveal>

            {/* Valores */}
            <Reveal delay={0.3}>
              <div className="bg-white p-8 lg:p-10 shadow-sm border border-zinc-100 h-full">
                <div className="w-12 h-12 flex items-center justify-center bg-[#c41e3a]/10 text-[#c41e3a] mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mb-4">
                  Valores
                </h3>
                <ul className="space-y-3">
                  {valores.map((v, i) => (
                    <li key={i} className="flex gap-2 text-zinc-600 text-[15px] leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-[#c41e3a] mt-1 shrink-0" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-32 bg-[#fafaf8]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
          style={{ backgroundImage: "url('/images/gallery/backHistoriaBott.jpg')" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal>
            <SectionLabel text="Nuestra Trayectoria" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-16 max-w-3xl leading-tight">
              Más de 100 años de historia
            </h2>
          </Reveal>
          <Timeline milestones={milestones} />
        </div>
      </section>

      {/* ── Historia Text ───────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal>
            <SectionLabel text="Historia" />
          </Reveal>
          <div className="max-w-4xl space-y-6">
            <Reveal delay={0.1}>
              <p className="text-zinc-600 text-lg leading-relaxed">
                Grupo Palazuelos nace como agencia aduanal en 1920 en el puerto de Veracruz. Fundada
                por Don Alfredo Palazuelos Leycegui, la empresa se convirtió rápidamente en un
                referente del despacho aduanal en la región. A lo largo de las décadas, la familia
                Palazuelos expandió sus operaciones a los principales puertos y fronteras de México,
                diversificando sus servicios para cubrir toda la cadena logística del comercio exterior.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-zinc-600 text-lg leading-relaxed">
                En la década de los noventa, se crearon empresas especializadas como Trip Mexicana
                para el transporte terrestre y ALMAN para el almacenaje fiscal, consolidando la visión
                de ofrecer un servicio integral con infraestructura 100% propia. En el año 2000,
                Grupo Palazuelos cruzó fronteras con la apertura de una oficina en Valencia, España, y
                el establecimiento de una red global de agentes internacionales.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-zinc-600 text-lg leading-relaxed">
                Hoy, con más de un siglo de experiencia, Grupo Palazuelos opera a través de empresas
                como FRIMAN, OCUPA y Palazuelos Logistics, ofreciendo freight forwarding integral
                marítimo, aéreo y terrestre. La certificación OEA otorgada por el SAT refleja nuestro
                compromiso con la seguridad, la transparencia y la excelencia en cada operación.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Compromiso ──────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal>
            <SectionLabel text="Compromiso" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-8 max-w-3xl leading-tight">
              Ética y profesionalismo
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-zinc-600 text-lg leading-relaxed max-w-4xl">
              Nuestro compromiso ético y profesional sumado con nuestra Política de Calidad nos
              demanda dar un excelente servicio, por medio del fomento de la seguridad en nuestros
              clientes, la honestidad, la pro actividad para resolver sus problemas y la rapidez con
              que entregamos sus mercancías.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── OEA Certification ───────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal>
            <div className="bg-zinc-900 p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 lg:w-28 lg:h-28 bg-[#c41e3a] flex items-center justify-center">
                  <Shield className="w-12 h-12 lg:w-14 lg:h-14 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[2px] bg-[#c41e3a]" />
                  <span className="text-[11px] tracking-[0.35em] uppercase font-semibold text-[#c41e3a]">
                    Certificación
                  </span>
                </div>
                <h3 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-white mb-4">
                  Operador Económico Autorizado
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                  Grupo Palazuelos cuenta con la certificación OEA otorgada por el Servicio de
                  Administración Tributaria (SAT), que nos acredita como una empresa confiable y segura
                  en la cadena de suministro internacional. Esta certificación garantiza a nuestros
                  clientes los más altos estándares de seguridad, cumplimiento y agilidad en sus
                  operaciones de comercio exterior.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <CTA />
    </>
  )
}
