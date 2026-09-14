import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: "bg-lime-500 text-ink-900 hover:bg-lime-600 shadow-lime border border-lime-600/30",
  secondary: "bg-transparent text-white border border-lime-500/80 hover:bg-white/10",
  ghost: "bg-transparent text-ink-900 border border-black/15 hover:border-lime-800 hover:bg-mist",
  outline: "bg-transparent text-ink-900 border border-black/20 hover:border-lime-800",
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-xs tracking-[0.14em]",
  md: "px-5 py-2.5 text-sm tracking-[0.12em]",
  lg: "px-7 py-3.5 text-sm tracking-[0.16em]",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-sans uppercase transition-colors duration-fast ease-out disabled:cursor-not-allowed disabled:opacity-50",
    buttonVariantClasses[variant],
    buttonSizeClasses[size],
    className,
  );
}
