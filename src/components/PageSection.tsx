import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageSection({
  id,
  labelledBy,
  band = "a",
  hash = "default",
  className,
  innerClassName,
  children,
}: {
  id: string;
  labelledBy: string;
  band?: "a" | "b";
  hash?: "default" | "subnav";
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "section-band",
        band === "a" ? "bg-white" : "bg-mist",
        hash === "subnav" ? "hash-target-subnav" : "hash-target",
        className,
      )}
    >
      <div className={cn("mx-auto max-w-6xl px-4 sm:px-6", innerClassName)}>{children}</div>
    </section>
  );
}
