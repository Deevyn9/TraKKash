"use client";
import { useState, useEffect, use } from "react";
import { currencyFormatter } from "../../../../lib/utils";
import { db } from "../../../../firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

const ExpensesPage = () => {
  const [expense, setExpense] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const getExpenseData = async () => {
      if (user) {
        const userId = user.id;
        const logsQuery = query(
          collection(db, "users", userId, "logs"),
          where("type", "==", "expense")
        );

        try {
          const snapshot = await getDocs(logsQuery);
          const expenseData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          }));
          setExpense(expenseData);
        } catch (error) {
          console.error("Error fetching expense data", error);
        }
      }
    };

    getExpenseData();
  }, [user]);

  return (
    <div className="overflow-scroll">
      {expense.map((i) => {
        return (
          <div key={i.id}>
            <div>{i.description}</div>
            <small>{i.createdAt.toISOString()}</small>
            <p>{currencyFormatter(i.amount)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ExpensesPage;
