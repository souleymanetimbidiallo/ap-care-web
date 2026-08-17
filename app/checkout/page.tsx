import type { Metadata } from "next";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Header } from "@/components/layout/header";
import { TopBar } from "@/components/layout/top-bar";
import { getCurrentUser } from "@/lib/auth/session";
import { getCart } from "@/lib/cart/api";

export const metadata: Metadata = { title: "Finaliser ma commande" };
export const dynamic = "force-dynamic";
export default async function CheckoutPage() {
  const [user, cart] = await Promise.all([getCurrentUser(), getCart()]);
  if (!user) redirect("/connexion?returnTo=/checkout");
  if (!cart.items.length) redirect("/panier");
  return <><TopBar /><Header /><main className="min-h-screen bg-slate-50 px-4 py-10"><div className="mx-auto max-w-6xl"><CheckoutForm user={user} cart={cart} idempotencyKey={randomUUID()} /></div></main></>;
}
