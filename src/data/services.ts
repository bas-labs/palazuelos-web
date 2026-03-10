import {
  Anchor, Ship, Truck, Warehouse, Container, FileCheck, Globe,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Service {
  slug: string
  icon: LucideIcon
  title: string
  shortDesc: string
  bannerImage: string
  description: string
  benefits: string[]
  relatedCompanies: string[]
}

export const services: Service[] = [
  {
    slug: 'despacho-aduanal',
    icon: Anchor,
    title: 'Despacho Aduanal',
    shortDesc: 'Gestión integral de trámites aduanales en todos los puertos y fronteras de México.',
    bannerImage: '/images/gallery/bannServicios.jpg',
    description:
      'Con más de 100 años de experiencia, A.J. Palazuelos S.C. ofrece servicios completos de despacho aduanal en los principales puertos, aeropuertos y fronteras de México. Nuestro equipo de agentes aduanales certificados asegura el cumplimiento normativo, la clasificación arancelaria correcta y la agilización de trámites para que su mercancía se libere en el menor tiempo posible. Como Operador Económico Autorizado (OEA) certificado por el SAT, ofrecemos ventajas exclusivas en tiempos de despacho y seguridad en la cadena logística.',
    benefits: [
      'Agentes aduanales certificados en todos los puertos principales',
      'Certificación OEA — tiempos de despacho reducidos',
      'Clasificación arancelaria precisa y asesoría regulatoria',
      'Gestión completa de documentación de importación y exportación',
      'Seguimiento en tiempo real del estatus de su despacho',
    ],
    relatedCompanies: ['palazuelos-logistics', 'comercial-pmb'],
  },
  {
    slug: 'freight-forwarding',
    icon: Ship,
    title: 'Freight Forwarding',
    shortDesc: 'Consolidación y transporte marítimo, aéreo y terrestre internacional con agentes en los principales puertos del mundo.',
    bannerImage: '/images/gallery/bannServicios.jpg',
    description:
      'Palazuelos Logistics integra servicios de freight forwarding internacional marítimo, aéreo y terrestre. Con oficina propia en Valencia, España, y una red global de agentes en más de 50 países, gestionamos el transporte de su carga desde el origen hasta el destino final. Ofrecemos consolidación de carga (LCL), contenedores completos (FCL), carga aérea y soluciones multimodales adaptadas a cada operación.',
    benefits: [
      'Oficina propia en Valencia, España',
      'Red de agentes en más de 50 países',
      'Consolidación LCL y contenedores FCL',
      'Carga aérea para envíos urgentes y de alto valor',
      'Soluciones multimodales puerta a puerta',
    ],
    relatedCompanies: ['palazuelos-logistics'],
  },
  {
    slug: 'transporte-terrestre',
    icon: Truck,
    title: 'Transporte Terrestre',
    shortDesc: 'Flota propia (Trip Mexicana) para distribución nacional puerta a puerta.',
    bannerImage: '/images/gallery/bannServicios.jpg',
    description:
      'A través de Trip Mexicana, nuestra empresa de transporte público federal de carga, ofrecemos distribución terrestre a nivel nacional. Contamos con flota propia que nos permite garantizar tiempos de entrega, seguridad de la carga y trazabilidad completa. Operamos rutas desde los principales puertos hacia cualquier destino en la República Mexicana.',
    benefits: [
      'Flota propia — mayor control y confiabilidad',
      'Cobertura nacional puerta a puerta',
      'Seguimiento GPS en tiempo real',
      'Conexión directa con puertos de Manzanillo, Veracruz y Lázaro Cárdenas',
      'Transporte de carga general, refrigerada y sobredimensionada',
    ],
    relatedCompanies: ['trip-mexicana'],
  },
  {
    slug: 'almacenaje',
    icon: Warehouse,
    title: 'Almacenaje y Depósito Fiscal',
    shortDesc: 'Almacenes generales y fiscales (ALMAN) con capacidad refrigerada (FRIMAN) en Manzanillo.',
    bannerImage: '/images/gallery/bannServicios.jpg',
    description:
      'ALMAN opera almacenes generales y de depósito fiscal fuera del puerto de Manzanillo, ofreciendo soluciones flexibles de almacenamiento para mercancías en tránsito o en régimen fiscal. Complementado por FRIMAN, nuestro frigorífico dentro del puerto, podemos manejar productos perecederos bajo cadena de frío controlada. La cercanía al puerto permite una logística eficiente y costos optimizados.',
    benefits: [
      'Almacenaje general y depósito fiscal regulado',
      'Ubicación estratégica junto al puerto de Manzanillo',
      'Cadena de frío controlada (FRIMAN) para perecederos',
      'Maniobras de carga y descarga incluidas',
      'Inventario en tiempo real y control de mercancías',
    ],
    relatedCompanies: ['alman', 'friman'],
  },
  {
    slug: 'maniobras-portuarias',
    icon: Container,
    title: 'Maniobras Portuarias',
    shortDesc: 'Operación de maniobras (OCUPA) en el puerto de Manzanillo con equipo especializado.',
    bannerImage: '/images/gallery/bannServicios.jpg',
    description:
      'OCUPA es nuestra empresa maniobrista que opera directamente dentro del puerto de Manzanillo, uno de los puertos más importantes de México y el Pacífico. Con equipo especializado y personal capacitado, realizamos operaciones de carga, descarga, almacenaje fiscal dentro de puerto y toda la logística necesaria para el manejo eficiente de contenedores y carga suelta.',
    benefits: [
      'Operación directa dentro del puerto de Manzanillo',
      'Equipo especializado para contenedores y carga suelta',
      'Almacenaje fiscal dentro del recinto portuario',
      'Integración directa con nuestros servicios aduanales',
      'Personal capacitado y certificado',
    ],
    relatedCompanies: ['ocupa'],
  },
  {
    slug: 'asesoria-permisos',
    icon: FileCheck,
    title: 'Asesoría en Permisos',
    shortDesc: 'Trámites ante SAGARPA, SEMARNAT y COFEPRIS. Avisos automáticos de importación.',
    bannerImage: '/images/gallery/bannServicios.jpg',
    description:
      'Nuestro equipo de especialistas en regulaciones de comercio exterior le asesora y gestiona todos los permisos necesarios para la importación y exportación de mercancías reguladas. Tramitamos permisos ante SAGARPA (productos agropecuarios), SEMARNAT (materiales y residuos) y COFEPRIS (productos de salud), así como avisos automáticos de importación y cualquier documentación regulatoria requerida.',
    benefits: [
      'Gestión de permisos SAGARPA, SEMARNAT y COFEPRIS',
      'Avisos automáticos de importación',
      'Asesoría en regulaciones y restricciones no arancelarias',
      'Clasificación de mercancías reguladas',
      'Agilización de trámites con tiempos de respuesta optimizados',
    ],
    relatedCompanies: ['palazuelos-logistics', 'comercial-pmb'],
  },
  {
    slug: 'puerta-a-puerta',
    icon: Globe,
    title: 'Servicio Puerta a Puerta',
    shortDesc: 'Recolección y entrega de mercancías en cualquier parte del mundo.',
    bannerImage: '/images/gallery/bannServicios.jpg',
    description:
      'Nuestro servicio integral puerta a puerta abarca todo el ciclo logístico: desde la recolección de mercancías en el origen (cualquier parte del mundo), el transporte internacional, el despacho aduanal, el almacenaje cuando sea necesario, y la entrega final en el destino. Al contar con infraestructura 100% propia en cada etapa, eliminamos intermediarios y ofrecemos un servicio más ágil, confiable y competitivo.',
    benefits: [
      'Recolección en origen y entrega en destino final',
      'Sin intermediarios — infraestructura 100% propia',
      'Coordinación integral de toda la cadena logística',
      'Un solo punto de contacto para toda la operación',
      'Trazabilidad completa de principio a fin',
    ],
    relatedCompanies: ['palazuelos-logistics', 'trip-mexicana'],
  },
]

export function getServiceBySlug(slug: string) {
  return services.find(s => s.slug === slug)
}
