/** Version string recorded with each booking consent. Legal body lives in PrivacyNotice. */
export const PRIVACY_NOTICE_VERSION = "2026-10-20-v1";

export const PRIVACY_NOTICE_TOGGLE_ID = "aviso-privacidad";
export const PRIVACY_NOTICE_PANEL_ID = "aviso-privacidad-panel";
export const PRIVACY_NOTICE_HREF = "/#aviso-privacidad";

export const SIMPLIFIED_PRIVACY_NOTICE =
  "DentArt (Dra. Claudia Solís) usará tus datos para agendar tu cita, contactarte y atenderte; tus notas pueden incluir datos de salud, que tratamos con tu consentimiento expreso. Consulta el Aviso de Privacidad para conocer tus derechos ARCO y cómo negarte a recordatorios y promociones.";

const consentDateTime = new Intl.DateTimeFormat("es-MX", {
  timeZone: "America/Mexico_City",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/** ISO instant plus a long es-MX reading in America/Mexico_City. */
export function formatConsentStamp(date: Date): string {
  return `${date.toISOString()} (${consentDateTime.format(date)}, Ciudad de México)`;
}
