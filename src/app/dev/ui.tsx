"use client";

import type { ReactNode } from "react";
import { SUPPORTED_LOCALES, LOCALE_DETAILS, type SupportedLocale } from "@/lib/locale";

type Tone = "default" | "primary" | "danger" | "ghost";

const toneClasses: Record<Tone, string> = {
  default:
    "bg-white text-gray-700 ring-1 ring-gray-200 shadow-sm hover:bg-gray-50 hover:ring-gray-300",
  primary: "bg-yellow-500 text-gray-900 shadow-sm hover:bg-yellow-400",
  danger: "bg-white text-red-600 ring-1 ring-red-200 hover:bg-red-50",
  ghost: "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700",
};

/** Shared input/textarea styling so every field in the editor looks identical. */
export const fieldClasses =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-yellow-400 focus-ring";

/** Compact button used throughout the editor (toolbar, add/remove, reorder). */
export function ToolButton({
  children,
  onClick,
  tone = "default",
  disabled = false,
  type = "button",
  title,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: Tone;
  disabled?: boolean;
  type?: "button" | "submit";
  title?: string;
  "aria-label"?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 focus-ring ${toneClasses[tone]}`}
    >
      {children}
    </button>
  );
}

/**
 * One labelled value edited in all three languages side by side. Reused for
 * every text on the site and for each vehicle's name and description.
 */
export function LocaleFields({
  label,
  getValue,
  onChange,
  multiline = false,
}: {
  label?: string;
  getValue: (locale: SupportedLocale) => string;
  onChange: (locale: SupportedLocale, value: string) => void;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <span className="block text-sm font-semibold text-gray-700">{label}</span>
      )}
      <div className="grid gap-2 sm:grid-cols-3">
        {SUPPORTED_LOCALES.map((locale) => (
          <label key={locale} className="block">
            <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {LOCALE_DETAILS[locale].short}
            </span>
            {multiline ? (
              <textarea
                value={getValue(locale)}
                onChange={(event) => onChange(locale, event.target.value)}
                rows={4}
                className={`${fieldClasses} resize-y leading-relaxed`}
              />
            ) : (
              <input
                type="text"
                value={getValue(locale)}
                onChange={(event) => onChange(locale, event.target.value)}
                className={fieldClasses}
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
