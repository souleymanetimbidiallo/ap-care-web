"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useActionState } from "react";
import { addToCartAction } from "@/app/actions/cart";

export function AddToCartForm({ productSlug, stockQuantity, available }: { productSlug: string; stockQuantity: number; available: boolean }) {
  const [state, action, pending] = useActionState(addToCartAction, {});
  return <form action={action} className="mt-8"><input type="hidden" name="productSlug" value={productSlug} /><div className="flex flex-wrap gap-3"><label className="sr-only" htmlFor="quantity">Quantité</label><input id="quantity" name="quantity" type="number" min="1" max={stockQuantity} defaultValue="1" className="h-12 w-24 rounded-lg border border-slate-200 px-3 text-center" /><button disabled={!available || pending} className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"><ShoppingCart className="h-5 w-5" />{pending ? "Ajout…" : "Ajouter au panier"}</button></div>{state.message && <p role="status" className={`mt-3 text-sm ${state.success ? "text-emerald-700" : "text-red-600"}`}>{state.message} {state.success && <Link href="/panier" className="font-semibold underline">Voir le panier</Link>}</p>}</form>;
}
