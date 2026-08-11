import { MapPin, Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="hidden bg-emerald-900 text-white lg:block">
      <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-6 text-xs">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" />
          <span>Conakry, Guinée</span>
        </div>

        <div className="flex items-center gap-2 text-white/90">
          <span>Livraison rapide</span>
          <span>•</span>
          <span>Paiement sécurisé</span>
          <span>•</span>
          <span>Produits authentiques</span>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5" />
          <span>+224 621 12 34 56</span>
        </div>
      </div>
    </div>
  );
}