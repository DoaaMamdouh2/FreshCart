"use server"

import { getAuthToken } from "@/lib/auth-token";
import type { WishlistActionResult, WishlistResponse } from "./wishlist.interface";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const signInMessage = "Please sign in to use your wishlist.";
const networkMessage = "Could not reach the server. Please try again.";

type Method = "GET" | "POST" | "DELETE";

async function callWishlistApi(token: string, method: Method, path = "", body?: object) {
    const response = await fetch(`${baseUrl}/api/v1/wishlist${path}`, {
        method,
        headers: { "Content-Type": "application/json", token },
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
    });
    const data = await response.json().catch(() => null);
    return { ok: response.ok, data };
}

async function fetchWishlist(token: string): Promise<WishlistActionResult> {
    try {
        const result = await callWishlistApi(token, "GET");

        if (!result.ok) {
            return { success: false, message: result.data?.message ?? "Could not load your wishlist." };
        }

        const response = result.data as WishlistResponse;
        return { success: true, message: "OK", products: response.data ?? [] };
    } catch {
        return { success: false, message: networkMessage };
    }
}

async function mutateWishlist(method: Method, path: string, body: object | undefined, errorMessage: string): Promise<WishlistActionResult> {
    const token = await getAuthToken();
    if (!token) return { success: false, message: signInMessage };

    try {
        const result = await callWishlistApi(token, method, path, body);
        if (!result.ok) {
            return { success: false, message: result.data?.message ?? errorMessage };
        }
        return await fetchWishlist(token);
    } catch {
        return { success: false, message: networkMessage };
    }
}

export async function getWishlist(): Promise<WishlistActionResult> {
    const token = await getAuthToken();
    if (!token) return { success: false, message: signInMessage };
    return fetchWishlist(token);
}

export async function addToWishlist(productId: string): Promise<WishlistActionResult> {
    return mutateWishlist("POST", "", { productId }, "Could not add this product to your wishlist.");
}

export async function removeFromWishlist(productId: string): Promise<WishlistActionResult> {
    return mutateWishlist("DELETE", `/${encodeURIComponent(productId)}`, undefined, "Could not remove this product.");
}