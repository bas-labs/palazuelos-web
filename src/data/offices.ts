export interface Office {
  city: string
  label: string
  address: string
  phones: string[]
  email?: string
}

export const offices: Office[] = [
  {
    city: 'CDMX',
    label: 'Corporativo CDMX',
    address: 'Bosque de Cidros 46 Int. 403, Col. Bosques de las Lomas, Del. Cuajimalpa C.P. 05120, México D.F.',
    phones: ['(55) 55 11 11 07', '(55) 52 59 59 59'],
    email: 'erikasistemas@palazuelos.mx',
  },
  {
    city: 'Manzanillo',
    label: 'Manzanillo',
    address: 'Av. Lázaro Cárdenas 907 Col. Las Brisas C.P. 28210, Manzanillo, Colima',
    phones: ['(314) 33 248 50', '(314) 33 248 51'],
  },
  {
    city: 'Veracruz',
    label: 'Veracruz',
    address: 'Benito Juárez 269 Of. 1, 2do. Piso Col. Centro CP. 91700, Veracruz, Veracruz',
    phones: ['(229) 932 94 24', '(229) 932 94 47'],
  },
  {
    city: 'Lázaro Cárdenas',
    label: 'Lázaro Cárdenas',
    address: 'Av. Melchor Ocampo No. 47 Int. 302, Cp. 60950, Lázaro Cárdenas, Michoacán',
    phones: ['(753) 110 10 98'],
  },
]
