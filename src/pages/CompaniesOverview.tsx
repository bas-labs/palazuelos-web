import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageBanner } from '@/components/layout/PageBanner'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTA } from '@/components/ui/CTA'
import { CompanyCard } from '@/components/cards/CompanyCard'
import { companies } from '@/data/companies'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

export default function CompaniesOverview() {
  const containerRef = useRef<HTMLDivElement>(null)
  useScrollAnimations(containerRef)

  return (
    <div ref={containerRef}>
      <Helmet>
        <title>Nuestras Empresas | Grupo Palazuelos</title>
        <meta
          name="description"
          content="Conoce las empresas del Grupo Palazuelos: infraestructura 100% propia en aduanas, transporte, almacenaje, maniobras portuarias y freight forwarding."
        />
      </Helmet>

      <PageBanner
        image="/images/gallery/bannInfra.jpg"
        title="Nuestras Empresas"
        breadcrumbs={[{ label: 'Empresas' }]}
      />

      {/* Intro */}
      <section className="py-24 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <SectionLabel text="Grupo Palazuelos" />
          <h2 data-heading-reveal className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
            Infraestructura 100% propia
          </h2>
          <p data-para-reveal className="text-zinc-500 text-lg leading-relaxed max-w-3xl font-light">
            El Grupo Palazuelos opera un ecosistema de empresas especializadas que cubren
            cada eslabón de la cadena logística. Desde el despacho aduanal hasta la entrega
            final, cada empresa aporta capacidad propia para garantizar un servicio integral,
            sin intermediarios y con total trazabilidad.
          </p>
        </div>
      </section>

      {/* Company Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div data-card-3d-group className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div data-card-3d key={company.slug}>
                <CompanyCard company={company} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}
