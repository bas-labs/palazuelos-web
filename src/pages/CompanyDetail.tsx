import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Navigate, Link } from 'react-router-dom'
import { MapPin, ExternalLink, Check, ArrowRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PageBanner } from '@/components/layout/PageBanner'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTA } from '@/components/ui/CTA'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'
import { getCompanyBySlug } from '@/data/companies'
import { services } from '@/data/services'

gsap.registerPlugin(ScrollTrigger)

export default function CompanyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const company = slug ? getCompanyBySlug(slug) : undefined
  const containerRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useScrollAnimations(containerRef, [slug])

  useGSAP(() => {
    if (!sidebarRef.current) return
    gsap.fromTo(sidebarRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sidebarRef.current, start: 'top 80%', once: true } }
    )
  }, { scope: sidebarRef, dependencies: [slug] })

  if (!company) {
    return <Navigate to="/empresas" replace />
  }

  const relatedServices = services.filter((s) =>
    company.relatedServices.includes(s.slug)
  )

  return (
    <div ref={containerRef}>
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
              <div className="h-16 mb-8">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-full w-auto object-contain"
                />
              </div>
              <SectionLabel text={company.role} />
              <p data-para-reveal className="text-zinc-600 text-lg leading-relaxed font-light">
                {company.description}
              </p>
            </div>

            {/* Right column: Services + Location + Link */}
            <div className="lg:col-span-2" ref={sidebarRef}>
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
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <SectionLabel text="Servicios relacionados" />
            <h2 data-heading-reveal className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-12">
              Servicios que integra {company.name}
            </h2>

            <div data-card-3d-group className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((service) => (
                <div key={service.slug} data-card-3d>
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
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </div>
  )
}
