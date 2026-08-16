import { ProductCard } from "@/components/product/product-card";
import type { ProductSummary } from "@/lib/api/types";

export function PopularProductsSection({ products }: { products: ProductSummary[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Produits populaires
        </h2>

        <a href="/boutique" className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800">
          Voir tout
        </a>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            slug={product.slug}
            subtitle={product.brand ?? product.category.name}
            price={product.priceGnf}
            image={product.primaryImage?.url ?? "/file.svg"}
            available={product.available}
          />
        ))}
      </div>
    </section>
  );
}
