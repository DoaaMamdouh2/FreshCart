import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Star, Truck } from "lucide-react";
import ProductCard, { formatProductPrice } from "@/components/ProductCard/ProductCard";
import AddToCart from "@/components/AddToCart/AddToCart";
import ProductActions from "@/components/ProductActions/ProductActions";
import ProductDetailPanel from "@/components/ProductDetailPanel/ProductDetailPanel";
import { getAllProducts } from "@/app/(home)/home.services";
import type { Daum } from "@/app/(home)/home.interface";
import { getProductDetails } from "../productDetails.services";

function ProductDetailsSkeleton() {
  return (
    <div aria-busy="true" className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 lg:px-8">
      <div className="mb-6 h-4 w-72 animate-pulse rounded bg-gray-200" />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-2xl bg-gray-200" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="h-32 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

async function ProductDetailsContent({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = await getProductDetails(productId);
  if (!product) notFound();

  let relatedProducts: Daum[] = [];
  try {
    const products = await getAllProducts();
    relatedProducts = products.filter((item) => item.id !== product.id && item._id !== product._id).slice(0, 5);
  } catch {
    relatedProducts = [];
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <Link className="hover:text-emerald-700" href="/">Home</Link><span>/</span>
        <Link className="hover:text-emerald-700" href="/categories">{product.category.name}</Link><span>/</span>
        {product.subcategory[0] ? <><span>{product.subcategory[0].name}</span><span>/</span></> : null}
        <span aria-current="page" className="font-medium text-gray-800">{product.title}</span>
      </nav>

      <ProductDetailPanel product={product} />

      <section className="mt-8 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-wrap border-b border-gray-100 text-xs font-semibold text-gray-600">
          <a className="border-b-2 border-emerald-600 bg-emerald-50/50 px-5 py-3 text-emerald-700" href="#product-details">▣&nbsp; Product Details</a>
          <a className="px-5 py-3 hover:text-emerald-700" href="#reviews"><Star className="mr-1 inline size-3.5 fill-current" /> Reviews ({product.ratingsQuantity})</a>
          <a className="px-5 py-3 hover:text-emerald-700" href="#shipping"><Truck className="mr-1 inline size-3.5" /> Shipping &amp; Returns</a>
        </div>
        <div className="p-4 sm:p-5" id="product-details">
          <h2 className="text-sm font-bold text-gray-800">About this Product</h2>
          <p className="mt-2 text-xs leading-6 text-gray-600">{product.description}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-3">
              <h3 className="mb-2 text-xs font-semibold text-gray-800">Product Information</h3>
              <dl className="space-y-2 text-xs">
                {[["Category", product.category.name], ["Subcategory", product.subcategory[0]?.name ?? "—"], ["Brand", product.brand.name], ["Items Sold", String(product.sold)]].map(([label, value]) => <div className="flex justify-between gap-4 text-gray-500" key={label}><dt>{label}</dt><dd className="font-medium text-gray-700">{value}</dd></div>)}
              </dl>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <h3 className="mb-2 text-xs font-semibold text-gray-800">Key Features</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                {["Premium quality product", "Authenticity guaranteed", "Fast and secure packaging", "Quality tested"].map((feature) => <li className="flex items-center gap-2" key={feature}><Check className="size-3.5 text-emerald-600" />{feature}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 p-4 sm:p-5" id="reviews">
          <div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-bold text-gray-800">Customer Reviews</h2><span className="text-xs text-gray-500">{product.ratingsAverage.toFixed(1)} / 5 · {product.ratingsQuantity} reviews</span></div>
          {product.reviews.length ? <div className="grid gap-3 sm:grid-cols-2">{product.reviews.slice(0, 4).map((review) => <article className="rounded-lg bg-gray-50 p-3" key={review._id}><div className="flex items-center justify-between"><h3 className="text-xs font-semibold text-gray-800">{review.user.name}</h3><span className="text-xs text-amber-500">{"★".repeat(Math.max(0, Math.min(5, review.rating)))}</span></div><p className="mt-2 text-xs leading-5 text-gray-600">{review.review}</p></article>)}</div> : <p className="text-xs text-gray-500">No written reviews yet.</p>}
        </div>
        <div className="border-t border-gray-100 p-4 sm:p-5" id="shipping"><h2 className="text-sm font-bold text-gray-800">Shipping &amp; Returns</h2><p className="mt-2 text-xs leading-5 text-gray-600">Free delivery on qualifying orders. Returns are accepted within 30 days of delivery.</p></div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="mt-10" aria-labelledby="related-products-heading">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center text-lg font-bold text-gray-900" id="related-products-heading">
              <span className="mr-2.5 h-6 w-1.5 rounded-full bg-emerald-600" />
              You May Also <span className="ml-1 text-emerald-600">Like</span>
            </h2>
            <span className="text-xs text-gray-400">Related products</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {relatedProducts.map((item) => (
              <ProductCard
                className="p-2.5"
                key={item._id}
                product={item}
                actions={
                  <ProductActions
                    productId={item._id}
                    href={`/productDetails/${item._id}`}
                    image={item.imageCover}
                    imageAlt={item.title}
                    name={item.title}
                    placement="quick"
                    price={formatProductPrice(item.priceAfterDiscount ?? item.price)}
                    quantity={item.quantity}
                  />
                }
                footerAction={
                  <AddToCart
                    name={item.title}
                    productId={item._id}
                    quantity={item.quantity}
                  />
                }
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default function ProductDetailsPage({ params }: PageProps<"/productDetails/[productId]">) {
  return (
    <main className="flex-1 bg-white">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetailsContent params={params} />
      </Suspense>
    </main>
  );
}