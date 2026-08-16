import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogShell } from "@/components/catalog/catalog-shell";
import { Header } from "@/components/layout/header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { TopBar } from "@/components/layout/top-bar";
import { ApiNotFoundError, getCategories, getCategory, getProducts } from "@/lib/api/catalog";
import type { ProductFilters } from "@/lib/api/types";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<ProductFilters> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try { const category = await getCategory(slug); return { title: category.name, description: category.description }; }
  catch (error) { if (error instanceof ApiNotFoundError) return { title: "Catégorie introuvable" }; throw error; }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const [{ slug }, incoming] = await Promise.all([params, searchParams]);
  const filters = { ...incoming, category: slug };
  let data;
  try {
    data = await Promise.all([getCategory(slug), getCategories(), getProducts(filters)]);
  } catch (error) { if (error instanceof ApiNotFoundError) notFound(); throw error; }
  const [category, categories, products] = data;
  return <><TopBar /><Header /><CatalogShell title={category.name} description={category.description} categories={categories} products={products} filters={filters} basePath={`/categories/${slug}`} /><MobileBottomNav /></>;
}
