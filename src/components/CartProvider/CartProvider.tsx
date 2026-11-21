"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  addProductToCart,
  clearCart as clearCartRequest,
  getCart,
  removeCartItem,
  updateCartItemCount,
} from "@/app/cart/cart.services";
import type { CartActionResult, CartData } from "@/app/cart/cart.interface";

type CartContextValue = {
  cart: CartData | null;
  itemCount: number;
  isLoading: boolean;
  addToCart: (productId: string) => Promise<CartActionResult>;
  updateCount: (productId: string, count: number) => Promise<CartActionResult>;
  removeItem: (productId: string) => Promise<CartActionResult>;
  clearCart: () => Promise<CartActionResult>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [cart, setCart] = useState<CartData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;

    let ignore = false;

    getCart()
      .then((result) => {
        if (ignore) return;
        if (result.success) setCart(result.cart ?? null);
        setIsLoaded(true);
      })
      .catch(() => {
        if (!ignore) setIsLoaded(true);
      });

    return () => {
      ignore = true;
    };
  }, [status]);

  async function applyResult(request: Promise<CartActionResult>) {
    const result = await request;
    if (result.success) setCart(result.cart ?? null);
    return result;
  }

  async function refreshCart() {
    await applyResult(getCart());
  }

  const isAuthenticated = status === "authenticated";

  const value: CartContextValue = {
    cart: isAuthenticated ? cart : null,
    itemCount: isAuthenticated ? (cart?.products.length ?? 0) : 0,
    isLoading: status === "loading" || (isAuthenticated && !isLoaded),
    addToCart: (productId) => applyResult(addProductToCart(productId)),
    updateCount: (productId, count) => applyResult(updateCartItemCount(productId, count)),
    removeItem: (productId) => applyResult(removeCartItem(productId)),
    clearCart: () => applyResult(clearCartRequest()),
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}