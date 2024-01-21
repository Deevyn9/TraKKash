"use client";
import { useState, useEffect, use } from "react";
import { currencyFormatter } from "../../../../lib/utils";
import { db } from "../../../../firebase";
import {
  collection,
  query,
  getDocs,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

const ExpensesPage = () => {
  const [expense, setExpense] = useState([]);
  const { user } = useUser();
  const [logsCollectionRef, setLogsCollectionRef] = useState(null);

  useEffect(() => {
    const getExpenseData = async () => {
      if (user && !logsCollectionRef) {
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

          if (!logsCollectionRef) {
            const logsRef = collection(db, "users", userId, "logs");
            setLogsCollectionRef(logsRef);
          }
        } catch (error) {
          console.error("Error fetching expense data", error);
        }
      }
    };

    getExpenseData();
  }, [user, logsCollectionRef, setLogsCollectionRef]);

  const deleteLog = async (logId) => {
    try {
      if (!logsCollectionRef) {
        console.error("logsCollectionRef is not initialized");
        return;
      }
      const logRef = doc(logsCollectionRef, logId);
      await deleteDoc(logRef);
      console.log(`Log with ID ${logId} deleted successfully`);
      setExpense((prevExpense) =>
        prevExpense.filter((log) => log.id !== logId)
      );
    } catch (error) {
      console.error("Error deleting logs:", error);
    }
  };

  return (
    <div className="nav-side__container w-full">
      <div className="overflow-scroll nav-side flex flex-col py-4">
        {expense.map((i) => {
          return (
            <div
              key={i.id}
              className="flex justify-between items-center border-2 border-solid border-purple-600 h-20 px-4 rounded-lg"
            >
              <div>
                <div className="font-semi-bold capitalize">{i.description}</div>
                <small>{i.createdAt.toISOString()}</small>
              </div>
              <div className="flex">
                <p className="mr-3">{currencyFormatter(i.amount)}</p>
                <button onClick={() => deleteLog(i.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpensesPage;
