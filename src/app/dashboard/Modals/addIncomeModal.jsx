import { React, useState } from "react";
import CloseIcon from "@/public/assets/close.png";
import { Image } from "next/dist/client/image-component";

const AddIncomeModal = ({
  isOpen,
  closeIncomeModal,
  incomeDescriptionRef,
  incomeAmountRef,
  addIncomeHandler,
  confirmIncome,
}) => {
  const [toggleConfirmDiv, setToggleConfirmDiv] = useState(false);

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } modal-bg justify-center items-center  h-screen w-screen absolute top-0 left-0 z-50`}
    >
      {/* {confirmIncome && (
        <div className="absolute right-5 text-white top-5 bg-green-600 p-4 rounded-lg text-base">
          <p>Income Added Successfully</p>
        </div>
      )} */}
      <div className="p-3 rounded-3xl bg-white w-11/12 sm:w-96 h-max shadow-sm shadow-purple-500 relative">
        <div
          className="flex items-center justify-center cursor-pointer font-2 rounded-full bg-white w-8 h-8 hover:scale-105 self-end transition-all"
          onClick={closeIncomeModal}
        >
          <Image src={CloseIcon} alt="close Icon" />
        </div>
        <form onSubmit={addIncomeHandler} className="my-10">
          <div className="flex flex-col mb-5">
            <label htmlFor="Income Amount" className="text-black mb-2">
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
              className="h-10 rounded-md p-3 outline-none text-black shadow-sm shadow-purple-500"
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
              className="h-10 rounded-md p-3 outline-none text-black shadow-sm shadow-purple-500"
            />
          </div>

          <div
            className="mt-7 bg-green-600 rounded-md text-white px-3 py-2 self-end"
            onClick={() => setToggleConfirmDiv(true)}
          >
            Add Income
          </div>

          {toggleConfirmDiv && (
            <div className="absolute bg-white w-full h-full top-0 left-0 rounded-3xl flex items-center justify-center text-black">
              <div className="dash-btn bg-red-500 grid place-items-center mr-5">
                <button onClick={() => setToggleConfirmDiv(false)}>
                  Cancel Add
                </button>
              </div>
              <div className="dash-btn bg-green-500 mr-0 grid place-items-center">
                <button type="submit" onClick={() => addIncomeHandler()}>
                  Confirm Add
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
