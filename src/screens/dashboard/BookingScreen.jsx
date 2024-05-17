import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { IoCloseSharp } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import axios from "./../../utils/Path";


const BookingScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [statusCode, setStatusCode] = useState(null);

  //---onSubmit handler----
  const onSubmitHandler = async (data) => {
    const pushData = {
      fullname: data.fullname,
      email: data.email,
      contactNo: data.contactNo,
      reservationDate: data.reservationDate + "T12:00:00",
      roomType: data.roomType,
      table: data.table,
      numberOfPersons: data.numberOfPersons,
      purpose: data.purpose,
    };

    try {
      const response = await axios.post("booking/submit", pushData);
      document.getElementById("approved_request").showModal();
    } catch (error) {
      if (error.response) {
        setStatusCode(error.response.status);

        if (statusCode === 400) {
          alert("Invalid data. Please try again");
        } else if (statusCode === 401) {
          alert("Invalid data. Please try again");
        } else {
          alert("Invalid data. Please try again");
        }
      } else {
        alert("Invalid data. Please try again");
      }
    }
  };

  return (
    <>
      {/*-----book modal request----- */}
      <dialog id="approved_request" className="modal">
        <form
          method="dialog"
          className="modal-box w-[90%] tablet:w-full rounded-[15px]"
        >
          <section className="z-10 flex flex-row justify-between w-full">
            <h1 className="text-center w-full text-primary font-bold text-[24px] ml-[2rem]"></h1>
            {/* if there is a button tag in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost  mt-[-0.7rem] mr-[-0.4rem]">
              <IoCloseSharp size={24} />
            </button>
          </section>
          <div className="flex flex-col items-center justify-center w-full my-4">
            <MdCheckCircleOutline className="text-green-600 text-[175px]" />
            <p className="text-[28px] mt-2 text-center">Book Successfully</p>
          </div>
          <div className="flex items-center w-full mx-auto modal-action">
            {/* change the button into span tag if you are dealing with api request */}
            <button
              className="btn bg-green-600 hover:bg-green-700 text-white tablet:h-[45px] w-[80%]
              mx-auto rounded-[80px] text-[18px] font-medium"
              onClick={() => {
                navigate("/");
              }}
            >
              DONE
            </button>
          </div>
        </form>
      </dialog>
      <div className="flex h-screen">
      <div className="flex flex-col h-[100vh] w-full justify-center items-center bg-primary">
      
        <div className="fixed top-0 flex justify-between w-full cursor-pointer">
          <h1
            className="p-2 tablet:text-[28px] center text-[24px] text-black font-bold z-10"
            onClick={() => {
              navigate("/");
            }}
          >
            CASA BLANCA
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col tablet:w-[420px] h-[600px] desktop:w-[450px] w-[95%] mx-auto bg-white text-black p-4 rounded-[15px] shadow-lg">
            <section className="flex flex-row w-full">
              <h1 className="font-bold text-[26px] mx-auto mb-7 mt-3 text-primary text-center">
                BOOKING FORM
              </h1>
            </section>
            <div className="w-[90%] mx-auto overflow-auto">
              <TextField
                sx={{
                  marginBottom: errors.fullname ? 1 : 2,
                  width: "100%",
                  input: {
                    padding: "0.7rem",
                    background: "white",
                  },
                }}
                name="fullname"
                placeholder="Enter the full name"
                error={errors.fullname ? true : false}
                {...register("fullname", {
                  required: "This is required",

                  pattern: {
                    value: /^[a-z ,.'-]+$/i,
                    message: "Invalid characters in name.",
                  },
                })}
              />
              {errors.fullname && (
                <p className="text-white-500 text-[14px] ml-3 text-red-500">
                  {errors.fullname.message}
                </p>
              )}

              <TextField
                sx={{
                  marginBottom: errors.email ? 1 : 2,
                  width: "100%",
                  input: {
                    padding: "0.7rem",
                    background: "white",
                  },
                }}
                name="email"
                placeholder="Enter the email"
                error={errors.email ? true : false}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-white-500 text-[14px] ml-3 text-red-500">
                  {errors.email.message}
                </p>
              )}
              <TextField
                sx={{
                  marginBottom: errors.contactNo ? 1 : 2,
                  width: "100%",
                  input: {
                    padding: "0.7rem",
                    background: "white",
                  },
                }}
                name="contactNo"
                placeholder="Enter the contact no."
                error={errors.contactNo ? true : false}
                {...register("contactNo", {
                  required: "This is required",
                  pattern: {
                    value: /^(09|\+639)\d{9}$/,
                    message: "Invalid phone number.",
                  },
                })}
              />
              {errors.contactNo && (
                <p className="text-white-500 text-[14px] ml-3 text-red-500">
                  {errors.contactNo.message}
                </p>
              )}
              <p className="text-[15px] font-bold">Reservation Date</p>
              <TextField
                sx={{
                  marginBottom: errors.reservationDate ? 1 : 2,
                  width: "100%",
                  input: {
                    padding: "0.7rem",
                    background: "white",
                  },
                }}
                name="reservationDate"
                type="date"
                placeholder="Enter the Reservation Date"
                error={errors.reservationDate ? true : false}
                {...register("reservationDate", {
                  required: "This is required",
                })}
              />
              {errors.reservationDate && (
                <p className="text-white-500 text-[14px] ml-3 text-red-500">
                  {errors.reservationDate.message}
                </p>
              )}
              <p className="text-[15px] font-bold"> Select Room</p>
              <FormControl
                error={errors.roomType ? true : false}
                sx={{
                  marginBottom: errors.roomType ? 1 : 2,
                  width: "100%",
                }}
              >
                <Select
                  name="roomType"
                  type="text"
                  {...register("roomType", {
                    required: "This is required.",
                  })}
                  sx={{
                    "& .MuiSelect-select": {
                      padding: "0.7rem",
                      borderRadius: "20px",
                    },
                  }}
                >
                  <MenuItem value="">
                    <p className="text-slate-500 text-[12px]">Select one</p>
                  </MenuItem>
                  <MenuItem value={1}>Room 1</MenuItem>
                  <MenuItem value={2}>Room 2</MenuItem>
                  <MenuItem value={3}>Room 3</MenuItem>
                  <MenuItem value={4}>Room 4</MenuItem>
                </Select>
                {errors.roomType && (
                  <p
                    className={`text-red-500 text-[14px] ${
                      errors.roomType ? "mt-2" : "mt-0"
                    }`}
                  >
                    {errors.roomType ? errors.roomType.message : ""}
                  </p>
                )}
              </FormControl>
              <p className="text-[15px] font-bold"> Select Table</p>
              <FormControl
                error={errors.table ? true : false}
                sx={{
                  marginBottom: errors.table ? 1 : 2,
                  width: "100%",
                }}
              >
                <Select
                  name="table"
                  type="text"
                  {...register("table", {
                    required: "This is required.",
                  })}
                  sx={{
                    "& .MuiSelect-select": {
                      padding: "0.7rem",
                      borderRadius: "20px",
                    },
                  }}
                >
                  <MenuItem value="">
                    <p className="text-slate-500 text-[12px]">Select one</p>
                  </MenuItem>
                  <MenuItem value="Table 1">Table 1</MenuItem>
                  <MenuItem value="Table 2">Table 2</MenuItem>
                  <MenuItem value="Table 3">Table 3</MenuItem>
                  <MenuItem value="Table 4">Table 4</MenuItem>
                  <MenuItem value="Table 5">Table 5</MenuItem>
                  <MenuItem value="Table 6">Table 6</MenuItem>
                </Select>
                {errors.table && (
                  <p
                    className={`text-red-500 text-[14px] ${
                      errors.table ? "mt-2" : "mt-0"
                    }`}
                  >
                    {errors.table ? errors.table.message : ""}
                  </p>
                )}
              </FormControl>
              <p className="text-[15px] font-bold"> Select Number of Person</p>
              <FormControl
                error={errors.total_person ? true : false}
                sx={{
                  marginBottom: errors.total_person ? 1 : 2,
                  width: "100%",
                }}
              >
                <Select
                  name="numberOfPersons"
                  type="text"
                  {...register("numberOfPersons", {
                    required: "This is required.",
                  })}
                  sx={{
                    "& .MuiSelect-select": {
                      padding: "0.7rem",
                      borderRadius: "20px",
                    },
                  }}
                >
                  <MenuItem value="">
                    <p className="text-slate-500 text-[12px]">Select one</p>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
                {errors.numberOfPersons && (
                  <p
                    className={`text-red-500 text-[14px] ${
                      errors.numberOfPersons ? "mt-2" : "mt-0"
                    }`}
                  >
                    {errors.numberOfPersons
                      ? errors.numberOfPersons.message
                      : ""}
                  </p>
                )}
              </FormControl>
              <TextField
                sx={{
                  marginBottom: errors.purpose ? 1 : 2,
                  width: "100%",
                  input: {
                    padding: "0.7rem",
                    background: "white",
                  },
                }}
                name="purpose"
                placeholder="Enter the Purpose"
                error={errors.purpose ? true : false}
                {...register("purpose", {
                  required: "This is required",
                })}
              />
              {errors.purpose && (
                <p className="text-white-500 text-[14px] ml-3 text-red-500">
                  {errors.purpose.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="btn mt-4 w-[80%] mx-auto bg-green-600 hover:bg-green-700 text-[20px] text-white rounded-[20px] mb-5 z-10"
            >
              BOOK NOW
            </button>
          </div>
        </form>
      </div>
      </div>
      
    </>
  );
};

export default BookingScreen;
