import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import axios from "./../../utils/Path";
const UpdateEmployeeModal = ({ openModal, closeModal, selectedEmployee }) => {
  const [modalHandler, setModalHandler] = useState(false);
  const [imageAttach, setImageAttach] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //---onSubmit handler----
  const onSubmitHandler = async (data) => {
    console.log(data);

    try {
      const response = await axios.put(
        `auth/update/${selectedEmployee._id}`,
        data
      );
      document.getElementById("update_succcess").showModal();
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
        if (statusCode === 400) {
          alert("Error update. Please try again");
        } else if (statusCode === 401) {
          alert("Error update. Please try again");
        } else {
          alert("Error update. Please try again later.");
        }
      } else {
        alert("Error update. Please try again later.");
      }
    }
  };

  useEffect(() => {
    setModalHandler(openModal);
  }, [openModal]);

  return (
    <>
      {/*-----Approved modal request----- */}
      <dialog id="update_succcess" className="modal">
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
            <p className="text-[28px] mt-2 text-center">UPDATE SUCCESSFULLY</p>
          </div>
          <div className="modal-action w-full mx-auto flex items-center">
            {/* change the button into span tag if you are dealing with api request */}
            <button
              className="btn bg-green-600 hover:bg-green-700 text-white tablet:h-[45px] w-[80%]
              mx-auto rounded-[80px] text-[18px] font-medium"
              onClick={() => {
                closeModal();
              }}
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
              className="tablet:w-[450px] w-[90%] tablet:h-[550px] h-[80%] bg-white text-black
              flex flex-col mx-auto rounded-[15px]
              shadow-md modal-container p-7"
            >
              <section className="z-10 flex flex-row w-full justify-between mb-5">
                <h1 className="text-center w-full  font-bold text-[24px] mt-0 ml-[2rem] text-primary">
                  UPDATE EMPLOYEE
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

              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="h-full overflow-auto"
              >
                <div className="w-[80%] mx-auto flex flex-col">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImageAttach(e.target.files[0]);
                    }}
                    className="file-input file-input-bordered text-black w-full rounded-[20px] mb-4"
                  />

                  <TextField
                    sx={{
                      marginBottom: errors.fullname ? 1 : 2,
                      width: "100%",
                      input: {
                        padding: "0.7rem",
                        background: "white",
                        borderRadius: "20px",
                      },
                    }}
                    InputProps={{
                      style: {
                        borderRadius: "20px",
                      },
                    }}
                    name="fullname"
                    placeholder="Enter the full name"
                    defaultValue={selectedEmployee.fullname}
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
                        borderRadius: "20px",
                      },
                    }}
                    InputProps={{
                      style: {
                        borderRadius: "20px",
                      },
                    }}
                    name="email"
                    defaultValue={selectedEmployee.email}
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
                        borderRadius: "20px",
                      },
                    }}
                    InputProps={{
                      style: {
                        borderRadius: "20px",
                      },
                    }}
                    name="contactNo"
                    defaultValue={selectedEmployee.contactNo}
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

                  <TextField
                    sx={{
                      marginBottom: errors.password ? 1 : 2,
                      width: "100%",
                      input: {
                        padding: "0.7rem",
                        background: "white",
                        borderRadius: "20px",
                      },
                    }}
                    InputProps={{
                      style: {
                        borderRadius: "20px",
                      },
                    }}
                    name="password"
                    disabled={true}
                    defaultValue={selectedEmployee.password}
                    placeholder="Enter the new password"
                    error={errors.password ? true : false}
                    {...register("password", {
                      required: "This is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long.",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-white-500 text-[14px] ml-3 text-red-500">
                      {errors.password.message}
                    </p>
                  )}

                  <TextField
                    sx={{
                      marginBottom: errors.employeeId ? 1 : 2,
                      width: "100%",
                      input: {
                        padding: "0.7rem",
                        background: "white",
                        borderRadius: "20px",
                      },
                    }}
                    InputProps={{
                      style: {
                        borderRadius: "20px",
                      },
                    }}
                    name="employeeId"
                    defaultValue={selectedEmployee.employeeId}
                    placeholder="Enter the Employee ID"
                    error={errors.employeeId ? true : false}
                    {...register("employeeId", {
                      required: "This is required",
                    })}
                  />
                  {errors.employeeId && (
                    <p className="text-white-500 text-[14px] ml-3 text-red-500">
                      {errors.employeeId.message}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="btn mt-2 w-[95%] mx-auto bg-green-600 hover:bg-green-700 text-[20px] text-white rounded-[20px] mb-5 z-10"
                  >
                    UPDATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateEmployeeModal;
