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
import { useLogsCollectionRef } from "../../../../lib/LogContext";

const IncomePage = () => {
  const [income, setIncome] = useState([]);
  const { user } = useUser();
  const { logsCollectionRef, setLogsCollectionRef } = useLogsCollectionRef();

  useEffect(() => {
    const getIncomeData = async () => {
      if (user && !logsCollectionRef) {
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

          if (!logsCollectionRef) {
            const logsRef = collection(db, "users", userId, "logs");
            setLogsCollectionRef(logsRef);
          }
        } catch (error) {
          console.error("Error fetching income data", error);
        }
      }
    };

    getIncomeData();
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

      setIncome((prevIncome) => prevIncome.filter((log) => log.id !== logId));
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  return (
    <div className="nav-side__container w-full">
      <div className="overflow-scroll nav-side">
        {income.map((i) => {
          return (
            <div key={i.id}>
              <div className="font-semi-bold">{i.description}</div>
              <small>{i.createdAt.toISOString()}</small>
              <p>{currencyFormatter(i.amount)}</p>
              <button onClick={() => deleteLog(i.id)}>delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncomePage;
