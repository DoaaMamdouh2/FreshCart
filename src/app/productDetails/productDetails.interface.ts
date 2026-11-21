export interface ProductDetailsResponse {
  data: ProductDetails;
}

export interface ProductDetails {
  sold: number;
  images: string[];
  subcategory: { _id: string; name: string; slug: string; category: string }[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: { _id: string; name: string; slug: string; image: string };
  brand: { _id: string; name: string; slug: string; image: string };
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: { _id: string; review: string; rating: number; product: string; user: { _id: string; name: string }; createdAt: string; updatedAt: string; __v: number }[];
  id: string;
}
