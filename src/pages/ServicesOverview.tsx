import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageBanner } from '@/components/layout/PageBanner'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTA } from '@/components/ui/CTA'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { services } from '@/data/services'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

export default function ServicesOverview() {
  const containerRef = useRef<HTMLDivElement>(null)
  useScrollAnimations(containerRef)

  return (
    <div ref={containerRef}>
      <Helmet>
        <title>Servicios — Grupo Palazuelos</title>
        <meta
          name="description"
          content="Servicios logísticos integrales: despacho aduanal, freight forwarding, transporte terrestre, almacenaje, maniobras portuarias y más."
        />
      </Helmet>

      <PageBanner
        image="/images/gallery/bannServicios.jpg"
        title="Servicios"
        breadcrumbs={[{ label: 'Servicios' }]}
      />

      {/* Intro */}
      <section className="py-24 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="max-w-3xl">
            <SectionLabel text="Nuestros servicios" />
            <h2 data-heading-reveal className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-6 leading-tight">
              Toda la cadena logística
            </h2>
            <p data-para-reveal className="text-lg text-zinc-500 leading-relaxed font-light">
              Cubrimos cada eslabón de la cadena logística con infraestructura 100&nbsp;%
              propia: desde el despacho aduanal y el freight forwarding internacional,
              hasta el almacenaje, las maniobras portuarias y la distribución terrestre
              puerta a puerta. Un solo grupo, una sola solución.
            </p>
          </div>
        </div>
      </section>

      {/* Service cards grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div data-card-3d-group className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div data-card-3d key={service.slug}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}
