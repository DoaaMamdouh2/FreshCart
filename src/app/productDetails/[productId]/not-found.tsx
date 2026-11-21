import Link from "next/link";
import { ArrowLeft, SearchX, ShoppingBag } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-16">
      <section className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <SearchX aria-hidden="true" className="size-8" />
        </span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">FreshCart Product</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">Product not found</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
          This product may have been removed or the link may be incorrect. Browse the shop to find something you love.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700" href="/shop">
            <ShoppingBag aria-hidden="true" className="size-4" /> Browse products
          </Link>
          <Link className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 text-sm font-semibold text-gray-700 transition hover:border-emerald-300 hover:text-emerald-700" href="/">
            <ArrowLeft aria-hidden="true" className="size-4" /> Back home
          </Link>
        </div>
      </section>
    </main>
  );
}
