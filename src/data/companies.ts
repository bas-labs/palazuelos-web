export interface Company {
  slug: string
  name: string
  role: string
  shortDesc: string
  logo: string
  description: string
  services: string[]
  location: string
  externalUrl?: string
  relatedServices: string[]
}

export const companies: Company[] = [
  {
    slug: 'palazuelos-logistics',
    name: 'Palazuelos Logistics',
    role: 'International Freight Forwarder',
    shortDesc: 'Eje central del grupo. Integra todos los servicios logísticos con oficina en Valencia, España y red global de agentes.',
    logo: '/images/logos/companies/logoPalazuelos2.png',
    description:
      'Palazuelos Logistics S.A. de C.V. es la empresa de freight forwarding internacional del Grupo Palazuelos. Como eje integrador, coordina todos los servicios del grupo para ofrecer soluciones logísticas completas. Con oficina propia en Valencia, España, y una red de agentes en más de 50 países, gestiona el transporte internacional marítimo, aéreo y terrestre de mercancías. Palazuelos Logistics es la puerta de entrada al servicio integral puerta a puerta que distingue al grupo.',
    services: ['Freight forwarding marítimo, aéreo y terrestre', 'Consolidación y desconsolidación de carga', 'Coordinación logística integral', 'Servicio puerta a puerta internacional'],
    location: 'CDMX / Valencia, España',
    relatedServices: ['freight-forwarding', 'puerta-a-puerta'],
  },
  {
    slug: 'aj-palazuelos',
    name: 'A.J. Palazuelos S.C.',
    role: 'Agencia Aduanal',
    shortDesc: 'Agencia aduanal fundada en 1920. Operador Económico Autorizado certificado por el SAT.',
    logo: '/images/logos/companies/logoPalazuelos1.png',
    description:
      'A.J. Palazuelos S.C. es la agencia aduanal fundadora del grupo, con más de 100 años de experiencia en el despacho de mercancías en los principales puertos, aeropuertos y fronteras de México. Certificada como Operador Económico Autorizado (OEA) por el SAT, cuenta con agentes aduanales en Veracruz, Manzanillo, Lázaro Cárdenas y la Ciudad de México. Su trayectoria y solidez la posicionan como una de las agencias aduanales más reconocidas del país.',
    services: ['Despacho aduanal de importación y exportación', 'Clasificación arancelaria', 'Asesoría en regulaciones de comercio exterior', 'Gestión de permisos y documentación'],
    location: 'Veracruz / Manzanillo / Lázaro Cárdenas / CDMX',
    relatedServices: ['despacho-aduanal', 'asesoria-permisos'],
  },
  {
    slug: 'trip-mexicana',
    name: 'Trip Mexicana',
    role: 'Transporte Terrestre',
    shortDesc: 'Flota propia de transporte para distribución nacional con cobertura punto a punto.',
    logo: '/images/logos/companies/logoTrip.png',
    description:
      'Trip Mexicana S.A. de C.V. es la empresa de transporte público federal de carga del Grupo Palazuelos. Con flota propia, ofrece servicios de distribución terrestre a nivel nacional, conectando los principales puertos de México con cualquier destino en la República. El contar con transporte propio permite al grupo garantizar tiempos de entrega, seguridad y trazabilidad completa de la mercancía.',
    services: ['Transporte de carga general', 'Distribución nacional puerta a puerta', 'Conexión puerto-destino', 'Seguimiento GPS en tiempo real'],
    location: 'Cobertura nacional',
    externalUrl: 'http://www.tripmexicana.com',
    relatedServices: ['transporte-terrestre', 'puerta-a-puerta'],
  },
  {
    slug: 'ocupa',
    name: 'OCUPA',
    role: 'Maniobras Portuarias',
    shortDesc: 'Operaciones de maniobra y carga en el puerto de Manzanillo.',
    logo: '/images/logos/companies/logoOcupa.png',
    description:
      'OCUPA S.A. de C.V. es la empresa maniobrista del Grupo Palazuelos que opera directamente dentro del puerto de Manzanillo, Colima. Realiza operaciones de maniobra, carga, descarga y almacenaje fiscal dentro del recinto portuario. Su presencia dentro del puerto permite una coordinación eficiente con las operaciones aduanales y logísticas del grupo.',
    services: ['Maniobras de carga y descarga', 'Almacenaje fiscal dentro de puerto', 'Operación de contenedores', 'Logística intra-portuaria'],
    location: 'Puerto de Manzanillo, Colima',
    externalUrl: 'http://www.ocupa.com.mx/',
    relatedServices: ['maniobras-portuarias'],
  },
  {
    slug: 'alman',
    name: 'ALMAN',
    role: 'Almacenaje General y Fiscal',
    shortDesc: 'Almacén fuera de puerto con capacidad de almacenaje fiscal regulado.',
    logo: '/images/logos/companies/logoAlman.png',
    description:
      'ALMAN S.A. de C.V. opera almacenes generales y de depósito fiscal fuera del puerto de Manzanillo. Ofrece soluciones flexibles de almacenamiento para mercancías en tránsito, depósito fiscal regulado y servicios de maniobras. Su ubicación estratégica junto al puerto permite una logística eficiente y costos de almacenamiento optimizados para importadores y exportadores.',
    services: ['Almacenaje general', 'Depósito fiscal regulado', 'Maniobras de carga y descarga', 'Control de inventarios'],
    location: 'Manzanillo, Colima (fuera de puerto)',
    externalUrl: 'http://alman.com.mx',
    relatedServices: ['almacenaje'],
  },
  {
    slug: 'friman',
    name: 'FRIMAN',
    role: 'Frigorífico',
    shortDesc: 'Cadena de frío dentro del puerto de Manzanillo para productos perecederos.',
    logo: '/images/logos/companies/logoFriman.png',
    description:
      'FRIMAN S.A. de C.V. opera un frigorífico dentro del puerto de Manzanillo, especializado en el almacenamiento de productos perecederos bajo cadena de frío controlada. Complementa los servicios de ALMAN y OCUPA para ofrecer una solución completa de almacenaje y maniobras tanto para carga seca como refrigerada.',
    services: ['Almacenamiento en frío', 'Cadena de frío controlada', 'Manejo de perecederos', 'Consolidación de carga refrigerada'],
    location: 'Puerto de Manzanillo, Colima (dentro de puerto)',
    externalUrl: 'http://www.friman.com.mx/asp/esp/',
    relatedServices: ['almacenaje'],
  },
  {
    slug: 'comercial-pmb',
    name: 'Comercial PMB',
    role: 'Comercializadora',
    shortDesc: 'Comercializadora con padrón de importadores para facilitar operaciones de comercio exterior.',
    logo: '/images/logos/companies/logoPmb.png',
    description:
      'Comercial PMB S.A. de C.V. es la comercializadora del Grupo Palazuelos, que cuenta con padrón de importadores propio. Facilita operaciones de comercio exterior para clientes que requieren apoyo en la importación de mercancías, ofreciendo una solución integral que complementa los servicios aduanales y logísticos del grupo.',
    services: ['Comercialización con padrón de importadores', 'Apoyo en importación de mercancías', 'Gestión de operaciones de comercio exterior'],
    location: 'CDMX',
    relatedServices: ['despacho-aduanal', 'asesoria-permisos'],
  },
]

export function getCompanyBySlug(slug: string) {
  return companies.find(c => c.slug === slug)
}
