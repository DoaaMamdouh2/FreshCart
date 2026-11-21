import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getAllCategories } from "@/app/categories/category.services";
import CategoriesMenu from "./CategoriesMenu";

const preferredNames = ["Electronics", "Women's Fashion", "Men's Fashion", "Beauty & Health"];

export function CategoriesLinkFallback() {
  return (
    <Link
      className="flex items-center gap-1 transition-colors hover:text-emerald-600"
      href="/categories"
    >
      Categories
      <ChevronDown aria-hidden="true" className="size-3 text-gray-400" />
    </Link>
  );
}

export default async function CategoriesDropdown() {
  const categories = await getAllCategories();

  const preferred = preferredNames.flatMap((name) => {
    const match = categories.find((category) => category.name.toLowerCase() === name.toLowerCase());
    return match ? [match] : [];
  });
  const selected = preferred.length > 0 ? preferred : categories.slice(0, 4);

  return <CategoriesMenu items={selected.map((category) => ({ id: category._id, name: category.name }))} />;
}