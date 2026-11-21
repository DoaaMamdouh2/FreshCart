import { Suspense } from "react";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import MobileBottomNavigation from "@/components/MobileBottomNavigation/MobileBottomNavigation";
import { getAllProducts } from "./home.services";

async function FeaturedProductsSection() {
  const products = await getAllProducts();
  const featuredProducts = products;

  return <FeaturedProducts products={featuredProducts} />;
}

export default function Home() {
  return (
    <main className="flex-1 bg-gray-50">
      <h1 className="sr-only">FreshCart - Online Supermarket</h1>
      <Suspense fallback={<div aria-hidden="true" className="h-75 animate-pulse bg-green-100 sm:h-100" />}>
        <HomeSlider />
      </Suspense>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-gray-200" />}>
          <CategorySlider />
        </Suspense>
      </div>
      <Suspense
        fallback={
          <p className="mx-auto max-w-7xl px-4 py-8 text-sm text-gray-500 sm:px-6 lg:px-8">
            Loading products...
          </p>
        }
      >
        <FeaturedProductsSection />
      </Suspense>
      <MobileBottomNavigation />
    </main>
  );
}