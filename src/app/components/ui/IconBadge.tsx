import type { ReactNode } from "react";

/**
 * The small rounded, tinted square that sits behind a contact/service icon.
 * Defaults to the yellow badge used throughout; pass `className` to resize or
 * recolour it (e.g. a larger circle on the services grid).
 */
export function IconBadge({
  children,
  className = "w-10 h-10 rounded-lg bg-yellow-50 ring-1 ring-yellow-200 text-yellow-600",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`flex-shrink-0 flex items-center justify-center ${className}`}>
      {children}
    </span>
  );
}
