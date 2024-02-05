"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
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
import incomeIllustration from "@/public/assets/incomeillus.svg";

const IncomePage = () => {
  const [income, setIncome] = useState([]);
  const { user } = useUser();
  const [logsCollectionRef, setLogsCollectionRef] = useState();

  useEffect(() => {
    const getIncomeData = async () => {
      if (user) {
        const userId = user.id;
        const logsQuery = query(
          collection(db, "users", userId, "logs"),
          where("type", "==", "income")
        );

        try {
          const snapshot = await getDocs(logsQuery);
          const incomeData = snapshot.docs.map((doc) => {
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
          setIncome(incomeData);

          if (!logsCollectionRef) {
            const logsRef = collection(db, "users", userId, "logs");
            setLogsCollectionRef(logsRef);
          }

          localStorage.setItem("income", JSON.stringify(incomeData));
        } catch (error) {
          console.error("Error fetching income data", error);
        }
      }
    };

    getIncomeData();

    const loadDataFromLocalStorage = () => {
      const storedIncome = localStorage.getItem("income");
      if (storedIncome) setIncome(JSON.parse(storedIncome));
    };

    loadDataFromLocalStorage();
  }, [user, logsCollectionRef, setLogsCollectionRef]);

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

        {income.length > 0 ? (
          income.map((i) => {
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
                    <p className="sm:mr-3 text-green-600 sm:text-lg">
                      {currencyFormatter(i.amount)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="place-self-center mt-10 self-center">
            <Image src={incomeIllustration} alt="no income logs" />
            <p className="text-2xl text-center mt-5">Earn some more!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomePage;
