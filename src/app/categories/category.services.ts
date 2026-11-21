import { CategoryDataType, CategoryResponse } from "./categories.interface";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function fetchCategoriesPage(page: number): Promise<CategoryResponse> {
    const response = await fetch(`${baseUrl}/api/v1/categories?limit=100&page=${page}`);
    return response.json();
}

export async function getAllCategories(): Promise<CategoryDataType[]> {
    const first = await fetchCategoriesPage(1);
    const totalPages = first.metadata?.numberOfPages ?? 1;
    const rest = await Promise.all(
        Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => fetchCategoriesPage(index + 2)),
    );

    return [first, ...rest].flatMap((result) => result.data ?? []);
}