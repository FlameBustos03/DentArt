"use client";

import { type RefObject } from "react";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import {
  PRIVACY_NOTICE_PANEL_ID,
  PRIVACY_NOTICE_TOGGLE_ID,
  SIMPLIFIED_PRIVACY_NOTICE,
} from "@/lib/privacyNotice";

export const PRIVACY_CONSENT_ERROR_ID = "consent-privacy-error";
export const HEALTH_CONSENT_ERROR_ID = "consent-health-error";

export function consentDescribedBy(acceptPrivacy: boolean, healthRequired: boolean, acceptHealth: boolean) {
  const ids = [
    acceptPrivacy ? null : PRIVACY_CONSENT_ERROR_ID,
    healthRequired && !acceptHealth ? HEALTH_CONSENT_ERROR_ID : null,
  ].filter((id): id is string => Boolean(id));
  return ids.length > 0 ? ids.join(" ") : undefined;
}

export interface BookingConsentProps {
  notesFilled: boolean;
  acceptPrivacy: boolean;
  acceptHealth: boolean;
  acceptMarketing: boolean;
  noticeOpen: boolean;
  noticeButtonRef: RefObject<HTMLButtonElement>;
  onAcceptPrivacy: (value: boolean) => void;
  onAcceptHealth: (value: boolean) => void;
  onAcceptMarketing: (value: boolean) => void;
  onToggleNotice: () => void;
  onOpenNotice: () => void;
}

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true"> *</span>
      <span className="sr-only"> Obligatorio</span>
    </>
  );
}

export function BookingConsent({
  notesFilled,
  acceptPrivacy,
  acceptHealth,
  acceptMarketing,
  noticeOpen,
  noticeButtonRef,
  onAcceptPrivacy,
  onAcceptHealth,
  onAcceptMarketing,
  onToggleNotice,
  onOpenNotice,
}: BookingConsentProps) {
  const healthRequired = notesFilled;
  const privacyError = acceptPrivacy
    ? undefined
    : "Acepta el Aviso de Privacidad para enviar tu solicitud.";
  const healthError =
    healthRequired && !acceptHealth
      ? "Autoriza el tratamiento de los datos de salud que incluyas en tus notas para enviar tu solicitud."
      : undefined;

  const openNoticeFromLabel = () => {
    onOpenNotice();
    window.requestAnimationFrame(() => {
      document.getElementById(PRIVACY_NOTICE_PANEL_ID)?.focus();
    });
  };

  return (
    <div className="mt-8 space-y-4 border-t border-black/10 pt-6 text-ink-900">
      <p className="text-sm leading-6 text-ink-900">{SIMPLIFIED_PRIVACY_NOTICE}</p>

      <button
        ref={noticeButtonRef}
        id={PRIVACY_NOTICE_TOGGLE_ID}
        type="button"
        aria-expanded={noticeOpen}
        aria-controls={PRIVACY_NOTICE_PANEL_ID}
        onClick={onToggleNotice}
        className="inline-flex min-h-11 scroll-mt-28 items-center text-left text-sm font-medium text-lime-800 underline decoration-2 underline-offset-4"
      >
        Leer aviso de privacidad completo
      </button>

      <div
        id={PRIVACY_NOTICE_PANEL_ID}
        role="region"
        aria-labelledby={PRIVACY_NOTICE_TOGGLE_ID}
        hidden={noticeOpen ? undefined : true}
        tabIndex={noticeOpen ? 0 : undefined}
        className="max-h-96 overflow-y-auto overscroll-y-contain rounded-2xl border-2 border-ink-900/60 bg-white p-4 text-ink-900"
      >
        <PrivacyNotice level={4} />
      </div>

      <fieldset className="space-y-3">
        <legend className="sr-only">Consentimientos para enviar la solicitud</legend>

        <div>
          <div className="flex items-center gap-3">
            <input
              id="accept-privacy"
              name="acceptPrivacy"
              type="checkbox"
              checked={acceptPrivacy}
              aria-required="true"
              aria-label="He leído y acepto el Aviso de Privacidad. Obligatorio"
              aria-invalid={privacyError ? true : undefined}
              aria-describedby={privacyError ? PRIVACY_CONSENT_ERROR_ID : undefined}
              onChange={(event) => onAcceptPrivacy(event.target.checked)}
              className="h-11 w-11 shrink-0 accent-[#1B7A45]"
            />
            <p className="text-sm leading-6 text-ink-900">
              <label htmlFor="accept-privacy" className="inline-flex min-h-11 cursor-pointer items-center">
                He leído y acepto el
              </label>{" "}
              <button
                type="button"
                className="inline-flex min-h-11 items-center px-0.5 font-medium text-lime-800 underline decoration-2 underline-offset-4"
                onClick={openNoticeFromLabel}
              >
                Aviso de Privacidad
              </button>
              <span aria-hidden="true">.</span>
              <RequiredMark />
            </p>
          </div>
          {privacyError ? (
            <p id={PRIVACY_CONSENT_ERROR_ID} role="alert" aria-live="assertive" className="mt-1 text-sm text-red-700">
              {privacyError}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="accept-health" className="flex min-h-11 cursor-pointer items-center gap-3 text-sm leading-6 text-ink-900">
            <input
              id="accept-health"
              name="acceptHealth"
              type="checkbox"
              checked={acceptHealth}
              aria-required={healthRequired ? "true" : undefined}
              aria-invalid={healthError ? true : undefined}
              aria-describedby={healthError ? HEALTH_CONSENT_ERROR_ID : undefined}
              onChange={(event) => onAcceptHealth(event.target.checked)}
              className="h-11 w-11 shrink-0 accent-[#1B7A45]"
            />
            <span>
              Autorizo el tratamiento de los datos de salud que incluya en mis notas.
              {healthRequired ? (
                <RequiredMark />
              ) : (
                <span className="sr-only"> Obligatorio solo si escribes notas.</span>
              )}
            </span>
          </label>
          {healthError ? (
            <p id={HEALTH_CONSENT_ERROR_ID} role="alert" aria-live="assertive" className="mt-1 text-sm text-red-700">
              {healthError}
            </p>
          ) : null}
        </div>

        <label htmlFor="accept-marketing" className="flex min-h-11 cursor-pointer items-center gap-3 text-sm leading-6 text-ink-900">
          <input
            id="accept-marketing"
            name="acceptMarketing"
            type="checkbox"
            checked={acceptMarketing}
            onChange={(event) => onAcceptMarketing(event.target.checked)}
            className="h-11 w-11 shrink-0 accent-[#1B7A45]"
          />
          <span>
            Quiero recibir recordatorios y promociones de DentArt.
            <span className="text-black/70"> (opcional)</span>
          </span>
        </label>
      </fieldset>
    </div>
  );
}
