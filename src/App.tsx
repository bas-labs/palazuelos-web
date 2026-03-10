import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const ServicesOverview = lazy(() => import('@/pages/ServicesOverview'))
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'))
const CompaniesOverview = lazy(() => import('@/pages/CompaniesOverview'))
const CompanyDetail = lazy(() => import('@/pages/CompanyDetail'))
const Coverage = lazy(() => import('@/pages/Coverage'))
const Quote = lazy(() => import('@/pages/Quote'))
const Contact = lazy(() => import('@/pages/Contact'))
const ClientPortal = lazy(() => import('@/pages/ClientPortal'))
const Privacy = lazy(() => import('@/pages/Privacy'))

function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#c41e3a] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="nosotros" element={<About />} />
          <Route path="servicios" element={<ServicesOverview />} />
          <Route path="servicios/:slug" element={<ServiceDetail />} />
          <Route path="empresas" element={<CompaniesOverview />} />
          <Route path="empresas/:slug" element={<CompanyDetail />} />
          <Route path="cobertura" element={<Coverage />} />
          <Route path="cotizador" element={<Quote />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="mi-logistica" element={<ClientPortal />} />
          <Route path="aviso-de-privacidad" element={<Privacy />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
