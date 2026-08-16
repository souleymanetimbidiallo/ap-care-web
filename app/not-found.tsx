import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-slate-50 px-4 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Erreur 404</p>
        <h1 className="mt-3 text-3xl font-bold text-emerald-950">Cette page est introuvable</h1>
        <p className="mt-3 text-slate-600">Le produit ou la catégorie demandé n’existe plus.</p>
        <Link href="/boutique" className="mt-6 inline-flex rounded-lg bg-emerald-700 px-5 py-3 text-sm font-medium text-white">Retour à la boutique</Link>
      </div>
    </main>
  );
}
