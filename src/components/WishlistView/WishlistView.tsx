"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useWishlist } from "@/components/WishlistProvider/WishlistProvider";
import WishlistRow, { wishlistColumns } from "./WishlistRow";

const columnHeaders = [
  { label: "Product", className: "" },
  { label: "Price", className: "text-center" },
  { label: "Status", className: "text-center" },
  { label: "Actions", className: "text-center" },
];

function MessageCard({
  title,
  text,
  href,
  action,
}: {
  title: string;
  text: string;
  href: string;
  action: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-red-50 text-red-500">
        <Heart aria-hidden="true" className="size-8" />
      </span>
      <h2 className="mt-4 text-xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">{text}</p>
      <Link
        className="mt-6 inline-flex h-11 items-center rounded-xl bg-green-600 px-6 text-sm font-semibold text-white transition hover:bg-green-700"
        href={href}
      >
        {action}
      </Link>
    </div>
  );
}

export default function WishlistView() {
  const { status } = useSession();
  const { products, count, isLoading } = useWishlist();

  let content;

  if (isLoading) {
    content = (
      <div aria-busy="true" className="space-y-3">
        {[0, 1, 2, 3].map((index) => (
          <div className="h-24 animate-pulse rounded-2xl bg-gray-200" key={index} />
        ))}
      </div>
    );
  } else if (status !== "authenticated") {
    content = (
      <MessageCard
        action="Sign In"
        href="/login"
        text="Your wishlist is saved to your account."
        title="Please sign in to view your wishlist"
      />
    );
  } else if (products.length === 0) {
    content = (
      <MessageCard
        action="Continue Shopping"
        href="/shop"
        text="Tap the heart on any product to save it here."
        title="Your wishlist is empty"
      />
    );
  } else {
    content = (
      <>
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div
            className={`hidden border-b border-gray-100 bg-gray-50 px-6 py-4 text-sm text-gray-500 md:grid ${wishlistColumns}`}
          >
            {columnHeaders.map((header) => (
              <span className={header.className} key={header.label}>
                {header.label}
              </span>
            ))}
          </div>
          <ul>
            {products.map((product) => (
              <WishlistRow key={product._id} product={product} />
            ))}
          </ul>
        </div>

        <Link
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-green-700"
          href="/shop"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Continue Shopping
        </Link>
      </>
    );
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-6 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-gray-500">
            <Link className="hover:text-green-700" href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-gray-800">
              Wishlist
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-xl bg-red-50 text-red-500">
              <Heart aria-hidden="true" className="size-6 fill-current" />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Wishlist</h1>
              {!isLoading && status === "authenticated" ? (
                <p className="text-sm text-gray-500">
                  {count} {count === 1 ? "item" : "items"} saved
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">{content}</div>
    </main>
  );
}