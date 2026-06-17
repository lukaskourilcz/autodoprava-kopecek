import { Reveal } from "./Reveal";

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
    <Reveal className={`text-center ${className}`}>
      <span className="section-accent mx-auto" aria-hidden="true" />
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-prose text-base text-gray-600 md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
