import { Suspense } from "react";
import InventoryPageClient from "./page.client";

export const metadata = {
  title: "Models | NoLimit Autos",
  description:
    "Browse our handpicked collection of premium, exotic, and luxury vehicles. Filter by make, category, and price.",
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-crimson border-t-transparent animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
          Loading Collection
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
