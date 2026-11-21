import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Daum } from "@/app/(home)/home.interface";
import AddToCart from "@/components/AddToCart/AddToCart";
import { formatProductPrice } from "@/components/ProductCard/ProductCard";

export default function ProductListItem({ product }: { product: Daum }) {
  const currentPrice = product.priceAfterDiscount ?? product.price;
  const onSale = currentPrice < product.price;
  const discount = onSale ? Math.round((1 - currentPrice / product.price) * 100) : 0;
  const href = `/productDetails/${product._id}`;

  return (
    <article className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-emerald-400 hover:shadow-md sm:gap-6">
      <Link
        aria-label={`View ${product.title}`}
        className="relative block size-28 shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:size-40"
        href={href}
      >
        <Image
          alt={product.title}
          className="object-cover"
          fill
          sizes="160px"
          src={product.imageCover}
          unoptimized
        />
        {onSale ? (
          <span className="absolute top-2 left-2 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            -{discount}%
          </span>
        ) : null}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-xs text-gray-400">
          {product.category.name} <span aria-hidden="true">/</span> {product.brand.name}
        </span>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold text-gray-900">
          <Link className="hover:text-emerald-700" href={href}>
            {product.title}
          </Link>
        </h3>

        <div className="mt-2 flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              aria-hidden="true"
              className={`size-3.5 fill-current ${index < Math.round(product.ratingsAverage) ? "" : "text-gray-200"}`}
              key={index}
            />
          ))}
          <span className="ml-1 text-xs text-gray-400">
            {product.ratingsAverage.toFixed(1)} ({product.ratingsQuantity})
          </span>
        </div>

        <p className="mt-2 hidden line-clamp-2 text-sm text-gray-500 sm:block">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className={`text-lg font-bold ${onSale ? "text-emerald-600" : "text-gray-900"}`}>
              {formatProductPrice(currentPrice)}
            </span>
            {onSale ? (
              <span className="text-sm text-gray-400 line-through">
                {formatProductPrice(product.price)}
              </span>
            ) : null}
          </div>
          <AddToCart name={product.title} productId={product._id} quantity={product.quantity} />
        </div>
      </div>
    </article>
  );
}