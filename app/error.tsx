"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="grid min-h-[70vh] place-items-center bg-slate-50 px-4 text-center">
      <div>
        <h1 className="text-2xl font-bold text-emerald-950">Impossible de charger cette page</h1>
        <p className="mt-3 text-slate-600">Vérifiez votre connexion, puis réessayez.</p>
        <button onClick={reset} className="mt-6 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-medium text-white">Réessayer</button>
      </div>
    </main>
  );
}
