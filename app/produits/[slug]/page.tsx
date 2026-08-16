import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingCart, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { TopBar } from "@/components/layout/top-bar";
import { ApiNotFoundError, getProduct } from "@/lib/api/catalog";
import type { ProductDetail } from "@/lib/api/types";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try { const product = await getProduct(slug); return { title: product.name, description: product.description }; }
  catch (error) { if (error instanceof ApiNotFoundError) return { title: "Produit introuvable" }; throw error; }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  let product: ProductDetail;
  try { product = await getProduct(slug); } catch (error) { if (error instanceof ApiNotFoundError) notFound(); throw error; }
  const image = product.images[0];
  return <><TopBar /><Header /><main className="min-h-screen bg-slate-50 pb-24"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
    <nav className="mb-6 text-sm text-slate-500"><Link href="/">Accueil</Link> / <Link href="/boutique">Boutique</Link> / {product.name}</nav>
    <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-2 lg:p-10">
      <div className="relative min-h-[380px] overflow-hidden rounded-2xl bg-slate-50 lg:min-h-[560px]">
        <Image src={image?.url ?? "/file.svg"} alt={image?.altText ?? product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-8" priority />
      </div>
      <div className="flex flex-col justify-center">
        <Link href={`/categories/${product.category.slug}`} className="text-sm font-semibold uppercase tracking-wider text-emerald-700">{product.category.name}</Link>
        <p className="mt-3 text-sm text-slate-500">{product.brand}</p>
        <h1 className="mt-2 text-3xl font-bold text-emerald-950 sm:text-4xl">{product.name}</h1>
        <p className="mt-5 text-2xl font-bold text-emerald-700">{product.priceGnf.toLocaleString("fr-FR")} GNF</p>
        <p className={`mt-3 text-sm font-semibold ${product.available ? "text-emerald-700" : "text-rose-600"}`}>{product.available ? `${product.stockQuantity} en stock` : "Produit indisponible"}</p>
        <p className="mt-6 leading-7 text-slate-600">{product.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <div className="inline-flex h-12 items-center rounded-lg border border-slate-200"><button aria-label="Réduire la quantité" className="p-3"><Minus className="h-4 w-4" /></button><span className="px-3">1</span><button aria-label="Augmenter la quantité" className="p-3"><Plus className="h-4 w-4" /></button></div>
          <button disabled={!product.available} className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"><ShoppingCart className="h-5 w-5" />Ajouter au panier</button>
          <button aria-label="Ajouter aux favoris" className="h-12 rounded-lg border border-slate-200 p-3 text-slate-600"><Heart className="h-5 w-5" /></button>
        </div>
        <div className="mt-8 flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900"><ShieldCheck className="h-5 w-5" />Produit sélectionné et authentique</div>
      </div>
    </div>
  </div></main><MobileBottomNav /></>;
}
