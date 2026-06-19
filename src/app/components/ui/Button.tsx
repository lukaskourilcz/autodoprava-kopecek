import Link from "next/link";
import type { ReactNode } from "react";

// Every interactive accent in this system is an outlined "ghost" action — a
// 1.5px border, no fill, sharp corners. Jetstream-blue is the accent colour but
// it only survives on light surfaces, so the `light` variant switches to a
// cloud-white outline for use over atmospheric/photographic backgrounds.
type Variant = "primary" | "light";

const variantClasses: Record<Variant, string> = {
  primary: "border-jetstream text-onyx hover:text-jetstream",
  light: "border-cloud text-cloud hover:bg-cloud/10",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border-[1.5px] border-solid bg-transparent px-6 py-3 text-[18px] font-normal tracking-body leading-none rounded-none transition-colors min-h-[48px] focus-ring";

type ButtonProps = {
  children: ReactNode;
  /** "primary" for cloud/white surfaces, "light" for atmospheric/dark ones. */
  variant?: Variant;
  className?: string;
  /** Internal paths ("/cs#contact") render a Next.js Link; tel/mailto/http render a plain anchor. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

/** The site's outlined call-to-action. Renders a button, internal link, or external link from one place. */
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
