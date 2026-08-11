import { ProductCard } from "@/components/product/product-card";

const products = [
  {
    name: "CeraVe",
    subtitle: "Nettoyant visage",
    price: 120000,
    image: "/products/cerave.jpeg",
  },
  {
    name: "Nivea",
    subtitle: "Lait hydratant",
    price: 80000,
    image: "/products/nivea.jpeg",
  },
  {
    name: "Garnier",
    subtitle: "Gel nettoyant",
    price: 75000,
    image: "/products/garnier.jpeg",
  },
  {
    name: "Vaseline",
    subtitle: "Crème cacao",
    price: 60000,
    image: "/products/vaseline.jpeg",
  },
  {
    name: "Eucerin",
    subtitle: "Crème hydratante",
    price: 150000,
    image: "/products/eucerin.jpeg",
  },
  {
    name: "Dove",
    subtitle: "Pain de beauté",
    price: 45000,
    image: "/products/dove.jpeg",
  },
];

export function PopularProductsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Produits populaires
        </h2>

        <button className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800">
          Voir tout
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            name={product.name}
            subtitle={product.subtitle}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}