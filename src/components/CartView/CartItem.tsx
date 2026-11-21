"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartProvider/CartProvider";
import { formatProductPrice } from "@/components/ProductCard/ProductCard";
import type { CartActionResult, CartProduct } from "@/app/cart/cart.interface";

export default function CartItem({ item }: { item: CartProduct }) {
  const { updateCount, removeItem } = useCart();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const { product, count, price } = item;
  const inStock = product.quantity > 0;
  const canIncrease = count < product.quantity;
  const lineTotal = (price * count).toLocaleString("en-US");

  async function run(action: () => Promise<CartActionResult>) {
    setError("");
    setIsPending(true);
    const result = await action();
    if (!result.success) setError(result.message);
    setIsPending(false);
  }

  return (
    <article className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:gap-5 sm:p-5">
      <div className="flex shrink-0 flex-col items-center gap-2">
        <Link
          className="relative block size-24 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:size-32"
          href={`/productDetails/${product._id}`}
        >
          <Image
            alt={product.title}
            className="object-contain p-2"
            fill
            sizes="128px"
            src={product.imageCover}
            unoptimized
          />
        </Link>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${inStock ? "bg-green-500" : "bg-gray-400"}`}
        >
          {inStock ? <Check aria-hidden="true" className="size-3" /> : null}
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h2 className="line-clamp-2 text-base font-semibold text-gray-900 sm:text-lg">
          <Link className="hover:text-green-700" href={`/productDetails/${product._id}`}>
            {product.title}
          </Link>
        </h2>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="rounded-md bg-green-50 px-2 py-1 font-medium text-green-700">
            {product.category.name}
          </span>
          <span aria-hidden="true">·</span>
          <span>SKU: {product._id.slice(-6).toUpperCase()}</span>
        </div>

        <p className="mt-3 text-lg font-bold text-green-600">
          {formatProductPrice(price)}{" "}
          <span className="text-xs font-normal text-gray-400">per unit</span>
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1">
            <button
              aria-label={`Decrease quantity of ${product.title}`}
              className="grid size-8 place-items-center rounded-lg bg-white text-gray-600 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
              disabled={isPending || count <= 1}
              onClick={() => run(() => updateCount(product._id, count - 1))}
              type="button"
            >
              <Minus aria-hidden="true" className="size-3.5" />
            </button>
            <span aria-live="polite" className="w-9 text-center text-sm font-semibold text-gray-900">
              {count}
            </span>
            <button
              aria-label={`Increase quantity of ${product.title}`}
              className="grid size-8 place-items-center rounded-lg bg-green-600 text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={isPending || !canIncrease}
              onClick={() => run(() => updateCount(product._id, count + 1))}
              type="button"
            >
              <Plus aria-hidden="true" className="size-3.5" />
            </button>
          </div>

          <div className="flex items-end gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">Total</p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                {lineTotal} <span className="text-xs font-normal text-gray-400">EGP</span>
              </p>
            </div>
            <button
              aria-label={`Remove ${product.title} from cart`}
              className="grid size-10 place-items-center rounded-xl border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isPending}
              onClick={() => run(() => removeItem(product._id))}
              type="button"
            >
              <Trash2 aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>

        {error ? (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </article>
  );
}