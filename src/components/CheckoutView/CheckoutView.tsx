"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ReceiptText, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/components/CartProvider/CartProvider";
import { getSavedAddresses, placeCashOrder, startOnlinePayment } from "@/app/checkout/checkout.services";
import { checkoutSchema } from "@/app/checkout/checkout.zod";
import type { Address, CheckoutFormType } from "@/app/checkout/checkout.interface";
import AddressSection from "./AddressSection";
import CheckoutSummary from "./CheckoutSummary";
import PaymentSection from "./PaymentSection";

function MessageCard({ title, text, href, action }: { title: string; text: string; href: string; action: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-green-50 text-green-600">
        <ShoppingCart aria-hidden="true" className="size-8" />
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

export default function CheckoutView() {
  const router = useRouter();
  const { status } = useSession();
  const { cart, isLoading, refreshCart } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressesLoaded, setAddressesLoaded] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const methods = useForm<CheckoutFormType>({
    defaultValues: { city: "", details: "", phone: "", paymentMethod: "cash" },
    mode: "onTouched",
    resolver: zodResolver(checkoutSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (status !== "authenticated") return;

    let ignore = false;

    getSavedAddresses()
      .then((result) => {
        if (ignore) return;
        setAddresses(result.addresses);
        setAddressesLoaded(true);
      })
      .catch(() => {
        if (!ignore) setAddressesLoaded(true);
      });

    return () => {
      ignore = true;
    };
  }, [status]);

  async function onSubmit(data: CheckoutFormType) {
    setMessage("");

    const address = { city: data.city, details: data.details, phone: data.phone };

    try {
      if (data.paymentMethod === "cash") {
        const result = await placeCashOrder(address);

        if (!result.success) {
          setMessage(result.message);
          return;
        }

        await refreshCart();
        router.push("/allorders");
        return;
      }

      const result = await startOnlinePayment(address);

      if (!result.success || !result.url) {
        setMessage(result.message);
        return;
      }

      setIsRedirecting(true);
      window.location.assign(result.url);
    } catch {
      setMessage("Something went wrong. Please try again.");
    }
  }

  const isBusy = isSubmitting || isRedirecting;
  const isLoadingAddresses = status === "authenticated" && !addressesLoaded;

  let content;

  if (isLoading) {
    content = (
      <div aria-busy="true" className="grid gap-6 lg:grid-cols-3">
        <div className="h-96 animate-pulse rounded-2xl bg-gray-200 lg:col-span-2" />
        <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
      </div>
    );
  } else if (status !== "authenticated") {
    content = (
      <MessageCard
        action="Sign In"
        href="/login"
        text="You need to be signed in to complete your order."
        title="Please sign in to checkout"
      />
    );
  } else if (!cart || cart.products.length === 0) {
    content = (
      <MessageCard
        action="Continue Shopping"
        href="/shop"
        text="Add some products before you checkout."
        title="Your cart is empty"
      />
    );
  } else {
    content = (
      <FormProvider {...methods}>
        <form className="grid items-start gap-6 lg:grid-cols-3" noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 lg:col-span-2">
            <AddressSection
              addresses={addresses}
              isLoading={isLoadingAddresses}
              onSelect={setSelectedAddressId}
              selectedId={selectedAddressId}
            />
            <PaymentSection />
          </div>
          <CheckoutSummary cart={cart} isBusy={isBusy} isRedirecting={isRedirecting} message={message} />
        </form>
      </FormProvider>
    );
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-gray-500">
          <Link className="hover:text-green-700" href="/">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link className="hover:text-green-700" href="/cart">
            Cart
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-gray-800">
            Checkout
          </span>
        </nav>

        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-xl bg-green-600 text-white shadow-sm">
                <ReceiptText aria-hidden="true" className="size-6" />
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Complete Your Order</h1>
            </div>
            <p className="mt-3 text-sm text-gray-500">Review your items and complete your purchase</p>
          </div>
          <Link
            className="flex items-center gap-2 pt-3 text-sm font-medium text-green-600 transition hover:text-green-700"
            href="/cart"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to Cart
          </Link>
        </header>

        {content}
      </div>
    </main>
  );
}