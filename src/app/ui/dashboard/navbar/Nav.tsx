"use client";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";

export default function Nav() {
  const { user, isLoaded } = useUser();
  const [openNav, setOpenNav] = useState(false);

  const username = user?.firstName;

  function handleOpenNav() {
    setOpenNav(!openNav);
  }

  return (
    <header className="nav-side__container h-20 lg:h-24 w-screen">
      <nav
        aria-label="Global"
        className="nav-side flex justify-between items-center"
      >
        <div className="md:hidden z-50" onClick={handleOpenNav}>
          B
        </div>
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
      {openNav && (
        <div
          className={`absolute w-screen h-screen top-0 ${
            openNav ? "left-0 bg-red-500" : "-left-8 bg-white"
          }`}
        ></div>
      )}
    </header>
  );
}
