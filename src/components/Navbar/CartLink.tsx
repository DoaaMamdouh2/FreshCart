"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider/CartProvider";

export default function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      className="relative grid size-9 place-items-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-emerald-600"
      href="/cart"
    >
      <ShoppingCart aria-hidden="true" className="size-5" />
      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
          {itemCount}
        </span>
      ) : null}
    </Link>
  );
}