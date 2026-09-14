import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/buttonStyles";

type LinkHref = ComponentProps<typeof Link>["href"];

export interface ButtonLinkProps {
  href: LinkHref;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

function isNativeAnchor(href: LinkHref): href is string {
  return (
    typeof href === "string" &&
    (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("https:"))
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  target,
  rel,
  onClick,
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);

  if (isNativeAnchor(href)) {
    return (
      <a href={href} className={classes} target={target} rel={rel} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} target={target} rel={rel} onClick={onClick}>
      {children}
    </Link>
  );
}
