import React, { useState, useEffect } from "react";
import { FaUser, FaCashRegister } from "react-icons/fa6";
import { MdDashboardCustomize } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useCookies } from "react-cookie";
import { getUserDatafromToken } from "../../utils/Auth";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(true);
  const [showName, setShowName] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["xyz"]);
  const Username = getUserDatafromToken().decodedToken.user.fullname;

  const logoutHandler = () => {
    document.getElementById("logout_modal").showModal();
  };

  useEffect(() => {
    if (openSidebar) {
      const timeoutId = setTimeout(() => {
        setShowName(true);
      }, 200);

      return () => clearTimeout(timeoutId);
    } else {
      setShowName(false);
    }
  }, [openSidebar]);

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

      <div
        className={`${
          openSidebar
            ? "w-[259px] ease-out-in duration-500"
            : "w-[60px] ease-in-out duration-500"
        } h-full text-white flex flex-col tablet:relative absolute z-10`}
      >
        {/* ----Menu icon---- */}
        <div
          className={`flex justify-end pt-4 ${
            openSidebar
              ? "w-[259px] ease-out-in duration-500 "
              : "w-[60px] ease-in-out duration-500 justify-center"
          } cursor-pointer`}
          onClick={() => {
            setOpenSidebar(!openSidebar);
          }}
        >
          {openSidebar ? (
            <AiOutlineMenuFold size={35} className="fixed z-10 mr-2" />
          ) : (
            <AiOutlineMenuUnfold size={35} className="fixed z-10 " />
          )}
        </div>
        {/* ----Menu item---- */}
        <div
          className={`bg-primary pt-[62px] ease-out-in duration-500 fixed
            flex-wrap h-[100vh]
            ${openSidebar ? "w-[259px]" : "w-[60px]"} mb-50`}
        >
          <div
            className={`flex flex-row gap-4 max-auto p-2 items-center cursor-pointer
           bg-accent rounded-[20px] ${openSidebar ? "mx-2" : "mx-0"}`}
          >
            {/* ----Add if else condition here for dynamic user profile---- */}
            <div className="h-[42px] min-w-[42px] rounded-[50%] bg-secondary flex items-center justify-center">
              <FaUser className="text-[22px]" />
            </div>
            {showName && (
              <p className={`text-bold text-[15px] text-black`}>
                {Username.toUpperCase()}
              </p>
            )}
          </div>

          <div
            className={`flex flex-row gap-4 max-auto p-2 items-center hover:bg-[#7E1F21] cursor-pointer ${
              location.pathname === "/" ? "bg-[#7E1F21]" : ""
            }`}
            onClick={() => {
              //change it to the actual path
              navigate("/");
            }}
          >
            {/* ----Add if else condition here for dynamic user profile---- */}
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              <MdDashboardCustomize className="text-[35px]" />
            </div>
            {showName && <p className={`text-bold text-[18px]`}>Dashboard</p>}
          </div>

          <div
            className={`flex flex-row gap-4 max-auto p-2 items-center hover:bg-[#7E1F21] cursor-pointer ${
              location.pathname === "/payroll" ? "bg-[#7E1F21]" : ""
            }`}
            onClick={() => {
              //change it to the actual path
              navigate("/payroll");
            }}
          >
            {/* ----Add if else condition here for dynamic user profile---- */}
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              <SiCashapp className="text-[30px]" />
            </div>
            {showName && <p className={`text-bold text-[18px]`}>Payroll</p>}
          </div>

          <div
            className={`flex flex-row gap-4 max-auto p-2 items-center hover:bg-[#7E1F21] cursor-pointer ${
              location.pathname === "/point-of-sale" ? "bg-[#7E1F21]" : ""
            }`}
            onClick={() => {
              //change it to the actual path
              navigate("/point-of-sale");
            }}
          >
            {/* ----Add if else condition here for dynamic user profile---- */}
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              <FaCashRegister className="text-[30px]" />
            </div>
            {showName && (
              <p className={`text-bold text-[18px]`}>Point Of Sale</p>
            )}
          </div>
          <div
            className={`flex flex-row gap-4 max-auto p-2 items-center hover:bg-[#7E1F21] cursor-pointer`}
            onClick={logoutHandler}
          >
            {/* ----Add if else condition here for dynamic user profile---- */}
            <div className="h-[42px] min-w-[42px]  flex items-center justify-center">
              <RiLogoutBoxRLine className="text-[30px]" />
            </div>
            {showName && <p className={`text-bold text-[18px]`}>Logout</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
