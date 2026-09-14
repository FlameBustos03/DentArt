"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  clinicHoursLabel,
  clinicHoursNote,
  clinicInfo,
  consultationModes,
  DEFAULT_LOCATION_ID,
  getUpcomingBookingDates,
  treatmentOptions,
} from "@/data/mockData";
import { LocationSwitch } from "@/components/LocationSwitch";
import { useClinicLocation } from "@/components/LocationProvider";
import type { BookingFieldErrors, BookingFormData, ContactPreference } from "@/types";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { cn, isValidEmail, isValidPhone } from "@/lib/utils";

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

export function BookingForm() {
  const { location, locationId } = useClinicLocation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingFormData>({ ...INITIAL_FORM, locationId });
  const [errors, setErrors] = useState<BookingFieldErrors>({});
  const [successOpen, setSuccessOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statusId = useId();
  const dates = useMemo(() => getUpcomingBookingDates(10), []);
  const selectedDate = dates.find((date) => date.iso === form.dateIso);
  const selectedTreatment = treatmentOptions.find((item) => item.id === form.treatmentId);
  const selectedSlot = selectedDate?.slots.find((slot) => slot.id === form.slotId);
  const selectedMode = consultationModes.find((item) => item.id === form.consultationMode);

  useEffect(() => {
    setForm((prev) => (prev.locationId === locationId ? prev : { ...prev, locationId }));
  }, [locationId]);

  const isFirstStepFocus = useRef(true);

  useEffect(() => {
    if (isFirstStepFocus.current) {
      isFirstStepFocus.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

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
        nextErrors.slotId = "Elige un horario disponible.";
      }
      if (form.fullName.trim().length < 2) {
        nextErrors.fullName = "Escribe tu nombre completo.";
      }
      if (!isValidEmail(form.email)) {
        nextErrors.email = "Escribe un correo válido.";
      }
      if (!isValidPhone(form.phone)) {
        nextErrors.phone = "Escribe un teléfono válido.";
      }
      if (!form.contactPreference) {
        nextErrors.contactPreference = "Elige cómo te contactamos.";
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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateStep(3);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setSuccessOpen(true);
  };

  const resetBooking = () => {
    setSuccessOpen(false);
    setForm({ ...INITIAL_FORM, locationId });
    setErrors({});
    setStep(1);
  };

  return (
    <section id="booking" aria-labelledby="booking-heading" className="scroll-mt-24 bg-ink-900 py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-lime-400">Agenda</p>
        <h2 id="booking-heading" className="mt-3 font-serif text-3xl sm:text-5xl">
          Agendar cita
        </h2>
        <p className="mt-4 max-w-2xl text-white/85">
          Elige servicio, sede y horario. {clinicHoursLabel}. {clinicHoursNote}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <LocationSwitch tone="dark" />
          <p className="text-sm text-white/80">
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
                      ? "border-lime-500/40 text-lime-400"
                      : "border-white/15 text-white/70",
                )}
                aria-current={current ? "step" : undefined}
              >
                {value}. {label}
              </li>
            );
          })}
        </ol>

        <form
          className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8"
          onSubmit={onSubmit}
          noValidate
        >
          <h3 ref={headingRef} tabIndex={-1} className="font-serif text-2xl outline-none">
            {step === 1 && "Paso 1 · Servicio"}
            {step === 2 && "Paso 2 · Modalidad"}
            {step === 3 && "Paso 3 · Fecha, hora y contacto"}
          </h3>
          <p id={statusId} className="sr-only" aria-live="polite">
            Paso {step} de 3
          </p>

          {step === 1 ? (
            <fieldset className="mt-6">
              <legend className="sr-only">Servicio</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {treatmentOptions.map((option) => {
                  const selected = form.treatmentId === option.id;
                  return (
                    <label
                      key={option.id}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-4 transition-colors",
                        selected
                          ? "border-lime-500 bg-lime-500/15"
                          : "border-white/10 hover:border-lime-500/50",
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
                      <span className="block text-xs uppercase tracking-[0.16em] text-lime-400">
                        {option.specialty}
                      </span>
                      <span className="mt-1 block font-serif text-xl">{option.name}</span>
                      <span className="mt-2 block text-sm text-white/80">{option.summary}</span>
                      <span className="mt-3 block text-xs text-white/70">
                        {option.durationMinutes} minutos
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.treatmentId ? (
                <p role="alert" className="mt-3 text-sm text-red-300">
                  {errors.treatmentId}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {step === 2 ? (
            <fieldset className="mt-6">
              <legend className="sr-only">Modalidad de consulta</legend>
              <div className="grid gap-4 md:grid-cols-2">
                {consultationModes.map((option) => {
                  const selected = form.consultationMode === option.id;
                  return (
                    <label
                      key={option.id}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-5 transition-colors",
                        selected
                          ? "border-lime-500 bg-lime-500/15"
                          : "border-white/10 hover:border-lime-500/50",
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
                      <span className="block font-serif text-2xl">{option.label}</span>
                      <span className="mt-3 block text-sm text-white/85">{option.description}</span>
                      <span className="mt-4 block text-xs uppercase tracking-[0.16em] text-lime-400">
                        {option.durationNote}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.consultationMode ? (
                <p role="alert" className="mt-3 text-sm text-red-300">
                  {errors.consultationMode}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {step === 3 ? (
            <div className="mt-6 space-y-6">
              <fieldset>
                <legend className="text-xs uppercase tracking-[0.16em] text-lime-400">Fecha</legend>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                  {dates.map((date) => {
                    const selected = form.dateIso === date.iso;
                    return (
                      <button
                        key={date.iso}
                        type="button"
                        onClick={() => {
                          setForm((prev) => ({ ...prev, dateIso: date.iso, slotId: "" }));
                          setErrors((prev) => ({ ...prev, dateIso: undefined, slotId: undefined }));
                        }}
                        className={cn(
                          "min-w-[4.75rem] rounded-2xl border px-3 py-3 text-center",
                          selected
                            ? "border-lime-500 bg-lime-500 text-ink-900"
                            : "border-white/10 hover:border-lime-500/50",
                        )}
                      >
                        <span className="block text-xs uppercase">{date.weekday}</span>
                        <span className="mt-1 block font-serif text-lg">{date.label}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.dateIso ? (
                  <p role="alert" className="mt-2 text-sm text-red-300">
                    {errors.dateIso}
                  </p>
                ) : null}
              </fieldset>

              <fieldset>
                <legend className="text-xs uppercase tracking-[0.16em] text-lime-400">Hora</legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {(selectedDate?.slots ?? []).map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => {
                        setForm((prev) => ({ ...prev, slotId: slot.id }));
                        setErrors((prev) => ({ ...prev, slotId: undefined }));
                      }}
                      className={cn(
                        "rounded-xl border px-3 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-35",
                        form.slotId === slot.id
                          ? "border-lime-500 bg-lime-500 text-ink-900"
                          : "border-white/10 hover:border-lime-500/50",
                      )}
                    >
                      {slot.time}
                      {!slot.available ? " · Ocupado" : ""}
                    </button>
                  ))}
                </div>
                {!selectedDate ? (
                  <p className="mt-3 text-sm text-white/70">Elige una fecha para ver horarios.</p>
                ) : null}
                {errors.slotId ? (
                  <p role="alert" className="mt-2 text-sm text-red-300">
                    {errors.slotId}
                  </p>
                ) : null}
              </fieldset>

              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  id="fullName"
                  label="Nombre completo"
                  tone="dark"
                  autoComplete="name"
                  value={form.fullName}
                  error={errors.fullName}
                  onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                />
                <TextField
                  id="email"
                  label="Correo"
                  type="email"
                  tone="dark"
                  autoComplete="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                />
                <TextField
                  id="phone"
                  label="Teléfono"
                  type="tel"
                  tone="dark"
                  autoComplete="tel"
                  value={form.phone}
                  error={errors.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                />
                <fieldset className="flex flex-col gap-1.5">
                  <legend className="text-xs uppercase tracking-[0.16em] text-lime-400">
                    Cómo te contactamos
                  </legend>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {CONTACT_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={cn(
                          "cursor-pointer rounded-full border px-4 py-2 text-sm",
                          form.contactPreference === option.value
                            ? "border-lime-500 bg-lime-500 text-ink-900"
                            : "border-white/15",
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
                    tone="dark"
                    value={form.notes}
                    onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <Button
              variant="secondary"
              disabled={step === 1}
              onClick={() => setStep((value) => Math.max(1, value - 1))}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Atrás
            </Button>
            {step < 3 ? (
              <Button variant="primary" onClick={goNext}>
                Continuar
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button type="submit" variant="primary">
                Enviar solicitud
              </Button>
            )}
          </div>
        </form>
      </div>

      <Modal open={successOpen} title="Solicitud enviada" onClose={resetBooking}>
        <div className="space-y-4 text-black/70">
          <p className="flex items-center gap-2 text-ink-900">
            <CheckCircle2 className="h-5 w-5 text-lime-800" aria-hidden="true" />
            Confirmaremos a {form.email || "tu correo"}
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
              <strong>Cuando:</strong> {form.dateIso} {selectedSlot ? `· ${selectedSlot.time}` : ""}
            </li>
            <li>
              <strong>Paciente:</strong> {form.fullName}
            </li>
          </ul>
          <p>
            Si es una urgencia, llama o manda WhatsApp al {clinicInfo.phoneDisplay}.
          </p>
          <Button variant="primary" onClick={resetBooking}>
            Agendar otra cita
          </Button>
        </div>
      </Modal>
    </section>
  );
}
