"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

type ProductCardProps = {
  name: string;
  subtitle: string;
  price: number;
  image: string;
};

export function ProductCard({
  name,
  subtitle,
  price,
  image,
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

      <div className="relative mx-auto h-40 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-slate-900">{name}</h3>

        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>

        <p className="mt-3 text-sm font-bold text-emerald-700">
          {price.toLocaleString("fr-FR")} GNF
        </p>
      </div>
    </article>
  );
}