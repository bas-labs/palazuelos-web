import { Helmet } from 'react-helmet-async'
import { useParams, Navigate, Link } from 'react-router-dom'
import { MapPin, ExternalLink, Check, ArrowRight } from 'lucide-react'
import { PageBanner } from '@/components/layout/PageBanner'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTA } from '@/components/ui/CTA'
import { getCompanyBySlug } from '@/data/companies'
import { services } from '@/data/services'

export default function CompanyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const company = slug ? getCompanyBySlug(slug) : undefined

  if (!company) {
    return <Navigate to="/empresas" replace />
  }

  const relatedServices = services.filter((s) =>
    company.relatedServices.includes(s.slug)
  )

  return (
    <>
      <Helmet>
        <title>{company.name} | Grupo Palazuelos</title>
        <meta name="description" content={company.shortDesc} />
      </Helmet>

      <PageBanner
        image="/images/gallery/bannInfra.jpg"
        title={company.name}
        breadcrumbs={[
          { label: 'Empresas', href: '/empresas' },
          { label: company.name },
        ]}
      />

      {/* Company Info */}
      <section className="py-24 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left column: Logo + Description */}
            <div className="lg:col-span-3">
              <Reveal>
                <div className="h-16 mb-8">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <SectionLabel text={company.role} />
                <p className="text-zinc-600 text-lg leading-relaxed font-light">
                  {company.description}
                </p>
              </Reveal>
            </div>

            {/* Right column: Services + Location + Link */}
            <div className="lg:col-span-2">
              <Reveal delay={0.15}>
                <div className="bg-white border border-zinc-100 p-8">
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-zinc-900 mb-6 tracking-tight">
                    Servicios que ofrece
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {company.services.map((service) => (
                      <li key={service} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#c41e3a] mt-1 shrink-0" />
                        <span className="text-zinc-600 text-[15px] leading-relaxed font-light">
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-zinc-100 pt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#c41e3a] mt-1 shrink-0" />
                      <span className="text-zinc-600 text-[15px] font-light">
                        {company.location}
                      </span>
                    </div>

                    {company.externalUrl && (
                      <a
                        href={company.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#c41e3a] text-[13px] font-semibold tracking-[0.05em] hover:underline transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visitar sitio web
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <Reveal>
              <SectionLabel text="Servicios relacionados" />
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-12">
                Servicios que integra {company.name}
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((service, i) => (
                <Reveal key={service.slug} delay={i * 0.08}>
                  <Link
                    to={`/servicios/${service.slug}`}
                    className="group block bg-[#faf9f7] border border-zinc-100 hover:border-[#c41e3a]/15 p-8 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
                  >
                    <service.icon className="w-6 h-6 text-[#c41e3a] mb-4" />
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-zinc-900 mb-3 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 text-[14px] leading-[1.7] font-light mb-6">
                      {service.shortDesc}
                    </p>
                    <div className="flex items-center gap-2 text-zinc-300 group-hover:text-[#c41e3a] transition-colors duration-500">
                      <span className="text-[12px] tracking-[0.15em] font-semibold uppercase">
                        Ver servicio
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  )
}
