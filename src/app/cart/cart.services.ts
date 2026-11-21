"use server"

import { getAuthToken } from "@/lib/auth-token";
import type { CartActionResult, CartResponse } from "./cart.interface";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const signInMessage = "Please sign in to use your cart.";
const networkMessage = "Could not reach the server. Please try again.";

type Method = "GET" | "POST" | "PUT" | "DELETE";

async function callCartApi(token: string, method: Method, path = "", body?: object) {
    const response = await fetch(`${baseUrl}/api/v1/cart${path}`, {
        method,
        headers: { "Content-Type": "application/json", token },
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
    });
    const data = await response.json().catch(() => null);
    return { ok: response.ok, status: response.status, data };
}

async function fetchCart(token: string): Promise<CartActionResult> {
    try {
        const result = await callCartApi(token, "GET");

        if (result.status === 404) {
            return { success: true, message: "Your cart is empty.", cart: null };
        }
        if (!result.ok) {
            return { success: false, message: result.data?.message ?? "Could not load your cart." };
        }

        const cart = (result.data as CartResponse).data;
        return { success: true, message: "OK", cart: cart.products.length > 0 ? cart : null };
    } catch {
        return { success: false, message: networkMessage };
    }
}

async function mutateCart(method: Method, path: string, body: object | undefined, errorMessage: string): Promise<CartActionResult> {
    const token = await getAuthToken();
    if (!token) return { success: false, message: signInMessage };

    try {
        const result = await callCartApi(token, method, path, body);
        if (!result.ok) {
            return { success: false, message: result.data?.message ?? errorMessage };
        }
        return await fetchCart(token);
    } catch {
        return { success: false, message: networkMessage };
    }
}

export async function getCart(): Promise<CartActionResult> {
    const token = await getAuthToken();
    if (!token) return { success: false, message: signInMessage };
    return fetchCart(token);
}

export async function addProductToCart(productId: string): Promise<CartActionResult> {
    return mutateCart("POST", "", { productId }, "Could not add this product to your cart.");
}

export async function updateCartItemCount(productId: string, count: number): Promise<CartActionResult> {
    if (!Number.isInteger(count) || count < 1) {
        return { success: false, message: "Quantity must be at least 1." };
    }
    return mutateCart("PUT", `/${encodeURIComponent(productId)}`, { count: String(count) }, "Could not update the quantity.");
}

export async function removeCartItem(productId: string): Promise<CartActionResult> {
    return mutateCart("DELETE", `/${encodeURIComponent(productId)}`, undefined, "Could not remove this item.");
}

export async function clearCart(): Promise<CartActionResult> {
    return mutateCart("DELETE", "", undefined, "Could not clear your cart.");
}