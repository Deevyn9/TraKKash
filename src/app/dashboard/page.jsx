"use client";
import { useEffect, useRef, useState } from "react";
import AddExpenseModal from "./Modals/addExpenseModal";
import AddIncomeModal from "./Modals/addIncomeModal";
import { useUser } from "@clerk/nextjs";
import {
  collection,
  doc,
  query,
  addDoc,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/index";
import { currencyFormatter } from "../../../lib/utils";
import Link from "next/link";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [toggleConfirmExpenseDiv, setToggleConfirmExpenseDiv] = useState(false);
  const [toggleConfirmIncomeDiv, setToggleConfirmIncomeDiv] = useState(false);
  const incomeAmountRef = useRef();
  const incomeDescriptionRef = useRef();
  const expenseAmountRef = useRef();
  const expenseDescriptionRef = useRef();
  const { user } = useUser();

  // Ref for logsCollection
  const logsCollectionRef = useRef(null);

  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      const balanceData = localStorage.getItem("balance");
      if (balanceData) setBalance(JSON.parse(balanceData));

      const totalIncomeData = localStorage.getItem("totalIncome");
      if (totalIncomeData) setTotalIncome(JSON.parse(totalIncomeData));

      const totalExpenseData = localStorage.getItem("totalExpense");
      if (totalExpenseData) setTotalExpense(JSON.parse(totalExpenseData));
    };

    loadDataFromLocalStorage();

    if (user) {
      const userId = user.id;
      const userCollectionRef = collection(db, "users");
      const userDocRef = doc(userCollectionRef, userId);
      logsCollectionRef.current = collection(userDocRef, "logs");

      const unsubscribeIncome = onSnapshot(
        query(logsCollectionRef.current, where("type", "==", "income")),
        (incomeSnapshot) => {
          let totalIncome = 0;
          incomeSnapshot.forEach((doc) => {
            totalIncome += doc.data().amount;
          });

          setTotalIncome(totalIncome);
          localStorage.setItem("totalIncome", JSON.stringify(totalIncome));
        }
      );

      const unsubscribeExpense = onSnapshot(
        query(logsCollectionRef.current, where("type", "==", "expense")),
        (expenseSnapshot) => {
          let totalExpense = 0;
          expenseSnapshot.forEach((doc) => {
            totalExpense += doc.data().amount;
          });

          setTotalExpense(totalExpense);
          localStorage.setItem("totalExpense", JSON.stringify(totalExpense));
        }
      );

      const unsubscribeBalance = onSnapshot(
        logsCollectionRef.current,
        (logsSnapshot) => {
          let totalBalance = 0;

          logsSnapshot.forEach((doc) => {
            const { type, amount } = doc.data();
            totalBalance += type === "income" ? amount : -amount;
          });

          setBalance(totalBalance);
          localStorage.setItem("balance", JSON.stringify(totalBalance));
        }
      );

      return () => {
        unsubscribeIncome();
        unsubscribeExpense();
        unsubscribeBalance();
      };
    }
  }, [user]);

  const handleCloseIncomeModal = () => setIsAddIncomeModalOpen(false);
  const handleCloseExpenseModal = () => setIsAddExpenseModalOpen(false);

  const handleOpenConfirmIncomeDiv = () => setToggleConfirmIncomeDiv(true);
  const handleCloseConfirmIncomeDiv = () => setToggleConfirmIncomeDiv(false);
  const handleOpenConfirmExpenseDiv = () => setToggleConfirmExpenseDiv(true);
  const handleCloseConfirmExpenseDiv = () => setToggleConfirmExpenseDiv(false);

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

      incomeAmountRef.current.value = "";
      incomeDescriptionRef.current.value = "";
      setToggleConfirmIncomeDiv(false);
      handleCloseIncomeModal();
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

      expenseAmountRef.current.value = "";
      expenseDescriptionRef.current.value = "";
      setToggleConfirmExpenseDiv(false);
      handleCloseExpenseModal();
    }
  };

  if (!user) {
    return (
      <div className="absolute bg-black text-white top-0 left-0 h-screen w-screen grid place-items-center text-3xl z-50">
        Loading...
      </div>
    );
  }

  return (
    <div className="nav-side__container items-start w-screen overflow-y-scroll lg:w-5/6">
      <AddIncomeModal
        isOpen={isAddIncomeModalOpen}
        closeIncomeModal={handleCloseIncomeModal}
        incomeDescriptionRef={incomeDescriptionRef}
        incomeAmountRef={incomeAmountRef}
        addIncomeHandler={addIncomeHandler}
        toggleConfirmIncomeDiv={toggleConfirmIncomeDiv}
        handleOpenConfirmIncomeDiv={handleOpenConfirmIncomeDiv}
        handleCloseConfirmIncomeDiv={handleCloseConfirmIncomeDiv}
      />
      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        closeExpenseModal={handleCloseExpenseModal}
        expenseDescriptionRef={expenseDescriptionRef}
        expenseAmountRef={expenseAmountRef}
        addExpenseHandler={addExpenseHandler}
        toggleConfirmExpenseDiv={toggleConfirmExpenseDiv}
        handleOpenConfirmExpenseDiv={handleOpenConfirmExpenseDiv}
        handleCloseConfirmExpenseDiv={handleCloseConfirmExpenseDiv}
        // activateExpenseButton={activateExpenseButton}
      />

      <div className="w-full h-full px-5 py-3 md:px-6 md:py-3">
        <div className="w-full">
          <h3 className="md:text-4xl text-xl mb-2">My Balance</h3>
          <div className="w-full">
            <p className="md:text-8xl text-4xl font-bold mb-5">
              {currencyFormatter(balance)}
            </p>
          </div>

          <div className=" md:mb-10 flex my-5 sm:my-10">
            <div className="dash-btn left">
              <button
                className="cursor-pointer"
                onClick={() => setIsAddIncomeModalOpen(true)}
              >
                Add Income
              </button>
            </div>

            <div className="dash-btn right">
              <button
                className="cursor-pointer"
                onClick={() => setIsAddExpenseModalOpen(true)}
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>

        <div className="totals__container flex flex-wrap lg:flex-row lg:flex-nowrap lg:gap-10">
          <div className="totals md:h-80 2xl:w-5/12">
            <h3 className="md:text-2xl font-semibold">Total Income</h3>
            <div className="mb-10">
              <p className="md:text-6xl">{currencyFormatter(totalIncome)}</p>
            </div>

            {totalIncome > 0 ? (
              <Link href="/dashboard/income">
                <p className="text-base md:text-lg">More details</p>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
          <div className="totals md:h-80 2xl:w-5/12">
            <h3 className="md:text-2xl font-semibold">Total Expenses</h3>
            <div className="mb-10">
              <p className="md:text-6xl">{currencyFormatter(totalExpense)}</p>
            </div>

            {totalExpense > 0 ? (
              <Link href="/dashboard/expenses">
                <p className="text-base md:text-lg">More details</p>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
