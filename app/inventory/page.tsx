import { Suspense } from "react";
import InventoryPageClient from "./page.client";

export const metadata = {
  title: "Modèles | NoLimit Autos",
  description:
    "Découvrez notre collection de véhicules premium, exotiques et de luxe. Filtrez par marque, catégorie et prix.",
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
          Chargement de la Collection
        </p>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <InventoryPageClient />
    </Suspense>
  );
}
