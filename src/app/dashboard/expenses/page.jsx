"use client";
import { useState, useEffect } from "react";
import { currencyFormatter } from "../../../../lib/utils";
import { db } from "../../../../firebase";
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const IncomePage = () => {
  const [expense, setExpense] = useState([]);
  const { user } = useUser();
  const [logsCollectionRef, setLogsCollectionRef] = useState();

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
          const expenseData = snapshot.docs.map((doc) => {
            const data = doc.data();
            const createdAt =
              data.createdAt && data.createdAt.toMillis()
                ? new Date(data.createdAt.toMillis())
                : null;
            return {
              id: doc.id,
              ...data,
              createdAt: createdAt,
            };
          });
          setExpense(expenseData);

          if (!logsCollectionRef) {
            const logsRef = collection(db, "users", userId, "logs");
            setLogsCollectionRef(logsRef);
          }

          localStorage.setItem("expense", JSON.stringify(expenseData));
        } catch (error) {
          console.error("Error fetching expense data", error);
        }
      }
    };

    getExpenseData();

    const loadDataFromLocalStorage = () => {
      const storedExpense = localStorage.getItem("expense");
      if (storedExpense) setExpense(JSON.parse(storedExpense));
    };

    loadDataFromLocalStorage();
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

      const updatedExpense = expense.filter((log) => log.id !== logId);
      localStorage.setExpense("expense", JSON.stringify(updatedExpense));
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  return (
    <div className="nav-side__container md:w-4/5 w-screen lg:w-5/6 overflow-y-scroll pb-5">
      <div className="nav-side flex flex-col p-4">
        <Link href="/dashboard">
          <p className="flex items-center mb-5 md:hidden">
            Back to Maindash
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </p>
        </Link>

        {expense.length > 0 ? (
          expense.map((i) => {
            return (
              <div
                key={i.id}
                className="flex justify-between items-center border-2 border-solid border-purple-600 h-24 p-4 rounded-lg mb-5  md:hover:bg-purple-300 transition-all"
              >
                <div className="h-full flex flex-col justify-between pr-2">
                  <div className="font-semi-bold capitalize sm:text-xl ">
                    {i.description}
                  </div>
                  <small>
                    {i.createdAt instanceof Date
                      ? i.createdAt.toLocaleDateString()
                      : "Loading..."}
                  </small>
                </div>

                <div className="flex h-full flex-col sm:flex-row sm:items-center items-end justify-between sm:justify-en w-2/4 pl-2">
                  <div className="w-full text-right ">
                    <p className="sm:mr-3 text-red-600 sm:text-lg">
                      {currencyFormatter(i.amount)}
                    </p>
                  </div>

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
          })
        ) : (
          <div className="text-2xl capitalize place-self-center mt-28 md:mt-0 self-center">
            nothing to show here
          </div>
        )}

        {}
      </div>
    </div>
  );
};

export default IncomePage;
