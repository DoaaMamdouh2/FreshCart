import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Star } from "lucide-react";
import { Daum } from "@/app/(home)/home.interface";

export interface ProductCardProps {
  product: Daum;
  actions?: ReactNode;
  footerAction?: ReactNode;
  className?: string;
}

export function formatProductPrice(price: number, currency = "EGP") {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(price)} ${currency}`;
}

export default function ProductCard({ product, actions, footerAction, className }: ProductCardProps) {
  const {
    brand,
    category,
    imageCover,
    quantity,
    ratingsAverage,
    ratingsQuantity,
    title,
    price,
    priceAfterDiscount,
  } = product;

  const href = `/productDetails/${product.id || product._id}`;
  const currentPrice = priceAfterDiscount ?? price;
  const onSale = currentPrice < price;
  const discount = onSale ? Math.round((1 - currentPrice / price) * 100) : 0;

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3 transition hover:border-emerald-400 hover:shadow-md ${className ?? ""}`}
    >
      {onSale || quantity <= 0 ? (
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1">
          {onSale ? (
            <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              -{discount}%
            </span>
          ) : null}
          {quantity <= 0 ? (
            <span className="rounded bg-gray-700 px-1.5 py-0.5 text-[10px] font-bold text-white">
              Out of stock
            </span>
          ) : null}
        </div>
      ) : null}

      {actions}

      <Link
        aria-label={`View ${title}`}
        className="mb-3 block aspect-square w-full overflow-hidden rounded-lg bg-gray-50 focus-visible:outline-2 focus-visible:outline-emerald-600"
        href={href}
      >
        <Image
          alt={title}
          className="size-full object-cover transition duration-300 group-hover:scale-105"
          height={480}
          src={imageCover}
          unoptimized
          width={480}
        />
      </Link>

      <div>
        <span className="mb-0.5 block truncate text-[11px] text-gray-400">
          {category.name} <span aria-hidden="true">/</span> {brand.name}
        </span>

        <h3 className="mb-1 line-clamp-1 text-xs font-semibold text-gray-800">
          <Link
            className="rounded-sm hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600"
            href={href}
          >
            {title}
          </Link>
        </h3>

        <div className="mb-2 flex items-center gap-1 text-[11px] text-amber-400">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              aria-hidden="true"
              className={`size-3 fill-current ${index < Math.round(ratingsAverage) ? "" : "text-gray-200"}`}
              key={index}
            />
          ))}
          <span className="ml-1 text-[10px] text-gray-400">
            {ratingsAverage.toFixed(1)} ({ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-1">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-2">
            <span className={`text-sm font-bold ${onSale ? "text-emerald-600" : "text-gray-900"}`}>
              {formatProductPrice(currentPrice)}
            </span>
            {onSale ? (
              <span className="text-xs text-gray-400 line-through">{formatProductPrice(price)}</span>
            ) : null}
          </div>
          {footerAction}
        </div>
      </div>
    </article>
  );
}
