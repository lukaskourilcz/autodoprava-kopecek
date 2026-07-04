import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand text-ink hover:bg-brand-light",
  secondary: "bg-ink text-white hover:bg-ink-soft",
  /** For dark backgrounds (hero, contact). */
  outline: "border border-white/40 text-white hover:border-white hover:bg-white/10",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-md transition-colors duration-150 min-h-[44px] focus-ring";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Internal paths ("/cs#contact") render a Next.js Link; tel/mailto/http render a plain anchor. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

/** The site's call-to-action button. Renders a button, internal link, or external link from one place. */
export function Button({
  children,
  variant = "primary",
  className,
  href,
  onClick,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]}${className ? ` ${className}` : ""}`;

  if (href) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      return (
        <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  );
}
