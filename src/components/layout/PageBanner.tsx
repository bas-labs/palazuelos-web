import { motion } from 'framer-motion'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

interface PageBannerProps {
  title: string
  image: string
  breadcrumbs: { label: string; href?: string }[]
}

export function PageBanner({ title, image, breadcrumbs }: PageBannerProps) {
  return (
    <section className="relative h-[340px] sm:h-[400px] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-zinc-900/30" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Breadcrumb items={breadcrumbs} />
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 tracking-tight">
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  )
}
