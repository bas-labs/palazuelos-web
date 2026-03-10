import { Helmet } from 'react-helmet-async'
import { PageBanner } from '@/components/layout/PageBanner'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { OfficeCard } from '@/components/cards/OfficeCard'
import { ContactForm } from '@/components/forms/ContactForm'
import { offices } from '@/data/offices'

export default function Contact() {
  return (
    <>
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
          <Reveal>
            <SectionLabel text="Nuestras Oficinas" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-16 max-w-3xl leading-tight">
              Estamos cerca de ti
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {offices.map((office, i) => (
              <Reveal key={office.city} delay={0.1 + i * 0.1}>
                <OfficeCard office={office} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulario de Contacto ─────────────────────────── */}
      <section
        className="relative py-24 lg:py-32 bg-[#fafaf8]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
          style={{ backgroundImage: "url('/images/gallery/backContacto.jpg')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
          <Reveal>
            <SectionLabel text="Escríbenos" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-12 max-w-3xl leading-tight">
              Envíanos un mensaje
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
