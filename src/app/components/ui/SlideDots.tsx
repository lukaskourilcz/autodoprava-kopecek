// The row of clickable indicators under an image slideshow. Each control is a
// 44px touch target (the visible mark is smaller) and exposes the standard
// tablist a11y roles so it works the same for the hero and the vehicle
// carousels. Marks are sharp-cornered bars/squares in keeping with the
// zero-radius design language.

type Variant = "bar" | "dot";

export function SlideDots({
  count,
  current,
  onSelect,
  label,
  slideLabel,
  variant = "dot",
  className = "",
}: {
  count: number;
  current: number;
  onSelect: (index: number) => void;
  /** Accessible name for the whole group, e.g. "Hero slides". */
  label: string;
  /** Builds each dot's label, e.g. (i, total) => `Slide ${i} of ${total}`. */
  slideLabel: (humanIndex: number, total: number) => string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center ${className}`}
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
            className="min-w-[44px] min-h-[44px] flex items-center justify-center focus-ring"
          >
            <span className={dotClasses(variant, isActive)} />
          </button>
        );
      })}
    </div>
  );
}

function dotClasses(variant: Variant, isActive: boolean): string {
  if (variant === "bar") {
    return `block h-[3px] transition-all duration-300 ${
      isActive ? "w-8 bg-cloud" : "w-4 bg-cloud/40 hover:bg-cloud/70"
    }`;
  }
  return `block w-2 h-2 transition-colors ${
    isActive ? "bg-onyx" : "bg-onyx/20 hover:bg-onyx/40"
  }`;
}
