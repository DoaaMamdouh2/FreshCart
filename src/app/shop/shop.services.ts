import type { Daum } from "@/app/(home)/home.interface";
import type { BrandDataType, ShopFilters, ShopMetadata } from "./shop.interface";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const PAGE_SIZE = 40;

type PageResponse<T> = {
    data?: T[];
    metadata?: { numberOfPages?: number };
};

async function fetchAll<T>(path: string): Promise<T[]> {
    async function fetchPage(page: number) {
        const response = await fetch(`${baseUrl}${path}?limit=100&page=${page}`);
        return (await response.json()) as PageResponse<T>;
    }

    const first = await fetchPage(1);
    const totalPages = first.metadata?.numberOfPages ?? 1;
    const rest = await Promise.all(
        Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => fetchPage(index + 2)),
    );

    return [first, ...rest].flatMap((result) => result.data ?? []);
}

function currentPrice(product: Daum) {
    return product.priceAfterDiscount ?? product.price;
}

function matchesFilters(product: Daum, filters: ShopFilters) {
    const price = currentPrice(product);

    if (filters.q) {
        const text = `${product.title} ${product.brand.name} ${product.category.name}`.toLowerCase();
        if (!text.includes(filters.q.toLowerCase())) return false;
    }
    if (filters.categories.length > 0 && !filters.categories.includes(product.category._id)) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand._id)) return false;
    if (filters.minPrice !== undefined && price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && price > filters.maxPrice) return false;

    return true;
}

function sortProducts(products: Daum[], sort: ShopFilters["sort"]) {
    const list = [...products];

    switch (sort) {
        case "price-asc":
            return list.sort((a, b) => currentPrice(a) - currentPrice(b));
        case "price-desc":
            return list.sort((a, b) => currentPrice(b) - currentPrice(a));
        case "rating":
            return list.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
        case "best-selling":
            return list.sort((a, b) => b.sold - a.sold);
        case "newest":
            return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        default:
            return list;
    }
}

export async function getProducts(filters: ShopFilters): Promise<{ products: Daum[]; metadata: ShopMetadata }> {
    const all = await fetchAll<Daum>("/api/v1/products");
    const sorted = sortProducts(all.filter((product) => matchesFilters(product, filters)), filters.sort);

    const numberOfPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    const currentPage = Math.min(filters.page, numberOfPages);
    const start = (currentPage - 1) * PAGE_SIZE;

    return {
        products: sorted.slice(start, start + PAGE_SIZE),
        metadata: { currentPage, numberOfPages },
    };
}

export async function getAllBrands(): Promise<BrandDataType[]> {
    return fetchAll<BrandDataType>("/api/v1/brands");
}