"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

type ProductCardProps = {
  name: string;
  subtitle: string;
  slug: string;
  price: number;
  image: string;
  available?: boolean;
};

export function ProductCard({
  name,
  subtitle,
  slug,
  price,
  image,
  available = true,
}: ProductCardProps) {
  return (
    <article className="group relative min-w-[190px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        aria-label={`Ajouter ${name} aux favoris`}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-slate-600 shadow-sm transition hover:text-emerald-700"
      >
        <Heart className="h-4 w-4" />
      </button>

      <Link href={`/produits/${slug}`} className="relative mx-auto block h-40 w-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="190px"
          className="object-contain transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="mt-4">
        <h3 className="font-semibold text-slate-900">
          <Link href={`/produits/${slug}`} className="hover:text-emerald-700">{name}</Link>
        </h3>

        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>

        <p className="mt-3 text-sm font-bold text-emerald-700">
          {price.toLocaleString("fr-FR")} GNF
        </p>
        <p className={`mt-2 text-xs font-medium ${available ? "text-emerald-700" : "text-rose-600"}`}>
          {available ? "En stock" : "Indisponible"}
        </p>
      </div>
    </article>
  );
}
