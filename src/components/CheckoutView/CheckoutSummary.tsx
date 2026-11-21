import Image from "next/image";
import { LoaderCircle, Receipt, RotateCcw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { formatProductPrice } from "@/components/ProductCard/ProductCard";
import type { CartData } from "@/app/cart/cart.interface";
import SectionCard from "./SectionCard";

type CheckoutSummaryProps = {
  cart: CartData;
  isBusy: boolean;
  isRedirecting: boolean;
  message: string;
};

export default function CheckoutSummary({ cart, isBusy, isRedirecting, message }: CheckoutSummaryProps) {
  const itemCount = cart.products.length;
  const subtotal = cart.products.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <SectionCard
      className="lg:sticky lg:top-24"
      icon={ShoppingBag}
      subtitle={`${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      title="Order Summary"
    >
      <div className="space-y-5 p-5">
        <ul className="max-h-60 space-y-3 overflow-y-auto pr-1">
          {cart.products.map((item) => (
            <li className="flex items-center gap-3 rounded-xl bg-gray-50 p-3" key={item.product._id}>
              <span className="relative block size-12 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white">
                <Image
                  alt=""
                  className="object-contain p-1"
                  fill
                  sizes="48px"
                  src={item.product.imageCover}
                  unoptimized
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="line-clamp-1 block text-sm font-medium text-gray-900">{item.product.title}</span>
                <span className="block text-xs text-gray-500">
                  {item.count} × {formatProductPrice(item.price)}
                </span>
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {(item.price * item.count).toLocaleString("en-US")}
              </span>
            </li>
          ))}
        </ul>

        <dl className="space-y-3 border-t border-gray-100 pt-4 text-sm">
          <div className="flex items-center justify-between text-gray-600">
            <dt>Subtotal</dt>
            <dd className="font-medium text-gray-900">{formatProductPrice(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <dt className="flex items-center gap-2">
              <Truck aria-hidden="true" className="size-4 text-gray-400" />
              Shipping
            </dt>
            <dd className="font-semibold text-green-600">FREE</dd>
          </div>
        </dl>

        <div className="flex items-end justify-between border-t border-gray-100 pt-4">
          <span className="text-sm font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-extrabold text-green-600">
            {subtotal.toLocaleString("en-US")} <span className="text-xs font-normal text-gray-400">EGP</span>
          </span>
        </div>

        {message ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600" role="alert">
            {message}
          </p>
        ) : null}

        <button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-green-500 text-sm font-semibold text-white shadow-md shadow-green-200 transition hover:from-green-700 hover:to-green-600 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isBusy}
          type="submit"
        >
          {isBusy ? (
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Receipt aria-hidden="true" className="size-4" />
          )}
          {isRedirecting ? "Redirecting to payment..." : isBusy ? "Placing order..." : "Place Order"}
        </button>

        <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <ShieldCheck aria-hidden="true" className="size-3.5 text-green-600" />
            Secure
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-gray-200" />
          <span className="flex items-center gap-1">
            <Truck aria-hidden="true" className="size-3.5 text-blue-500" />
            Fast Delivery
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-gray-200" />
          <span className="flex items-center gap-1">
            <RotateCcw aria-hidden="true" className="size-3.5 text-orange-500" />
            Easy Returns
          </span>
        </div>
      </div>
    </SectionCard>
  );
}