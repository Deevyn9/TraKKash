"use client";
import { useState, useEffect, use } from "react";
import { currencyFormatter } from "../../../../lib/utils";
import { db } from "../../../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const ExpensesPage = () => {
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    const getExpenseData = async () => {
      const collectionRef = collection(db, "expense");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setExpense(data);
    };

    getExpenseData();
  }, []);

  return (
    <div>
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
