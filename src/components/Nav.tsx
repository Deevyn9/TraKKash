"use client";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function Nav() {
  const { user, isLoaded } = useUser();

  return (
    <header>
      <nav
        className="fixed flex items-center justify-between p-6 lg:px-8 h-20 border-dashed border-2 border-red-500 w-screen"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 uppercase ">
            tra<span className="text-2xl">KK</span>ash
          </a>
        </div>
        {isLoaded && user && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </nav>
    </header>
  );
}
