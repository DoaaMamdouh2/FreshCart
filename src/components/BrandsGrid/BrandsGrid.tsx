import { getAllBrands } from "@/app/shop/shop.services";
import BrandCard from "@/components/BrandCard/BrandCard";

const BRANDS_ON_PAGE = 40;

export default async function BrandsGrid() {
  const brands = (await getAllBrands()).slice(0, BRANDS_ON_PAGE);

  if (brands.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">No brands found</h2>
        <p className="mt-2 text-sm text-gray-500">Please try again in a moment.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {brands.map((brand) => (
        <li className="flex" key={brand._id}>
          <BrandCard brand={brand} />
        </li>
      ))}
    </ul>
  );
}