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
  const labelClass = tone === "dark" ? "text-lime-500" : "text-black/60";
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
          "rounded-xl border bg-white px-4 py-3 text-base text-ink-900 shadow-sm transition-colors placeholder:text-black/40",
          error ? "border-red-500" : "border-black/15 focus:border-lime-800",
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
  const labelClass = tone === "dark" ? "text-lime-500" : "text-black/60";
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
          "min-h-[110px] rounded-xl border bg-white px-4 py-3 text-base text-ink-900 shadow-sm transition-colors placeholder:text-black/40",
          error ? "border-red-500" : "border-black/15 focus:border-lime-800",
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
