import React, { useState } from "react";
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
import { useCookies } from "react-cookie";
import Navbar from "../dashboard/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
//6LcSB0QpAAAAANhOKVHefyH60lBTM4FbbLygqgmq 

const SigninScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [capVal, setCapVal] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  

  const [cookies, setCookie] = useCookies(["xyz"]);
  const [statusCode, setStatusCode] = useState(null);

  //---onSubmit handler----
  const onSubmitHandler = async (data) => {
    try {
      const response = await axios.post("auth/login", data);
      

      setCookie("xyz", response.data.token, {
        expires: new Date(new Date().getTime() + 3 * 60 * 60 * 1000), // 3 hours
        domain: "localhost",
        httpOnly: false,
        sameSite: "None",
        // secure: window.location.protocol === "https:", // Set secure only for HTTPS
        secure: true,
        
      });

      setShowCaptcha(true);
      
    } catch (error) {
      if (error.response) {
        setStatusCode(error.response.status);
        if (statusCode === 400) {
          alert("Invalid credentials. Please try again");
        } else if (statusCode === 401) {
          alert("Unauthorized. Please check your credentials");
        } else {
          alert("Login failed. Please try again later.");
        }
      } else {
        alert("Login failed. Please try again later.");
      }
    }
  };

  const navigate = useNavigate();
  //---show/hide password option---
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
   
    <div className="flex flex-col h-[100vh] w-full justify-center items-center bg-ImageBg bg-no-repeat bg-cover overflow-y-auto">
    <div
    className="fixed top-0 hidden w-full cursor-pointer tablet:flex"
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
            <h1 className="font-bold text-[26px] mx-auto mb-10 mt-3">
              SIGN IN
            </h1>
          </section>
          

          <span className="ml-3 font-bold">Email or Username</span>
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
              name="identifier"
              placeholder="Enter your email/username"
              error={errors.identifier ? true : false}
              {...register("identifier", {
                required: "this is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$|^[a-zA-Z0-9_]{3,20}$/,
                  message: "Invalid username or email",
                },
              })}
            />
          </div>
          {errors.identifier && (
            <p className="text-red-500 text-[14px] mt-2 ml-3 mb-[-0.5rem]">
              {errors.identifier.message}
            </p>
          )}

          <span className="mt-3 ml-3 font-bold">Password</span>
          <div className="bg-white mx-auto flex flex-row w-[95%] rounded-[15px] items-center">
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
         {/*  <span
            className="mt-2 mr-3 cursor-pointer text-end hover:underline hover:text-blue-500"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password?
          </span> */}
             {/* Conditional rendering of reCAPTCHA */}
            
              <div className="mt-3 mx-auto w-[95%]">
              
                <ReCAPTCHA
                  sitekey="6LcSB0QpAAAAANhOKVHefyH60lBTM4FbbLygqgmq"
                  onChange={(value) => setCapVal(value)}
                />
              
              </div>
          

            {capVal !== null && (
              <button
                type="submit"
                className="btn mt-7 w-[95%] mx-auto btn-primary text-[20px] text-white rounded-[10px]"
              >
                SIGN IN
              </button>
            )}
         

          <p className="mx-auto mt-4  text-center text-[16px]">
            Don't have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline hover:text-blue-500"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </span>
          </p>
          <p className="mx-auto mt-[-0.2rem] text-center text-[16px]">
            {" "}
            or with
          </p>
        { /*  <div className="w-[95%] flex tablet:flex-row flex-col justify-between my-4 mx-auto tablet:gap-2 gap-4">
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
        </div>
      </form>
    </div>
    </>
  );
};

export default SigninScreen;
