import React from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";

import { useForm } from "react-hook-form";

const ForgotPasswordScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //---onSubmit handler----
  const onSubmitHandler = (data) => {
    console.log(data);
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[100vh] w-full justify-center items-center bg-ImageBg bg-no-repeat bg-cover overflow-y-auto">
      <div
        className="w-full fixed top-0 hidden tablet:flex cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <h1
          className="font-bold p-2 text-[28px] text-white"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          CASA BLANCA
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col tablet:w-[420px] desktop:w-[450px] w-[98%] mx-auto bg-secondary text-white p-4 rounded-[15px] shadow-lg">
          <section className="flex flex-row w-full">
            <h1 className="font-bold text-[26px] mx-auto mb-7 mt-3">
              RESET PASSWORD
            </h1>
          </section>

          <p className="w-[98%] mx-auto mb-7 px-2">
            Enter your email address and we will send you a verification code
          </p>

          <span className="font-bold ml-3">Email</span>
          <div className="mx-auto flex flex-row w-[95%] rounded-[15px] items-center">
            <MdOutlineEmail className="text-gray-400 text-[28px] absolute ml-2 z-10" />
            <TextField
              sx={{
                width: "100%",
                input: {
                  padding: "0.7rem",
                  background: "white",
                  borderRadius: "10px",
                  paddingLeft: 5.5,
                },
              }}
              InputProps={{
                style: {
                  borderRadius: "10px",
                },
              }}
              name="email"
              placeholder="Enter your email"
              error={errors.email ? true : false}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-[14px] mt-2 ml-3 mb-[-0.5rem]">
              {errors.email.message}
            </p>
          )}

          <button
            type="submit"
            className="btn mt-7 w-[95%] mx-auto btn-primary text-[20px] text-white rounded-[10px]"
          >
            CONTINUE
          </button>

          <p className="mx-auto mt-4  text-center text-[16px mb-5">
            Don't have an account?{" "}
            <span
              className="cursor-pointer hover:underline hover:text-blue-500 text-blue-400"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
