import { React, useState } from "react";
import CloseIcon from "@/public/assets/close.png";
import { Image } from "next/dist/client/image-component";

const AddIncomeModal = ({
  isOpen,
  closeIncomeModal,
  incomeDescriptionRef,
  incomeAmountRef,
  addIncomeHandler,
  toggleConfirmIncomeDiv,
  handleOpenConfirmIncomeDiv,
  handleCloseConfirmIncomeDiv,
}) => {
  const [toggleConfirmDiv, setToggleConfirmDiv] = useState(false);

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } modal-bg justify-center items-center  h-screen w-screen absolute top-0 left-0 z-50`}
    >
      <div className="modal p-3 rounded-3xl bg-black w-11/12 sm:w-96 h-max relative">
        <div
          className="flex items-center justify-center cursor-pointer font-2 rounded-full bg-gray-600 w-8 h-8 hover:scale-105 self-end transition-all"
          onClick={closeIncomeModal}
        >
          <Image src={CloseIcon} alt="close Icon" />
        </div>
        <form onSubmit={addIncomeHandler} className="my-10">
          <div className="flex flex-col mb-5">
            <label htmlFor="Income Amount" className="mb-2">
              Income Amount
            </label>
            <input
              type="number"
              name="amount"
              min={0.01}
              step={0.01}
              placeholder="$0.00"
              ref={incomeAmountRef}
              required
              className="h-10 rounded-md p-3 outline-none bg-gray-600 text-white border-1 border-solid border-slate-300"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="Description" className=" mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="describe payment"
              required
              maxLength={10}
              ref={incomeDescriptionRef}
              className="h-10 rounded-md p-3 outline-none text-white bg-gray-600"
            />
          </div>

          <div
            className="mt-7 bg-purple-500 rounded-md text-white w-32 h-12 self-end cursor-pointer grid place-items-center"
            onClick={handleOpenConfirmIncomeDiv}
          >
            Add Income
          </div>

          {toggleConfirmIncomeDiv && (
            <div className="absolute bg-black w-full h-full top-0 left-0 rounded-3xl flex items-center justify-center text-black px-2">
              <div className="border-2 border-solid border-purple-500 grid place-items-center w-32 rounded-md h-12 text-white mr-2 sm:mr-5">
                <button onClick={handleCloseConfirmIncomeDiv}>
                  Cancel Add
                </button>
              </div>
              <div className="bg-purple-500 rounded-md w-32 h-12 text-white mr-0 grid place-items-center">
                <button type="submit">Confirm Add</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
