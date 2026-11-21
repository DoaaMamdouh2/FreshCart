"use client";

import type { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Banknote, Check, CreditCard, ShieldCheck, Wallet } from "lucide-react";
import type { CheckoutFormType } from "@/app/checkout/checkout.interface";
import SectionCard from "./SectionCard";

type OptionProps = {
  selected: boolean;
  onSelect: () => void;
  icon: ReactNode;
  title: string;
  description: string;
  extra?: ReactNode;
};

function PaymentOption({ selected, onSelect, icon, title, description, extra }: OptionProps) {
  return (
    <button
      aria-checked={selected}
      className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition ${selected ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-green-300"}`}
      onClick={onSelect}
      role="radio"
      type="button"
    >
      <span
        className={`grid size-12 shrink-0 place-items-center rounded-xl ${selected ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"}`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-base font-semibold ${selected ? "text-green-700" : "text-gray-900"}`}>
          {title}
        </span>
        <span className="block text-sm text-gray-500">{description}</span>
        {extra}
      </span>
      {selected ? (
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-green-500 text-white">
          <Check aria-hidden="true" className="size-3.5" />
        </span>
      ) : (
        <span aria-hidden="true" className="size-6 shrink-0 rounded-full border-2 border-gray-300" />
      )}
    </button>
  );
}

function CardBrands() {
  return (
    <span aria-hidden="true" className="mt-2 flex items-center gap-2">
      <span className="rounded bg-blue-700 px-1.5 py-0.5 text-[8px] font-black italic text-white">VISA</span>
      <span className="relative block h-4 w-6">
        <span className="absolute left-0 size-4 rounded-full bg-red-500" />
        <span className="absolute right-0 size-4 rounded-full bg-amber-400/90" />
      </span>
      <span className="rounded bg-sky-600 px-1.5 py-0.5 text-[8px] font-bold text-white">AMEX</span>
    </span>
  );
}

export default function PaymentSection() {
  const { control } = useFormContext<CheckoutFormType>();

  return (
    <SectionCard icon={Wallet} subtitle="Choose how you'd like to pay" title="Payment Method">
      <div className="space-y-4 p-6">
        <Controller
          control={control}
          name="paymentMethod"
          render={({ field }) => (
            <div aria-label="Payment method" className="space-y-4" role="radiogroup">
              <PaymentOption
                description="Pay when your order arrives at your doorstep"
                icon={<Banknote aria-hidden="true" className="size-6" />}
                onSelect={() => field.onChange("cash")}
                selected={field.value === "cash"}
                title="Cash on Delivery"
              />
              <PaymentOption
                description="Secure payment with Credit/Debit Card via Stripe"
                extra={<CardBrands />}
                icon={<CreditCard aria-hidden="true" className="size-6" />}
                onSelect={() => field.onChange("card")}
                selected={field.value === "card"}
                title="Pay Online"
              />
            </div>
          )}
        />

        <div className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-green-100 text-green-600">
            <ShieldCheck aria-hidden="true" className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-gray-800">Secure &amp; Encrypted</p>
            <p className="text-xs text-green-600">Your payment info is protected with 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}