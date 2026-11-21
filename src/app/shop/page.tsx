import { Suspense } from "react";
import ShopContent from "@/components/ShopContent/ShopContent";

function ShopSkeleton() {
  return (
    <div aria-busy="true">
      <div className="h-64 animate-pulse bg-green-200" />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mb-6 h-5 w-40 animate-pulse rounded bg-gray-200" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }, (_, index) => (
            <div className="h-80 animate-pulse rounded-xl bg-gray-200" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage({ searchParams }: PageProps<"/shop">) {
  return (
    <main className="flex-1 bg-gray-50">
      <Suspense fallback={<ShopSkeleton />}>
        <ShopContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}