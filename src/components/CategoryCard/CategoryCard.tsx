import Image from "next/image";
import Link from "next/link";
import type { CategoryDataType } from "@/app/categories/categories.interface";

export default function CategoryCard({ category }: { category: CategoryDataType }) {
  return (
    <Link
      className="group flex w-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      href={`/shop?category=${category._id}`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          alt=""
          className="object-cover transition duration-300 group-hover:scale-105"
          fill
          sizes="(min-width: 1280px) 230px, (min-width: 1024px) 25vw, 50vw"
          src={category.image}
          unoptimized
        />
      </div>
      <h2 className="mt-5 pb-3 text-center text-lg font-bold text-gray-900">{category.name}</h2>
    </Link>
  );
}