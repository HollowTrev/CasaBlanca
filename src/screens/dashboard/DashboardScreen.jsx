import React, { useState } from "react";
import { BsDoorOpenFill } from "react-icons/bs";
import Room1Modal from "../../components/dashboard-components/room-modal/Room1Modal";
import Room2Modal from "../../components/dashboard-components/room-modal/Room2Modal";
import Room3Modal from "../../components/dashboard-components/room-modal/Room3Modal";
import Room4Modal from "../../components/dashboard-components/room-modal/Room4Modal";

const DashboardScreen = () => {
  const [openroom1Modal, setOpenRoom1Modal] = useState(false);
  const [openroom2Modal, setOpenRoom2Modal] = useState(false);
  const [openroom3Modal, setOpenRoom3Modal] = useState(false);
  const [openroom4Modal, setOpenRoom4Modal] = useState(false);

  const openRoom1ModalHandler = () => {
    setOpenRoom1Modal(true);
  };

  const closeRoom1ModalHandler = () => {
    setOpenRoom1Modal(false);
  };
  const openRoom2ModalHandler = () => {
    setOpenRoom2Modal(true);
  };

  const closeRoom2ModalHandler = () => {
    setOpenRoom2Modal(false);
  };

  const openRoom3ModalHandler = () => {
    setOpenRoom3Modal(true);
  };

  const closeRoom3ModalHandler = () => {
    setOpenRoom3Modal(false);
  };

  const openRoom4ModalHandler = () => {
    setOpenRoom4Modal(true);
  };

  const closeRoom4ModalHandler = () => {
    setOpenRoom4Modal(false);
  };

  return (
    <>
      {openroom1Modal && (
        <Room1Modal
          openModal={openroom1Modal}
          closeModal={closeRoom1ModalHandler}
        />
      )}
      {openroom2Modal && (
        <Room2Modal
          openModal={openroom2Modal}
          closeModal={closeRoom2ModalHandler}
        />
      )}
      {openroom3Modal && (
        <Room3Modal
          openModal={openroom3Modal}
          closeModal={closeRoom3ModalHandler}
        />
      )}
      {openroom4Modal && (
        <Room4Modal
          openModal={openroom4Modal}
          closeModal={closeRoom4ModalHandler}
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

        <div className="flex tablet:flex-row flex-col p-4 h-full">
          <div className="flex flex-wrap flex-row laptop:w-[70%] w-[100%]  gap-4 p-2 tablet:p-0 laptop:justify-start tablet:h-[10px] h-full justify-center">
            <section
              className="h-[220px] laptop:w-[350px] w-[320px] bg-[#666666] border-[#666666] hover:border-white rounded-[20px]
               p-5 border-[3px] cursor-pointer"
              onClick={openRoom1ModalHandler}
            >
              <div className="flex flex-row items-end gap-2">
                <BsDoorOpenFill className="text-[42px]" />
                <p className="text-[20px]">ROOM No.1</p>
              </div>
            </section>
            <section
              className="h-[220px] laptop:w-[350px] w-[320px] bg-[#666666] border-[#666666] hover:border-white rounded-[20px]
              p-5 border-[3px] cursor-pointer"
              onClick={openRoom2ModalHandler}
            >
              <div className="flex flex-row items-end gap-2">
                <BsDoorOpenFill className="text-[42px]" />
                <p className="text-[20px]">ROOM No.2</p>
              </div>
            </section>
            <section
              className="h-[220px] laptop:w-[350px] w-[320px] bg-[#666666] border-[#666666] hover:border-white rounded-[20px]
              p-5 border-[3px] cursor-pointer"
              onClick={openRoom3ModalHandler}
            >
              <div className="flex flex-row items-end gap-2">
                <BsDoorOpenFill className="text-[42px]" />
                <p className="text-[20px]">ROOM No.3</p>
              </div>
            </section>
            <section
              className="h-[220px] laptop:w-[350px] w-[320px] bg-[#666666] border-[#666666] hover:border-white rounded-[20px]
              p-5 border-[3px] cursor-pointer"
              onClick={openRoom4ModalHandler}
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

export default DashboardScreen;
