"use client";

import { useFormContext } from "react-hook-form";
import { Bookmark, Building2, House, Info, MapPin, Phone, Plus } from "lucide-react";
import type { Address, CheckoutFormType } from "@/app/checkout/checkout.interface";
import SectionCard from "./SectionCard";

type AddressSectionProps = {
  addresses: Address[];
  isLoading: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const iconBox =
  "pointer-events-none absolute left-3 grid size-8 place-items-center rounded-lg bg-gray-100 text-gray-500";
const fieldBase =
  "w-full rounded-xl border bg-white pl-14 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100";

function Label({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label className="mb-2 block text-sm font-medium text-gray-800" htmlFor={htmlFor}>
      {children} <span className="text-red-500">*</span>
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-1.5 text-xs text-red-600" role="alert">
      {message}
    </p>
  );
}

export default function AddressSection({ addresses, isLoading, selectedId, onSelect }: AddressSectionProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CheckoutFormType>();

  function fill(values: { city: string; details: string; phone: string }, validate: boolean) {
    const options = { shouldDirty: true, shouldValidate: validate };
    setValue("city", values.city, options);
    setValue("details", values.details, options);
    setValue("phone", values.phone, options);
  }

  function chooseSaved(address: Address) {
    onSelect(address._id);
    fill(address, true);
  }

  function chooseNew() {
    onSelect("new");
    fill({ city: "", details: "", phone: "" }, false);
  }

  const borderFor = (hasError: boolean) => (hasError ? "border-red-400" : "border-gray-200");

  return (
    <SectionCard icon={House} subtitle="Where should we deliver your order?" title="Shipping Address">
      <div className="space-y-6 p-6">
        {isLoading ? (
          <div aria-busy="true" className="h-24 animate-pulse rounded-xl bg-gray-100" />
        ) : (
          <div>
            {addresses.length > 0 ? (
              <>
                <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
                  <Bookmark aria-hidden="true" className="size-4 text-green-600" />
                  Saved Addresses
                </h3>
                <p className="mt-2 text-sm text-gray-500">Select a saved address or enter a new one below</p>

                <div className="mt-4 space-y-3">
                  {addresses.map((address) => {
                    const selected = selectedId === address._id;

                    return (
                      <button
                        aria-pressed={selected}
                        className={`flex w-full items-start gap-4 rounded-xl border-2 p-4 text-left transition ${selected ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-green-300"}`}
                        key={address._id}
                        onClick={() => chooseSaved(address)}
                        type="button"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-gray-100 text-green-600">
                          <MapPin aria-hidden="true" className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold text-gray-900">{address.name}</span>
                          <span className="block text-sm text-gray-500">{address.details}</span>
                          <span className="mt-1 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Phone aria-hidden="true" className="size-3" />
                              {address.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 aria-hidden="true" className="size-3" />
                              {address.city}
                            </span>
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : null}

            <button
              aria-pressed={selectedId === "new"}
              className={`${addresses.length > 0 ? "mt-3" : ""} flex w-full items-center gap-4 rounded-xl border-2 border-dashed border-green-500 p-4 text-left transition ${selectedId === "new" ? "bg-green-100/70" : "bg-green-50/60 hover:bg-green-50"}`}
              onClick={chooseNew}
              type="button"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-green-500 text-white">
                <Plus aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block font-semibold text-green-700">Use a different address</span>
                <span className="block text-sm text-gray-500">Enter a new shipping address manually</span>
              </span>
            </button>
          </div>
        )}

        <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-green-100 text-blue-600">
            <Info aria-hidden="true" className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-blue-700">Delivery Information</p>
            <p className="text-xs text-blue-600">Please ensure your address is accurate for smooth delivery</p>
          </div>
        </div>

        <div>
          <Label htmlFor="checkout-city">City</Label>
          <div className="relative flex items-center">
            <span className={iconBox}>
              <Building2 aria-hidden="true" className="size-4" />
            </span>
            <input
              aria-invalid={errors.city ? true : undefined}
              autoComplete="address-level2"
              className={`${fieldBase} h-12 pr-4 ${borderFor(!!errors.city)}`}
              id="checkout-city"
              placeholder="e.g. Cairo, Alexandria, Giza"
              type="text"
              {...register("city")}
            />
          </div>
          <FieldError message={errors.city?.message} />
        </div>

        <div>
          <Label htmlFor="checkout-details">Street Address</Label>
          <div className="relative">
            <span className={`${iconBox} top-3.5`}>
              <MapPin aria-hidden="true" className="size-4" />
            </span>
            <textarea
              aria-invalid={errors.details ? true : undefined}
              autoComplete="street-address"
              className={`${fieldBase} min-h-28 resize-none py-3.5 pr-4 ${borderFor(!!errors.details)}`}
              id="checkout-details"
              placeholder="Street name, building number, floor, apartment..."
              rows={3}
              {...register("details")}
            />
          </div>
          <FieldError message={errors.details?.message} />
        </div>

        <div>
          <Label htmlFor="checkout-phone">Phone Number</Label>
          <div className="relative flex items-center">
            <span className={iconBox}>
              <Phone aria-hidden="true" className="size-4" />
            </span>
            <input
              aria-invalid={errors.phone ? true : undefined}
              autoComplete="tel"
              className={`${fieldBase} h-12 pr-40 ${borderFor(!!errors.phone)}`}
              id="checkout-phone"
              inputMode="tel"
              placeholder="01xxxxxxxxx"
              type="tel"
              {...register("phone")}
            />
            <span className="pointer-events-none absolute right-4 text-xs text-gray-400">
              Egyptian numbers only
            </span>
          </div>
          <FieldError message={errors.phone?.message} />
        </div>
      </div>
    </SectionCard>
  );
}