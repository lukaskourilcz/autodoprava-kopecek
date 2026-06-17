"use client";

import { Button } from "./components/ui/Button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">Něco se pokazilo</h1>
      <p className="text-gray-700 mb-6">
        Zkuste prosím akci opakovat. Pokud problém přetrvává, kontaktujte nás
        telefonicky.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Zkusit znovu</Button>
        <Button href="/" variant="secondary">
          Domů
        </Button>
      </div>
    </main>
  );
}
