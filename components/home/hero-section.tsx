import Image from "next/image";
import Link from "next/link";
import { LockKeyhole, ShieldCheck, Truck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        {/* Contenu */}
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            <span>Votre bien-être, notre priorité</span>
          </div>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl lg:text-6xl">
            Prenez soin de vous,
            <span className="block text-emerald-700">simplement.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Découvrez des produits de soin et de beauté de qualité et trouvez
            les meilleurs professionnels près de chez vous.
          </p>

          {/* Garanties */}
          <div className="mt-8 flex flex-col gap-4 text-sm text-slate-700 sm:flex-row sm:flex-wrap sm:gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              <span>Produits authentiques</span>
            </div>

            <div className="flex items-center gap-2">
              <LockKeyhole className="h-5 w-5 text-emerald-700" />
              <span>Paiement sécurisé</span>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-emerald-700" />
              <span>Livraison rapide</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
                href="/boutique"
                className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-700 px-6 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
            >
                Découvrir la boutique
            </Link>

            <Link
                href="/prestataires"
                className="inline-flex h-12 items-center justify-center rounded-md border border-emerald-200 bg-white px-6 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-50"
            >
                Trouver un prestataire
            </Link>
          </div>
        </div>

        {/* Visuel */}
        <div className="relative flex min-h-[420px] items-end justify-center">
          <div className="absolute inset-8 rounded-full bg-emerald-100/60 blur-3xl" />

          <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 shadow-2xl backdrop-blur">
            <Image
              src="/hero-ap-care.png"
              alt="Femme présentant des produits de soin AP Care"
              width={800}
              height={900}
              className="h-[430px] w-full object-cover sm:h-[500px]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}