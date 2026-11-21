"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Check, Lock, Mail, Play, Smartphone, Star } from "lucide-react";

const perks = ["Fresh Picks Weekly", "Free Delivery Codes", "Members-Only Deals"];

export default function MobileBottomNavigation() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim() === "") {
      return;
    }
    setIsSubscribed(true);
    setEmail("");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
              <Mail aria-hidden="true" className="size-4" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
              Newsletter • 50,000+ Subscribers
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Get the Freshest Updates <span className="text-emerald-600">Delivered Free</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500">Weekly recipes, seasonal offers &amp; exclusive member perks.</p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {perks.map((perk) => (
              <li
                className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700"
                key={perk}
              >
                <Check aria-hidden="true" className="size-3" />
                {perk}
              </li>
            ))}
          </ul>

          <form className="mt-auto pt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                className="h-11 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none focus:border-emerald-500 focus:bg-white"
                id="newsletter-email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                type="email"
                value={email}
              />
              <button
                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700"
                type="submit"
              >
                Subscribe
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-gray-400">
              <Lock aria-hidden="true" className="size-3" />
              {isSubscribed ? "Thanks for subscribing!" : "Unsubscribe anytime. No spam, ever."}
            </p>
          </form>
        </div>

        <div className="flex flex-col rounded-2xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">
          <span className="mb-4 flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
            <Smartphone aria-hidden="true" className="size-3" />
            Mobile App
          </span>

          <h2 className="text-2xl font-extrabold sm:text-3xl">Shop Faster on Our App</h2>
          <p className="mt-2 text-sm text-slate-300">Get app-exclusive deals &amp; 15% off your first order.</p>

          <div className="mt-6 flex flex-col gap-3">
            <a
              className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 transition hover:border-emerald-500"
              href="#"
            >
              <Smartphone aria-hidden="true" className="size-6" />
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] uppercase text-slate-400">Download on</span>
                <span className="text-sm font-semibold">App Store</span>
              </span>
            </a>
            <a
              className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 transition hover:border-emerald-500"
              href="#"
            >
              <Play aria-hidden="true" className="size-6 text-emerald-400" />
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] uppercase text-slate-400">Get it on</span>
                <span className="text-sm font-semibold">Google Play</span>
              </span>
            </a>
          </div>

          <div className="mt-auto flex items-center gap-2 pt-8 text-xs text-slate-300">
            <span aria-hidden="true" className="flex text-amber-400">
              {Array.from({ length: 5 }, (_, index) => (
                <Star className="size-3.5 fill-current" key={index} />
              ))}
            </span>
            <span className="font-semibold text-white">4.9</span>
            <span>• 100k+ downloads</span>
          </div>
        </div>
      </div>
    </section>
  );
}