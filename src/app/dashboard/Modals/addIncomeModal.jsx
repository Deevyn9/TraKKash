import { React, useRef } from "react";
import CloseIcon from "../../../../public/assets/close.png";
import { Image } from "next/dist/client/image-component";

import { db } from "./../../../../firebase/index";
import { collection, addDoc } from "firebase/firestore";

const AddIncomeModal = ({ isOpen, closeIncomeModal }) => {
  const amountRef = useRef();
  const descriptionRef = useRef();

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    const collectionRef = collection(db, "income");

    try {
      const docSnap = await addDoc(collectionRef, newIncome);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } modal-bg justify-center items-center  h-screen w-screen absolute top-0 left-0 z-50`}
    >
      <div className="p-3 rounded-3xl bg-blue-900 w-96 h-max">
        <div
          className="flex items-center justify-center cursor-pointer font-2 rounded-full bg-white w-8 h-8 hover:scale-105 self-end transition-all"
          onClick={closeIncomeModal}
        >
          <Image src={CloseIcon} alt="close Icon" />
        </div>
        <form onSubmit={addIncomeHandler} className="my-10">
          <div className="flex flex-col mb-5">
            <label htmlFor="Income Amount" className="text-white mb-2">
              Income Amount
            </label>
            <input
              type="number"
              name="amount"
              min={0.01}
              step={0.01}
              placeholder="$0.00"
              ref={amountRef}
              required
              className="h-10 rounded-md p-3 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="Description" className="text-white mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="describe payment"
              required
              ref={descriptionRef}
              className="h-10 rounded-md p-3 outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-7 bg-green-500 rounded-md text-white px-3 py-2 self-end"
          >
            Add Income
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
