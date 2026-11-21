import Link from "next/link";
import { CircleCheck } from "lucide-react";

export default function AllOrdersPage() {
  return (
    <main className="flex-1 bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 shadow-sm">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-green-50 text-green-600">
            <CircleCheck aria-hidden="true" className="size-10" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">Thank you for your order!</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            We&apos;ve received your order and will start preparing it right away.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              className="inline-flex h-11 items-center rounded-xl bg-green-600 px-6 text-sm font-semibold text-white transition hover:bg-green-700"
              href="/shop"
            >
              Continue Shopping
            </Link>
            <Link
              className="inline-flex h-11 items-center rounded-xl border border-gray-200 px-6 text-sm font-semibold text-gray-700 transition hover:border-green-300 hover:text-green-700"
              href="/"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}