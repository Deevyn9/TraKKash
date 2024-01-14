"use client";
import { useState, useEffect } from "react";
import { currencyFormatter } from "../../../../lib/utils";
import { db } from "../../../../firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

const IncomePage = () => {
  const [income, setIncome] = useState([]);
  const { user } = useUser();

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
          const incomeData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          }));
          setIncome(incomeData);
        } catch (error) {
          console.error("Error fetching income data", error);
        }
      }
    };

    getIncomeData();
  }, [user]);

  return (
    <div>
      {income.map((i) => {
        return (
          <div key={i.id}>
            <div className="font-semi-bold">{i.description}</div>
            <small>{i.createdAt.toISOString()}</small>
            <p>{currencyFormatter(i.amount)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default IncomePage;
