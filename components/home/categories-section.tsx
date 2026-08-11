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

const categories = [
  { name: "Visage", icon: UserRound },
  { name: "Cheveux", icon: Scissors },
  { name: "Corps", icon: Venus },
  { name: "Hygiène", icon: ShowerHead },
  { name: "Bien-être", icon: HeartPulse },
  { name: "Maquillage", icon: Sparkles },
  { name: "Bébé & Maman", icon: Baby },
  { name: "Hommes", icon: Flower2 },
];

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Nos catégories
        </h2>

        <button className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
          Voir toutes
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            name={category.name}
            icon={category.icon}
          />
        ))}
      </div>
    </section>
  );
}