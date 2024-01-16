"use client";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Nav() {
  const { user, isLoaded } = useUser();

  const username = user?.firstName;

  return (
    <header className="nav-side__container h-20 lg:h-24 border-dashed border-2 border-red-500 w-screen">
      <nav
        aria-label="Global"
        className="nav-side flex justify-between items-center"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            tra<span className="text-xl text-purple-500">KK</span>ash
          </a>
        </div>
        {isLoaded && user && (
          <>
            <p className="hidden mr-3 lg:flex">Hi, {username}</p>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </nav>
    </header>
  );
}
