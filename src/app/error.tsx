"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">Něco se pokazilo</h1>
      <p className="text-gray-700 mb-6">
        Zkuste prosím akci opakovat. Pokud problém přetrvává, kontaktujte nás
        telefonicky.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="bg-yellow-500 text-gray-900 font-semibold px-5 py-3 rounded-md hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
        >
          Zkusit znovu
        </button>
        <Link
          href="/"
          className="bg-gray-800 text-white font-semibold px-5 py-3 rounded-md hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
        >
          Domů
        </Link>
      </div>
    </main>
  );
}
