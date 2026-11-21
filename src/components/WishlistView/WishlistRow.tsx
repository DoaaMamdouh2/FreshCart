"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, LoaderCircle, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartProvider/CartProvider";
import { formatProductPrice } from "@/components/ProductCard/ProductCard";
import { useWishlist } from "@/components/WishlistProvider/WishlistProvider";
import type { WishlistProduct } from "@/app/wishlist/wishlist.interface";

export const wishlistColumns =
  "md:grid-cols-[minmax(0,1fr)_130px_120px_210px] xl:grid-cols-[minmax(0,1fr)_17%_17%_17%]";

type CartState = "idle" | "pending" | "added" | "error";

function getCategoryName(product: WishlistProduct) {
  return typeof product.category === "object" ? product.category.name : "";
}

export default function WishlistRow({ product }: { product: WishlistProduct }) {
  const { removeProduct } = useWishlist();
  const { addToCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  const [cartState, setCartState] = useState<CartState>("idle");
  const [error, setError] = useState("");

  const inStock = product.quantity > 0;
  const currentPrice = product.priceAfterDiscount ?? product.price;
  const onSale = currentPrice < product.price;
  const href = `/productDetails/${product._id}`;

  async function handleAddToCart() {
    setError("");
    setCartState("pending");
    const result = await addToCart(product._id);

    if (result.success) {
      setCartState("added");
    } else {
      setError(result.message);
      setCartState("error");
    }

    window.setTimeout(() => setCartState("idle"), 1800);
  }

  async function handleRemove() {
    setError("");
    setIsRemoving(true);
    const result = await removeProduct(product._id);
    if (!result.success) {
      setError(result.message);
      setIsRemoving(false);
    }
  }

  return (
    <li
      className={`border-b border-gray-100 px-4 py-5 last:border-b-0 sm:px-6 md:grid md:items-center ${wishlistColumns}`}
    >
      <div className="flex items-center gap-4 md:pr-4">
        <Link
          className="relative block size-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
          href={href}
        >
          <Image
            alt={product.title}
            className="object-contain p-2"
            fill
            sizes="80px"
            src={product.imageCover}
            unoptimized
          />
        </Link>
        <div className="min-w-0">
          <h2 className="line-clamp-2 text-base font-medium text-gray-900">
            <Link className="hover:text-green-700" href={href}>
              {product.title}
            </Link>
          </h2>
          {getCategoryName(product) ? (
            <p className="mt-1 text-sm text-gray-400">{getCategoryName(product)}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2 md:mt-0 md:block md:text-center">
        <p className="font-semibold text-gray-900">{formatProductPrice(currentPrice)}</p>
        {onSale ? (
          <p className="text-sm text-gray-400 line-through">{formatProductPrice(product.price)}</p>
        ) : null}
      </div>

      <div className="mt-3 md:mt-0 md:text-center">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${inStock ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}
        >
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full ${inStock ? "bg-green-500" : "bg-gray-400"}`}
          />
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3 md:mt-0 md:justify-center">
        <button
          className={`flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:bg-gray-300 ${cartState === "error" ? "bg-red-500" : "bg-green-600 hover:bg-green-700"}`}
          disabled={!inStock || cartState === "pending"}
          onClick={handleAddToCart}
          type="button"
        >
          {cartState === "pending" ? (
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          ) : cartState === "added" ? (
            <Check aria-hidden="true" className="size-4" />
          ) : (
            <ShoppingCart aria-hidden="true" className="size-4" />
          )}
          {cartState === "added" ? "Added" : "Add to Cart"}
        </button>
        <button
          aria-label={`Remove ${product.title} from wishlist`}
          className="grid size-10 place-items-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-red-200 hover:text-red-500 disabled:opacity-60"
          disabled={isRemoving}
          onClick={handleRemove}
          type="button"
        >
          <Trash2 aria-hidden="true" className="size-4" />
        </button>
      </div>

      {error ? (
        <p className="mt-2 text-xs text-red-600 md:col-span-4" role="alert">
          {error}
        </p>
      ) : null}
    </li>
  );
}