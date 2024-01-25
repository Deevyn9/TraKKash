"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="md:nav-side__container hidden w-1/5 lg:w-2/12 h-full border-r-2 border-black border-solid border-0">
      <ul className="nav-side">
        <Link href="/dashboard" className={`sidebar-links__main`}>
          <li
            className={`sidebar-links__main ${
              pathname === "/dashboard"
                ? "bg-purple-500 text-white"
                : "hover:text-purple-500"
            } h-full w-full flex items-center px-2 capitalize`}
          >
            main dashboard
          </li>
        </Link>
        <Link href="/dashboard/income" className={`sidebar-links__main`}>
          <li
            className={`sidebar-links__main ${
              pathname === "/dashboard/income"
                ? "bg-purple-500 text-white"
                : "hover:text-purple-500"
            } h-full w-full flex items-center px-2 capitalize`}
          >
            income
          </li>
        </Link>
        <Link href="/dashboard/expenses" className={`sidebar-links__main`}>
          <li
            className={`sidebar-links__main ${
              pathname === "/dashboard/expenses"
                ? "bg-purple-500 text-white"
                : "hover:text-purple-500"
            } h-full w-full flex items-center px-2 capitalize`}
          >
            expenses
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
