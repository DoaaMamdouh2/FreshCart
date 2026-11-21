import { getAllCategories } from "@/app/categories/category.services";
import CategoryCard from "@/components/CategoryCard/CategoryCard";

export default async function CategoriesGrid() {
  const categories = await getAllCategories();

  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">No categories found</h2>
        <p className="mt-2 text-sm text-gray-500">Please try again in a moment.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {categories.map((category) => (
        <li className="flex" key={category._id}>
          <CategoryCard category={category} />
        </li>
      ))}
    </ul>
  );
}