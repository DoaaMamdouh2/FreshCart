"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ProductError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error("Product details failed to load:", error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-16">
      <section className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-amber-50 text-amber-600">
          <AlertTriangle aria-hidden="true" className="size-8" />
        </span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">FreshCart</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">We couldn’t load this product</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
          Something went wrong while retrieving the product details. Please try again.
        </p>
        <button className="mx-auto mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" onClick={() => retry()} type="button">
          <RefreshCw aria-hidden="true" className="size-4" /> Try again
        </button>
      </section>
    </main>
  );
}
