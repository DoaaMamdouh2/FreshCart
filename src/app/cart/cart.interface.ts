export interface CartCategory {
  _id: string
  name: string
  slug: string
  image: string
}

export interface CartProductDetails {
  _id: string
  id: string
  title: string
  quantity: number
  imageCover: string
  category: CartCategory
  ratingsAverage: number
}

export interface CartProduct {
  _id: string
  count: number
  price: number
  product: CartProductDetails
}

export interface CartData {
  _id: string
  cartOwner: string
  products: CartProduct[]
  totalCartPrice: number
}

export interface CartResponse {
  status: string
  message?: string
  numOfCartItems: number
  cartId: string
  data: CartData
}

export interface CartActionResult {
  success: boolean
  message: string
  cart?: CartData | null
}