import Image from "next/image";
import Link from "next/link";
import type { BrandDataType } from "@/app/shop/shop.interface";

export default function BrandCard({ brand }: { brand: BrandDataType }) {
  return (
    <Link
      className="group flex w-full flex-col rounded-2xl border border-gray-100 bg-white p-4 pb-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
      href={`/shop?brand=${brand._id}`}
    >
      <div className="grid aspect-square w-full place-items-center rounded-xl bg-gray-50 p-3">
        <div className="relative h-3/5 w-full bg-white">
          <Image
            alt=""
            className="object-contain p-1 transition duration-300 group-hover:scale-105"
            fill
            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 50vw"
            src={brand.image}
            unoptimized
          />
        </div>
      </div>
      <h2 className="mt-4 text-center text-sm font-semibold text-gray-900">{brand.name}</h2>
    </Link>
  );
}