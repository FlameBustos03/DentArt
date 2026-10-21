import type { ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type NoticeLevel = 1 | 2 | 3 | 4;

const headingClass: Record<HeadingLevel, string> = {
  1: "type-section text-ink-900",
  2: "font-serif text-2xl leading-8 text-ink-900",
  3: "font-serif text-xl leading-7 text-ink-900",
  4: "font-serif text-lg leading-7 text-ink-900",
  5: "font-serif text-lg leading-7 text-ink-900",
  6: "font-serif text-base leading-6 text-ink-900",
};

function Heading({
  level,
  className,
  children,
}: {
  level: HeadingLevel;
  className?: string;
  children: ReactNode;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  return <Tag className={className ?? headingClass[level]}>{children}</Tag>;
}

export interface PrivacyNoticeProps {
  /** Heading level of the notice title. Sections sit one level below, subsections two. */
  level?: NoticeLevel;
}

/**
 * Integral privacy notice. Wording follows the lawyer draft; pending confirmations
 * stay visible in brackets. Cookies use option A because the site ships no analytics.
 */
export function PrivacyNotice({ level = 1 }: PrivacyNoticeProps) {
  const section = (level + 1) as HeadingLevel;
  const subsection = (level + 2) as HeadingLevel;

  return (
    <div className="space-y-8 text-base leading-[1.625rem] text-ink-900">
      <header className="space-y-3">
        <Heading level={level}>Aviso de Privacidad Integral</Heading>
        <p>
          <strong>Última actualización:</strong> [FECHA DE PUBLICACIÓN]
        </p>
      </header>

      <section className="space-y-3">
        <Heading level={section}>1. Identidad y domicilio del responsable</Heading>
        <p>
          El responsable del tratamiento de tus datos personales es <strong>Dra. Claudia Solís</strong>,
          quien opera la clínica dental <strong>DentArt</strong> ([RAZÓN SOCIAL / RFC PENDIENTE]).
        </p>
        <p>Para efectos de este aviso, señalamos como domicilios:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Sede Poza Rica:</strong> Cipres #204, Col. Chapultepec, Poza Rica, Veracruz, México.
          </li>
          <li>
            <strong>Sede Villahermosa:</strong> Ermitaño 9, Mz 22, Valle del Jaguar, Villahermosa, Tabasco,
            México.
          </li>
        </ul>
        <p>
          <strong>Contacto:</strong> teléfono y WhatsApp +52 782 210 8172.{" "}
          <strong>Correo para privacidad y derechos ARCO:</strong> [CORREO PENDIENTE].
        </p>
        <p>
          Este aviso se emite conforme a la Ley Federal de Protección de Datos Personales en Posesión de
          los Particulares publicada en el Diario Oficial de la Federación el 20 de marzo de 2025 (LFPDPPP)
          y demás normativa aplicable.
        </p>
      </section>

      <section className="space-y-3">
        <Heading level={section}>2. Datos personales que recabamos</Heading>
        <p>Por medio del formulario de citas de nuestro sitio, WhatsApp, teléfono o en la clínica, podemos recabar:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Identificación y contacto:</strong> nombre, correo electrónico, teléfono y medio de
            contacto preferido.
          </li>
          <li>
            <strong>Datos de la cita:</strong> servicio de interés, sede, fecha y hora.
          </li>
          <li>
            <strong>Notas libres:</strong> el texto que tú decidas escribir.{" "}
            <strong>
              Estas notas pueden contener datos sobre tu estado de salud, que la ley considera datos
              personales sensibles.
            </strong>
          </li>
        </ul>
        <p>
          Te pedimos no escribir en el formulario información de salud que no sea necesaria para agendar. Tu
          historia clínica completa se integra en la clínica, con tu consentimiento informado, y no por medio
          del sitio web.
        </p>
        <p>Si eres menor de edad, la cita y el consentimiento deben realizarlos tu madre, padre o tutor.</p>
      </section>

      <section className="space-y-3">
        <Heading level={section}>3. Datos personales sensibles</Heading>
        <p>
          Los datos de salud que nos proporciones (en las notas libres o durante tu atención) se tratan como{" "}
          <strong>datos sensibles</strong>. Solo los usaremos para las finalidades primarias de este aviso y
          con tu <strong>consentimiento expreso</strong>, que otorgas al marcar la casilla correspondiente del
          formulario o al firmar los documentos de la clínica.
        </p>
      </section>

      <section className="space-y-4">
        <Heading level={section}>4. Finalidades del tratamiento</Heading>
        <div className="space-y-3">
          <Heading level={subsection}>Finalidades primarias (necesarias para la relación contigo)</Heading>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Agendar, confirmar, reprogramar o cancelar tus citas.</li>
            <li>Contactarte sobre tu solicitud por el medio que elijas.</li>
            <li>
              Brindarte atención clínica odontológica, incluyendo valoración, diagnóstico, plan de tratamiento
              y seguimiento.
            </li>
            <li>Integrar y conservar tu expediente clínico conforme a la normativa sanitaria.</li>
            <li>Cumplir obligaciones legales, fiscales y sanitarias.</li>
          </ol>
        </div>
        <div className="space-y-3">
          <Heading level={subsection}>Finalidades secundarias (puedes rechazarlas)</Heading>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Enviarte <strong>recordatorios</strong> de revisiones y limpiezas periódicas.
            </li>
            <li>
              Enviarte <strong>promociones</strong>, novedades y comunicaciones de DentArt.
            </li>
          </ol>
          <p>
            Rechazar las finalidades secundarias <strong>no afecta</strong> tu cita ni tu atención. Puedes
            negarte desde el formulario (dejando sin marcar la casilla de recordatorios y promociones) o en
            cualquier momento escribiendo a [CORREO PENDIENTE] o por WhatsApp al +52 782 210 8172 con la
            palabra <strong>&quot;BAJA&quot;</strong>.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <Heading level={section}>5. Encargados y transferencias</Heading>
        <p>
          Para operar usamos proveedores que tratan datos por nuestra cuenta (<strong>encargados</strong>):
        </p>
        <div className="min-w-0 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-mist">
                <th scope="col" className="border border-ink-900/30 px-3 py-2 font-medium text-ink-900">
                  Proveedor
                </th>
                <th scope="col" className="border border-ink-900/30 px-3 py-2 font-medium text-ink-900">
                  Función
                </th>
                <th scope="col" className="border border-ink-900/30 px-3 py-2 font-medium text-ink-900">
                  Ubicación
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-ink-900/30 px-3 py-2 align-top">Vercel Inc.</td>
                <td className="border border-ink-900/30 px-3 py-2 align-top">
                  Hospedaje del sitio web y procesamiento técnico del formulario
                </td>
                <td className="border border-ink-900/30 px-3 py-2 align-top">Estados Unidos</td>
              </tr>
              <tr>
                <td className="border border-ink-900/30 px-3 py-2 align-top">
                  [OTROS PROVEEDORES: CONFIRMAR, p. ej. analítica o agenda]
                </td>
                <td className="border border-ink-900/30 px-3 py-2 align-top">[Función]</td>
                <td className="border border-ink-900/30 px-3 py-2 align-top">[País]</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>WhatsApp (Meta Platforms):</strong> al enviar tu solicitud, el sitio abre WhatsApp para que
          tú mandes el mensaje a la clínica. Meta trata esa comunicación conforme a sus propios términos y
          aviso de privacidad, que aceptaste como usuario de WhatsApp. DentArt solo usa la conversación para
          las finalidades de este aviso.
        </p>
        <p>
          Algunos de estos proveedores se ubican fuera de México, por lo que tus datos pueden almacenarse o
          procesarse en el extranjero. Les exigimos medidas de seguridad y confidencialidad.
        </p>
        <p>
          <strong>No vendemos tus datos.</strong> Solo los comunicaremos a terceros sin tu consentimiento en
          los casos que permite la ley, por ejemplo: cuando sea necesario para tu atención médica o la gestión
          de servicios de salud, cuando lo requiera una autoridad competente, o cuando sea necesario para
          cumplir la relación contigo. Si en el futuro fuera necesaria otra transferencia que requiera tu
          consentimiento, te lo pediremos antes.
        </p>
      </section>

      <section className="space-y-3">
        <Heading level={section}>6. Derechos ARCO</Heading>
        <p>Tienes derecho a:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Acceder</strong> a tus datos personales y conocer cómo los tratamos.
          </li>
          <li>
            <strong>Rectificarlos</strong> si son inexactos o están incompletos.
          </li>
          <li>
            <strong>Cancelarlos</strong> cuando consideres que no se requieren para las finalidades de este
            aviso.
          </li>
          <li>
            <strong>Oponerte</strong> a su uso para fines específicos.
          </li>
        </ul>
        <p>
          <strong>Cómo ejercerlos:</strong> envía tu solicitud a [CORREO PENDIENTE] con:
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Tu nombre y un medio para comunicarte la respuesta.</li>
          <li>
            Copia de tu identificación oficial (o, si actúas en representación, la del representante y el
            documento que acredite la representación).
          </li>
          <li>Descripción clara del derecho que quieres ejercer y de los datos involucrados.</li>
          <li>Cualquier documento que facilite localizar tus datos.</li>
        </ol>
        <p>
          Te responderemos en un plazo máximo de <strong>20 días hábiles</strong> desde que recibamos tu
          solicitud completa y, si procede, la haremos efectiva dentro de los{" "}
          <strong>15 días hábiles</strong> siguientes. [CONFIRMAR PLAZOS CON ABOGADO CONFORME A LA LFPDPPP
          2025]
        </p>
        <p>
          Algunos datos del expediente clínico deben conservarse por el plazo que exige la normativa
          sanitaria, aun si solicitas su cancelación; en ese caso te lo explicaremos.
        </p>
      </section>

      <section className="space-y-3">
        <Heading level={section}>7. Revocación del consentimiento y limitación del uso</Heading>
        <p>
          Puedes <strong>revocar tu consentimiento</strong> en cualquier momento, salvo cuando la ley o una
          obligación vigente (por ejemplo, la conservación del expediente clínico) nos exija seguir tratando
          ciertos datos. Envía tu solicitud a [CORREO PENDIENTE] con los mismos requisitos del apartado
          anterior. Revocar el consentimiento para las finalidades primarias puede impedir que te sigamos
          atendiendo.
        </p>
        <p>
          Para dejar de recibir recordatorios o promociones, escribe <strong>&quot;BAJA&quot;</strong> por
          WhatsApp o envíanos un correo a [CORREO PENDIENTE].
        </p>
      </section>

      <section className="space-y-3">
        <Heading level={section}>8. Cookies y tecnologías similares</Heading>
        <p>
          <strong>Opción A — sin analítica:</strong> nuestro sitio solo usa las cookies técnicas
          indispensables para funcionar. No usamos cookies de publicidad ni de seguimiento.
        </p>
      </section>

      <section className="space-y-3">
        <Heading level={section}>9. Seguridad</Heading>
        <p>
          Aplicamos medidas administrativas, técnicas y físicas razonables para proteger tus datos contra
          daño, pérdida, alteración o acceso no autorizado. Si ocurriera una vulneración que afecte de forma
          significativa tus derechos, te lo informaremos.
        </p>
      </section>

      <section className="space-y-3">
        <Heading level={section}>10. Cambios a este aviso</Heading>
        <p>
          Podemos modificar este aviso por cambios legales, en nuestros servicios o en nuestros proveedores.
          Publicaremos la versión vigente en <strong>dentart.com.mx/aviso-de-privacidad</strong> con su fecha
          de actualización. Si un cambio requiere tu consentimiento, te lo solicitaremos.
        </p>
      </section>

      <section className="space-y-3">
        <Heading level={section}>11. Autoridad</Heading>
        <p>
          Si consideras que tu derecho a la protección de datos ha sido vulnerado, puedes acudir a la
          autoridad competente en materia de protección de datos personales en posesión de particulares,
          actualmente la <strong>Secretaría Anticorrupción y Buen Gobierno</strong>. [CONFIRMAR AUTORIDAD Y
          DATOS DE CONTACTO VIGENTES ANTES DE PUBLICAR]
        </p>
      </section>

    </div>
  );
}
