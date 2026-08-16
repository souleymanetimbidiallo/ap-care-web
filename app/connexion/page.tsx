import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Connexion" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ returnTo?: string | string[] }> }) {
  if (await getCurrentUser()) redirect("/compte");
  const { returnTo } = await searchParams;
  return <AuthPage title="Bon retour parmi nous" description="Connectez-vous avec votre numéro de téléphone."><AuthForm mode="login" returnTo={typeof returnTo === "string" ? returnTo : undefined} /></AuthPage>;
}

function AuthPage({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-4 py-12"><section className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-7 shadow-xl sm:p-10"><Link href="/" className="text-sm font-semibold text-emerald-700">← Retour à l’accueil</Link><h1 className="mt-7 text-3xl font-bold text-emerald-950">{title}</h1><p className="mt-2 text-sm text-slate-600">{description}</p>{children}</section></main>;
}
