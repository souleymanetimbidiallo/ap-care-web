import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingCart, UserRound } from "lucide-react";

import { getCurrentUser } from "@/lib/auth/session";
import { getCart } from "@/lib/cart/api";

export async function Header() {
  const [user, cart] = await Promise.all([getCurrentUser(), getCart().catch(() => ({ itemCount: 0 }))]);
  return (
    <header className="border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="Logo AP Care"
            width={52}
            height={52}
            className="h-12 w-12 rounded-full object-cover"
            priority
          />

          <div className="hidden sm:block">
            <p className="text-lg font-bold leading-none text-emerald-900">
              AP CARE
            </p>
            <p className="mt-1 text-[10px] text-slate-500">
              Jeunes, engagés pour votre santé
            </p>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          <Link
            href="/"
            className="border-b-2 border-emerald-700 pb-2 text-emerald-800"
          >
            Accueil
          </Link>

          <Link
            href="/boutique"
            className="text-slate-700 transition hover:text-emerald-700"
          >
            Boutique
          </Link>

          <Link
            href="/prestataires"
            className="text-slate-700 transition hover:text-emerald-700"
          >
            Prestataires
          </Link>

          <Link
            href="/promotions"
            className="text-slate-700 transition hover:text-emerald-700"
          >
            Promotions
          </Link>

          <Link
            href="/a-propos"
            className="text-slate-700 transition hover:text-emerald-700"
          >
            À propos
          </Link>

          <Link
            href="/contact"
            className="text-slate-700 transition hover:text-emerald-700"
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/recherche"
            aria-label="Rechercher"
            className="hidden rounded-full p-2 text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
          >
            <Search className="h-5 w-5" />
          </Link>

          <button
            type="button"
            aria-label="Favoris"
            className="relative hidden rounded-full p-2 text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
          >
            <Heart className="h-5 w-5" />

          </button>

          <Link
            href="/panier"
            aria-label="Panier"
            className="relative rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
          >
            <ShoppingCart className="h-5 w-5" />
            {cart.itemCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-700 px-1 text-[10px] font-bold text-white">{cart.itemCount}</span>}
          </Link>

          <Link className="hidden h-9 items-center gap-1.5 rounded-lg bg-emerald-700 px-5 text-sm font-medium text-white hover:bg-emerald-800 lg:inline-flex" href={user ? "/compte" : "/connexion"}>
            {user ? <><UserRound className="h-4 w-4" /> {user.firstName}</> : "Se connecter"}
          </Link>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            className="rounded-full p-2 text-slate-800 transition hover:bg-slate-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
