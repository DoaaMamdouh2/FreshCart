import type { RawSearchParams, ShopFilters, SortKey } from "./shop.interface";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "best-selling", label: "Best Selling" },
  { value: "newest", label: "Newest" },
];

function isSortKey(value: string | undefined): value is SortKey {
  return sortOptions.some((option) => option.value === value);
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function toList(value: string | string[] | undefined) {
  const text = first(value);
  return text ? text.split(",").filter(Boolean) : [];
}

function toNumber(value: string | string[] | undefined) {
  const text = first(value);
  if (text === undefined || text === "") return undefined;
  const number = Number(text);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

export function parseShopParams(raw: RawSearchParams): ShopFilters {
  const sort = first(raw.sort);
  const page = Number.parseInt(first(raw.page) ?? "1", 10);

  return {
    q: (first(raw.q) ?? "").trim(),
    categories: toList(raw.category),
    brands: toList(raw.brand),
    minPrice: toNumber(raw.min),
    maxPrice: toNumber(raw.max),
    sort: isSortKey(sort) ? sort : "relevance",
    page: Number.isInteger(page) && page > 0 ? page : 1,
    view: first(raw.view) === "list" ? "list" : "grid",
  };
}

export function buildShopHref(filters: ShopFilters, changes: Partial<ShopFilters> = {}) {
  const next = { ...filters, ...changes };
  const params = new URLSearchParams();

  if (next.q) params.set("q", next.q);
  if (next.categories.length > 0) params.set("category", next.categories.join(","));
  if (next.brands.length > 0) params.set("brand", next.brands.join(","));
  if (next.minPrice !== undefined) params.set("min", String(next.minPrice));
  if (next.maxPrice !== undefined) params.set("max", String(next.maxPrice));
  if (next.sort !== "relevance") params.set("sort", next.sort);
  if (next.view !== "grid") params.set("view", next.view);
  if (next.page > 1) params.set("page", String(next.page));

  const query = params.toString();
  return query ? `/shop?${query}` : "/shop";
}

export function hasActiveFilters(filters: ShopFilters) {
  return (
    filters.q !== "" ||
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined
  );
}