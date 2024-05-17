import React, { useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { FaRegIdBadge } from "react-icons/fa6";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import facebookIcon from "./../../assets/icons/fb_icon.png";
import gooogleIcon from "./../../assets/icons/google_icon.png";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { LuUnlock } from "react-icons/lu";
import { useForm } from "react-hook-form";
import axios from "./../../utils/Path";

const SignupScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //---onSubmit handler----
  const onSubmitHandler = async (data) => {
    try {
      const response = await axios.post("auth/signup", data);

      alert("You have successfully created an account");

      navigate("/login");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert(`Signup failed: ${error.response.data.msg}`);
        } else if (error.response.status === 500) {
          alert("The employee ID already exists.");
        }
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  const navigate = useNavigate();
  //---show/hide password option---
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col h-[100vh] w-full justify-center items-center bg-ImageBg bg-no-repeat bg-cover overflow-y-auto">
      <div
        className="fixed top-0 hidden w-full cursor-pointer tablet:flex"
        onClick={() => {
          navigate("/signin");
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
        <div className="flex flex-col tablet:w-[420px] h-[650px] desktop:w-[450px] w-[98%] mx-auto bg-secondary text-white p-4 rounded-[15px] shadow-lg">
          <section className="flex flex-row w-full">
            <h1 className="font-bold text-[26px] mx-auto mb-10 mt-3">
              REGISTER
            </h1>
          </section>

          <div className="flex flex-col w-full overflow-y-auto">
            <span className="ml-3 font-bold">Full Name</span>
            <div className="relative bg-white mx-auto flex flex-row w-[95%] rounded-[15px] items-center">
              <FiUser className="text-gray-400 text-[28px] absolute ml-2 z-10" />
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
                name="fullname"
                placeholder="Enter your Full name"
                error={errors.fullname ? true : false}
                {...register("fullname", {
                  required: "this is required",
                  pattern: {
                    value: /^[a-z ,.'-]+$/i,
                    message: "Invalid characters in name.",
                  },
                })}
              />
            </div>
            {errors.fullname && (
              <p className="text-red-500 text-[14px] mt-2 ml-3 mb-[-0.5rem]">
                {errors.fullname.message}
              </p>
            )}
            <span className="mt-2 ml-3 font-bold">Contact No.</span>
            <div className="relative bg-white mx-auto flex flex-row w-[95%] rounded-[15px] items-center">
              <MdOutlinePhoneEnabled className="text-gray-400 text-[28px] absolute ml-2 z-10" />
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
                name="contactNo"
                placeholder="Enter your contact no."
                error={errors.contactNo ? true : false}
                {...register("contactNo", {
                  required: "this is required",
                  pattern: {
                    value: /^(09|\+639)\d{9}$/,
                    message: "Invalid phone number.",
                  },
                })}
              />
            </div>
            {errors.contactNo && (
              <p className="text-red-500 text-[14px] mt-2 ml-3 mb-[-0.5rem]">
                {errors.contactNo.message}
              </p>
            )}

            <span className="mt-2 ml-3 font-bold">Employee ID</span>
            <div className="relative bg-white mx-auto flex flex-row w-[95%] rounded-[15px] items-center">
              <FaRegIdBadge className="text-gray-400 text-[28px] absolute ml-2 z-10" />
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
                name="employeeId"
                placeholder="Enter your employee ID"
                error={errors.employeeId ? true : false}
                {...register("employeeId", {
                  required: "this is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid. Please enter numbers only.",
                  },
                })}
              />
            </div>
            {errors.employeeId && (
              <p className="text-red-500 text-[14px] mt-2 ml-3 mb-[-0.5rem]">
                {errors.employeeId.message}
              </p>
            )}

            <span className="mt-2 ml-3 font-bold">Email</span>
            <div className="relative bg-white mx-auto flex flex-row w-[95%] rounded-[15px] items-center">
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

            <span className="mt-3 ml-3 font-bold">Password</span>
            <div className="relative bg-white mx-auto flex flex-row w-[95%] rounded-[15px] items-center">
              <LuUnlock className="text-gray-400 text-[28px] absolute ml-2 z-10" />
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
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        background: "white",
                      }}
                    >
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                error={errors.password ? true : false}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long.",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-[14px] mt-2 ml-3 mb-[-0.5rem]">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn mt-7 w-[95%] mx-auto btn-primary text-[20px] text-white rounded-[10px]"
          >
            SIGN UP
          </button>

          <p className="mx-auto mt-5 text-center text-[16px]">Sign up with</p>

       {/*   <div className="w-[95%] flex tablet:flex-row flex-col justify-between mt-4 mx-auto tablet:gap-2 gap-4">
            <div
              className="bg-white rounded-[20px] flex flex-row h-[42px] hover:bg-[#f5f5f5] cursor-pointer
                         text-black items-center gap-2 w-full justify-center"
            >
              <img src={facebookIcon} className="h-[32px]" />
              <p className="text-[17px]">Facebook</p>
            </div>
            <div
              className="bg-white rounded-[20px] flex flex-row h-[42px] hover:bg-[#f5f5f5] cursor-pointer
                        text-black items-center gap-2 w-full justify-center"
            >
              <img
                src={gooogleIcon}
                className="h-[38px] ml-[-1rem] mr-[-0.4rem]"
              />
              <p className="text-[17px]">Gmail</p>
            </div>
            </div> */ }
          <p className="mx-auto mb-4 mt-7 text-center text-[16px]">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline hover:text-blue-500"
              onClick={() => {
                navigate("/");
              }}
            >
              Sign in
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupScreen;
