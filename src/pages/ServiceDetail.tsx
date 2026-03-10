import { Helmet } from 'react-helmet-async'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { PageBanner } from '@/components/layout/PageBanner'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getServiceBySlug } from '@/data/services'
import { companies } from '@/data/companies'

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getServiceBySlug(slug) : undefined

  if (!service) {
    return <Navigate to="/servicios" replace />
  }

  const relatedCompanies = companies.filter((c) =>
    service.relatedCompanies.includes(c.slug),
  )

  return (
    <>
      <Helmet>
        <title>{service.title} — Grupo Palazuelos</title>
        <meta name="description" content={service.shortDesc} />
      </Helmet>

      <PageBanner
        image={service.bannerImage}
        title={service.title}
        breadcrumbs={[
          { label: 'Servicios', href: '/servicios' },
          { label: service.title },
        ]}
      />

      {/* Description */}
      <section className="py-24 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal>
            <div className="max-w-3xl">
              <SectionLabel text={service.title} />
              <p className="text-lg text-zinc-600 leading-relaxed font-light">
                {service.description}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-zinc-900 mb-12 leading-tight">
              Beneficios
            </h2>
          </Reveal>

          <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
            {service.benefits.map((benefit, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="flex items-start gap-4">
                  <span className="mt-1 flex-shrink-0 w-6 h-6 bg-[#c41e3a]/10 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#c41e3a]" />
                  </span>
                  <span className="text-[15px] text-zinc-600 leading-relaxed font-light">
                    {benefit}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Related companies */}
      {relatedCompanies.length > 0 && (
        <section className="py-24 bg-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <Reveal>
              <SectionLabel text="Empresas relacionadas" />
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-zinc-900 mb-12 leading-tight">
                ¿Quién opera este servicio?
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCompanies.map((company, i) => (
                <Reveal key={company.slug} delay={i * 0.08}>
                  <Link
                    to={`/empresas/${company.slug}`}
                    className="group block bg-white p-8 border border-zinc-100/80 hover:border-zinc-200 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#c41e3a] group-hover:w-full transition-all duration-700 ease-out" />
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-10 mb-5 object-contain"
                    />
                    <h3 className="font-['Playfair_Display'] text-lg font-semibold text-zinc-900 mb-1">
                      {company.name}
                    </h3>
                    <p className="text-[12px] tracking-wide uppercase text-zinc-400 font-medium mb-3">
                      {company.role}
                    </p>
                    <p className="text-[13px] text-zinc-500 leading-[1.7] font-light mb-4">
                      {company.shortDesc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[12px] text-zinc-400 group-hover:text-[#c41e3a] font-medium tracking-wide transition-colors duration-500">
                      Conocer empresa{' '}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#c41e3a]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 35px, #fff 35px, #fff 36px)',
          }}
        />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[200px] rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white mb-6 leading-tight">
              Solicita tu cotización
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Cuéntanos sobre tu operación y recibe una propuesta personalizada
              para {service.title.toLowerCase()}.
            </p>
            <Link
              to="/cotizador"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#c41e3a] text-[13px] font-bold tracking-[0.1em] hover:bg-zinc-50 transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              SOLICITAR COTIZACIÓN
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
