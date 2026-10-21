"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import {
  clinicHoursLabel,
  clinicHoursNote,
  clinicInfo,
  consultationModes,
  DEFAULT_LOCATION_ID,
  getUpcomingBookingDates,
  treatmentOptions,
} from "@/data/mockData";
import { BookingConsent, consentDescribedBy } from "@/components/BookingConsent";
import { LocationSwitch } from "@/components/LocationSwitch";
import { useClinicLocation } from "@/components/LocationProvider";
import type { BookingFieldErrors, BookingFormData, ContactPreference } from "@/types";
import { Button } from "@/components/ui/Button";
import { RequiredMark, TextAreaField, TextField } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { formatConsentStamp, PRIVACY_NOTICE_VERSION } from "@/lib/privacyNotice";
import { buildWhatsAppUrl, cn, isValidEmail, isValidPhone } from "@/lib/utils";

const INITIAL_FORM: BookingFormData = {
  treatmentId: "",
  locationId: DEFAULT_LOCATION_ID,
  consultationMode: "",
  dateIso: "",
  slotId: "",
  fullName: "",
  email: "",
  phone: "",
  contactPreference: "phone",
  notes: "",
};

const CONTACT_OPTIONS: Array<{ value: ContactPreference; label: string }> = [
  { value: "phone", label: "Teléfono" },
  { value: "email", label: "Correo" },
  { value: "whatsapp", label: "WhatsApp" },
];

const STEP_LABELS = ["Servicio y sede", "Modalidad", "Fecha, hora y contacto"] as const;

const chipIdle =
  "border-2 border-ink-900/70 bg-white text-ink-900 hover:border-ink-900 hover:bg-mist";
const chipSelected = "border-2 border-lime-500 bg-lime-500 text-ink-900";
const chipDisabled =
  "cursor-not-allowed border-2 border-ink-900/50 bg-mist text-ink-900 disabled:opacity-100";
const radioFocus =
  "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-ink-800";

export function BookingForm() {
  const { location, locationId } = useClinicLocation();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingFormData>({ ...INITIAL_FORM, locationId });
  const [errors, setErrors] = useState<BookingFieldErrors>({});
  const [successOpen, setSuccessOpen] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptHealth, setAcceptHealth] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [privacyTouched, setPrivacyTouched] = useState(false);
  const [healthTouched, setHealthTouched] = useState(false);
  const [consentAttempted, setConsentAttempted] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [noticeFocusNonce, setNoticeFocusNonce] = useState(0);
  const [launchedWhatsappUrl, setLaunchedWhatsappUrl] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const noticeButtonRef = useRef<HTMLButtonElement>(null);
  const ignoreHeadingFocus = useRef(false);
  const handledNoticeFocus = useRef(0);
  const statusId = useId();
  const dates = useMemo(() => getUpcomingBookingDates(10), []);
  const selectedDate = dates.find((date) => date.iso === form.dateIso);
  const selectedTreatment = treatmentOptions.find((item) => item.id === form.treatmentId);
  const selectedSlot = selectedDate?.slots.find((slot) => slot.id === form.slotId);
  const selectedMode = consultationModes.find((item) => item.id === form.consultationMode);

  useEffect(() => {
    setForm((prev) => (prev.locationId === locationId ? prev : { ...prev, locationId }));
  }, [locationId]);

  // Track the last step we focused for instead of a "skip first run" flag:
  // StrictMode re-runs mount effects, and the flag variant focused (and scrolled
  // the page to) the booking heading on initial load.
  const focusedStep = useRef(step);

  useEffect(() => {
    if (focusedStep.current === step) {
      return;
    }
    focusedStep.current = step;
    if (ignoreHeadingFocus.current) {
      ignoreHeadingFocus.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash !== "#aviso-privacidad") {
        return;
      }
      setStep((current) => {
        if (current !== 3) {
          ignoreHeadingFocus.current = true;
        }
        return 3;
      });
      setNoticeOpen(true);
      setNoticeFocusNonce((value) => value + 1);
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    if (noticeFocusNonce === 0 || step !== 3 || !noticeOpen) {
      return;
    }
    if (handledNoticeFocus.current === noticeFocusNonce) {
      return;
    }
    const nonce = noticeFocusNonce;
    const frame = window.requestAnimationFrame(() => {
      handledNoticeFocus.current = nonce;
      noticeButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      noticeButtonRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [noticeFocusNonce, step, noticeOpen]);

  const validateStep = (current: number): BookingFieldErrors => {
    const nextErrors: BookingFieldErrors = {};

    if (current === 1 && !form.treatmentId) {
      nextErrors.treatmentId = "Elige un servicio para continuar.";
    }

    if (current === 2 && !form.consultationMode) {
      nextErrors.consultationMode = "Elige consulta presencial o virtual.";
    }

    if (current === 3) {
      if (!form.dateIso) {
        nextErrors.dateIso = "Elige una fecha.";
      }
      if (!form.slotId) {
        nextErrors.slotId = "Elige tu horario preferido.";
      }
      if (form.fullName.trim().length < 2) {
        nextErrors.fullName = "Escribe tu nombre completo.";
      }
      if (form.email.trim() && !isValidEmail(form.email)) {
        nextErrors.email = "Escribe un correo válido.";
      }
      if (!isValidPhone(form.phone)) {
        nextErrors.phone = "Escribe un teléfono válido.";
      }
      if (!form.contactPreference) {
        nextErrors.contactPreference = "Elige cómo te contactamos.";
      }
      if (!acceptPrivacy) {
        nextErrors.acceptPrivacy = "Acepta el Aviso de Privacidad para enviar tu solicitud.";
      }
      if (form.notes.trim() && !acceptHealth) {
        nextErrors.acceptHealth =
          "Autoriza el tratamiento de los datos de salud que incluyas en tus notas para enviar tu solicitud.";
      }
    }

    return nextErrors;
  };

  const goNext = () => {
    const nextErrors = validateStep(step);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setStep((value) => Math.min(3, value + 1));
    }
  };

  const contactLabel =
    CONTACT_OPTIONS.find((option) => option.value === form.contactPreference)?.label ?? "";

  const notesFilled = form.notes.trim().length > 0;
  const consentReady = acceptPrivacy && (!notesFilled || acceptHealth);
  const showPrivacyError = !acceptPrivacy && (privacyTouched || consentAttempted);
  const showHealthError = notesFilled && !acceptHealth && (healthTouched || consentAttempted);

  const buildBookingMessage = (consentedAt: Date) => {
    const lines = [
      "Hola Dent Art, quiero agendar una cita.",
      selectedTreatment
        ? `Servicio: ${selectedTreatment.name} (${selectedTreatment.durationMinutes} min)`
        : "",
      `Sede: ${location.city} · ${location.addressLines[0]}`,
      selectedMode ? `Modalidad: ${selectedMode.label}` : "",
      selectedDate
        ? `Fecha y hora preferida: ${selectedDate.weekday} ${selectedDate.label}${selectedSlot ? ` · ${selectedSlot.time}` : ""}`
        : "",
      `Nombre: ${form.fullName.trim()}`,
      `Teléfono: ${form.phone.trim()}`,
      form.email.trim() ? `Correo: ${form.email.trim()}` : "",
      contactLabel ? `Prefiero que me contacten por: ${contactLabel}` : "",
      form.notes.trim() ? `Notas: ${form.notes.trim()}` : "",
      `Consentimiento: ${formatConsentStamp(consentedAt)}`,
      `Versión del aviso: ${PRIVACY_NOTICE_VERSION}`,
      `Datos de salud: ${acceptHealth ? "sí" : "no"}`,
      `Recordatorios y promociones: ${acceptMarketing ? "sí" : "no"}`,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConsentAttempted(true);
    const nextErrors = validateStep(3);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !consentReady) {
      return;
    }
    const url = buildWhatsAppUrl(clinicInfo.whatsappNumber, buildBookingMessage(new Date()));
    setLaunchedWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSuccessOpen(true);
  };

  const resetBooking = () => {
    setSuccessOpen(false);
    setForm({ ...INITIAL_FORM, locationId });
    setErrors({});
    setAcceptPrivacy(false);
    setAcceptHealth(false);
    setAcceptMarketing(false);
    setPrivacyTouched(false);
    setHealthTouched(false);
    setConsentAttempted(false);
    setNoticeOpen(false);
    setLaunchedWhatsappUrl("");
    setStep(1);
  };

  return (
    <section id="booking" aria-labelledby="booking-heading" className="bg-ink-900 py-16 text-white md:py-20">
      <div className="section-x">
        <Reveal>
          <p className="type-eyebrow-dark">Agenda</p>
          <h2 id="booking-heading" className="type-section mt-3 text-white">
            Agendar cita
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-[1.625rem] text-white/85">
            Elige servicio, sede y horario preferido; tu solicitud se envía por WhatsApp y el
            consultorio confirma la disponibilidad. {clinicHoursLabel}. {clinicHoursNote}
          </p>
        </Reveal>
        <div className="mt-6 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
          <LocationSwitch tone="dark" className="max-w-full" />
          <p className="min-w-0 break-words text-sm text-white/80">
            {location.city} · {location.addressLines[0]}
          </p>
        </div>

        <ol className="mt-8 flex flex-wrap gap-3 text-sm" aria-label="Progreso de la cita">
          {STEP_LABELS.map((label, index) => {
            const value = index + 1;
            const current = value === step;
            return (
              <li
                key={label}
                className={cn(
                  "rounded-full border px-4 py-2",
                  current
                    ? "border-lime-500 bg-lime-500 text-ink-900"
                    : value < step
                      ? "border-lime-400/40 text-lime-400"
                      : "border-white/20 text-white/70",
                )}
                aria-current={current ? "step" : undefined}
              >
                {value}. {label}
              </li>
            );
          })}
        </ol>

        <form
          className="mt-8 min-w-0 rounded-2xl border border-black/10 bg-mist p-5 text-ink-900 sm:p-8"
          onSubmit={onSubmit}
          noValidate
          onKeyDown={(event) => {
            if (event.key !== "Enter" || event.shiftKey) return;
            if (!(event.target instanceof HTMLInputElement)) return;
            setConsentAttempted(true);
          }}
        >
          <h3 ref={headingRef} tabIndex={-1} className="type-card outline-none">
            {step === 1 && "Paso 1 · Servicio"}
            {step === 2 && "Paso 2 · Modalidad"}
            {step === 3 && "Paso 3 · Fecha, hora y contacto"}
          </h3>
          <p className="mt-2 text-sm text-black/70">
            Los campos marcados con asterisco (<span aria-hidden="true">*</span>
            <span className="sr-only">asterisco</span>) son obligatorios. El correo es opcional.
          </p>
          <p id={statusId} className="sr-only" aria-live="polite">
            Paso {step} de 3
          </p>

          <motion.div
            key={step}
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
          >
          {step === 1 ? (
            <fieldset className="mt-6 min-w-0">
              <legend className="type-eyebrow mb-3">
                Servicio
                <RequiredMark />
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {treatmentOptions.map((option) => {
                  const selected = form.treatmentId === option.id;
                  return (
                    <label
                      key={option.id}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-4 transition-colors",
                        radioFocus,
                        selected
                          ? "border-lime-800 bg-white shadow-sm"
                          : "border-black/10 bg-white hover:border-black/20",
                      )}
                    >
                      <input
                        type="radio"
                        name="treatment"
                        className="sr-only"
                        checked={selected}
                        onChange={() => {
                          setForm((prev) => ({ ...prev, treatmentId: option.id }));
                          setErrors((prev) => ({ ...prev, treatmentId: undefined }));
                        }}
                      />
                      <span className="type-eyebrow">
                        {option.specialty}
                      </span>
                      <span className="type-card mt-1 block">{option.name}</span>
                      <span className="type-body mt-2 block text-sm">{option.summary}</span>
                      <span className="type-caption mt-3 block">
                        {option.durationMinutes} minutos
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.treatmentId ? (
                <p role="alert" className="mt-3 text-sm text-red-700">
                  {errors.treatmentId}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {step === 2 ? (
            <fieldset className="mt-6 min-w-0">
              <legend className="type-eyebrow mb-3">
                Modalidad
                <RequiredMark />
              </legend>
              <div className="grid gap-4 md:grid-cols-2">
                {consultationModes.map((option) => {
                  const selected = form.consultationMode === option.id;
                  return (
                    <label
                      key={option.id}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-5 transition-colors",
                        radioFocus,
                        selected
                          ? "border-lime-800 bg-white shadow-sm"
                          : "border-black/10 bg-white hover:border-black/20",
                      )}
                    >
                      <input
                        type="radio"
                        name="consultationMode"
                        className="sr-only"
                        checked={selected}
                        onChange={() => {
                          setForm((prev) => ({ ...prev, consultationMode: option.id }));
                          setErrors((prev) => ({ ...prev, consultationMode: undefined }));
                        }}
                      />
                      <span className="type-card block">{option.label}</span>
                      <span className="type-body mt-3 block">{option.description}</span>
                      <span className="type-eyebrow mt-4 block">
                        {option.durationNote}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.consultationMode ? (
                <p role="alert" className="mt-3 text-sm text-red-700">
                  {errors.consultationMode}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {step === 3 ? (
            <div className="mt-6 space-y-6">
              <fieldset className="min-w-0">
                <legend className="type-eyebrow">
                  Fecha
                  <RequiredMark />
                </legend>
                <div className="mt-3 flex min-w-0 gap-2 overflow-x-auto pb-2">
                  {dates.map((date) => {
                    const selected = form.dateIso === date.iso;
                    return (
                      <button
                        key={date.iso}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          setForm((prev) => ({ ...prev, dateIso: date.iso, slotId: "" }));
                          setErrors((prev) => ({ ...prev, dateIso: undefined, slotId: undefined }));
                        }}
                        className={cn(
                          "min-h-11 min-w-[4.75rem] rounded-2xl px-3 py-3 text-center",
                          selected ? chipSelected : chipIdle,
                        )}
                      >
                        <span className="block text-xs uppercase">{date.weekday}</span>
                        <span className="mt-1 block font-serif text-lg">{date.label}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.dateIso ? (
                  <p role="alert" className="mt-2 text-sm text-red-700">
                    {errors.dateIso}
                  </p>
                ) : null}
              </fieldset>

              <fieldset className="min-w-0">
                <legend className="type-eyebrow">
                  Hora preferida
                  <RequiredMark />
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {(selectedDate?.slots ?? []).map((slot) => {
                    const selected = form.slotId === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!slot.available}
                        aria-pressed={selected}
                        onClick={() => {
                          setForm((prev) => ({ ...prev, slotId: slot.id }));
                          setErrors((prev) => ({ ...prev, slotId: undefined }));
                        }}
                        className={cn(
                          "min-h-11 rounded-xl px-3 py-3 text-sm",
                          !slot.available ? chipDisabled : selected ? chipSelected : chipIdle,
                        )}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
                {!selectedDate ? (
                  <p className="mt-3 text-sm text-black/70">Elige una fecha para ver horarios.</p>
                ) : (
                  <p className="mt-3 text-sm text-black/70">
                    El consultorio confirma la disponibilidad al recibir tu solicitud.
                  </p>
                )}
                {errors.slotId ? (
                  <p role="alert" className="mt-2 text-sm text-red-700">
                    {errors.slotId}
                  </p>
                ) : null}
              </fieldset>

              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  id="fullName"
                  label="Nombre completo"
                  autoComplete="name"
                  requiredMark
                  value={form.fullName}
                  error={errors.fullName}
                  onChange={(event) => {
                    setForm((prev) => ({ ...prev, fullName: event.target.value }));
                    setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                />
                <TextField
                  id="email"
                  label="Correo (opcional)"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(event) => {
                    setForm((prev) => ({ ...prev, email: event.target.value }));
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                />
                <TextField
                  id="phone"
                  label="Teléfono"
                  type="tel"
                  autoComplete="tel"
                  requiredMark
                  value={form.phone}
                  error={errors.phone}
                  onChange={(event) => {
                    setForm((prev) => ({ ...prev, phone: event.target.value }));
                    setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                />
                <fieldset className="flex min-w-0 flex-col gap-1.5">
                  <legend className="type-eyebrow">
                    Cómo te contactamos
                    <RequiredMark />
                  </legend>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {CONTACT_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={cn(
                          "inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 py-2 text-sm",
                          radioFocus,
                          form.contactPreference === option.value ? chipSelected : chipIdle,
                        )}
                      >
                        <input
                          type="radio"
                          name="contactPreference"
                          className="sr-only"
                          checked={form.contactPreference === option.value}
                          onChange={() =>
                            setForm((prev) => ({ ...prev, contactPreference: option.value }))
                          }
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="md:col-span-2">
                  <TextAreaField
                    id="notes"
                    label="Notas (opcional)"
                    value={form.notes}
                    onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                  />
                </div>
              </div>
            </div>
          ) : null}
          </motion.div>

          {step === 3 ? (
            <BookingConsent
              notesFilled={notesFilled}
              acceptPrivacy={acceptPrivacy}
              acceptHealth={acceptHealth}
              acceptMarketing={acceptMarketing}
              noticeOpen={noticeOpen}
              noticeButtonRef={noticeButtonRef}
              onAcceptPrivacy={setAcceptPrivacy}
              onAcceptHealth={setAcceptHealth}
              onAcceptMarketing={setAcceptMarketing}
              onToggleNotice={() => setNoticeOpen((open) => !open)}
              onOpenNotice={() => setNoticeOpen(true)}
              showPrivacyError={showPrivacyError}
              showHealthError={showHealthError}
              onPrivacyTouched={() => setPrivacyTouched(true)}
              onHealthTouched={() => setHealthTouched(true)}
            />
          ) : null}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <Button
              variant="ghost"
              disabled={step === 1}
              onClick={() => setStep((value) => Math.max(1, value - 1))}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Atrás
            </Button>
            {step < 3 ? (
              // Distinct keys force a fresh DOM node: if React morphed this button
              // into the type="submit" one during the same click, the browser would
              // fire onSubmit and flash step-3 validation errors.
              <Button key="next-step" variant="primary" onClick={goNext}>
                Continuar
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button
                key="submit-whatsapp"
                type="submit"
                variant="primary"
                disabled={!consentReady}
                aria-describedby={consentDescribedBy(showPrivacyError, showHealthError)}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Enviar por WhatsApp
              </Button>
            )}
          </div>
        </form>
      </div>

      <Modal open={successOpen} title="Continúa en WhatsApp" onClose={resetBooking}>
        <div className="space-y-4 text-black/70">
          <p className="flex items-center gap-2 text-ink-900">
            <CheckCircle2 className="h-5 w-5 text-lime-800" aria-hidden="true" />
            Tu solicitud quedó lista en WhatsApp — solo falta que presiones enviar.
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <strong>Servicio:</strong> {selectedTreatment?.name}
            </li>
            <li>
              <strong>Sede:</strong> {location.city} · {location.addressLines[0]}
            </li>
            <li>
              <strong>Modalidad:</strong> {selectedMode?.label}
            </li>
            <li>
              <strong>Horario preferido:</strong>{" "}
              {selectedDate ? `${selectedDate.weekday} ${selectedDate.label}` : form.dateIso}
              {selectedSlot ? ` · ${selectedSlot.time}` : ""}
            </li>
            <li>
              <strong>Paciente:</strong> {form.fullName}
            </li>
          </ul>
          <p>
            El consultorio responde por ese chat para confirmar tu horario según disponibilidad.
            ¿No se abrió WhatsApp?
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={launchedWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lime-500 px-5 text-sm font-medium text-ink-900 transition-colors hover:bg-lime-400"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Abrir WhatsApp
            </a>
            <Button variant="ghost" onClick={resetBooking}>
              Agendar otra cita
            </Button>
          </div>
          <p className="text-sm">
            Si es una urgencia, llama o manda WhatsApp al {clinicInfo.phoneDisplay}.
          </p>
        </div>
      </Modal>
    </section>
  );
}
