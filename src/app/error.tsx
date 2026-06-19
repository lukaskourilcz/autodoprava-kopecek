"use client";

import { Button } from "./components/ui/Button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-[70vh] flex-col items-start justify-center bg-cloud px-[40px] max-[640px]:px-5">
      <h1 className="text-heading text-onyx">Něco se pokazilo</h1>
      <p className="mt-6 max-w-prose text-[18px] leading-[1.3] tracking-body text-onyx/70">
        Zkuste prosím akci opakovat. Pokud problém přetrvává, kontaktujte nás
        telefonicky.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button onClick={reset}>Zkusit znovu</Button>
        <Button href="/">Domů</Button>
      </div>
    </main>
  );
}
