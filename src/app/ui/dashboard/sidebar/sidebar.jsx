"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="md:nav-side__container hidden w-1/5 lg:w-2/12 h-full border-r-2 border-black border-solid border-0">
      <ul className="nav-side">
        <Link href="/dashboard" className={`sidebar-links__main`}>
          <li className="h-full w-full flex items-center px-2 capitalize">
            <span
              className={`${
                pathname === "/dashboard"
                  ? "bg-purple-500"
                  : "hover:text-purple-500"
              } pl-2 w-44 h-11 rounded-md flex items-center`}
            >
              main dashboard
            </span>
          </li>
        </Link>
        <Link href="/dashboard/income" className={`sidebar-links__main`}>
          <li className="h-full w-full flex items-center px-2 capitalize">
            <span
              className={`${
                pathname === "/dashboard/income"
                  ? "bg-purple-500"
                  : "hover:text-purple-500"
              } pl-2 w-44 h-11 rounded-md flex items-center`}
            >
              income
            </span>
          </li>
        </Link>
        <Link href="/dashboard/expenses" className={`sidebar-links__main`}>
          <li className="h-full w-full flex items-center px-2 capitalize">
            <span
              className={`${
                pathname === "/dashboard/expenses"
                  ? "bg-purple-500"
                  : "hover:text-purple-500"
              } pl-2 w-44 h-11 rounded-md flex items-center`}
            >
              expenses
            </span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
