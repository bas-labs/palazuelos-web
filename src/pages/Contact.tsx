import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageBanner } from '@/components/layout/PageBanner'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { OfficeCard } from '@/components/cards/OfficeCard'
import { ContactForm } from '@/components/forms/ContactForm'
import { offices } from '@/data/offices'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  useScrollAnimations(containerRef)

  return (
    <div ref={containerRef}>
      <Helmet>
        <title>Contacto — Grupo Palazuelos</title>
        <meta
          name="description"
          content="Contáctanos para cualquier consulta sobre logística, transporte y despacho aduanal. Oficinas en CDMX, Manzanillo, Veracruz y Lázaro Cárdenas."
        />
      </Helmet>

      {/* ── Banner ──────────────────────────────────────────── */}
      <PageBanner
        image="/images/gallery/bannContacto.jpg"
        title="Contacto"
        breadcrumbs={[{ label: 'Contacto' }]}
      />

      {/* ── Oficinas ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <SectionLabel text="Nuestras Oficinas" />
          <h2
            data-heading-reveal
            className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-16 max-w-3xl leading-tight"
          >
            Estamos cerca de ti
          </h2>

          <div className="grid sm:grid-cols-2 gap-6" data-card-3d-group>
            {offices.map((office) => (
              <div key={office.city} data-card-3d>
                <OfficeCard office={office} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulario de Contacto ─────────────────────────── */}
      <section className="relative py-24 lg:py-32 bg-[#fafaf8]">
        <div
          data-parallax-bg
          className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
          style={{ backgroundImage: "url('/images/gallery/backContacto.jpg')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
          <SectionLabel text="Escríbenos" />
          <h2
            data-heading-reveal
            className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-12 max-w-3xl leading-tight"
          >
            Envíanos un mensaje
          </h2>
          <div data-para-reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
