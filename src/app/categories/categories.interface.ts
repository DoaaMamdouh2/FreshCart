export interface CategoryResponse {
  results: number
  metadata: Metadata
  data: CategoryDataType[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface CategoryDataType {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
