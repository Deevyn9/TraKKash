"use client";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function Nav() {
  const { user, isLoaded } = useUser();

  const username = user?.firstName;

  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 h-24 border-dashed border-2 border-red-500 w-screen"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 uppercase ">
            tra<span className="text-2xl">KK</span>ash
          </a>
        </div>
        {isLoaded && user && (
          <>
            <p className="mr-3">Hi, {username}</p>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </nav>
    </header>
  );
}
