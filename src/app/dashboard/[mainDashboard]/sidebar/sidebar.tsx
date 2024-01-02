import React from "react";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="bg-white w-60 flex flex-col uppercase items-center h-full">
      <Link href="/maindash" className="mb-10 mt-10">
        Dashboard
      </Link>
      <Link href="/income" className="mb-10">
        Income
      </Link>
      <Link href="/expense" className="mb-10">
        Expenses
      </Link>
    </div>
  );
};

export default SideBar;
