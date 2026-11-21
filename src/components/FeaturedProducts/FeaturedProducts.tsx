import { Daum } from "@/app/(home)/home.interface";
import AddToCart from "@/components/AddToCart/AddToCart";
import ProductActions from "@/components/ProductActions/ProductActions";
import ProductCard, { formatProductPrice } from "@/components/ProductCard/ProductCard";

export default function FeaturedProducts({ products }: { products: Daum[] }) {
  return (
    <section
      aria-labelledby="featured-products-heading"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      id="products"
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="flex items-center text-xl font-bold text-gray-900">
          <span aria-hidden="true" className="mr-2.5 h-6 w-1.5 rounded-full bg-emerald-600" />
          <span id="featured-products-heading">
            Featured <span className="ml-1 text-emerald-600">Products</span>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => {
          const currentPrice = product.priceAfterDiscount ?? product.price;
          const priceText = formatProductPrice(currentPrice);

          return (
            <ProductCard
              key={product._id}
              product={product}
              actions={
  <ProductActions
    productId={product._id}
    image={product.imageCover}
    imageAlt={product.title}
    name={product.title}
    placement="quick"
    price={priceText}
    brand={product.brand.name}
    category={product.category.name}
    description={product.description}
    availableColors={product.availableColors}
    quantity={product.quantity}
    href={`/productDetails/${product._id}`}
  />
}
              footerAction={
                <AddToCart
                  name={product.title}
                  productId={product._id}
                  quantity={product.quantity}
                />
              }
            />
          );
        })}
      </div>
    </section>
  );
}