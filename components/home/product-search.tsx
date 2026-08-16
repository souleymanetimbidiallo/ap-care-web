"use client";

import { Search } from "lucide-react";

export function ProductSearch() {
  return (
    <form action="/recherche" className="relative z-20 mx-auto -mt-8 max-w-5xl px-4 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4">
            <Search className="h-5 w-5 text-slate-400" />

            <input
              name="q"
              type="text"
              placeholder="Rechercher un produit, une marque..."
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <select name="category" aria-label="Catégorie" className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none md:w-56">
            <option value="">Toutes catégories</option>
            <option value="visage">Visage</option>
            <option value="cheveux">Cheveux</option>
            <option value="corps">Corps</option>
            <option value="hygiene">Hygiène</option>
            <option value="bien-etre">Bien-être</option>
            <option value="maquillage">Maquillage</option>
            <option value="bebe-maman">Bébé & Maman</option>
            <option value="hommes">Hommes</option>
          </select>

          <button
            type="submit"
            className="h-12 rounded-xl bg-emerald-700 px-7 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            Rechercher
          </button>
        </div>
      </div>
    </form>
  );
}
