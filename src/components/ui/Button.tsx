"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-lime-500 text-ink-900 hover:bg-lime-600 border border-lime-600/30",
  secondary: "bg-transparent text-white border border-lime-500/80 hover:bg-white/10",
  ghost: "bg-transparent text-ink-900 border border-black/15 hover:border-lime-800 hover:bg-mist",
  outline: "bg-transparent text-ink-900 border border-black/20 hover:border-lime-800",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-3.5 py-2 text-xs tracking-[0.12em]",
  md: "min-h-11 px-5 py-2.5 text-sm tracking-[0.12em]",
  lg: "min-h-11 px-7 py-3.5 text-sm tracking-[0.12em]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, children, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-sans uppercase motion-safe:transition-[color,background-color,border-color,transform,box-shadow] motion-safe:duration-180 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-reduce:transition-colors disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
