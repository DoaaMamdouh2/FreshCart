export interface WishlistCategory {
  _id: string
  name: string
  slug?: string
  image?: string
}

export interface WishlistProduct {
  _id: string
  id?: string
  title: string
  quantity: number
  price: number
  priceAfterDiscount?: number
  imageCover: string
  category?: WishlistCategory | string
}

export interface WishlistResponse {
  status: string
  count: number
  data: WishlistProduct[]
}

export interface WishlistActionResult {
  success: boolean
  message: string
  products?: WishlistProduct[]
}