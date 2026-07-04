/** Left-aligned section heading: accent bar (or kicker), display-font title, optional intro. */
export function SectionHeading({
  title,
  description,
  kicker,
  dark = false,
  className = "",
}: {
  title: string;
  description?: string;
  /** Small uppercase label rendered with the accent bar, e.g. "Family-run since 2012". */
  kicker?: string;
  /** Use on dark (ink) section backgrounds. */
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {kicker ? (
        <p className="flex items-center gap-3 mb-5">
          <span className="w-10 h-1 rounded-full bg-brand flex-shrink-0" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {kicker}
          </span>
        </p>
      ) : (
        <span className="block w-10 h-1 rounded-full bg-brand mb-5" aria-hidden="true" />
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed ${
            dark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
