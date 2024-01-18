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
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/index";
import { currencyFormatter } from "../../../lib/utils";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [confirmIncome, setConfirmIncome] = useState(false);
  const [confirmExpense, setConfirmExpense] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const incomeAmountRef = useRef();
  const incomeDescriptionRef = useRef();
  const expenseAmountRef = useRef();
  const expenseDescriptionRef = useRef();
  const { user } = useUser();

  // Ref for logsCollection
  const logsCollectionRef = useRef(null);

  // useEffect(() => {
  //   if (user) {
  //     const userId = user.id;
  //     const userCollectionRef = collection(db, "users");
  //     const userDocRef = doc(userCollectionRef, userId);
  //     logsCollectionRef.current = collection(userDocRef, "logs");

  //     const fetchTransactions = async () => {
  //       const incomeQuery = query(
  //         logsCollectionRef.current,
  //         where("type", "==", "income")
  //       );
  //       const expenseQuery = query(
  //         logsCollectionRef.current,
  //         where("type", "==", "expense")
  //       );

  //       let totalIncome = 0;
  //       let totalExpense = 0;

  //       const unsubscribeIncome = onSnapshot(incomeQuery, (incomeSnapshot) => {
  //         totalIncome = 0;
  //         incomeSnapshot.forEach((doc) => {
  //           totalIncome += doc.data().amount;
  //         });

  //         const newBalance = totalIncome - totalExpense;
  //         setBalance(newBalance);
  //       });

  //       const unsubscribeExpense = onSnapshot(
  //         expenseQuery,
  //         (expenseSnapshot) => {
  //           totalExpense = 0;
  //           expenseSnapshot.forEach((doc) => {
  //             totalExpense += doc.data().amount;
  //           });

  //           const newBalance = totalIncome - totalExpense;
  //           setBalance(newBalance);
  //         }
  //       );

  //       return () => {
  //         unsubscribeIncome();
  //         unsubscribeExpense();
  //       };
  //     };

  //     fetchTransactions();
  //   }
  // }, [user]);

  useEffect(() => {
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
        }
      );

      return () => {
        unsubscribeIncome();
        unsubscribeExpense();
        unsubscribeBalance();
      };
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

      setConfirmIncome(true);
      setTimeout(() => {
        setConfirmIncome(false);
      }, 3000);
      incomeAmountRef.current.value = "";
      incomeDescriptionRef.current.value = "";
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

      setConfirmExpense(true);
      setTimeout(() => {
        setConfirmExpense(false);
      }, 3000);
      expenseAmountRef.current.value = "";
      expenseDescriptionRef.current.value = "";
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-scroll nav-side__container items-start sm:w-full w-screen">
      <AddIncomeModal
        isOpen={isAddIncomeModalOpen}
        closeIncomeModal={handleCloseIncomeModal}
        incomeDescriptionRef={incomeDescriptionRef}
        incomeAmountRef={incomeAmountRef}
        addIncomeHandler={addIncomeHandler}
        confirmIncome={confirmIncome}
      />
      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        closeExpenseModal={handleCloseExpenseModal}
        expenseDescriptionRef={expenseDescriptionRef}
        expenseAmountRef={expenseAmountRef}
        addExpenseHandler={addExpenseHandler}
        confirmExpense={confirmExpense}
      />

      <div className="nav-side md:p-8">
        <div>
          <h3 className="text-2xl">My Balance</h3>
          <p className="text-7xl font-bold mb-5">
            {currencyFormatter(balance)}
          </p>
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

        <div className="flex">
          <div className="border-2 border-green-600 border-solid">
            <h3>Total Income</h3>
            {currencyFormatter(totalIncome)}
          </div>
          <div className="border-2 border-green-600 border-solid">
            <h3>Total Expenses</h3>
            <p>{currencyFormatter(totalExpense)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
