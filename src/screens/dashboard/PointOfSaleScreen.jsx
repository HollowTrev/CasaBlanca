import React, { useState } from "react";
import { BsDoorOpenFill } from "react-icons/bs";
import Room1SalesModal from "../../components/dashboard-components/sales-summary/Room1SalesModal";
import Room2SalesModal from "../../components/dashboard-components/sales-summary/Room2SalesModal";
import Room3SalesModal from "../../components/dashboard-components/sales-summary/Room3SalesModal";
import Room4SalesModal from "../../components/dashboard-components/sales-summary/Room4SalesModal";

const PointOfSaleScreen = () => {
  const [room1, setRoom1] = useState(false);
  const [room2, setRoom2] = useState(false);
  const [room3, setRoom3] = useState(false);
  const [room4, setRoom4] = useState(false);

  const room1SalesHanlder = () => {
    setRoom1(true);
  };

  const closeroom1SalesHanlder = () => {
    setRoom1(false);
  };

  const room2SalesHanlder = () => {
    setRoom2(true);
  };

  const closeroom2SalesHanlder = () => {
    setRoom2(false);
  };

  const room3SalesHanlder = () => {
    setRoom3(true);
  };

  const closeroom3SalesHanlder = () => {
    setRoom3(false);
  };

  const room4SalesHanlder = () => {
    setRoom4(true);
  };

  const closeroom4SalesHanlder = () => {
    setRoom4(false);
  };

  return (
    <>
      {room1 && (
        <Room1SalesModal
          openModal={room1}
          closeModal={closeroom1SalesHanlder}
        />
      )}

      {room2 && (
        <Room2SalesModal
          openModal={room2}
          closeModal={closeroom2SalesHanlder}
        />
      )}

      {room3 && (
        <Room3SalesModal
          openModal={room3}
          closeModal={closeroom3SalesHanlder}
        />
      )}

      {room4 && (
        <Room4SalesModal
          openModal={room4}
          closeModal={closeroom4SalesHanlder}
        />
      )}

      <div className="flex flex-col w-full overflow-y-hidden text-white tablet:ml-0 ml-[55px]">
        <h1 className="tablet:hidden p-4 text-[24px] font-bold w-full text-center">
          CASA BLANCA <br />
          BAR AND RESTAURANT
        </h1>

        <h1 className="p-4 text-[32px] hidden tablet:block font-bold w-full text-center">
          CASA BLANCA - BAR AND RESTAURANT
        </h1>

        <div className="flex flex-col h-full p-4 tablet:flex-row">
          <div className="flex flex-wrap flex-row laptop:w-[70%] w-[100%]  gap-4 p-2 tablet:p-0 laptop:justify-start tablet:h-[10px] h-full justify-center">
            <section
              className="h-[220px] laptop:w-[350px] w-[320px] bg-[#666666] border-[#666666] hover:border-white rounded-[20px]
               p-5 border-[3px] cursor-pointer"
              onClick={room1SalesHanlder}
            >
              <div className="flex flex-row items-end gap-2">
                <BsDoorOpenFill className="text-[42px]" />
                <p className="text-[20px]">ROOM No.1</p>
              </div>
            </section>
            <section
              className="h-[220px] laptop:w-[350px] w-[320px] bg-[#666666] border-[#666666] hover:border-white rounded-[20px]
              p-5 border-[3px] cursor-pointer"
              onClick={room2SalesHanlder}
            >
              <div className="flex flex-row items-end gap-2">
                <BsDoorOpenFill className="text-[42px]" />
                <p className="text-[20px]">ROOM No.2</p>
              </div>
            </section>
            <section
              className="h-[220px] laptop:w-[350px] w-[320px] bg-[#666666] border-[#666666] hover:border-white rounded-[20px]
              p-5 border-[3px] cursor-pointer"
              onClick={room3SalesHanlder}
            >
              <div className="flex flex-row items-end gap-2">
                <BsDoorOpenFill className="text-[42px]" />
                <p className="text-[20px]">ROOM No.3</p>
              </div>
            </section>
            <section
              className="h-[220px] laptop:w-[350px] w-[320px] bg-[#666666] border-[#666666] hover:border-white rounded-[20px]
              p-5 border-[3px] cursor-pointer"
              onClick={room4SalesHanlder}
            >
              <div className="flex flex-row items-end gap-2">
                <BsDoorOpenFill className="text-[42px]" />
                <p className="text-[20px]">ROOM No.4</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PointOfSaleScreen;
