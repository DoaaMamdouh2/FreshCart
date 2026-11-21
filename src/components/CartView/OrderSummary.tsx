import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, ShoppingBag, Tag, Truck } from "lucide-react";
import { formatProductPrice } from "@/components/ProductCard/ProductCard";
import type { CartData } from "@/app/cart/cart.interface";

const FREE_SHIPPING_THRESHOLD = 500;

export default function OrderSummary({ cart }: { cart: CartData }) {
  const itemCount = cart.products.length;
  const subtotal = cart.products.reduce((sum, item) => sum + item.price * item.count, 0);
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <aside className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:sticky lg:top-24">
      <div className="bg-linear-to-r from-green-700 to-green-500 px-5 py-4 text-white">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <ShoppingBag aria-hidden="true" className="size-5" />
          Order Summary
        </h2>
        <p className="mt-1 text-xs text-white/85">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-green-100 text-green-600">
            <Truck aria-hidden="true" className="size-4" />
          </span>
          {freeShipping ? (
            <div>
              <p className="text-sm font-semibold text-green-700">Free Shipping!</p>
              <p className="text-xs text-green-600">You qualify for free delivery</p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-semibold text-green-700">Almost there!</p>
              <p className="text-xs text-green-600">
                Add {formatProductPrice(remaining)} more for free delivery
              </p>
            </div>
          )}
        </div>

        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between text-gray-600">
            <dt>Subtotal</dt>
            <dd className="font-medium text-gray-900">{formatProductPrice(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <dt>Shipping</dt>
            <dd className={freeShipping ? "font-semibold text-green-600" : "text-gray-500"}>
              {freeShipping ? "FREE" : "Calculated at checkout"}
            </dd>
          </div>
        </dl>

        <div className="flex items-end justify-between border-t border-gray-100 pt-4">
          <span className="text-sm font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-extrabold text-gray-900">
            {subtotal.toLocaleString("en-US")}{" "}
            <span className="text-xs font-normal text-gray-400">EGP</span>
          </span>
        </div>

        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 text-sm font-medium text-gray-600 transition hover:border-green-400 hover:text-green-700"
          type="button"
        >
          <Tag aria-hidden="true" className="size-4" />
          Apply Promo Code
        </button>

        <Link
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-green-500 text-sm font-semibold text-white shadow-md shadow-green-200 transition hover:from-green-700 hover:to-green-600"
          href="/checkout"
        >
          <Lock aria-hidden="true" className="size-4" />
          Secure Checkout
        </Link>

        <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <ShieldCheck aria-hidden="true" className="size-3.5 text-green-600" />
            Secure Payment
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-gray-200" />
          <span className="flex items-center gap-1">
            <Truck aria-hidden="true" className="size-3.5 text-blue-500" />
            Fast Delivery
          </span>
        </div>

        <Link
          className="flex items-center justify-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700"
          href="/shop"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Continue Shopping
        </Link>
      </div>
    </aside>
  );
}