import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

import { ProductCard } from "@/components/product/product-card";
import type { Category, PageResponse, ProductFilters, ProductSummary } from "@/lib/api/types";

type CatalogShellProps = {
  title: string;
  description?: string | null;
  categories: Category[];
  products: PageResponse<ProductSummary>;
  filters: ProductFilters;
  basePath: string;
};

function pageHref(basePath: string, filters: ProductFilters, page: number) {
  const query = new URLSearchParams();
  Object.entries({ ...filters, page: String(page) }).forEach(([key, value]) => {
    if (value) query.set(key, value);
  });
  return `${basePath}?${query.toString()}`;
}

export function CatalogShell({ title, description, categories, products, filters, basePath }: CatalogShellProps) {
  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <nav className="mb-5 text-sm text-slate-500" aria-label="Fil d’Ariane">
          <Link href="/" className="hover:text-emerald-700">Accueil</Link> <span aria-hidden> / </span> {title}
        </nav>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold text-emerald-950 sm:text-4xl">{title}</h1>
            {description && <p className="mt-3 max-w-2xl text-slate-600">{description}</p>}
          </div>
          <p className="text-sm font-medium text-slate-600">{products.totalElements} produit{products.totalElements > 1 ? "s" : ""}</p>
        </div>

        <form action={basePath} className="mb-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
          <label className="sr-only" htmlFor="catalog-q">Rechercher</label>
          <input id="catalog-q" name="q" defaultValue={filters.q} placeholder="Produit, marque..." className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-emerald-600" />
          <select name="category" defaultValue={filters.category ?? ""} aria-label="Catégorie" className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm">
            <option value="">Toutes catégories</option>
            {categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}
          </select>
          <select name="available" defaultValue={filters.available ?? ""} aria-label="Disponibilité" className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm">
            <option value="">Toute disponibilité</option>
            <option value="true">En stock</option>
            <option value="false">Indisponible</option>
          </select>
          <select name="sort" defaultValue={filters.sort ?? "createdAt"} aria-label="Trier" className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm">
            <option value="createdAt">Nouveautés</option>
            <option value="priceGnf">Prix croissant</option>
            <option value="name">Nom</option>
          </select>
          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 text-sm font-medium text-white hover:bg-emerald-800">
            <SlidersHorizontal className="h-4 w-4" /> Appliquer
          </button>
        </form>

        {products.content.length ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.content.map((product) => (
              <ProductCard key={product.id} name={product.name} slug={product.slug}
                subtitle={product.brand ?? product.category.name} price={product.priceGnf}
                image={product.primaryImage?.url ?? "/file.svg"} available={product.available} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-slate-900">Aucun produit trouvé</h2>
            <p className="mt-2 text-sm text-slate-500">Essayez une autre recherche ou réinitialisez les filtres.</p>
            <Link href={basePath} className="mt-5 inline-flex rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white">Réinitialiser</Link>
          </div>
        )}

        {products.totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-3">
            {!products.first && <Link className="rounded-lg border bg-white px-4 py-2 text-sm" href={pageHref(basePath, filters, products.page - 1)}>Précédent</Link>}
            <span className="text-sm text-slate-600">Page {products.page + 1} sur {products.totalPages}</span>
            {!products.last && <Link className="rounded-lg border bg-white px-4 py-2 text-sm" href={pageHref(basePath, filters, products.page + 1)}>Suivant</Link>}
          </nav>
        )}
      </div>
    </main>
  );
}
