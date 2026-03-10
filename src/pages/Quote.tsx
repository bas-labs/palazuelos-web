import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageBanner } from '@/components/layout/PageBanner'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

export default function Quote() {
  const containerRef = useRef<HTMLDivElement>(null)
  useScrollAnimations(containerRef)

  return (
    <div ref={containerRef}>
      <Helmet>
        <title>Cotizador — Grupo Palazuelos</title>
        <meta
          name="description"
          content="Solicita una cotización para servicios de logística, transporte y despacho aduanal con Grupo Palazuelos."
        />
      </Helmet>

      {/* ── Banner ──────────────────────────────────────────── */}
      <PageBanner
        image="/images/gallery/bannCotizador.jpg"
        title="Cotizador"
        breadcrumbs={[{ label: 'Cotizador' }]}
      />

      {/* ── Intro + Formulario ─────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-16">
          <SectionLabel text="Solicitar Cotización" />
          <h2
            data-heading-reveal
            className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-6 max-w-3xl leading-tight"
          >
            ¿Cómo podemos ayudarte?
          </h2>
          <p data-para-reveal className="text-zinc-600 text-lg leading-relaxed mb-12 max-w-3xl">
            Completa el siguiente formulario con los datos de tu operación y uno de nuestros
            especialistas se pondrá en contacto contigo a la brevedad para ofrecerte la mejor
            solución logística.
          </p>
          <div data-para-reveal>
            <QuoteForm title="Cotizador rápido" />
          </div>
        </div>
      </section>
    </div>
  )
}
