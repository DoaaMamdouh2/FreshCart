"use client";

import Link from "next/link";
import { type FocusEvent, useState } from "react";
import { ChevronDown } from "lucide-react";

type MenuItem = { id: string; name: string };

export default function CategoriesMenu({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  }

  const itemClass =
    "block px-5 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700";

  return (
    <div
      className="relative"
      onBlur={handleBlur}
      onFocus={() => setOpen(true)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 transition-colors hover:text-emerald-600"
        href="/categories"
        onClick={close}
      >
        Categories
        <ChevronDown
          aria-hidden="true"
          className={`size-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Link>

      <div
        className={`absolute top-full left-0 z-50 pt-3 transition ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <ul className="w-60 rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
          <li>
            <Link className={itemClass} href="/categories" onClick={close}>
              All Categories
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.id}>
              <Link className={itemClass} href={`/shop?category=${item.id}`} onClick={close}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}