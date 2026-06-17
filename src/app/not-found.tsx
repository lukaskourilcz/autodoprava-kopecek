import { Button } from "./components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <p className="text-yellow-500 text-sm font-bold tracking-widest uppercase mb-2">
        404
      </p>
      <h1 className="text-3xl font-bold text-gray-800 mb-3">Stránka nenalezena</h1>
      <p className="text-gray-700 mb-6 max-w-md">
        Stránka, kterou hledáte, neexistuje nebo byla přesunuta.
      </p>
      <Button href="/">Zpět na úvod</Button>
    </main>
  );
}
