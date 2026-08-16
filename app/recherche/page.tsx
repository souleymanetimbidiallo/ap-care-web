import type { Metadata } from "next";
import { CatalogShell } from "@/components/catalog/catalog-shell";
import { Header } from "@/components/layout/header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { TopBar } from "@/components/layout/top-bar";
import { getCategories, getProducts } from "@/lib/api/catalog";
import type { ProductFilters } from "@/lib/api/types";

export const metadata: Metadata = { title: "Recherche" };
export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: Promise<ProductFilters> }) {
  const filters = await searchParams;
  const [categories, products] = await Promise.all([getCategories(), getProducts(filters)]);
  const title = filters.q ? `Résultats pour « ${filters.q} »` : "Recherche";
  return <><TopBar /><Header /><CatalogShell title={title} categories={categories} products={products} filters={filters} basePath="/recherche" /><MobileBottomNav /></>;
}
