"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist as removeFromWishlistRequest,
} from "@/app/wishlist/wishlist.services";
import type { WishlistActionResult, WishlistProduct } from "@/app/wishlist/wishlist.interface";

type WishlistContextValue = {
  products: WishlistProduct[];
  count: number;
  isLoading: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<WishlistActionResult>;
  removeProduct: (productId: string) => Promise<WishlistActionResult>;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export default function WishlistProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;

    let ignore = false;

    getWishlist()
      .then((result) => {
        if (ignore) return;
        if (result.success) setProducts(result.products ?? []);
        setIsLoaded(true);
      })
      .catch(() => {
        if (!ignore) setIsLoaded(true);
      });

    return () => {
      ignore = true;
    };
  }, [status]);

  async function applyResult(request: Promise<WishlistActionResult>) {
    const result = await request;
    if (result.success) setProducts(result.products ?? []);
    return result;
  }

  const isAuthenticated = status === "authenticated";
  const currentProducts = isAuthenticated ? products : [];

  const value: WishlistContextValue = {
    products: currentProducts,
    count: currentProducts.length,
    isLoading: status === "loading" || (isAuthenticated && !isLoaded),
    isInWishlist: (productId) => currentProducts.some((product) => product._id === productId),
    toggleWishlist: (productId) =>
      applyResult(
        currentProducts.some((product) => product._id === productId)
          ? removeFromWishlistRequest(productId)
          : addToWishlist(productId),
      ),
    removeProduct: (productId) => applyResult(removeFromWishlistRequest(productId)),
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
}