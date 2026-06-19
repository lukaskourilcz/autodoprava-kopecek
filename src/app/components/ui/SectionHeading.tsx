/**
 * The title (+ optional intro) shown at the top of every cloud-canvas section.
 * Left-edge anchored, monumental 46px display type, no decorative accent — the
 * type does all the work.
 */
export function SectionHeading({
  title,
  description,
  className = "mb-12",
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-prose ${className}`}>
      <h2 className="text-heading text-onyx">{title}</h2>
      {description && (
        <p className="mt-6 text-[18px] leading-[1.3] tracking-body text-onyx/70">
          {description}
        </p>
      )}
    </div>
  );
}
