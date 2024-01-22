"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="md:nav-side__container hidden w-1/5 lg:w-2/12 h-full">
      <ul className="nav-side lg:px-5">
        <Link href="/dashboard" className="sidebar-links">
          <li
            className={`sidebar-links__main ${
              pathname === "/dashboard" ? "bg-red-500" : ""
            } hover:text-purple-500`}
          >
            main dash
          </li>
        </Link>
        <Link
          href="/dashboard/income"
          className={`sidebar-links__main ${
            pathname === "/dashboard/income" ? "bg-red-500" : ""
          } hover:text-purple-500`}
        >
          <li className="sidebar-links__main">income</li>
        </Link>
        <Link
          href="/dashboard/expenses"
          className={`sidebar-links__main ${
            pathname === "/dashboard/expenses" ? "bg-red-500" : ""
          } hover:text-purple-500`}
        >
          <li className="sidebar-links__main">expenses</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
