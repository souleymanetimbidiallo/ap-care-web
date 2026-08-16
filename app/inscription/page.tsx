import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Créer un compte" };

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/compte");
  return <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-4 py-12"><section className="w-full max-w-lg rounded-3xl border border-emerald-100 bg-white p-7 shadow-xl sm:p-10"><Link href="/" className="text-sm font-semibold text-emerald-700">← Retour à l’accueil</Link><h1 className="mt-7 text-3xl font-bold text-emerald-950">Créer votre compte</h1><p className="mt-2 text-sm text-slate-600">Quelques informations suffisent pour rejoindre AP Care.</p><AuthForm mode="register" /></section></main>;
}
