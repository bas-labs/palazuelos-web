import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#c41e3a] flex items-center justify-center">
                <span className="font-['Playfair_Display'] text-white text-sm font-bold">P</span>
              </div>
              <span className="font-['Playfair_Display'] text-zinc-900 font-bold tracking-wide">PALAZUELOS</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              Marítimo · Aéreo · Terrestre<br />
              Facilitando el comercio exterior de México desde 1920.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.25em] text-[#c41e3a] uppercase mb-5 font-semibold">Servicios</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link to="/servicios/despacho-aduanal" className="hover:text-zinc-900 transition-colors">Despacho Aduanal</Link></li>
              <li><Link to="/servicios/freight-forwarding" className="hover:text-zinc-900 transition-colors">Freight Forwarding</Link></li>
              <li><Link to="/servicios/transporte-terrestre" className="hover:text-zinc-900 transition-colors">Transporte Terrestre</Link></li>
              <li><Link to="/servicios/almacenaje" className="hover:text-zinc-900 transition-colors">Almacenaje</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.25em] text-[#c41e3a] uppercase mb-5 font-semibold">Empresas</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link to="/empresas/palazuelos-logistics" className="hover:text-zinc-900 transition-colors">Palazuelos Logistics</Link></li>
              <li><Link to="/empresas/trip-mexicana" className="hover:text-zinc-900 transition-colors">Trip Mexicana</Link></li>
              <li><Link to="/empresas/ocupa" className="hover:text-zinc-900 transition-colors">OCUPA</Link></li>
              <li><Link to="/empresas/alman" className="hover:text-zinc-900 transition-colors">ALMAN · FRIMAN</Link></li>
              <li><Link to="/empresas/comercial-pmb" className="hover:text-zinc-900 transition-colors">Comercial PMB</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.25em] text-[#c41e3a] uppercase mb-5 font-semibold">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link to="/aviso-de-privacidad" className="hover:text-zinc-900 transition-colors">Aviso de Privacidad</Link></li>
            </ul>
            <h4 className="text-[10px] tracking-[0.25em] text-[#c41e3a] uppercase mb-5 font-semibold mt-8">Portal</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link to="/mi-logistica" className="hover:text-zinc-900 transition-colors">Mi Logística</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-200 pt-8 flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs text-zinc-400">© {new Date().getFullYear()} AJ Palazuelos S.C. Todos los derechos reservados.</p>
          <p className="text-xs text-zinc-400">Operador Económico Autorizado · Certificado por el SAT</p>
        </div>
      </div>
    </footer>
  )
}
