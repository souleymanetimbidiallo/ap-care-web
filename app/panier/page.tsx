import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { removeCartAction, updateCartAction } from "@/app/actions/cart";
import { Header } from "@/components/layout/header";
import { TopBar } from "@/components/layout/top-bar";
import { getCart } from "@/lib/cart/api";

export const metadata: Metadata = { title: "Mon panier" };
export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await getCart();
  return <><TopBar /><Header /><main className="min-h-[70vh] bg-slate-50 px-4 py-10"><div className="mx-auto max-w-6xl">
    <h1 className="text-3xl font-bold text-emerald-950">Mon panier</h1>
    {cart.items.length === 0 ? <section className="mt-8 rounded-3xl bg-white p-12 text-center shadow-sm"><h2 className="text-xl font-semibold">Votre panier est vide</h2><p className="mt-2 text-slate-500">Découvrez nos produits et ajoutez vos soins préférés.</p><Link href="/boutique" className="mt-6 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white">Découvrir la boutique</Link></section> :
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]"><section className="space-y-4">{cart.items.map(item =>
        <article key={item.productSlug} className="grid grid-cols-[88px_1fr] gap-4 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-[100px_1fr_auto]">
          <Link href={`/produits/${item.productSlug}`} className="relative h-24"><Image src={item.imageUrl ?? "/file.svg"} alt={item.name} fill sizes="100px" className="object-contain" /></Link>
          <div><Link href={`/produits/${item.productSlug}`} className="font-semibold text-slate-900 hover:text-emerald-700">{item.name}</Link><p className="text-sm text-slate-500">{item.brand}</p><p className="mt-2 font-bold text-emerald-700">{item.unitPriceGnf.toLocaleString("fr-FR")} GNF</p></div>
          <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-end"><p className="font-bold">{item.lineTotalGnf.toLocaleString("fr-FR")} GNF</p><div className="flex gap-2"><form action={updateCartAction}><input type="hidden" name="productSlug" value={item.productSlug} /><input aria-label={`Quantité de ${item.name}`} name="quantity" type="number" min="1" max={item.stockQuantity} defaultValue={item.quantity} className="h-10 w-16 rounded-lg border text-center" /><button className="ml-2 text-sm font-semibold text-emerald-700">Mettre à jour</button></form><form action={removeCartAction}><input type="hidden" name="productSlug" value={item.productSlug} /><button aria-label={`Retirer ${item.name}`} className="rounded-lg p-2 text-red-600"><Trash2 className="h-5 w-5" /></button></form></div></div>
        </article>)}</section>
        <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-emerald-950">Récapitulatif</h2><div className="mt-6 flex justify-between border-b pb-5"><span>Sous-total ({cart.itemCount})</span><strong>{cart.subtotalGnf.toLocaleString("fr-FR")} GNF</strong></div><p className="mt-4 text-sm text-slate-500">Les frais de livraison seront calculés à l’étape suivante.</p><Link href="/checkout" className="mt-6 flex h-12 items-center justify-center rounded-xl bg-emerald-700 font-semibold text-white">Passer au checkout</Link></aside>
      </div>}
  </div></main></>;
}
