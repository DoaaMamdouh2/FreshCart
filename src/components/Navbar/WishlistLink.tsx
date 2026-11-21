"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/components/WishlistProvider/WishlistProvider";

export default function WishlistLink() {
  const { count } = useWishlist();

  return (
    <Link
      aria-label={`Wishlist, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative grid size-9 place-items-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-emerald-600"
      href="/wishlist"
    >
      <Heart aria-hidden="true" className="size-5" />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}