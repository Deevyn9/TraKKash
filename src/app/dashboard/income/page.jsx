"use client";
import { useState, useEffect } from "react";
import { currencyFormatter } from "../../../../lib/utils";
import { db } from "../../../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const IncomePage = () => {
  const [income, setIncome] = useState([]);
  //   console.log(income);

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };

    getIncomeData();
  }, []);

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
