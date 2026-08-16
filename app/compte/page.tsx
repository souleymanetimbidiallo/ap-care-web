import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import { Header } from "@/components/layout/header";
import { TopBar } from "@/components/layout/top-bar";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Mon compte" };
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion?returnTo=/compte");
  return <><TopBar /><Header /><main className="min-h-[70vh] bg-slate-50 px-4 py-12"><section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Mon compte</p><h1 className="mt-2 text-3xl font-bold text-emerald-950">Bonjour {user.firstName}</h1><div className="mt-8 grid gap-5 sm:grid-cols-2"><Info label="Nom complet" value={`${user.firstName} ${user.lastName}`} /><Info label="Téléphone" value={user.phone} /><Info label="Email" value={user.email ?? "Non renseigné"} /><Info label="Rôle" value={user.roles.join(", ")} /></div><form action={logoutAction} className="mt-10"><button className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-50">Se déconnecter</button></form></section></main></>;
}

function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 font-semibold text-slate-900">{value}</p></div>; }
