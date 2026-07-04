// The row of clickable dots over an image slideshow. Each dot has a padded
// touch target (the visible dot is smaller) and exposes the standard tablist
// a11y roles. Styled for photo backgrounds: white inactive dots, yellow active bar.

export function SlideDots({
  count,
  current,
  onSelect,
  label,
  slideLabel,
  className = "",
}: {
  count: number;
  current: number;
  onSelect: (index: number) => void;
  /** Accessible name for the whole group, e.g. the vehicle name. */
  label: string;
  /** Builds each dot's label, e.g. (i, total) => `Slide ${i} of ${total}`. */
  slideLabel: (humanIndex: number, total: number) => string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap justify-center ${className}`}
      role="tablist"
      aria-label={label}
    >
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === current;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={slideLabel(index + 1, count)}
            onClick={() => onSelect(index)}
            className="min-w-[14px] min-h-[24px] flex items-center justify-center focus-ring"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "w-3.5 h-1.5 bg-brand"
                  : "w-1.5 h-1.5 bg-white/70 hover:bg-white shadow-sm"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
