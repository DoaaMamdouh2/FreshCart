"use server"

import { headers } from "next/headers";
import { getAuthToken } from "@/lib/auth-token";
import { shippingAddressSchema } from "./checkout.zod";
import type { AddressesResult, CheckoutResult } from "./checkout.interface";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const signInMessage = "Please sign in to continue.";
const networkMessage = "Could not reach the server. Please try again.";
const invalidAddressMessage = "Please check your shipping address.";
const emptyCartMessage = "Your cart is empty.";

async function callApi(token: string, method: "GET" | "POST", path: string, body?: object) {
    const response = await fetch(`${baseUrl}${path}`, {
        method,
        headers: { "Content-Type": "application/json", token },
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
    });
    const data = await response.json().catch(() => null);
    return { ok: response.ok, data };
}

async function getCartId(token: string): Promise<string | null> {
    const result = await callApi(token, "GET", "/api/v1/cart");
    const cartId = result.data?.cartId ?? result.data?.data?._id;
    const itemCount = result.data?.numOfCartItems ?? 0;

    return result.ok && typeof cartId === "string" && itemCount > 0 ? cartId : null;
}

async function getSiteUrl(): Promise<string | null> {
    if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");

    const requestHeaders = await headers();
    const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
    if (!host) return null;

    const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1");
    const protocol = requestHeaders.get("x-forwarded-proto") ?? (isLocal ? "http" : "https");

    return `${protocol}://${host}`;
}

export async function getSavedAddresses(): Promise<AddressesResult> {
    const token = await getAuthToken();
    if (!token) return { success: false, message: signInMessage, addresses: [] };

    try {
        const result = await callApi(token, "GET", "/api/v1/addresses");
        if (!result.ok) {
            return {
                success: false,
                message: result.data?.message ?? "Could not load your saved addresses.",
                addresses: [],
            };
        }

        const addresses = Array.isArray(result.data?.data) ? result.data.data : [];
        return { success: true, message: "OK", addresses };
    } catch {
        return { success: false, message: networkMessage, addresses: [] };
    }
}

export async function placeCashOrder(address: unknown): Promise<CheckoutResult> {
    const parsed = shippingAddressSchema.safeParse(address);
    if (!parsed.success) return { success: false, message: invalidAddressMessage };

    const token = await getAuthToken();
    if (!token) return { success: false, message: signInMessage };

    try {
        const cartId = await getCartId(token);
        if (!cartId) return { success: false, message: emptyCartMessage };

        const result = await callApi(token, "POST", `/api/v1/orders/${cartId}`, {
            shippingAddress: parsed.data,
        });

        if (!result.ok || result.data?.status !== "success") {
            return {
                success: false,
                message: result.data?.message ?? "Could not place your order. Please try again.",
            };
        }

        return { success: true, message: "Order placed successfully." };
    } catch {
        return { success: false, message: networkMessage };
    }
}

export async function startOnlinePayment(address: unknown): Promise<CheckoutResult> {
    const parsed = shippingAddressSchema.safeParse(address);
    if (!parsed.success) return { success: false, message: invalidAddressMessage };

    const token = await getAuthToken();
    if (!token) return { success: false, message: signInMessage };

    try {
        const cartId = await getCartId(token);
        if (!cartId) return { success: false, message: emptyCartMessage };

        const siteUrl = await getSiteUrl();
        if (!siteUrl) return { success: false, message: "Could not start the payment. Please try again." };

        const query = new URLSearchParams({ url: siteUrl });
        const result = await callApi(
            token,
            "POST",
            `/api/v1/orders/checkout-session/${cartId}?${query}`,
            { shippingAddress: parsed.data },
        );

        const url = result.data?.session?.url;
        if (!result.ok || typeof url !== "string" || !url.startsWith("https://checkout.stripe.com/")) {
            return {
                success: false,
                message: result.data?.message ?? "Could not start the payment. Please try again.",
            };
        }

        return { success: true, message: "Redirecting to payment...", url };
    } catch {
        return { success: false, message: networkMessage };
    }
}