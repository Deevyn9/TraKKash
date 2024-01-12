"use client";
import { useEffect, useRef, useState } from "react";
import AddExpenseModal from "./Modals/addExpenseModal";
import AddIncomeModal from "./Modals/addIncomeModal";
import { useUser } from "@clerk/nextjs";
import {
  collection,
  doc,
  query,
  getDocs,
  addDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/index";
import { currencyFormatter } from "../../../lib/utils";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const incomeAmountRef = useRef();
  const incomeDescriptionRef = useRef();
  const expenseAmountRef = useRef();
  const expenseDescriptionRef = useRef();
  const { user } = useUser();

  // Ref for logsCollection
  const logsCollectionRef = useRef(null);

  useEffect(() => {
    if (user) {
      const userId = user.id;
      const userCollectionRef = collection(db, "users");
      const userDocRef = doc(userCollectionRef, userId);
      logsCollectionRef.current = collection(userDocRef, "logs");

      const fetchTransactions = async () => {
        try {
          const incomeQuery = query(
            logsCollectionRef.current,
            where("type", "==", "income")
          );
          const expenseQuery = query(
            logsCollectionRef.current,
            where("type", "==", "expense")
          );

          const [incomeSnapshot, expenseSnapshot] = await Promise.all([
            getDocs(incomeQuery),
            getDocs(expenseQuery),
          ]);

          let totalIncome = 0;
          let totalExpense = 0;

          incomeSnapshot.forEach((doc) => {
            totalIncome += doc.data().amount;
          });

          expenseSnapshot.forEach((doc) => {
            totalExpense += doc.data().amount;
          });

          const newBalance = totalIncome - totalExpense;
          setBalance(newBalance);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };

      fetchTransactions();
    }
  }, [user]);

  const handleOpenIncomeModal = () => setIsAddIncomeModalOpen(true);
  const handleCloseIncomeModal = () => setIsAddIncomeModalOpen(false);
  const handleOpenExpenseModal = () => setIsAddExpenseModalOpen(true);
  const handleCloseExpenseModal = () => setIsAddExpenseModalOpen(false);

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    if (logsCollectionRef.current) {
      const newIncome = {
        type: "income",
        amount: parseFloat(incomeAmountRef.current.value),
        description: incomeDescriptionRef.current.value,
        createdAt: new Date(),
      };

      try {
        await addDoc(logsCollectionRef.current, newIncome);
      } catch (error) {
        console.error("Error adding income:", error.message);
      }
    }
  };

  const addExpenseHandler = async (e) => {
    e.preventDefault();

    if (logsCollectionRef.current) {
      const newExpense = {
        type: "expense",
        amount: parseFloat(expenseAmountRef.current.value),
        description: expenseDescriptionRef.current.value,
        createdAt: new Date(),
      };

      try {
        await addDoc(logsCollectionRef.current, newExpense);
      } catch (error) {
        console.error("Error adding expense:", error.message);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
        <p className="text-7xl font-bold mb-5">{currencyFormatter(balance)}</p>
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
