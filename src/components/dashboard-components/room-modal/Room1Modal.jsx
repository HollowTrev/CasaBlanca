import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import axios from "./../../../utils/Path";

const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return dateObject.toLocaleDateString("en-US", options);
};

const Room1Modal = ({ openModal, closeModal }) => {
  const [modalHandler, setModalHandler] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState("");
  const [pendingBookings, setPendingBookings] = useState([]);

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        const response = await axios.get(`booking/pending/1`);
        setPendingBookings(response.data);
      } catch (error) {
        console.error("Error fetching pending bookings:", error);
      }
    };

    fetchPendingBookings();
  }, []);

  const ViewRequestHandler = (request) => {
    setSelectedRequest(request);
    document.getElementById("view_request").showModal();
  };
  useEffect(() => {
    setModalHandler(openModal);
  }, [openModal]);

  return (
    <>
      {/*-----View Request Modal. This will determine if the request will be accepted or decline----- */}
      <dialog id="view_request" className="modal">
        <form
          method="dialog"
          className="modal-box w-[90%] tablet:w-full rounded-[15px]"
        >
          <section className="z-10 flex flex-row w-full  justify-between">
            <h1 className="text-center w-full text-primary font-bold text-[24px] ml-[2rem]">
              REQUEST DETAILS
            </h1>
            {/* if there is a button tag in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost  mt-[-0.7rem] mr-[-0.4rem]">
              <IoCloseSharp size={24} />
            </button>
          </section>
          <section className="mt-5 flex flex-col w-full">
            <div className="flex flex-row items-center tablet:gap-4 gap-2 mb-2">
              <p className="font-bold tablet:text-[20px] text-[16px]">
                Full Name:
              </p>
              <h2 className="tablet:text-[22px] text-[17px]">
                {selectedRequest.fullname}
              </h2>
            </div>
            <div className="flex flex-row items-center tablet:gap-4 gap-2 mb-2">
              <p className="font-bold tablet:text-[20px] text-[16px]">
                Contact No:
              </p>
              <h2 className="tablet:text-[22px] text-[17px]">
                {selectedRequest.contactNo}
              </h2>
            </div>
            <div className="flex flex-row items-center tablet:gap-4 gap-2 mb-2">
              <p className="font-bold tablet:text-[20px] text-[16px]">Email:</p>
              <h2 className="tablet:text-[22px] text-[17px]">
                {selectedRequest.email}
              </h2>
            </div>
            <div className="flex flex-row items-center tablet:gap-4 gap-2 mb-2">
              <p className="font-bold tablet:text-[20px] text-[16px]">Date:</p>
              <h2 className="tablet:text-[22px] text-[17px]">
                {formatDate(selectedRequest.reservationDate)}
              </h2>
            </div>
            <div className="flex flex-row items-center tablet:gap-4 gap-2 mb-2">
              <p className="font-bold tablet:text-[20px] text-[16px]">Table:</p>
              <h2 className="tablet:text-[22px] text-[17px]">
                {selectedRequest.table}
              </h2>
            </div>
            <div className="flex flex-row items-center tablet:gap-4 gap-2 mb-2">
              <p className="font-bold tablet:text-[20px] text-[16px]">
                Person:
              </p>
              <h2 className="tablet:text-[22px] text-[17px]">
                {selectedRequest.numberOfPersons}
              </h2>
            </div>
            <div className="flex flex-row items-center tablet:gap-4 gap-2 mb-2">
              <p className="font-bold tablet:text-[20px] text-[16px]">
                Purpose:
              </p>
              <h2 className="tablet:text-[22px] text-[17px]">
                {selectedRequest.purpose}
              </h2>
            </div>
          </section>
          <div className="modal-action w-full mx-auto flex tablet:flex-row flex-col items-center gap-2 tablet:gap-0">
            {/* change the button into span tag if you are dealing with api request */}
            <button
              className="btn border-red-500 border-[1.5px] text-red-500 bg-white hover:bg-red-500 hover:text-white  tablet:h-[45px] tablet:w-[50%] w-full
              mx-auto rounded-[80px] text-[18px] font-medium"
              onClick={async () => {
                try {
                  await axios.put(
                    `http://localhost:3522/api/booking/approve/${selectedRequest._id}`
                  );

                  document.getElementById("decline_request").showModal();
                  document.getElementById("view_request").close();
                } catch (error) {
                  console.error("Error approving booking:", error);
                }
              }}
            >
              DECLINE
            </button>
            {/* change the button into span tag if you are dealing with api request */}
            <span
              className="btn bg-green-600 hover:bg-green-700 text-white tablet:h-[45px] tablet:w-[50%] w-full
              mx-auto rounded-[80px] text-[18px] font-medium"
              onClick={async () => {
                try {
                  await axios.put(
                    `http://localhost:3522/api/booking/approve/${selectedRequest._id}`
                  );

                  document.getElementById("approved_request").showModal();
                  document.getElementById("view_request").close();
                } catch (error) {
                  console.error("Error approving booking:", error);
                }
              }}
            >
              ACCEPT
            </span>
          </div>
        </form>
      </dialog>

      {/*-----Approved modal request----- */}
      <dialog id="approved_request" className="modal">
        <form
          method="dialog"
          className="modal-box w-[90%] tablet:w-full rounded-[15px]"
        >
          <section className="z-10 flex flex-row w-full  justify-between">
            <h1 className="text-center w-full text-primary font-bold text-[24px] ml-[2rem]"></h1>
            {/* if there is a button tag in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost  mt-[-0.7rem] mr-[-0.4rem]">
              <IoCloseSharp size={24} />
            </button>
          </section>
          <div className="flex flex-col w-full items-center justify-center my-4">
            <MdCheckCircleOutline className="text-green-600 text-[175px]" />
            <p className="text-[28px] mt-2 text-center">Reservation Approved</p>
          </div>
          <div className="modal-action w-full mx-auto flex items-center">
            {/* change the button into span tag if you are dealing with api request */}
            <button
              className="btn bg-green-600 hover:bg-green-700 text-white tablet:h-[45px] w-[80%]
              mx-auto rounded-[80px] text-[18px] font-medium"
            >
              DONE
            </button>
          </div>
        </form>
      </dialog>

      {/*-----Decline modal request----- */}
      <dialog id="decline_request" className="modal">
        <form
          method="dialog"
          className="modal-box w-[90%] tablet:w-full rounded-[15px]"
        >
          <section className="z-10 flex flex-row w-full  justify-between">
            <h1 className="text-center w-full text-primary font-bold text-[24px] ml-[2rem]"></h1>
            {/* if there is a button tag in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost  mt-[-0.7rem] mr-[-0.4rem]">
              <IoCloseSharp size={24} />
            </button>
          </section>
          <div className="flex flex-col w-full items-center justify-center my-4">
            <VscError className="text-red-600 text-[175px]" />
            <p className="text-[28px] mt-2 text-center">
              Reservation Cancelled
            </p>
          </div>
          <div className="modal-action w-full mx-auto flex items-center">
            {/* change the button into span tag if you are dealing with api request */}
            <button
              className="btn bg-green-600 hover:bg-green-700 text-white tablet:h-[45px] w-[80%]
              mx-auto rounded-[80px] text-[18px] font-medium"
            >
              DONE
            </button>
          </div>
        </form>
      </dialog>

      <div className={`modal-wrapper ${modalHandler ? "show" : ""}`}>
        {modalHandler && (
          <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-40">
            <div className="absolute inset-0" />

            <div
              className="tablet:w-[650px] laptop:w-[850px] w-[90%] tablet:h-[500px] h-[80%] bg-white flex flex-col mx-auto rounded-[15px]
              shadow-md modal-container p-7"
            >
              <section className="z-10 flex flex-row w-full justify-between mb-5">
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

              <section className="w-full tablet:overflow-y-hidden overflow-y-auto">
                <div className="flex tablet:flex-row flex-col w-full gap-4 justify-center">
                  <div className="flex flex-row flex-wrap tablet:w-[45%] w-full gap-3 p-2 tablet:h-[240px] justify-center border-black border-[1px] rounded-lg py-4">
                    {/* -----Table 1---- */}
                    {/* Add your logic here to change the color of the table to determine if occupied or vacant */}
                    <div
                      className={`flex flex-col items-center justify-center h-24 min-w-[100px] bg-success p-4 rounded-lg cursor-pointer z-10`}
                    >
                      <p className="font-bold">TABLE 1</p>
                      <p className="text-[14px]">BOOKED</p>
                    </div>
                    {/* -----Table 2---- */}
                    {/* Add your logic here to change the color of the table to determine if occupied or vacant */}
                    <div
                      className={`flex flex-col items-center justify-center h-24 tablet:min-w-[100px] bg-error p-4 rounded-lg cursor-pointer z-10`}
                    >
                      <p className="font-bold">TABLE 2</p>
                      <p className="text-[14px]">RESERVED</p>
                    </div>
                    {/* Add your logic here to change the color of the table to determine if occupied or vacant */}
                    <div
                      className={`flex flex-col items-center justify-center h-24 min-w-[100px] bg-error p-4 rounded-lg cursor-pointer z-10`}
                    >
                      <p className="font-bold">TABLE 3</p>
                      <p className="text-[14px]">RESERVED</p>
                    </div>
                    {/* Add your logic here to change the color of the table to determine if occupied or vacant */}
                    <div
                      className={`flex flex-col items-center justify-center h-24 min-w-[100px]  bg-success p-4 rounded-lg cursor-pointer z-10`}
                    >
                      <p className="font-bold">TABLE 4</p>
                      <p className="text-[14px]">BOOKED</p>
                    </div>
                    {/* Add your logic here to change the color of the table to determine if occupied or vacant */}
                    <div
                      className={`flex flex-col items-center justify-center h-24 min-w-[100px] bg-warning p-4 rounded-lg cursor-pointer z-10`}
                    >
                      <p className="font-bold">TABLE 5</p>
                      <p className="text-[14px]">VACANT</p>
                    </div>
                    {/* Add your logic here to change the color of the table to determine if occupied or vacant */}
                    <div
                      className={`flex flex-col items-center justify-center h-24 min-w-[100px] bg-success p-4 rounded-lg cursor-pointer z-10`}
                    >
                      <p className="font-bold">TABLE 6</p>
                      <p className="text-[14px]">BOOKED</p>
                    </div>
                  </div>

                  <div className="flex flex-col  tablet:w-[50%] gap-3  items-center  w-full border-black border-[1px] h-[380px] rounded-lg py-4 z-40">
                    <div className="overflow-y-auto w-full gap-3 p-2 flex items-center flex-col">
                      <p className="font-bold text-[17px]">CUSTOMER REQUEST</p>
                      {/* change this with actual data */}
                      {pendingBookings.map((requestlist) => (
                        <div
                          key={requestlist.id}
                          className="bg-accent hover:bg-[#c2c1b7] w-full h-[42px] flex flex-row item-center p-2 rounded-lg justify-between"
                        >
                          <p>{requestlist.fullname.toUpperCase()}</p>
                          <button
                            className="border-b-[4px] border-accent mr-2 hover:border-green-400 z-10 text-[14px] font-bold"
                            onClick={() => ViewRequestHandler(requestlist)}
                          >
                            VIEW
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Room1Modal;
