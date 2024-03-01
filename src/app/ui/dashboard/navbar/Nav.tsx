"use client";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";

export default function Nav() {
  const { user, isLoaded } = useUser();
  const [openNav, setOpenNav] = useState(false);

  const username = user?.firstName;

  function handleOpenNav() {
    setOpenNav(!openNav);
  }

  return (
    <header className="nav-side__container border-b-2 border-black border-solid h-16 md:h-24 w-screen">
      <nav
        aria-label="Global"
        className="nav-side  flex justify-between items-center px-4"
      >
        <div className="md:hidden z-40" onClick={handleOpenNav}>
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          )}
        </div>
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 font-semibold text-xl">
            tra<span className="text-purple-500">kk</span>ash
          </a>
        </div>
        {isLoaded && user && (
          <>
            <p className="hidden mr-3 lg:flex font-semibold text-xl">
              Hi, {username}
            </p>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </nav>
      {openNav && (
        <div
          className={`absolute w-screen h-screen top-0 ${
            openNav ? "left-0 bg-black" : "-left-8 bg-black"
          } p-2`}
        >
          <div className="w-full h-full rounded-lg">
            <ul className="mt-28">
              <Link
                href="/dashboard"
                onClick={handleOpenNav}
                className="burger-links"
              >
                <li className="burger-links__main">main dashboard</li>
              </Link>
              <Link
                href="/dashboard/income"
                onClick={handleOpenNav}
                className="burger-links"
              >
                <li className="burger-links__main">income</li>
              </Link>
              <Link
                href="/dashboard/expenses"
                onClick={handleOpenNav}
                className="burger-links"
              >
                <li className="burger-links__main">expenses</li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
