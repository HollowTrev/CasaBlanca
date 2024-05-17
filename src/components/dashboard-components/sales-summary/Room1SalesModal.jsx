import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

const Room1SalesModal = ({ openModal, closeModal }) => {
  const [modalHandler, setModalHandler] = useState(false);

  useEffect(() => {
    setModalHandler(openModal);
  }, [openModal]);

  return (
    <>
      <div className={`modal-wrapper ${modalHandler ? "show" : ""}`}>
        {modalHandler && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-10">
            <div className="absolute inset-0" />

            <div
              className="tablet:w-[650px] laptop:w-[850px] w-[90%] tablet:h-[450px] h-[80%] bg-white flex flex-col mx-auto rounded-[15px]
              shadow-md modal-container p-7"
            >
              <section className="z-10 flex flex-row justify-between w-full mb-5">
                <h1 className="text-center w-full text-primary font-bold text-[24px] mt-0 ml-[2rem]">
                  ROOM NO. 1
                </h1>

                <button
                  className="btn btn-sm btn-circle btn-ghost  mt-[-0.7rem] mr-[-0.4rem]"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  <IoCloseSharp size={24} />
                </button>
              </section>
              <section className="z-10 flex flex-col w-full h-full overflow-y-auto">
                <h1 className="text-[28px] font-bold text-center tablet:text-start">
                  Used: 20 times
                </h1>
                <h1 className="text-center text-primary mt-4 text-[28px] font-bold">
                  TABLE DATA
                </h1>

                {/* ----Change this with actual data from the database----- */}
                <section className="flex flex-col w-full gap-4 tablet:flex-row">
                  <ul className="flex flex-col items-center justify-center w-full text-center ">
                    <h2 className="text-[24px] font-bold mb-2">TABLE</h2>
                    <li className="text-[18px]">
                      <strong>TABLE 1:</strong> 10
                    </li>
                    <li className="text-[18px]">
                      <strong>TABLE 2:</strong> 4
                    </li>
                    <li className="text-[18px]">
                      <strong>TABLE 3:</strong> 12
                    </li>
                    <li className="text-[18px]">
                      <strong>TABLE 4:</strong> 6
                    </li>
                    <li className="text-[18px]">
                      <strong>TABLE 5:</strong> 5
                    </li>
                    <li className="text-[18px]">
                      <strong>TABLE 6:</strong> 6
                    </li>
                  </ul>

                  <ul className="flex flex-col items-center justify-center w-full text-center">
                    <h2 className="text-[24px] font-bold mb-2">FAX</h2>
                    <li className="text-[18px]">4</li>
                    <li className="text-[18px]">4</li>
                    <li className="text-[18px]">7</li>
                    <li className="text-[18px]">5</li>
                    <li className="text-[18px]">9</li>
                    <li className="text-[18px]">10</li>
                  </ul>
                  <ul className="flex flex-col items-center justify-center w-full text-center">
                    <h2 className="text-[24px] font-bold mb-2">DATE</h2>
                    <li className="text-[18px]">12/02/2023</li>
                    <li className="text-[18px]">12/25/2023</li>
                    <li className="text-[18px]">12/05/2023</li>
                    <li className="text-[18px]">12/02/2023</li>
                    <li className="text-[18px]">12/03/2023</li>
                    <li className="text-[18px]">12/02/2023</li>
                  </ul>
                </section>
              </section>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Room1SalesModal;
