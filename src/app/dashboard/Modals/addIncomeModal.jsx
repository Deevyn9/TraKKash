import { React, useState } from "react";
import CloseIcon from "@/public/assets/close.png";
import { Image } from "next/dist/client/image-component";

const AddIncomeModal = ({
  isOpen,
  closeIncomeModal,
  incomeDescriptionRef,
  incomeAmountRef,
  addIncomeHandler,
}) => {
  const [toggleConfirmDiv, setToggleConfirmDiv] = useState(false);

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } modal-bg justify-center items-center  h-screen w-screen absolute top-0 left-0 z-50`}
    >
      <div className="p-3 rounded-3xl bg-black w-11/12 sm:w-96 h-max relative">
        <div
          className="flex items-center justify-center cursor-pointer font-2 rounded-full bg-white w-8 h-8 hover:scale-105 self-end transition-all"
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
              className="h-10 rounded-md p-3 outline-none bg-gray-950 text-white border-1 border-solid border-slate-300"
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
              className="h-10 rounded-md p-3 outline-none text-white bg-gray-950"
            />
          </div>

          <div
            className="mt-7 bg-green-600 rounded-md text-white px-3 py-2 self-end w-max cursor-pointer"
            onClick={() => setToggleConfirmDiv(true)}
          >
            Add Income
          </div>

          {toggleConfirmDiv && (
            <div className="absolute bg-black w-full h-full top-0 left-0 rounded-3xl flex items-center justify-center text-black">
              <div className="dash-btn bg-red-500 grid place-items-center mr-5">
                <button onClick={() => setToggleConfirmDiv(false)}>
                  Cancel Add
                </button>
              </div>
              <div className="dash-btn bg-green-500 mr-0 grid place-items-center">
                <button
                  type="submit"
                  onClick={() => {
                    {
                      addIncomeHandler();
                    }
                    {
                      closeIncomeModal();
                    }
                  }}
                >
                  Confirm Income
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
