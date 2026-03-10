import { ExternalLink, Download, Shield } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { PageBanner } from '@/components/layout/PageBanner'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

const trackingLinks = [
  {
    label: 'Aduana Manzanillo',
    description: 'Consulta el estatus de tus operaciones en la aduana de Manzanillo.',
    href: 'http://www.aduanas-mexico.com.mx/ctraweb/487',
  },
  {
    label: 'Aduana Veracruz / Lázaro Cárdenas / México',
    description: 'Consulta el estatus de tus operaciones en las aduanas de Veracruz, Lázaro Cárdenas y México.',
    href: 'http://www.aduanas-mexico.com.mx/ctraweb/487430',
  },
]

export default function ClientPortal() {
  return (
    <>
      <Helmet>
        <title>Mi Logística — Grupo Palazuelos</title>
        <meta
          name="description"
          content="Portal de rastreo para clientes de Grupo Palazuelos. Consulta el estatus de tus operaciones aduanales en tiempo real."
        />
      </Helmet>

      {/* ── Banner ──────────────────────────────────────────── */}
      <PageBanner
        image="/images/gallery/bannLogistica.jpg"
        title="Mi Logística"
        breadcrumbs={[{ label: 'Mi Logística' }]}
      />

      {/* ── Instrucciones ──────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-16">
          <Reveal>
            <SectionLabel text="Portal de Clientes" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-6 max-w-3xl leading-tight">
              Rastreo de operaciones
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex items-start gap-4 mb-12">
              <div className="w-12 h-12 flex items-center justify-center bg-[#c41e3a]/10 text-[#c41e3a] shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <p className="text-zinc-600 text-lg leading-relaxed">
                A través de nuestro portal de rastreo podrás consultar en tiempo real el estatus
                de tus operaciones aduanales. Selecciona la aduana correspondiente para acceder
                al sistema de seguimiento.
              </p>
            </div>
          </Reveal>

          {/* ── Enlaces de Rastreo ─────────────────────────── */}
          <div className="space-y-6">
            {trackingLinks.map((link, i) => (
              <Reveal key={link.label} delay={0.2 + i * 0.1}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-[#fafaf8] border border-zinc-100 p-8 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:border-zinc-200 transition-all duration-500"
                >
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-zinc-900 mb-2 tracking-tight">
                      {link.label}
                    </h3>
                    <p className="text-zinc-500 text-[15px] leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#c41e3a] shrink-0 ml-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Descarga de Manual ─────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#fafaf8]">
        <div className="max-w-4xl mx-auto px-6 lg:px-16">
          <Reveal>
            <SectionLabel text="Recursos" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-12 max-w-3xl leading-tight">
              Manual de usuario
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="/pdf/Manual.pdf"
              download
              className="group inline-flex items-center gap-4 bg-white border border-zinc-100 p-8 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:border-zinc-200 transition-all duration-500"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[#c41e3a]/10 text-[#c41e3a] shrink-0">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-zinc-900 mb-1 tracking-tight">
                  Descargar Manual
                </h3>
                <p className="text-zinc-500 text-sm">
                  Guía completa para el uso del portal de rastreo de operaciones.
                </p>
              </div>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
