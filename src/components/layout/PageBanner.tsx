import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

gsap.registerPlugin(ScrollTrigger)

interface PageBannerProps {
  title: string
  image: string
  breadcrumbs: { label: string; href?: string }[]
}

export function PageBanner({ title, image, breadcrumbs }: PageBannerProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)

  /* ── Image parallax (scrubbed) ── */
  useGSAP(() => {
    if (!imgRef.current || !sectionRef.current) return
    gsap.fromTo(imgRef.current,
      { y: -40, scale: 1.08 },
      {
        y: 40, scale: 1, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  }, { scope: sectionRef })

  /* ── Title reveal (overflow-hidden mask) ── */
  useGSAP(() => {
    if (!titleRef.current) return
    gsap.fromTo(titleRef.current,
      { yPercent: 100, rotate: 2 },
      { yPercent: 0, rotate: 0, duration: 1, delay: 0.15, ease: 'power4.out' }
    )
  }, { scope: sectionRef })

  /* ── Breadcrumb entrance ── */
  useGSAP(() => {
    if (!breadcrumbRef.current) return
    gsap.fromTo(breadcrumbRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: 'power2.out' }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative h-[340px] sm:h-[400px] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img ref={imgRef} src={image} alt="" className="w-full h-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-zinc-900/30" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full pb-12">
        <div ref={breadcrumbRef} className="opacity-0">
          <Breadcrumb items={breadcrumbs} />
        </div>
        <div className="overflow-hidden mt-4">
          <h1 ref={titleRef} className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}
