import type { ProductDetailsResponse } from "./productDetails.interface";

export async function getProductDetails(productId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) throw new Error("Product API base URL is not configured.");

  const response = await fetch(`${baseUrl}/api/v1/products/${encodeURIComponent(productId)}`, {
    next: { revalidate: 60 },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Product request failed with status ${response.status}.`);

  const result: ProductDetailsResponse = await response.json();
  return result.data ?? null;
}
