export type RawSearchParams = Record<string, string | string[] | undefined>

export type SortKey =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "best-selling"
  | "newest"

export type ViewMode = "grid" | "list"

export interface ShopFilters {
  q: string
  categories: string[]
  brands: string[]
  minPrice?: number
  maxPrice?: number
  sort: SortKey
  page: number
  view: ViewMode
}

export interface ShopMetadata {
  currentPage: number
  numberOfPages: number
}

export interface BrandDataType {
  _id: string
  name: string
  slug: string
  image: string
}

export interface BrandResponse {
  results: number
  metadata: ShopMetadata
  data: BrandDataType[]
}