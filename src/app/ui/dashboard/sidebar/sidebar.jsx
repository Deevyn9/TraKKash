import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="md:nav-side__container hidden w-52 h-full">
      <ul className="nav-side">
        <Link href="/dashboard" className="sidebar-links">
          <li className="sidebar-links__main">main dash</li>
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
