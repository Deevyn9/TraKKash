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
    <div className="nav-side__container w-screen lg:w-5/6 overflow-y-scroll pb-5">
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

        <div className="w-full flex flex-col sm:flex-row sm:gap-8 sm:flex-wrap justify-center pb-5">
          {expense.length > 0 ? (
            expense.map((i) => {
              return (
                <div
                  key={i.id}
                  className="logs flex flex-col justify-between  border-2 border-solid border-slate-600 h-24 p-4 rounded-lg mb-5 sm:mb-0 transition-all sm:w-72 lg:w-80 sm:h-52"
                >
                  <div className="font-bold capitalize sm:text-xl ">
                    {i.description}
                  </div>

                  <div className="flex sm:flex-col justify-between flex-row">
                    <p className="sm:mr-3 text-red-600 sm:text-4xl sm:mb-7">
                      {currencyFormatter(i.amount)}
                    </p>

                    <small>
                      {i.createdAt instanceof Date
                        ? i.createdAt.toLocaleDateString()
                        : "Loading..."}
                    </small>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="capitalize place-self-center mt-10 justify-self-center">
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
