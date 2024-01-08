"use client";
import { useRef, useState } from "react";
import AddExpenseModal from "./Modals/addExpenseModal";
import AddIncomeModal from "./Modals/addIncomeModal";
import { db } from "../../../firebase/index";
import { collection, addDoc } from "firebase/firestore";

const Dashboard = () => {
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const incomeAmountRef = useRef();
  const incomeDescriptionRef = useRef();
  const expenseAmountRef = useRef();
  const expenseDescriptionRef = useRef();

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

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: incomeAmountRef.current.value,
      description: incomeDescriptionRef.current.value,
      createdAt: new Date(),
    };

    const incomeCollectionRef = collection(db, "income");

    try {
      const docSnap = await addDoc(incomeCollectionRef, newIncome);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addExpenseHandler = async (e) => {
    e.preventDefault();

    const newExpense = {
      amount: expenseAmountRef.current.value,
      description: expenseDescriptionRef.current.value,
      createdAt: new Date(),
    };

    const expenseCollectionRef = collection(db, "expense");

    try {
      const docSnap = await addDoc(expenseCollectionRef, newExpense);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-5">
      <AddIncomeModal
        isOpen={isAddIncomeModalOpen}
        closeIncomeModal={handleCloseIncomeModal}
        incomeDescriptionRef={incomeDescriptionRef}
        incomeAmountRef={incomeAmountRef}
        addIncomeHandler={addIncomeHandler}
      />
      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        closeExpenseModal={handleCloseExpenseModal}
        expenseDescriptionRef={expenseDescriptionRef}
        expenseAmountRef={expenseAmountRef}
        addExpenseHandler={addExpenseHandler}
      />

      <div>
        <h3 className="text-2xl">My Balance</h3>
        <p className="text-7xl font-bold mb-5">$2,000</p>
        <div>
          <button
            className="dash-btn bg-green-500 cursor-pointer mr-5"
            onClick={() => handleOpenIncomeModal()}
          >
            Add Income
          </button>
          <button
            className="dash-btn bg-red-500  cursor-pointer"
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
