"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "gold" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-900 text-ivory-100 hover:bg-navy-800 shadow-glass border border-navy-900",
  secondary:
    "bg-transparent text-ivory-100 border border-gold-400/80 hover:bg-white/10",
  ghost:
    "bg-transparent text-navy-900 border border-navy-900/15 hover:border-gold-500 hover:text-navy-800",
  gold: "bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-gold border border-gold-600/30",
  outline:
    "bg-transparent text-navy-900 border border-navy-900/20 hover:border-teal-500 hover:text-teal-600",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-xs tracking-[0.14em]",
  md: "px-5 py-2.5 text-sm tracking-[0.12em]",
  lg: "px-7 py-3.5 text-sm tracking-[0.16em]",
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
        "inline-flex items-center justify-center gap-2 rounded-full font-sans uppercase transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
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
