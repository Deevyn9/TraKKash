const Dashboard = () => {
    return (
        <div className="p-5">
            <div >
                <h3 className="text-2xl">My Balance</h3>
                <p className="text-7xl font-bold mb-5">$2,000</p>
                <div>
                    <button className="bg-green-500 w-28 h-10 text-white rounded-lg cursor-pointer mr-5">Add Income</button>
                    <button className="bg-red-500 w-28 h-10 text-white rounded-lg cursor-pointer">Add Expense</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard