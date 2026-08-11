"use client";

import { Search } from "lucide-react";

export function ProductSearch() {
  return (
    <div className="relative z-20 mx-auto -mt-8 max-w-5xl px-4 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4">
            <Search className="h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Rechercher un produit, une marque..."
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <select className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none md:w-56">
            <option>Toutes catégories</option>
            <option>Visage</option>
            <option>Cheveux</option>
            <option>Corps</option>
            <option>Hygiène</option>
            <option>Bien-être</option>
            <option>Maquillage</option>
            <option>Bébé & Maman</option>
            <option>Hommes</option>
          </select>

          <button
            type="button"
            className="h-12 rounded-xl bg-emerald-700 px-7 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
}