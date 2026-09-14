import { Check } from "lucide-react";
import type { ServiceGroup as ServiceGroupData } from "@/types";
import { cn } from "@/lib/utils";

export function ServiceGroup({
  group,
  variant = "compact",
}: {
  group: ServiceGroupData;
  variant?: "compact" | "expanded";
}) {
  if (variant === "compact") {
    return (
      <article className="h-full rounded-card border border-[color:var(--border-subtle)] bg-white p-6 shadow-card">
        <h3 className="font-serif text-2xl text-ink-900">{group.name}</h3>
        <ul className="mt-5 space-y-2">
          {group.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-ink-800">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-800" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        {group.note ? (
          <p className="mt-5 text-sm text-[color:var(--text-muted)]">{group.note}</p>
        ) : null}
      </article>
    );
  }

  return (
    <div>
      <h2 id={`${group.id}-heading`} className="font-serif text-3xl text-ink-900 sm:text-5xl">
        {group.name}
      </h2>
      <ul className="mt-8 grid gap-5">
        {group.treatments?.map((treatment) => (
          <li
            key={treatment.name}
            className="rounded-card border border-[color:var(--border-subtle)] bg-white p-6 shadow-card"
          >
            <h3 className="font-serif text-2xl text-ink-900">{treatment.name}</h3>
            <p className="mt-2 text-sm font-medium text-ink-900">{treatment.benefit}</p>
            <p className="mt-3 text-[color:var(--text-body)]">{treatment.body}</p>
          </li>
        ))}
      </ul>
      {group.disclaimer ? (
        <aside
          className={cn(
            "mt-6 rounded-card border border-[color:var(--border-subtle)] bg-white p-6 shadow-card",
          )}
        >
          <p className="text-sm text-ink-900">{group.disclaimer}</p>
        </aside>
      ) : null}
    </div>
  );
}
