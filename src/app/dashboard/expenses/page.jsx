"use client";
import { useState, useEffect } from "react";
import { currencyFormatter } from "@/lib/utils";
import { db } from "@/firebase/index";
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
import expenseIllustration from "@/public/assets/expenseillus.svg";
import Image from "next/image";

const ExpensePage = () => {
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

  return (
    <div className="nav-side__container md:w-4/5 w-screen lg:w-5/6 overflow-y-scroll pb-5">
      <div className="nav-side flex flex-col p-4 items-center">
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

        <div className="logs-container">
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
                  </div>
                </div>
              );
            })
          ) : (
            <div className="capitalize place-self-center mt-10 self-center">
              <Image src={expenseIllustration} alt="no expenses" />
              <p
                className="text-2xl text-center mt-5098765432
            "
              >
                start spending!
              </p>
            </div>
          )}
        </div>

        {}
      </div>
    </div>
  );
};

export default ExpensePage;
