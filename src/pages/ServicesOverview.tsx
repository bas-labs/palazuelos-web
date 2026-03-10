import { Helmet } from 'react-helmet-async'
import { PageBanner } from '@/components/layout/PageBanner'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTA } from '@/components/ui/CTA'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { services } from '@/data/services'

export default function ServicesOverview() {
  return (
    <>
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
          <Reveal>
            <div className="max-w-3xl">
              <SectionLabel text="Nuestros servicios" />
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-6 leading-tight">
                Toda la cadena logística
              </h2>
              <p className="text-lg text-zinc-500 leading-relaxed font-light">
                Cubrimos cada eslabón de la cadena logística con infraestructura 100&nbsp;%
                propia: desde el despacho aduanal y el freight forwarding internacional,
                hasta el almacenaje, las maniobras portuarias y la distribución terrestre
                puerta a puerta. Un solo grupo, una sola solución.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service cards grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.06}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
