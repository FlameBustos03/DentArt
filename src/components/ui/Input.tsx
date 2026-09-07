"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  tone?: "light" | "dark";
}

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  tone?: "light" | "dark";
}

export function TextField({ id, label, error, className, tone = "light", ...props }: TextFieldProps) {
  const errorId = `${id}-error`;
  const labelClass = tone === "dark" ? "text-gold-300" : "text-stone-600";
  const errorClass = tone === "dark" ? "text-red-300" : "text-red-700";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={`text-xs uppercase tracking-[0.16em] ${labelClass}`}>
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "rounded-xl border bg-ivory-50 px-4 py-3 text-navy-900 shadow-sm transition-colors placeholder:text-stone-400",
          error ? "border-red-500" : "border-ivory-300 focus:border-gold-500",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className={`text-sm ${errorClass}`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  className,
  tone = "light",
  ...props
}: TextAreaFieldProps) {
  const errorId = `${id}-error`;
  const labelClass = tone === "dark" ? "text-gold-300" : "text-stone-600";
  const errorClass = tone === "dark" ? "text-red-300" : "text-red-700";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={`text-xs uppercase tracking-[0.16em] ${labelClass}`}>
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "min-h-[110px] rounded-xl border bg-ivory-50 px-4 py-3 text-navy-900 shadow-sm transition-colors placeholder:text-stone-400",
          error ? "border-red-500" : "border-ivory-300 focus:border-gold-500",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className={`text-sm ${errorClass}`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
