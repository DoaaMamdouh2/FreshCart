"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Check, CircleAlert, LoaderCircle, Plus } from "lucide-react";
import { useCart } from "@/components/CartProvider/CartProvider";

type AddToCartProps = {
  productId: string;
  name: string;
  quantity?: number;
};

type ButtonState = "idle" | "pending" | "added" | "error";

export default function AddToCart({ productId, name, quantity }: AddToCartProps) {
  const router = useRouter();
  const { status } = useSession();
  const { addToCart } = useCart();
  const [state, setState] = useState<ButtonState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const outOfStock = quantity !== undefined && quantity <= 0;

  async function handleClick() {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

    setState("pending");
    const result = await addToCart(productId);

    if (result.success) {
      setErrorMessage("");
      setState("added");
    } else {
      setErrorMessage(result.message);
      setState("error");
    }

    window.setTimeout(() => setState("idle"), 1800);
  }

  const label = outOfStock
    ? `${name} is out of stock`
    : state === "added"
      ? `${name} added to cart`
      : state === "error"
        ? errorMessage
        : `Add ${name} to cart`;

  const color = outOfStock
    ? "cursor-not-allowed bg-gray-300"
    : state === "error"
      ? "bg-red-500"
      : "bg-emerald-600 hover:bg-emerald-700";

  return (
    <>
      <button
        aria-label={label}
        className={`grid size-7 shrink-0 place-items-center rounded-full text-white shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${color}`}
        disabled={outOfStock || state === "pending"}
        onClick={handleClick}
        title={state === "error" ? errorMessage : undefined}
        type="button"
      >
        {state === "pending" ? (
          <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" />
        ) : state === "added" ? (
          <Check aria-hidden="true" className="size-3.5" />
        ) : state === "error" ? (
          <CircleAlert aria-hidden="true" className="size-3.5" />
        ) : (
          <Plus aria-hidden="true" className="size-3.5" />
        )}
      </button>
      <span aria-live="polite" className="sr-only" role="status">
        {state === "added" ? `${name} added to cart` : state === "error" ? errorMessage : ""}
      </span>
    </>
  );
}