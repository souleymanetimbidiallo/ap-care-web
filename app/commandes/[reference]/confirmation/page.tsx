import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { TopBar } from "@/components/layout/top-bar";
import { PaymentButton } from "@/components/checkout/payment-button";
import { getCurrentUser } from "@/lib/auth/session";
import { CheckoutApiError, getOrder } from "@/lib/orders/api";

export const metadata: Metadata = { title: "Commande confirmée" };
export const dynamic = "force-dynamic";
export default async function ConfirmationPage({ params, searchParams }: { params: Promise<{ reference: string }>; searchParams: Promise<{ payment?: string }> }) {
  const { reference } = await params; const user = await getCurrentUser();
  const payment = (await searchParams).payment;
  let order; try { order = await getOrder(reference); } catch (error) { if (error instanceof CheckoutApiError) notFound(); throw error; }
  const paid = order.status === "CONFIRMED";
  return <><TopBar /><Header /><main className="min-h-[70vh] bg-slate-50 px-4 py-12"><section className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-sm"><p className="text-sm font-bold uppercase text-emerald-700">Commande enregistrée</p><h1 className="mt-3 text-3xl font-bold text-emerald-950">Merci {user?.firstName} !</h1><p className="mt-4 text-slate-600">Votre référence est <strong>{order.reference}</strong>.</p><p className="mt-2 text-slate-600">Total : <strong>{order.totalGnf.toLocaleString("fr-FR")} GNF</strong></p>{paid ? <p className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-900">Paiement confirmé. Nous préparons votre commande.</p> : <><p className={`mt-6 rounded-xl p-4 text-sm ${payment === "cancelled" ? "bg-red-50 text-red-800" : "bg-amber-50 text-amber-900"}`}>{payment === "cancelled" ? "Le paiement a été annulé. Vous pouvez réessayer sans recréer la commande." : "La commande attend maintenant le paiement. Aucun montant n’a encore été débité."}</p><PaymentButton reference={order.reference} /></>}<Link href="/boutique" className="mt-6 inline-flex rounded-xl border border-emerald-700 px-6 py-3 font-semibold text-emerald-800">Continuer mes achats</Link></section></main></>;
}
