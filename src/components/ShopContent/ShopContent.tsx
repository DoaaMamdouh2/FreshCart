import { getAllCategories } from "@/app/categories/category.services";
import type { RawSearchParams } from "@/app/shop/shop.interface";
import { getAllBrands, getProducts } from "@/app/shop/shop.services";
import { parseShopParams } from "@/app/shop/shop.utils";
import Pagination from "@/components/Pagination/Pagination";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import ShopHeader from "@/components/ShopHeader/ShopHeader";

async function getSelectedName(
  ids: string[],
  load: () => Promise<{ _id: string; name: string }[]>,
) {
  if (ids.length !== 1) return undefined;

  const items = await load();
  return items.find((item) => item._id === ids[0])?.name;
}

export default async function ShopContent({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const filters = parseShopParams(await searchParams);

  const [{ products, metadata }, categoryName, brandName] = await Promise.all([
    getProducts(filters),
    getSelectedName(filters.categories, getAllCategories),
    getSelectedName(filters.brands, getAllBrands),
  ]);

  return (
    <>
      <ShopHeader brandName={brandName} categoryName={categoryName} filters={filters} />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-gray-600">
          Showing {products.length} {products.length === 1 ? "product" : "products"}
        </p>

        <ProductGrid filters={filters} products={products} />

        <Pagination
          currentPage={metadata.currentPage}
          filters={filters}
          totalPages={metadata.numberOfPages}
        />
      </div>
    </>
  );
}