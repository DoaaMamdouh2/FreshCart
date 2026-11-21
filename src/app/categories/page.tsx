import { Suspense } from "react";
import { Layers } from "lucide-react";
import CategoriesGrid from "@/components/CategoriesGrid/CategoriesGrid";
import PageHero from "@/components/PageHero/PageHero";

function CategoriesSkeleton() {
  return (
    <div aria-busy="true" className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }, (_, index) => (
        <div className="h-80 animate-pulse rounded-2xl bg-gray-200" key={index} />
      ))}
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <main className="flex-1 bg-gray-50">
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Categories" }]}
        icon={Layers}
        subtitle="Browse our wide range of product categories"
        title="All Categories"
      />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesGrid />
        </Suspense>
      </div>
    </main>
  );
}