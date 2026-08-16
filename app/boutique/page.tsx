import type { Metadata } from "next";
import { CatalogShell } from "@/components/catalog/catalog-shell";
import { Header } from "@/components/layout/header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { TopBar } from "@/components/layout/top-bar";
import { getCategories, getProducts } from "@/lib/api/catalog";
import type { ProductFilters } from "@/lib/api/types";

export const metadata: Metadata = { title: "Boutique" };
export const dynamic = "force-dynamic";

export default async function BoutiquePage({ searchParams }: { searchParams: Promise<ProductFilters> }) {
  const filters = await searchParams;
  const [categories, products] = await Promise.all([getCategories(), getProducts(filters)]);
  return <><TopBar /><Header /><CatalogShell title="Boutique" description="Découvrez notre sélection de soins authentiques." categories={categories} products={products} filters={filters} basePath="/boutique" /><MobileBottomNav /></>;
}
