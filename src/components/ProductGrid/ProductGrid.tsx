import Link from "next/link";
import type { Daum } from "@/app/(home)/home.interface";
import type { ShopFilters } from "@/app/shop/shop.interface";
import { buildShopHref } from "@/app/shop/shop.utils";
import AddToCart from "@/components/AddToCart/AddToCart";
import ProductActions from "@/components/ProductActions/ProductActions";
import ProductCard, { formatProductPrice } from "@/components/ProductCard/ProductCard";
import ProductListItem from "@/components/ProductListItem/ProductListItem";

export default function ProductGrid({
  products,
  filters,
}: {
  products: Daum[];
  filters: ShopFilters;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">No products found</h2>
        <p className="mt-2 text-sm text-gray-500">Try changing your search or filters.</p>
        <Link
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-green-600 px-6 text-sm font-semibold text-white transition hover:bg-green-700"
          href={buildShopHref(filters, {
            q: "",
            categories: [],
            brands: [],
            minPrice: undefined,
            maxPrice: undefined,
            page: 1,
          })}
        >
          Clear all filters
        </Link>
      </div>
    );
  }

  if (filters.view === "list") {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <ProductListItem key={product._id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => {
        const priceText = formatProductPrice(product.priceAfterDiscount ?? product.price);

        return (
          <ProductCard
            className="p-2.5"
            key={product._id}
            product={product}
            actions={
              <ProductActions
                productId={product._id}
                image={product.imageCover}
                imageAlt={product.title}
                name={product.title}
                placement="quick"
                price={priceText}
                brand={product.brand.name}
                category={product.category.name}
                description={product.description}
                availableColors={product.availableColors}
                quantity={product.quantity}
                href={`/productDetails/${product._id}`}
              />
            }
            footerAction={
              <AddToCart
                name={product.title}
                productId={product._id}
                quantity={product.quantity}
              />
            }
          />
        );
      })}
    </div>
  );
}