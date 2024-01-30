import Image from "next/image";
import CloseIcon from "@/public/assets/close.png";
import React from "react";

const AddExpenseModal = ({
  isOpen,
  closeExpenseModal,
  addExpenseHandler,
  expenseDescriptionRef,
  expenseAmountRef,
  confirmExpense,
}) => {
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } justify-center items-center modal-bg h-screen w-screen absolute top-0 left-0 z-50`}
    >
      {confirmExpense && (
        <div className="absolute right-5 top-5 text-white bg-red-600 p-4 text-base rounded-lg">
          <p>Sad to see your money go!</p>
        </div>
      )}
      <div className="p-3 rounded-3xl bg-white w-11/12 sm:w-96 h-max border-2 border-solid border-black">
        <div
          className="flex items-center justify-center cursor-pointer font-2 rounded-full bg-white w-8 h-8 hover:scale-105 self-end transition-all"
          onClick={closeExpenseModal}
        >
          <Image src={CloseIcon} alt="close Icon" />
        </div>
        <form className="my-7" onSubmit={addExpenseHandler}>
          <div className="flex flex-col mb-5">
            <label htmlFor="Expense Amount" className="mb-2 text-black">
              Expense Amount
            </label>
            <input
              type="number"
              name="amount"
              min={0.01}
              step={0.01}
              placeholder="$0.00"
              ref={expenseAmountRef}
              required
              className="h-10 rounded-md p-3 outline-none text-black border-solid border-black border-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="Description" className="text-black mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="describe payment"
              required
              maxLength={10}
              ref={expenseDescriptionRef}
              className="h-10 rounded-md p-3 outline-none text-black border-solid border-black border-2"
            />
          </div>

          <button
            type="submit"
            className="mt-7 bg-red-600 rounded-md text-white px-3 py-2 self-end"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
