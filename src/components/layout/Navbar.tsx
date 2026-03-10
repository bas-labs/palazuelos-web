import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

function DropdownMenu({ label, items }: {
  label: string
  items: { label: string; href: string }[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 text-[13px] tracking-wide text-zinc-500 hover:text-zinc-900 transition-colors duration-300">
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-56 bg-white border border-zinc-100 shadow-xl shadow-zinc-200/30 py-2 z-50"
          >
            {items.map(item => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-2.5 text-[13px] text-zinc-600 hover:text-[#c41e3a] hover:bg-[#fafaf8] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const serviceLinks = [
  { label: 'Todos los Servicios', href: '/servicios' },
  { label: 'Despacho Aduanal', href: '/servicios/despacho-aduanal' },
  { label: 'Freight Forwarding', href: '/servicios/freight-forwarding' },
  { label: 'Transporte Terrestre', href: '/servicios/transporte-terrestre' },
  { label: 'Almacenaje', href: '/servicios/almacenaje' },
  { label: 'Maniobras Portuarias', href: '/servicios/maniobras-portuarias' },
  { label: 'Asesoría en Permisos', href: '/servicios/asesoria-permisos' },
  { label: 'Puerta a Puerta', href: '/servicios/puerta-a-puerta' },
]

const companyLinks = [
  { label: 'Todas las Empresas', href: '/empresas' },
  { label: 'Palazuelos Logistics', href: '/empresas/palazuelos-logistics' },
  { label: 'A.J. Palazuelos S.C.', href: '/empresas/aj-palazuelos' },
  { label: 'Trip Mexicana', href: '/empresas/trip-mexicana' },
  { label: 'OCUPA', href: '/empresas/ocupa' },
  { label: 'ALMAN', href: '/empresas/alman' },
  { label: 'FRIMAN', href: '/empresas/friman' },
  { label: 'Comercial PMB', href: '/empresas/comercial-pmb' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl shadow-[0_1px_30px_rgba(0,0,0,0.06)]'
          : 'bg-white/80 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#c41e3a] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="font-['Playfair_Display'] text-white text-lg font-bold">P</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-['Playfair_Display'] text-[15px] font-bold tracking-[0.08em] text-zinc-900">PALAZUELOS</div>
              <div className="text-[9px] tracking-[0.4em] uppercase -mt-0.5 text-zinc-400">Grupo Logístico</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link to="/nosotros" className="text-[13px] tracking-wide text-zinc-500 hover:text-zinc-900 transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#c41e3a] hover:after:w-full after:transition-all after:duration-300">
              Nosotros
            </Link>
            <DropdownMenu label="Servicios" items={serviceLinks} />
            <DropdownMenu label="Empresas" items={companyLinks} />
            <Link to="/cobertura" className="text-[13px] tracking-wide text-zinc-500 hover:text-zinc-900 transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#c41e3a] hover:after:w-full after:transition-all after:duration-300">
              Cobertura
            </Link>
            <Link to="/contacto" className="text-[13px] tracking-wide text-zinc-500 hover:text-zinc-900 transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#c41e3a] hover:after:w-full after:transition-all after:duration-300">
              Contacto
            </Link>
            <Link to="/cotizador"
              className="ml-2 px-7 py-2.5 bg-[#c41e3a] text-white text-[12px] font-semibold tracking-[0.15em] hover:bg-[#a01830] transition-all duration-300 hover:shadow-lg hover:shadow-[#c41e3a]/25">
              COTIZAR
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-zinc-900">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-zinc-100 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <Link to="/nosotros" onClick={() => setMobileOpen(false)} className="block text-lg text-zinc-700 hover:text-[#c41e3a] transition-colors">Nosotros</Link>
              <Link to="/servicios" onClick={() => setMobileOpen(false)} className="block text-lg text-zinc-700 hover:text-[#c41e3a] transition-colors">Servicios</Link>
              <Link to="/empresas" onClick={() => setMobileOpen(false)} className="block text-lg text-zinc-700 hover:text-[#c41e3a] transition-colors">Empresas</Link>
              <Link to="/cobertura" onClick={() => setMobileOpen(false)} className="block text-lg text-zinc-700 hover:text-[#c41e3a] transition-colors">Cobertura</Link>
              <Link to="/contacto" onClick={() => setMobileOpen(false)} className="block text-lg text-zinc-700 hover:text-[#c41e3a] transition-colors">Contacto</Link>
              <Link to="/mi-logistica" onClick={() => setMobileOpen(false)} className="block text-lg text-zinc-700 hover:text-[#c41e3a] transition-colors">Mi Logística</Link>
              <Link to="/cotizador" onClick={() => setMobileOpen(false)}
                className="inline-block mt-4 px-6 py-3 bg-[#c41e3a] text-white font-semibold tracking-wider text-sm">
                COTIZAR
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
