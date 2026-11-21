import Link from "next/link";
import {
  Headset,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Electronics", href: "/shop?category=6439d2d167d9aa4ca970649f" },
  { label: "Men's Fashion", href: "/shop?category=6439d5b90049ad0b52b90048" },
  { label: "Women's Fashion", href: "/shop?category=6439d58a0049ad0b52b9003f" },
];

const accountLinks = [
  { label: "My Account", href: "/login" },
  { label: "Order History", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Shopping Cart", href: "/cart" },
  { label: "Sign In", href: "/login" },
  { label: "Create Account", href: "/register" },
];

const supportLinks = [
  { label: "Contact Us", href: "mailto:support@freshcart.com" },
  { label: "Help Center", href: "mailto:support@freshcart.com" },
  { label: "Shipping Info", href: "mailto:support@freshcart.com" },
  { label: "Returns & Refunds", href: "mailto:support@freshcart.com" },
  { label: "Track Order", href: "/account" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const linkClassName = "transition-colors hover:text-emerald-400";

function FooterLinkColumn({ title, links }: { title: string; links: typeof shopLinks }) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">{title}</h2>
      <ul className="space-y-2 text-xs">
        {links.map((link) => (
          <li key={link.label}>
            {link.href.startsWith("mailto:") ? (
              <a className={linkClassName} href={link.href}>
                {link.label}
              </a>
            ) : (
              <Link className={linkClassName} href={link.href}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <>
    <section aria-label="Shopping benefits" className="border-y border-emerald-100 bg-emerald-50/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {[
          { icon: Truck, title: "Free Shipping", detail: "On orders over 500 EGP" },
          { icon: RotateCcw, title: "Easy Returns", detail: "14-day return policy" },
          { icon: ShieldCheck, title: "Secure Payment", detail: "100% secure checkout" },
          { icon: Headset, title: "24/7 Support", detail: "Contact us anytime" },
        ].map(({ icon: Icon, title, detail }) => (
          <div className="flex items-center gap-2.5" key={title}>
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-600"><Icon aria-hidden="true" className="size-4" /></span>
            <span><strong className="block text-xs font-semibold text-gray-800">{title}</strong><span className="text-[10px] text-gray-500">{detail}</span></span>
          </div>
        ))}
      </div>
    </section>
    <footer className="bg-slate-900 pt-10 pb-7 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-slate-800 pb-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="space-y-4 lg:col-span-2">
            <Link
              aria-label="FreshCart home"
              className="inline-flex items-center gap-2 text-2xl font-black text-white"
              href="/"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-emerald-600 text-sm text-white">
                <ShoppingCart aria-hidden="true" className="size-4" />
              </span>
              <span>
                Fresh<span className="text-emerald-500">Cart</span>
              </span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you
              the best brands at competitive prices with a seamless shopping experience.
            </p>
            <address className="space-y-2 text-xs not-italic text-slate-400">
              <a className="flex items-center gap-2 transition-colors hover:text-emerald-400" href="tel:+18001234567">
                <Phone aria-hidden="true" className="size-3.5 text-emerald-500" />
                +1 (800) 123-4567
              </a>
              <a
                className="flex items-center gap-2 transition-colors hover:text-emerald-400"
                href="mailto:support@freshcart.com"
              >
                <Mail aria-hidden="true" className="size-3.5 text-emerald-500" />
                support@freshcart.com
              </a>
              <p className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-emerald-500" />
                123 Commerce Street, New York, NY 10001
              </p>
            </address>
            <div aria-label="Social media" className="flex items-center gap-3 pt-2">
              <a
                aria-label="Facebook"
                className="grid size-8 place-items-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-emerald-600 hover:text-white"
                href="https://www.facebook.com"
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className="text-sm font-bold leading-none">f</span>
              </a>
              <a
                aria-label="Twitter"
                className="grid size-8 place-items-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-emerald-600 hover:text-white"
                href="https://www.twitter.com"
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className="text-xs font-bold leading-none">𝕏</span>
              </a>
              <a
                aria-label="Instagram"
                className="grid size-8 place-items-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-emerald-600 hover:text-white"
                href="https://www.instagram.com"
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className="text-base leading-none">◎</span>
              </a>
              <a
                aria-label="YouTube"
                className="grid size-8 place-items-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-emerald-600 hover:text-white"
                href="https://www.youtube.com"
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className="text-[10px] leading-none">▶</span>
              </a>
            </div>
          </div>

          <FooterLinkColumn title="Shop" links={shopLinks} />
          <FooterLinkColumn title="Account" links={accountLinks} />
          <FooterLinkColumn title="Support" links={supportLinks} />
          <FooterLinkColumn title="Legal" links={legalLinks} />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-slate-500 md:flex-row">
          <p>© 2026 FreshCart. All rights reserved.</p>
          <div aria-label="Accepted payment methods" className="flex items-center gap-4 text-base">
            <span aria-label="Visa" className="font-black italic tracking-tight text-slate-400">
              VISA
            </span>
            <span aria-label="Mastercard" className="relative flex h-5 w-8 items-center">
              <span className="absolute left-0 size-4 rounded-full bg-red-500/90" />
              <span className="absolute right-0 size-4 rounded-full bg-amber-400/90" />
            </span>
            <span aria-label="PayPal" className="font-black italic tracking-tight text-slate-400">
              PayPal
            </span>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}