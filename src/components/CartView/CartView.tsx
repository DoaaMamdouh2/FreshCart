"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCart } from "@/components/CartProvider/CartProvider";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-gray-500">
      <Link className="hover:text-green-700" href="/">
        Home
      </Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page" className="font-medium text-gray-800">
        Shopping Cart
      </span>
    </nav>
  );
}

function CartHeader({ itemCount }: { itemCount?: number }) {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-4">
        <span className="grid size-12 place-items-center rounded-xl bg-green-600 text-white shadow-sm">
          <ShoppingCart aria-hidden="true" className="size-6" />
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Shopping Cart</h1>
      </div>
      {itemCount !== undefined ? (
        <p className="mt-3 text-sm text-gray-500">
          You have{" "}
          <span className="font-semibold text-green-600">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>{" "}
          in your cart
        </p>
      ) : null}
    </header>
  );
}

export default function CartView() {
  const { status } = useSession();
  const { cart, isLoading, clearCart } = useCart();
  const [clearError, setClearError] = useState("");

  async function handleClear() {
    if (!window.confirm("Remove all items from your cart?")) return;
    setClearError("");
    const result = await clearCart();
    if (!result.success) setClearError(result.message);
  }

  let content;

  if (isLoading) {
    content = (
      <div aria-busy="true" className="space-y-4">
        {[0, 1, 2].map((index) => (
          <div className="h-44 animate-pulse rounded-2xl bg-gray-200" key={index} />
        ))}
      </div>
    );
  } else if (status !== "authenticated") {
    content = (
      <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Please sign in to view your cart</h2>
        <p className="mt-2 text-sm text-gray-500">Your cart is saved to your account.</p>
        <Link
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-green-600 px-6 text-sm font-semibold text-white transition hover:bg-green-700"
          href="/login"
        >
          Sign In
        </Link>
      </div>
    );
  } else if (!cart || cart.products.length === 0) {
    content = (
      <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-green-50 text-green-600">
          <ShoppingCart aria-hidden="true" className="size-8" />
        </span>
        <h2 className="mt-4 text-xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-sm text-gray-500">Add some products and they will show up here.</p>
        <Link
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-green-600 px-6 text-sm font-semibold text-white transition hover:bg-green-700"
          href="/shop"
        >
          Continue Shopping
        </Link>
      </div>
    );
  } else {
    content = (
      <div className="grid gap-6 lg:grid-cols-3">
        <section aria-label="Cart items" className="space-y-4 lg:col-span-2">
          {cart.products.map((item) => (
            <CartItem item={item} key={item.product._id} />
          ))}

          <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-sm">
            <Link className="flex items-center gap-1.5 font-medium text-green-600 hover:text-green-700" href="/shop">
              <ArrowLeft aria-hidden="true" className="size-4" />
              Continue Shopping
            </Link>
            <button
              className="flex items-center gap-1.5 text-gray-500 transition hover:text-red-600"
              onClick={handleClear}
              type="button"
            >
              <Trash2 aria-hidden="true" className="size-4" />
              Clear all items
            </button>
          </div>
          {clearError ? (
            <p className="text-xs text-red-600" role="alert">
              {clearError}
            </p>
          ) : null}
        </section>

        <OrderSummary cart={cart} />
      </div>
    );
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Breadcrumb />
        <CartHeader itemCount={cart && !isLoading ? cart.products.length : undefined} />
        {content}
      </div>
    </main>
  );
}