"use client";
import { useState } from "react";
import AddExpenseModal from "./Modals/addExpenseModal";
import AddIncomeModal from "./Modals/addIncomeModal";

const Dashboard = () => {
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  function handleOpenIncomeModal() {
    setIsAddIncomeModalOpen(true);
  }

  function handleCloseIncomeModal() {
    setIsAddIncomeModalOpen(false);
  }

  function handleOpenExpenseModal() {
    setIsAddExpenseModalOpen(true);
  }

  function handleCloseExpenseModal() {
    setIsAddExpenseModalOpen(false);
  }

  return (
    <div className="p-5">
      <AddIncomeModal
        isOpen={isAddIncomeModalOpen}
        closeIncomeModal={handleCloseIncomeModal}
      />
      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        closeExpenseModal={handleCloseExpenseModal}
      />

      <div>
        <h3 className="text-2xl">My Balance</h3>
        <p className="text-7xl font-bold mb-5">$2,000</p>
        <div>
          <button
            className="bg-green-500 w-28 h-10 text-white rounded-lg outline-none cursor-pointer mr-5"
            onClick={() => handleOpenIncomeModal()}
          >
            Add Income
          </button>
          <button
            className="bg-red-500 w-28 h-10 text-white rounded-lg outline-none cursor-pointer"
            onClick={() => handleOpenExpenseModal()}
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
