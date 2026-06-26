/** The yellow accent bar + title (+ optional intro) shown at the top of every section. */
export function SectionHeading({
  title,
  description,
  className = "mb-10",
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <span className="section-accent mx-auto" aria-hidden="true" />
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-gray-600 max-w-prose mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
