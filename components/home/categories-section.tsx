import {
  Baby,
  Flower2,
  HeartPulse,
  Scissors,
  ShowerHead,
  Sparkles,
  UserRound,
  Venus,
} from "lucide-react";

import { CategoryCard } from "@/components/category/category-card";
import type { Category } from "@/lib/api/types";

const icons = [UserRound, Scissors, Venus, ShowerHead, HeartPulse, Sparkles, Baby, Flower2];

export function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Nos catégories
        </h2>

        <a href="/boutique" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
          Voir toutes
        </a>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            slug={category.slug}
            icon={icons[index % icons.length]}
          />
        ))}
      </div>
    </section>
  );
}
