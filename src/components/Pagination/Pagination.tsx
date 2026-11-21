import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ShopFilters } from "@/app/shop/shop.interface";
import { buildShopHref } from "@/app/shop/shop.utils";

function getPages(current: number, total: number) {
  const size = 5;
  const start = Math.max(1, Math.min(current - 2, total - size + 1));
  const end = Math.min(total, start + size - 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export default function Pagination({
  filters,
  currentPage,
  totalPages,
}: {
  filters: ShopFilters;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const box = "grid size-10 place-items-center rounded-lg border text-sm transition";
  const idle = "border-gray-200 bg-white text-gray-600 hover:border-green-400 hover:text-green-700";
  const disabled = "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300";

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          aria-label="Previous page"
          className={`${box} ${idle}`}
          href={buildShopHref(filters, { page: currentPage - 1 })}
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </Link>
      ) : (
        <span aria-hidden="true" className={`${box} ${disabled}`}>
          <ChevronLeft className="size-4" />
        </span>
      )}

      {getPages(currentPage, totalPages).map((page) => (
        <Link
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`Page ${page}`}
          className={`${box} ${page === currentPage ? "border-green-600 bg-green-600 font-semibold text-white" : idle}`}
          href={buildShopHref(filters, { page })}
          key={page}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          aria-label="Next page"
          className={`${box} ${idle}`}
          href={buildShopHref(filters, { page: currentPage + 1 })}
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </Link>
      ) : (
        <span aria-hidden="true" className={`${box} ${disabled}`}>
          <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  );
}