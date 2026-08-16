import { LucideIcon } from "lucide-react";
import Link from "next/link";

type CategoryCardProps = {
  name: string;
  icon: LucideIcon;
  slug?: string;
};

export function CategoryCard({
  name,
  icon: Icon,
  slug,
}: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug ?? name.toLowerCase()}`} className="group flex min-w-[120px] flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 px-5 py-5 transition hover:border-emerald-200 hover:bg-emerald-50">
      <Icon className="h-8 w-8 text-emerald-700 transition group-hover:scale-110" />

      <span className="mt-3 text-sm font-medium text-slate-700">
        {name}
      </span>
    </Link>
  );
}
