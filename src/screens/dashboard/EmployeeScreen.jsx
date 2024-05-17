import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { getUserDatafromToken } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const EmployeeScreen = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["xyz"]);
  const UserData = getUserDatafromToken().decodedToken.user;

  return (
    <>
      <dialog id="logout_modal" className="modal">
        <form
          method="dialog"
          className="modal-box w-[90%] tablet:w-full rounded-[15px]"
        >
          <section className="z-10 flex flex-row justify-between w-full">
            <h1 className="text-center w-full text-primary font-bold text-[24px] ml-[2rem]">
              LOGOUT
            </h1>
            {/* if there is a button tag in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost  mt-[-0.7rem] mr-[-0.4rem]">
              <IoCloseSharp size={24} />
            </button>
          </section>
          <p className="px-4 pt-4">
            You are about to log out. Press <strong>'CONTINUE'</strong> if you
            wish to proceed with the logout, or <strong>'CANCEL'</strong> if you
            wish to stay logged in.
          </p>
          <div className="flex flex-col items-center w-full gap-2 mx-auto modal-action tablet:flex-row tablet:gap-0">
            {/* change the button into span tag if you are dealing with api request */}
            <button
              className="btn border-red-500 border-[1.5px] text-red-500 bg-white hover:bg-red-500 hover:text-white  tablet:h-[45px] tablet:w-[50%] w-full
              mx-auto rounded-[80px] text-[18px] font-medium"
            >
              CANCEL
            </button>
            {/* change the button into span tag if you are dealing with api request */}
            <span
              className="btn bg-green-600 hover:bg-green-700 text-white tablet:h-[45px] tablet:w-[50%] w-full
              mx-auto rounded-[80px] text-[18px] font-medium"
              onClick={() => {
                removeCookie("xyz");
                navigate("/");
                window.location.reload();
              }}
            >
              CONTINUE
            </span>
          </div>
        </form>
      </dialog>
      

      <div className="flex flex-col h-[100vh] w-full justify-center items-center bg-ImageBg bg-no-repeat bg-cover overflow-y-auto">

        <div className="flex flex-col tablet:w-[420px] desktop:w-[450px] w-[98%] mx-auto bg-secondary text-white p-4 rounded-[15px] shadow-lg">
          <section className="flex flex-row w-full">
            <h1 className="font-bold text-[26px] mx-auto mt-3 mb-4">
              WELCOME BACK
            </h1>
          </section>
          <div className="relative flex flex-col items-center justify-center w-full">
            <div className="h-[90px] w-[90px] mb-5 rounded-[50%] bg-primary flex items-center justify-center">
              <FaUser className="text-[52px]" />
            </div>
            <p className="flex font-bold text-[20px]">
              {UserData.fullname.toUpperCase()}
            </p>
            <p className="flex font-bold text-[17px] text-primary">FULLNAME</p>
            <p className="flex font-bold text-[20px]">{UserData.email}</p>
            <p className="flex font-bold text-[17px] text-primary">EMAIL</p>
            <p className="flex font-bold text-[20px]">{UserData.employeeId}</p>
            <p className="flex font-bold text-[17px] text-primary">
              EMPLOYEE ID
            </p>
            <p className="flex font-bold text-[20px]">{UserData.contactNo}</p>
            <p className="flex font-bold text-[17px] text-primary">
              CONTACT NO.
            </p>
            <p className="flex font-bold text-[20px]">
              {UserData.user_access.toUpperCase()}
            </p>
            <p className="flex font-bold text-[17px] text-primary">ROLE</p>
          </div>
          <button
            className="btn mt-4 w-[95%] mx-auto btn-primary text-[20px] text-white rounded-[10px]"
            onClick={() => {
              document.getElementById("logout_modal").showModal();
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeScreen;
