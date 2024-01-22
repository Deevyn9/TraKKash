import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="md:nav-side__container hidden w-1/5 lg:w-2/12 h-full">
      <ul className="nav-side lg:px-5">
        <Link href="/dashboard" className="sidebar-links">
          <li className="sidebar-links__main hover:text-purple-500">
            main dash
          </li>
        </Link>
        <Link href="/dashboard/income" className="sidebar-links">
          <li className="sidebar-links__main">income</li>
        </Link>
        <Link href="/dashboard/expenses" className="sidebar-links">
          <li className="sidebar-links__main">expenses</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
