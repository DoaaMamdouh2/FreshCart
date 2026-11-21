import { Suspense } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Headset,
  Mail,
  Phone,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Truck,
} from "lucide-react";
import CartLink from "./CartLink";
import CategoriesDropdown, { CategoriesLinkFallback } from "./CategoriesDropdown";
import WishlistLink from "./WishlistLink";
import TopBarAuth from "./TopBarAuth";
import UserMenu from "./UserMenu";

const navigationLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories", dropdown: true },
  { label: "Brands", href: "/brands" },
];

export default function Navbar() {
  return (
    <>
      <div className="hidden border-b border-gray-200 bg-gray-100 py-2 text-xs text-gray-600 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Truck aria-hidden="true" className="size-4 text-emerald-600" />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Sparkles aria-hidden="true" className="size-4 text-emerald-600" />
              New Arrivals Daily
            </span>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <a className="flex items-center gap-1.5 transition-colors hover:text-emerald-600" href="tel:+18001234567">
              <Phone aria-hidden="true" className="size-3.5 text-gray-400" />
              +1 (800) 123-4567
            </a>
            <a className="hidden items-center gap-1.5 transition-colors hover:text-emerald-600 lg:flex" href="mailto:support@freshcart.com">
              <Mail aria-hidden="true" className="size-3.5 text-gray-400" />
              support@freshcart.com
            </a>
            <div className="flex items-center gap-3 border-l border-gray-300 pl-4">
              <TopBarAuth />
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-5 gap-y-3 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link
            aria-label="FreshCart home"
            className="flex shrink-0 items-center gap-2 text-2xl font-black tracking-tight text-slate-800"
            href="/"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-500/30">
              <ShoppingCart aria-hidden="true" className="size-5" />
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              Fresh<span className="text-emerald-600">Cart</span>
            </span>
          </Link>

          <form
            action="/shop"
            className="relative order-last w-full md:order-0 md:ml-0 md:flex-1 md:max-w-2xl"
            role="search"
          >
            <label className="sr-only" htmlFor="freshcart-search">
              Search products
            </label>
            <input
              className="w-full rounded-xl border border-transparent bg-gray-100/80 py-2 pl-9 pr-10 text-xs text-gray-700 placeholder:text-gray-400 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 md:rounded-lg md:border-gray-300 md:bg-gray-50/50 md:py-2 md:pl-4 md:pr-11 md:text-sm"
              id="freshcart-search"
              name="q"
              placeholder="Search for products, brands and more..."
              type="search"
            />
            <button
              aria-label="Search"
              className="absolute left-3 top-1/2 grid size-5 -translate-y-1/2 place-items-center text-gray-400 md:hidden"
              type="submit"
            >
              <Search aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label="Search filters"
              className="absolute right-3 top-1/2 grid size-5 -translate-y-1/2 place-items-center text-gray-400 transition hover:text-gray-600 md:hidden"
              type="button"
            >
              <SlidersHorizontal aria-hidden="true" className="size-3.5" />
            </button>
            <button
              aria-label="Search"
              className="absolute right-1 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-md bg-emerald-600 text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 md:grid"
              type="submit"
            >
              <Search aria-hidden="true" className="size-4" />
            </button>
          </form>

          <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-medium text-gray-700 lg:flex">
            {navigationLinks.map((item) =>
              item.label === "Categories" ? (
                <Suspense fallback={<CategoriesLinkFallback />} key={item.label}>
                  <CategoriesDropdown />
                </Suspense>
              ) : (
                <Link
                  aria-current={item.active ? "page" : undefined}
                  className={`flex items-center gap-1 transition-colors hover:text-emerald-600 ${item.active ? "text-emerald-600" : ""}`}
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                  {item.dropdown ? <ChevronDown aria-hidden="true" className="size-3 text-gray-400" /> : null}
                </Link>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2 text-gray-700 sm:gap-4">
            <div className="hidden items-center gap-2 border-r border-gray-200 pr-4 text-left xl:flex">
              <span className="grid size-8 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Headset aria-hidden="true" className="size-4" />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-600">Support</span>
                <span className="text-xs font-semibold text-gray-800">24/7 Help</span>
              </span>
            </div>

            <WishlistLink />

            <CartLink />

            <UserMenu />
          </div>
        </div>
      </header>
    </>
  );
}