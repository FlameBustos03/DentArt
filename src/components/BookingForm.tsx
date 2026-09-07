"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  clinicInfo,
  getUpcomingBookingDates,
  treatmentOptions,
} from "@/data/mockData";
import type { BookingFieldErrors, BookingFormData, ContactPreference } from "@/types";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { cn, isValidEmail, isValidPhone } from "@/lib/utils";

const INITIAL_FORM: BookingFormData = {
  treatmentId: "",
  dateIso: "",
  slotId: "",
  fullName: "",
  email: "",
  phone: "",
  contactPreference: "phone",
  notes: "",
};

const CONTACT_OPTIONS: Array<{ value: ContactPreference; label: string }> = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
];

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<BookingFieldErrors>({});
  const [successOpen, setSuccessOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statusId = useId();
  const dates = useMemo(() => getUpcomingBookingDates(10), []);
  const selectedDate = dates.find((date) => date.iso === form.dateIso);
  const selectedTreatment = treatmentOptions.find((item) => item.id === form.treatmentId);
  const selectedSlot = selectedDate?.slots.find((slot) => slot.id === form.slotId);

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
      nextErrors.treatmentId = "Select a treatment or specialty to continue.";
    }

    if (current === 2) {
      if (!form.dateIso) {
        nextErrors.dateIso = "Choose a date.";
      }
      if (!form.slotId) {
        nextErrors.slotId = "Choose an available time.";
      }
    }

    if (current === 3) {
      if (form.fullName.trim().length < 2) {
        nextErrors.fullName = "Enter your full name.";
      }
      if (!isValidEmail(form.email)) {
        nextErrors.email = "Enter a valid email address.";
      }
      if (!isValidPhone(form.phone)) {
        nextErrors.phone = "Enter a valid phone number.";
      }
      if (!form.contactPreference) {
        nextErrors.contactPreference = "Select a contact preference.";
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
    setForm(INITIAL_FORM);
    setErrors({});
    setStep(1);
  };

  return (
    <section id="booking" aria-labelledby="booking-heading" className="bg-navy-900 py-20 text-ivory-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-400">Concierge reservations</p>
        <h2 id="booking-heading" className="mt-3 font-serif text-3xl sm:text-5xl">
          Interactive multi-step booking
        </h2>
        <p className="mt-4 max-w-2xl text-ivory-200/85">
          Three considered steps. Your hold is confirmed instantly, then a coordinator telephones
          to refine imaging, sedation, and arrival details.
        </p>

        <ol className="mt-8 flex flex-wrap gap-3 text-sm" aria-label="Booking progress">
          {["Treatment", "Date & time", "Details"].map((label, index) => {
            const value = index + 1;
            const current = value === step;
            return (
              <li
                key={label}
                className={cn(
                  "rounded-full border px-4 py-2",
                  current
                    ? "border-gold-400 bg-gold-500 text-navy-950"
                    : value < step
                      ? "border-gold-400/40 text-gold-300"
                      : "border-white/15 text-ivory-200/70",
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
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="font-serif text-2xl outline-none"
          >
            {step === 1 && "Step 1 · Select a specialty"}
            {step === 2 && "Step 2 · Choose date and time"}
            {step === 3 && "Step 3 · Patient details"}
          </h3>
          <p id={statusId} className="sr-only" aria-live="polite">
            Step {step} of 3
          </p>

          {step === 1 ? (
            <fieldset className="mt-6">
              <legend className="sr-only">Treatment or specialty</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {treatmentOptions.map((option) => {
                  const selected = form.treatmentId === option.id;
                  return (
                    <label
                      key={option.id}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-4 transition-colors",
                        selected
                          ? "border-gold-400 bg-gold-500/15"
                          : "border-white/10 hover:border-gold-400/50",
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
                      <span className="block text-xs uppercase tracking-[0.16em] text-gold-300">
                        {option.specialty}
                      </span>
                      <span className="mt-1 block font-serif text-xl">{option.name}</span>
                      <span className="mt-2 block text-sm text-ivory-200/80">{option.summary}</span>
                      <span className="mt-3 block text-xs text-ivory-200/70">
                        {option.durationMinutes} minutes
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
            <div className="mt-6 space-y-6">
              <fieldset>
                <legend className="text-xs uppercase tracking-[0.16em] text-gold-300">Date</legend>
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
                            ? "border-gold-400 bg-gold-500 text-navy-950"
                            : "border-white/10 hover:border-gold-400/50",
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
                <legend className="text-xs uppercase tracking-[0.16em] text-gold-300">Time</legend>
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
                          ? "border-gold-400 bg-gold-500 text-navy-950"
                          : "border-white/10 hover:border-gold-400/50",
                      )}
                    >
                      {slot.time}
                      {!slot.available ? " · Held" : ""}
                    </button>
                  ))}
                </div>
                {!selectedDate ? (
                  <p className="mt-3 text-sm text-ivory-200/70">Select a date to view open chairs.</p>
                ) : null}
                {errors.slotId ? (
                  <p role="alert" className="mt-2 text-sm text-red-300">
                    {errors.slotId}
                  </p>
                ) : null}
              </fieldset>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <TextField
                id="fullName"
                label="Full name"
                tone="dark"
                autoComplete="name"
                value={form.fullName}
                error={errors.fullName}
                onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
              />
              <TextField
                id="email"
                label="Email"
                type="email"
                tone="dark"
                autoComplete="email"
                value={form.email}
                error={errors.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              />
              <TextField
                id="phone"
                label="Phone"
                type="tel"
                tone="dark"
                autoComplete="tel"
                value={form.phone}
                error={errors.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              />
              <fieldset className="flex flex-col gap-1.5">
                <legend className="text-xs uppercase tracking-[0.16em] text-gold-300">
                  Contact preference
                </legend>
                <div className="flex flex-wrap gap-2 pt-2">
                  {CONTACT_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        "cursor-pointer rounded-full border px-4 py-2 text-sm",
                        form.contactPreference === option.value
                          ? "border-gold-400 bg-gold-500 text-navy-950"
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
                  label="Notes for the concierge (optional)"
                  tone="dark"
                  value={form.notes}
                  onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                />
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
              Back
            </Button>
            {step < 3 ? (
              <Button variant="gold" onClick={goNext}>
                Continue
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button type="submit" variant="gold">
                Confirm reservation
              </Button>
            )}
          </div>
        </form>
      </div>

      <Modal open={successOpen} title="Your chair is reserved" onClose={resetBooking}>
        <div className="space-y-4 text-stone-600">
          <p className="flex items-center gap-2 text-navy-900">
            <CheckCircle2 className="h-5 w-5 text-gold-600" aria-hidden="true" />
            Confirmation sent to {form.email || "your inbox"}
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <strong>Visit:</strong> {selectedTreatment?.name}
            </li>
            <li>
              <strong>When:</strong> {form.dateIso} {selectedSlot ? `· ${selectedSlot.time}` : ""}
            </li>
            <li>
              <strong>Guest:</strong> {form.fullName}
            </li>
            <li>
              <strong>Concierge will reach you by:</strong> {form.contactPreference}
            </li>
          </ul>
          <p>
            If you need same-day triage instead, call {clinicInfo.phoneDisplay} or use the
            emergency button.
          </p>
          <Button variant="gold" onClick={resetBooking}>
            Book another visit
          </Button>
        </div>
      </Modal>
    </section>
  );
}
