"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Heart, Minus, Plus, Share2, ShieldCheck, ShoppingCart, Truck, Undo2, Zap } from "lucide-react";
import type { ProductDetails } from "@/app/productDetails/productDetails.interface";

export default function ProductDetailPanel({ product }: { product: ProductDetails }) {
  const [selectedImage, setSelectedImage] = useState(product.imageCover);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const images = [...new Set([product.imageCover, ...product.images])];

  return (
    <section className="grid gap-5 lg:grid-cols-[270px_minmax(0,1fr)]">
      <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
          <Image alt={product.title} className="object-contain" fill priority sizes="(max-width: 1024px) 100vw, 270px" src={selectedImage} unoptimized />
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {images.slice(0, 4).map((image, index) => (
            <button aria-label={`Show product image ${index + 1}`} aria-pressed={selectedImage === image} className={`relative aspect-square overflow-hidden rounded border bg-gray-50 ${selectedImage === image ? "border-gray-500 ring-1 ring-gray-400" : "border-gray-100"}`} key={image} onClick={() => setSelectedImage(image)} type="button">
              <Image alt="" className="object-contain" fill sizes="64px" src={image} unoptimized />
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-3 flex gap-2 text-[11px] font-semibold">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">{product.category.name}</span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">{product.brand.name}</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{product.title}</h1>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span aria-label={`${product.ratingsAverage} out of 5 stars`} className="tracking-wide text-amber-400">★★★★★</span>
          <span className="text-xs text-gray-500">{product.ratingsAverage.toFixed(1)} ({product.ratingsQuantity} reviews)</span>
        </div>
        <p className="mt-3 text-2xl font-bold text-gray-900">{product.price.toLocaleString("en-US")} EGP</p>
        <p className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${product.quantity > 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          <span className={`size-1.5 rounded-full ${product.quantity > 0 ? "bg-emerald-500" : "bg-red-500"}`} />
          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </p>
        <div className="my-4 border-t border-gray-100" />
        <p className="text-sm leading-6 text-gray-600">{product.description}</p>
        <div className="mt-4">
          <label className="mb-2 block text-xs font-medium text-gray-600" htmlFor="product-quantity">Quantity</label>
          <div className="flex items-center gap-3">
            <div className="flex h-9 items-center rounded-md border border-gray-200">
              <button aria-label="Decrease quantity" className="grid size-9 place-items-center text-gray-500 hover:text-emerald-700" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} type="button"><Minus className="size-3.5" /></button>
              <span className="w-8 text-center text-sm" id="product-quantity">{quantity}</span>
              <button aria-label="Increase quantity" className="grid size-9 place-items-center text-gray-500 hover:text-emerald-700" disabled={quantity >= product.quantity} onClick={() => setQuantity((value) => Math.min(product.quantity, value + 1))} type="button"><Plus className="size-3.5" /></button>
            </div>
            <span className="text-xs text-gray-500">{product.quantity} available</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-3 text-xs text-gray-600">
          Total Price: <strong className="text-base text-emerald-600">{(product.price * quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })} EGP</strong>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-300" disabled={product.quantity <= 0} onClick={() => setAdded(true)} type="button">
            {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}{added ? "Added to Cart" : "Add to Cart"}
          </button>
          <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-gray-900 text-sm font-medium text-white hover:bg-gray-800" type="button"><Zap className="size-4" />Buy Now</button>
        </div>
        <div className="mt-3 flex gap-2">
          <button aria-pressed={wishlisted} className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-emerald-300 hover:text-emerald-700" onClick={() => setWishlisted(!wishlisted)} type="button"><Heart className={`size-4 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />{wishlisted ? "Added to Wishlist" : "Add to Wishlist"}</button>
          <button aria-label="Share product" className="grid size-9 place-items-center rounded-lg border border-gray-200 text-gray-600 hover:text-emerald-700" onClick={() => void navigator.clipboard?.writeText(window.location.href)} type="button"><Share2 className="size-4" /></button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 text-[11px] text-gray-600">
          <div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Truck className="size-3.5" /></span><span><b className="block">Free Delivery</b>Orders over 550</span></div>
          <div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Undo2 className="size-3.5" /></span><span><b className="block">30 Days Return</b>Money back</span></div>
          <div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-emerald-50 text-emerald-600"><ShieldCheck className="size-3.5" /></span><span><b className="block">Secure Payment</b>100% protected</span></div>
        </div>
      </div>
    </section>
  );
}
