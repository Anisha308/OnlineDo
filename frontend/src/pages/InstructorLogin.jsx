import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInstructorLoginMutation } from "../Slices/authInstructorSlice.js";
import { instructorSetCredentials } from "../Slices/instructorApiSlice.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import OAuth from "../components/OAuth.jsx";

const InstructorLogin = () => {
  const { instructorInfo } = useSelector((state) => state.instructorAuth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const instructorJwt = document.cookie
      .split("; ")
      .find((row) => row.startsWith("instructorjwt="));

    if (instructorJwt) {
      navigate("/instructor");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [login] = useInstructorLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      dispatch(instructorSetCredentials(res));

      navigate(`/instructor`);
      toast.success("Successfully logged in");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n/*remove custom style*/\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n}\n  .circles li{\n    position: absolute;\n    display: block;\n    list-style: none;\n    width: 20px;\n    height: 20px;\n    background: rgba(255, 255, 255, 0.2);\n    animation: animate 25s linear infinite;\n    bottom: -150px;  \n}\n.circles li:nth-child(1){\n    left: 25%;\n    width: 80px;\n    height: 80px;\n    animation-delay: 0s;\n}\n \n \n.circles li:nth-child(2){\n    left: 10%;\n    width: 20px;\n    height: 20px;\n    animation-delay: 2s;\n    animation-duration: 12s;\n}\n \n.circles li:nth-child(3){\n    left: 70%;\n    width: 20px;\n    height: 20px;\n    animation-delay: 4s;\n}\n \n.circles li:nth-child(4){\n    left: 40%;\n    width: 60px;\n    height: 60px;\n    animation-delay: 0s;\n    animation-duration: 18s;\n}\n \n.circles li:nth-child(5){\n    left: 65%;\n    width: 20px;\n    height: 20px;\n    animation-delay: 0s;\n}\n \n.circles li:nth-child(6){\n    left: 75%;\n    width: 110px;\n    height: 110px;\n    animation-delay: 3s;\n}\n \n.circles li:nth-child(7){\n    left: 35%;\n    width: 150px;\n    height: 150px;\n    animation-delay: 7s;\n}\n \n.circles li:nth-child(8){\n    left: 50%;\n    width: 25px;\n    height: 25px;\n    animation-delay: 15s;\n    animation-duration: 45s;\n}\n \n.circles li:nth-child(9){\n    left: 20%;\n    width: 15px;\n    height: 15px;\n    animation-delay: 2s;\n    animation-duration: 35s;\n}\n \n.circles li:nth-child(10){\n    left: 85%;\n    width: 150px;\n    height: 150px;\n    animation-delay: 0s;\n    animation-duration: 11s;\n}\n  @keyframes animate {\n \n    0%{\n        transform: translateY(0) rotate(0deg);\n        opacity: 1;\n        border-radius: 0;\n    }\n \n    100%{\n        transform: translateY(-1000px) rotate(720deg);\n        opacity: 0;\n        border-radius: 50%;\n    }\n \n}\n.triangle{\n  border-top:60rem solid #fff;\n  border-left:25rem solid transparent;\n}\n",
        }}
      />
      <div className="relative min-h-screen flex justify-center  ">
        <div className="flex flex-col md:flex-row items-center md:items-start flex-auto min-w-0 bg-white">
          <div
            className="md:w-1/2 xl:w-1/2 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
            style={{
              backgroundImage:
                "url(https://img.freepik.com/premium-photo/close-up-hand-using-computer-keyboard-typing-internet-online_175201-426.jpg)",
            }}
          >
            <div className="absolute bg-gradient-to-b from-blue-400 to-gray-900 opacity-75  inset-0 z-0" />
            <div
              className="absolute triangle right-0 hidden xl:block"
              style={{
                borderTop: "calc(100vw / 2) solid #fff",
                borderLeft: "calc(50vw / 2) solid transparent",
              }}
            />
            <a
              href="https://codepen.io/uidesignhub"
              target="_blank"
              title="codepen aji"
              className="flex absolute top-5 text-center text-gray-100 focus:outline-none"
            ></a>

            <div className="w-full max-w-md z-10">
              <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                <div className="hide-on-mobile">Instruct. Inspire</div>
              </div>
              <div className="sm:text-sm xl:text-sm text-white-200 leading-tight font-normal mb-6 hidden md:block">
                {" "}
                "Instruct with precision, guiding minds through knowledge's
                maze, while inspiring them to soar beyond boundaries, igniting a
                flame of curiosity that illuminates paths to enlightenment."{" "}
              </div>
            </div>
          </div>
          <div className="md:w-1/2 xl:w-1/2  p-6 ">
            {" "}
            <div className="max-w-md mx-auto space-y-6 mb-4">
              <h2 className="mb-7 text-3xl font-bold text-gray-900 ">
                Welcome Back!
              </h2>
              <p className="mb-5 text-sm  text-gray-900">
                Sign in to continue teaching..{" "}
              </p>

              <form
                className="max-w-sm  space-y-6"
                onSubmit={submitHandler}
                action="#"
                method="POST"
              >
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    className="px-4 py-2 border-b border-gray-300 focus:outline-none rounded-md focus:border-indigo-500"
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="mail@gmail.com"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    className="px-4 py-2 border-b border-gray-300 focus:outline-none rounded-md focus:border-indigo-500"
                    type="password"
                    name="password"
                    value={formData.password}
                    id="password"
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-3 rounded-full font-semibold shadow-lg cursor-pointer transition duration-300"
                  >
                    Sign in
                  </button>
                </div>
                <p className="text-center text-gray-500 text-sm">
                  Dont have an account?
                  <Link
                    to="/instructorRegister"
                    className="text-indigo-500 hover:text-blue-500"
                  >
                    SignUp
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorLogin;
