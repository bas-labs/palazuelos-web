import { Helmet } from 'react-helmet-async'
import { PageBanner } from '@/components/layout/PageBanner'
import { Reveal } from '@/components/ui/Reveal'

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Aviso de Privacidad — Grupo Palazuelos</title>
        <meta
          name="description"
          content="Aviso de privacidad de A.J. Palazuelos S.C. conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares."
        />
      </Helmet>

      {/* ── Banner ──────────────────────────────────────────── */}
      <PageBanner
        image="/images/gallery/bannAviso.jpg"
        title="Aviso de Privacidad"
        breadcrumbs={[{ label: 'Aviso de Privacidad' }]}
      />

      {/* ── Contenido Legal ────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-16">
          <Reveal>
            <div className="prose prose-zinc max-w-none">
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-zinc-900 mb-8 leading-tight">
                Aviso de Privacidad Integral
              </h2>

              <p className="text-zinc-600 text-[15px] leading-relaxed mb-6">
                En cumplimiento con lo dispuesto por la Ley Federal de Protección de Datos Personales
                en Posesión de los Particulares (LFPDPPP) y su Reglamento, <strong>A.J. Palazuelos S.C.</strong>,
                con domicilio en Bosque de Cidros 46 Int. 403, Col. Bosques de las Lomas, Del. Cuajimalpa,
                C.P. 05120, México D.F., es responsable del tratamiento de sus datos personales.
              </p>

              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mt-10 mb-4">
                Finalidad del Tratamiento de Datos
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed mb-4">
                Los datos personales que recabamos serán utilizados para las siguientes finalidades
                necesarias para la prestación de nuestros servicios:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-600 text-[15px] leading-relaxed mb-6">
                <li>Proveer los servicios de logística, transporte y despacho aduanal que ha solicitado.</li>
                <li>Elaborar cotizaciones, contratos y documentación relacionada con operaciones de comercio exterior.</li>
                <li>Cumplir con las obligaciones legales y fiscales derivadas de la relación comercial.</li>
                <li>Contactarle para dar seguimiento a servicios contratados o solicitudes de información.</li>
                <li>Enviar información relevante sobre nuestros servicios, promociones y novedades del sector.</li>
              </ul>

              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mt-10 mb-4">
                Datos Personales Recabados
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed mb-4">
                Para las finalidades señaladas, podremos recabar los siguientes datos personales:
                nombre completo, denominación o razón social, domicilio fiscal, RFC, correo electrónico,
                número telefónico, datos de la mercancía y datos necesarios para el despacho aduanero.
              </p>

              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mt-10 mb-4">
                Derechos ARCO
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed mb-4">
                Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los
                utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho
                solicitar la corrección de su información personal en caso de que esté desactualizada,
                sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o
                bases de datos cuando considere que la misma no está siendo utilizada adecuadamente
                (Cancelación); así como oponerse al uso de sus datos personales para fines específicos
                (Oposición). Estos derechos se conocen como derechos ARCO.
              </p>
              <p className="text-zinc-600 text-[15px] leading-relaxed mb-6">
                Para el ejercicio de cualquiera de los derechos ARCO, usted deberá enviar su solicitud
                a través de un correo electrónico dirigido a{' '}
                <a href="mailto:erikasistemas@palazuelos.mx" className="text-[#c41e3a] underline hover:text-[#a01830] transition-colors">
                  erikasistemas@palazuelos.mx
                </a>
                , incluyendo la siguiente información: nombre completo del titular, domicilio, correo
                electrónico para recibir la respuesta, copia de identificación oficial vigente, descripción
                clara y precisa de los datos personales respecto de los cuales desea ejercer alguno de los
                derechos ARCO, y cualquier otro elemento que facilite la localización de los datos personales.
              </p>

              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mt-10 mb-4">
                Transferencia de Datos
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed mb-6">
                Sus datos personales podrán ser transferidos a terceros nacionales o extranjeros
                únicamente cuando sea necesario para el cumplimiento de obligaciones legales, para la
                prestación de los servicios contratados, o cuando la transferencia sea precisa para el
                mantenimiento o cumplimiento de una relación jurídica entre el responsable y el titular.
                En cualquier caso, nos comprometemos a que dichos terceros mantengan medidas de seguridad
                administrativas, técnicas y físicas adecuadas para resguardar sus datos personales.
              </p>

              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mt-10 mb-4">
                Cambios al Aviso de Privacidad
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed mb-6">
                Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones
                al presente aviso de privacidad, ya sea por nuevos requerimientos legales, necesidades de
                nuestros servicios, prácticas de privacidad o por otras causas. Dichas modificaciones
                estarán disponibles a través de nuestra página de internet.
              </p>

              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mt-10 mb-4">
                Consentimiento
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed mb-6">
                Al proporcionar sus datos personales a A.J. Palazuelos S.C., ya sea de manera directa o
                indirecta, usted acepta y consiente que sus datos sean tratados conforme a los términos
                y condiciones del presente aviso de privacidad. Si usted no manifiesta su oposición para
                que sus datos personales sean transferidos, se entenderá que ha otorgado su consentimiento
                para ello.
              </p>

              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-zinc-900 mt-10 mb-4">
                Contacto
              </h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed mb-4">
                Para cualquier duda o aclaración respecto al tratamiento de sus datos personales,
                puede contactarnos en:
              </p>
              <ul className="list-none space-y-2 text-zinc-600 text-[15px] leading-relaxed mb-8">
                <li><strong>Responsable:</strong> A.J. Palazuelos S.C.</li>
                <li>
                  <strong>Correo electrónico:</strong>{' '}
                  <a href="mailto:erikasistemas@palazuelos.mx" className="text-[#c41e3a] underline hover:text-[#a01830] transition-colors">
                    erikasistemas@palazuelos.mx
                  </a>
                </li>
                <li><strong>Dirección:</strong> Bosque de Cidros 46 Int. 403, Col. Bosques de las Lomas, Del. Cuajimalpa, C.P. 05120, México D.F.</li>
              </ul>

              <p className="text-zinc-500 text-sm italic border-t border-zinc-200 pt-6">
                Última actualización: 14 de abril de 2013.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
