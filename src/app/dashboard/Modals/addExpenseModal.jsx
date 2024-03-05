import Image from "next/image";
import CloseIcon from "@/public/assets/close.png";
import React, { useEffect, useState } from "react";

const AddExpenseModal = ({
  isOpen,
  closeExpenseModal,
  addExpenseHandler,
  expenseDescriptionRef,
  expenseAmountRef,
  // activateExpenseButton,
}) => {
  const [toggleConfirmDiv, setToggleConfirmDiv] = useState(false);
  const [amountFilled, setAmountFilled] = useState(false);
  const [descriptionFilled, setDescriptionFilled] = useState(false);

  useEffect(() => {
    setAmountFilled(
      !!expenseAmountRef.current && !!expenseAmountRef.current.value
    );
    setDescriptionFilled(
      !!expenseDescriptionRef && !!expenseDescriptionRef.current.value
    );
  }, [expenseDescriptionRef, expenseAmountRef]);

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } justify-center items-center modal-bg h-screen w-screen absolute top-0 left-0 z-50`}
    >
      <div className="modal p-3 rounded-3xl bg-black w-11/12 sm:w-96 h-max border-2 border-solid border-black relative">
        <div
          className="flex items-center justify-center cursor-pointer font-2 rounded-full bg-gray-600 w-8 h-8 hover:scale-105 self-end transition-all"
          onClick={closeExpenseModal}
        >
          <Image src={CloseIcon} alt="close Icon" />
        </div>
        <form onSubmit={addExpenseHandler} className="my-10">
          <div className="flex flex-col mb-5">
            <label htmlFor="Expense Amount" className="mb-2">
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
              className="h-10 rounded-md p-3 outline-none text-white bg-gray-600"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="Description" className="mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="describe expense"
              required
              maxLength={10}
              ref={expenseDescriptionRef}
              className="h-10 rounded-md p-3  outline-none text-white bg-gray-600"
            />
          </div>

          <div
            className={`mt-7 bg-purple-600 ${
              !amountFilled || descriptionFilled
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-50"
            } rounded-md text-white w-32 h-12 px-3 py-2 self-end grid place-content-center cursor-pointer`}
            onClick={() => setToggleConfirmDiv(true)}
          >
            Add Expense
          </div>

          {toggleConfirmDiv && (
            <div className="absolute bg-black w-full h-full top-0 left-0 rounded-3xl flex items-center justify-center">
              <div className="border-2 border-solid border-purple-500 grid place-items-center mr-5 rounded-md w-32 h-12">
                <button onClick={() => setToggleConfirmDiv(false)}>
                  Cancel Add
                </button>
              </div>
              <div className="dash-btn bg-purple-500 rounded-md w-32 h-12 mr-0 grid place-items-center">
                <button type="submit">Confirm Expense</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
