import Link from "next/link"

const Sidebar = () => {
    return (
        <div className="w-52 border-2 border-dashed border-yellow-500 h-screen">
            <ul>
            <Link href="/dashboard">
                    <li>main dash</li>
                </Link>
                <Link href="/dashboard/income">
                    <li>income</li>
                </Link>
                <Link href="/dashboard/expenses">
                    <li>expenses</li>
                </Link>
            </ul>
        </div>
    )
}

export default Sidebar