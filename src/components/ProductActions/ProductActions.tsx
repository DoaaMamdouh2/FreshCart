"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftRight, Check, Eye, Plus, X } from "lucide-react";
import Link from "next/link";
import WishlistButton from "@/components/WishlistButton/WishlistButton";

type Placement = "quick" | "cart";

type Props = {
  productId: string;
  name: string;
  image: string;
  imageAlt: string;
  price: string;
  placement: Placement;
  brand?: string;
  category?: string;
  description?: string;
  availableColors?: string[];
  quantity?: number;
  href?: string;
};

export default function ProductActions({
  productId,
  name,
  image,
  imageAlt,
  price,
  placement,
  brand,
  category,
  description,
  availableColors = [],
  quantity,
  href = "/shop"
}: Props) {
  const [isCompared, setIsCompared] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <>
      {placement === "quick" ? (
        <>
          <div className="pointer-events-none absolute right-3 top-3 z-10 flex translate-x-1 flex-col gap-1.5 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100">
            <WishlistButton name={name} productId={productId} />
            <button
              aria-label={isCompared ? `Remove ${name} from comparison` : `Compare ${name}`}
              aria-pressed={isCompared}
              className="grid size-7 place-items-center rounded-full border border-gray-200 bg-white/90 text-gray-400 shadow-sm transition hover:border-emerald-200 hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-emerald-600"
              onClick={() => setIsCompared((current) => !current)}
              type="button"
            >
              {isCompared ? <Check aria-hidden="true" className="size-3.5" /> : <ArrowLeftRight aria-hidden="true" className="size-3.5" />}
            </button>
            <Link
              aria-label={`View details of ${name}`}
              className="grid size-7 place-items-center rounded-full border border-gray-200 bg-white/90 text-gray-400 shadow-sm transition hover:border-emerald-200 hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-emerald-600"
              href={href}
            >
              <Eye aria-hidden="true" className="size-3.5" />
            </Link>
          </div>

          {isQuickViewOpen ? (
            <div
              aria-label={`Quick view: ${name}`}
              aria-modal="true"
              className="fixed inset-0 z-100 grid place-items-center bg-slate-950/40 p-4"
              onClick={() => setIsQuickViewOpen(false)}
              role="dialog"
            >
              <div
                className="relative grid w-full max-w-xl gap-5 rounded-xl bg-white p-5 shadow-xl sm:grid-cols-2"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  aria-label="Close quick view"
                  className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white text-gray-500 shadow-sm transition hover:text-gray-900"
                  onClick={() => setIsQuickViewOpen(false)}
                  type="button"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">
                  <Image alt={imageAlt} className="object-cover" fill sizes="(max-width: 640px) 100vw, 50vw" src={image} unoptimized />
                </div>
                <div className="flex flex-col justify-center gap-3 pr-8">
                  <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
                  {brand || category ? (
                    <p className="text-sm text-gray-500">
                      {[brand, category].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                  {description ? <p className="text-sm leading-relaxed text-gray-600">{description}</p> : null}
                  {availableColors.length > 0 ? (
                    <p className="text-xs text-gray-500">
                      Available colors: <span className="font-medium text-gray-700">{availableColors.join(", ")}</span>
                    </p>
                  ) : null}
                  {quantity !== undefined ? (
                    <p className={`text-xs font-medium ${quantity > 0 ? "text-emerald-700" : "text-red-600"}`}>
                      {quantity > 0 ? `${quantity} in stock` : "Out of stock"}
                    </p>
                  ) : null}
                  <p className="text-base font-bold text-emerald-700">{price}</p>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <button
          aria-label={
            quantity !== undefined && quantity <= 0
              ? `${name} is out of stock`
              : isInCart
                ? `${name} added to cart`
                : `Add ${name} to cart`
          }
          aria-pressed={isInCart}
          className={`grid size-7 shrink-0 place-items-center rounded-full text-white shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${quantity !== undefined && quantity <= 0 ? "cursor-not-allowed bg-gray-300" : "bg-emerald-600 hover:bg-emerald-700"}`}
          onClick={() => setIsInCart(true)}
          disabled={quantity !== undefined && quantity <= 0}
          type="button"
        >
          {isInCart ? <Check aria-hidden="true" className="size-3.5" /> : <Plus aria-hidden="true" className="size-3.5" />}
        </button>
      )}
    </>
  );
}