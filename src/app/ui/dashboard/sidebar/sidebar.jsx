import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="md:nav-side__container hidden w-52 h-full">
      <ul className="nav-side">
        <Link href="/dashboard">
          <li className="">main dash</li>
        </Link>
        <Link href="/dashboard/income">
          <li>income</li>
        </Link>
        <Link href="/dashboard/expenses">
          <li>expenses</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
