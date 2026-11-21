import { Suspense } from "react";
import { Tags } from "lucide-react";
import BrandsGrid from "@/components/BrandsGrid/BrandsGrid";
import PageHero from "@/components/PageHero/PageHero";

function BrandsSkeleton() {
  return (
    <div aria-busy="true" className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: 12 }, (_, index) => (
        <div className="aspect-4/5 animate-pulse rounded-2xl bg-gray-200" key={index} />
      ))}
    </div>
  );
}

export default function BrandsPage() {
  return (
    <main className="flex-1 bg-gray-50">
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Brands" }]}
        compact
        icon={Tags}
        subtitle="Shop from your favorite brands"
        title="Top Brands"
        variant="purple"
      />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Suspense fallback={<BrandsSkeleton />}>
          <BrandsGrid />
        </Suspense>
      </div>
    </main>
  );
}