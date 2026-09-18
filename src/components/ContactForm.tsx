"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { contactoCopy } from "@/data/phase3";
import { clinicInfo } from "@/data/mockData";
import { buildWhatsAppUrl, cn, isValidEmail, isValidPhone } from "@/lib/utils";
import type { ContactFieldErrors, ContactFormData, ContactSedePreference } from "@/types";

const INITIAL: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  sede: "",
  motivo: "",
  seguro: "",
  mensaje: "",
};

function sedeLabel(value: ContactSedePreference | ""): string {
  return contactoCopy.sedeOptions.find((option) => option.value === value)?.label ?? "";
}

function buildInquiry(form: ContactFormData): string {
  return [
    "Hola Dent Art, quiero información desde el formulario de contacto.",
    `Nombre: ${form.name.trim()}`,
    `Teléfono: ${form.phone.trim()}`,
    form.email.trim() ? `Correo: ${form.email.trim()}` : null,
    `Sede: ${sedeLabel(form.sede)}`,
    form.motivo.trim() ? `Motivo: ${form.motivo.trim()}` : null,
    form.seguro.trim() ? `Seguro o plan: ${form.seguro.trim()}` : null,
    form.mensaje.trim() ? `Mensaje: ${form.mensaje.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [whatsAppHref, setWhatsAppHref] = useState(
    buildWhatsAppUrl(clinicInfo.whatsappNumber, "Hola Dent Art, quiero información."),
  );
  const formId = useId();

  const validate = (): ContactFieldErrors => {
    const next: ContactFieldErrors = {};
    if (form.name.trim().length < 2) {
      next.name = "Escribe tu nombre.";
    }
    if (!isValidPhone(form.phone) || form.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Escribe un teléfono de 10 dígitos.";
    }
    if (form.email.trim() && !isValidEmail(form.email)) {
      next.email = "Escribe un correo válido.";
    }
    if (!form.sede) {
      next.sede = "Elige una sede de preferencia.";
    }
    if (!form.motivo.trim()) {
      next.motivo = "Cuéntanos el motivo de consulta.";
    }
    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendError(false);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setPending(true);
    const href = buildWhatsAppUrl(clinicInfo.whatsappNumber, buildInquiry(form));
    setWhatsAppHref(href);

    window.setTimeout(() => {
      const popup = window.open(href, "_blank", "noopener,noreferrer");
      setPending(false);
      if (popup) {
        setSuccess(true);
      } else {
        setSuccess(true);
        setSendError(false);
      }
    }, 180);
  };

  if (success) {
    return (
      <div
        className="rounded-card border border-[color:var(--border-subtle)] p-6"
        style={{ background: "var(--success-soft)" }}
        role="status"
      >
        <p className="flex items-start gap-2 font-serif text-2xl text-ink-900">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-lime-800" aria-hidden="true" />
          {contactoCopy.successTitle}
        </p>
        <p className="mt-3 text-sm text-[color:var(--text-body)]">{contactoCopy.successBody}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsAppHref} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
            {contactoCopy.successWhatsApp}
          </ButtonLink>
          <ButtonLink
            href={`tel:${clinicInfo.phoneTel}`}
            variant="ghost"
            className="w-full sm:w-auto"
          >
            {contactoCopy.successCall}
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form className="max-w-[640px]" onSubmit={onSubmit} noValidate aria-busy={pending}>
      <h2 id="escribimos-heading" className="font-serif text-3xl text-ink-900 sm:text-5xl">
        {contactoCopy.formTitle}
      </h2>
      <p className="mt-4 max-w-2xl text-[color:var(--text-body)]">{contactoCopy.formIntro}</p>

      <div className="mt-8 grid gap-5">
        <Field
          id={`${formId}-name`}
          label={contactoCopy.fields.name.label}
          placeholder={contactoCopy.fields.name.placeholder}
          autoComplete="name"
          value={form.name}
          error={errors.name}
          onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
        />
        <Field
          id={`${formId}-phone`}
          label={contactoCopy.fields.phone.label}
          placeholder={contactoCopy.fields.phone.placeholder}
          hint={contactoCopy.fields.phone.hint}
          type="tel"
          autoComplete="tel"
          inputMode="numeric"
          value={form.phone}
          error={errors.phone}
          onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
        />
        <Field
          id={`${formId}-email`}
          label={contactoCopy.fields.email.label}
          placeholder={contactoCopy.fields.email.placeholder}
          hint={contactoCopy.fields.email.hint}
          type="email"
          autoComplete="email"
          value={form.email}
          error={errors.email}
          onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
        />

        <fieldset>
          <legend className="text-sm font-medium text-ink-900">{contactoCopy.fields.sede.label}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {contactoCopy.sedeOptions.map((option) => {
              const selected = form.sede === option.value;
              return (
                <label
                  key={option.value}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-control px-1"
                >
                  <input
                    type="radio"
                    name={`${formId}-sede`}
                    className="sr-only"
                    checked={selected}
                    onChange={() => {
                      setForm((prev) => ({ ...prev, sede: option.value }));
                      setErrors((prev) => ({ ...prev, sede: undefined }));
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                      selected ? "border-lime-800" : "border-[color:var(--border-field)]",
                    )}
                  >
                    {selected ? <span className="h-2.5 w-2.5 rounded-full bg-lime-800" /> : null}
                  </span>
                  <span className="text-base text-ink-900">{option.label}</span>
                </label>
              );
            })}
          </div>
          {errors.sede ? (
            <p role="alert" className="mt-2 text-sm" style={{ color: "var(--danger)" }}>
              {errors.sede}
            </p>
          ) : null}
        </fieldset>

        <Field
          id={`${formId}-motivo`}
          label={contactoCopy.fields.motivo.label}
          placeholder={contactoCopy.fields.motivo.placeholder}
          value={form.motivo}
          error={errors.motivo}
          onChange={(value) => setForm((prev) => ({ ...prev, motivo: value }))}
        />
        <Field
          id={`${formId}-seguro`}
          label={contactoCopy.fields.seguro.label}
          placeholder={contactoCopy.fields.seguro.placeholder}
          hint={contactoCopy.fields.seguro.hint}
          value={form.seguro}
          onChange={(value) => setForm((prev) => ({ ...prev, seguro: value }))}
        />
        <Field
          id={`${formId}-mensaje`}
          label={contactoCopy.fields.mensaje.label}
          placeholder={contactoCopy.fields.mensaje.placeholder}
          multiline
          value={form.mensaje}
          error={errors.mensaje}
          onChange={(value) => setForm((prev) => ({ ...prev, mensaje: value }))}
        />
      </div>

      {sendError ? (
        <div
          role="alert"
          className="mt-5 rounded-card p-4"
          style={{ background: "var(--danger-soft)", color: "var(--danger)" }}
        >
          <p className="font-medium">{contactoCopy.errorTitle}</p>
          <p className="mt-1 text-sm">{contactoCopy.errorBody}</p>
        </div>
      ) : null}

      <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={pending} aria-busy={pending}>
        {contactoCopy.submit}
      </Button>
      <p className="mt-3 text-[13px] text-[color:var(--text-muted)]">{contactoCopy.privacy}</p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
  error,
  type = "text",
  autoComplete,
  inputMode,
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric";
  multiline?: boolean;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
  const controlClass = cn(
    "w-full rounded-control border bg-white px-4 py-3 text-base text-ink-900 transition-colors duration-fast ease-out",
    "placeholder:text-[color:var(--text-placeholder)]",
    error
      ? "border-[color:var(--danger)]"
      : "border-[color:var(--border-field)] hover:border-[color:var(--border-field-hover)] focus:border-lime-800",
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink-900">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          className={cn(controlClass, "min-h-[110px]")}
          placeholder={placeholder}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={controlClass}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {hint ? (
        <p id={hintId} className="text-[13px] text-[color:var(--text-muted)]">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-sm" style={{ color: "var(--danger)" }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
