"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/components/WishlistProvider/WishlistProvider";

export default function WishlistButton({ productId, name }: { productId: string; name: string }) {
  const router = useRouter();
  const { status } = useSession();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isPending, setIsPending] = useState(false);

  const active = isInWishlist(productId);

  async function handleClick() {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

    setIsPending(true);
    await toggleWishlist(productId);
    setIsPending(false);
  }

  return (
    <button
      aria-label={active ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
      aria-pressed={active}
      className="grid size-7 place-items-center rounded-full border border-gray-200 bg-white/90 text-gray-400 shadow-sm transition hover:border-red-200 hover:text-red-500 focus-visible:outline-2 focus-visible:outline-emerald-600 disabled:opacity-60"
      disabled={isPending}
      onClick={handleClick}
      type="button"
    >
      <Heart aria-hidden="true" className={`size-3.5 ${active ? "fill-current text-red-500" : ""}`} />
    </button>
  );
}