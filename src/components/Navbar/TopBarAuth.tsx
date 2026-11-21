"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import { useSession } from "next-auth/react";

export default function TopBarAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        aria-hidden="true"
        className="h-4 w-36 animate-pulse rounded bg-gray-200"
      />
    );
  }

  if (status === "authenticated") {
    return (
      <p className="flex items-center gap-2 text-sm text-gray-700">
        <UserRound aria-hidden="true" className="size-4 text-emerald-600" />
        <span>
          Welcome,{" "}
          <span className="inline-block max-w-40 truncate align-bottom font-semibold text-gray-900">
            {session?.user?.name}
          </span>
        </span>
      </p>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <Link
        className="flex items-center gap-1.5 font-medium text-gray-900 hover:text-emerald-700"
        href="/login"
      >
        <UserRound aria-hidden="true" className="size-4 text-emerald-600" />
        Sign In
      </Link>
      <Link
        className="flex items-center gap-1.5 text-gray-500 hover:text-emerald-700"
        href="/register"
      >
        <UserRound aria-hidden="true" className="size-4" />
        Sign Up
      </Link>
    </div>
  );
}