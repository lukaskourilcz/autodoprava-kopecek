import { Button } from "./components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-start justify-center bg-cloud px-[40px] max-[640px]:px-5">
      <p className="mb-4 text-[18px] font-semibold uppercase tracking-[0.04em] text-jetstream">
        404
      </p>
      <h1 className="text-heading text-onyx">Stránka nenalezena</h1>
      <p className="mt-6 max-w-prose text-[18px] leading-[1.3] tracking-body text-onyx/70">
        Stránka, kterou hledáte, neexistuje nebo byla přesunuta.
      </p>
      <div className="mt-10">
        <Button href="/">Zpět na úvod</Button>
      </div>
    </main>
  );
}
