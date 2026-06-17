"use client";

import type { ReactNode } from "react";
import { SUPPORTED_LOCALES, LOCALE_DETAILS, type SupportedLocale } from "@/lib/locale";

type Tone = "default" | "primary" | "danger" | "ghost";

const toneClasses: Record<Tone, string> = {
  default: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  primary: "bg-yellow-500 text-gray-900 hover:bg-yellow-400",
  danger: "bg-red-100 text-red-700 hover:bg-red-200",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
};

/** Compact button used throughout the editor (toolbar, add/remove, reorder). */
export function ToolButton({
  children,
  onClick,
  tone = "default",
  disabled = false,
  type = "button",
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: Tone;
  disabled?: boolean;
  type?: "button" | "submit";
  title?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-ring ${toneClasses[tone]}`}
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
        <span className="block text-sm font-medium text-gray-700">{label}</span>
      )}
      <div className="grid gap-2 sm:grid-cols-3">
        {SUPPORTED_LOCALES.map((locale) => (
          <label key={locale} className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              {LOCALE_DETAILS[locale].short}
            </span>
            {multiline ? (
              <textarea
                value={getValue(locale)}
                onChange={(event) => onChange(locale, event.target.value)}
                rows={4}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900 focus-ring"
              />
            ) : (
              <input
                type="text"
                value={getValue(locale)}
                onChange={(event) => onChange(locale, event.target.value)}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900 focus-ring"
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
