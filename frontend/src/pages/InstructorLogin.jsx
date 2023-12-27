import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInstructorLoginMutation } from "../Slices/authInstructorSlice.js";
import { instructorSetCredentials,logout } from "../Slices/instructorApiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const InstructorLogin = () => {
    // const instructorInfo = useSelector(
    //   (state) => state.authInstructor.instructorInfo
    // );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("Updated FormData:", formData);

  };

const dispatch = useDispatch();

  const navigate = useNavigate(); // assuming you are using React Router

  const [login] = useInstructorLoginMutation(); // Assuming 'mutate' is the function used for login

  const submitHandler = async (e) => {-
    e.preventDefault();
      console.log("Submit button clicked");
      console.log("FormData:", formData);
    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      console.log("Login successful. Response:", res);
     console.log("Payload:", { ...res });

      dispatch(instructorSetCredentials({ ...res }));
console.log("Dispatched instructorSetCredentials", res._id);

navigate(`/instructor/${res._id}/courselist`);
      toast.success("Successfully logged in");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-HeadingColor text-[22px] leading-2 font-bold mb-4">
          Hello! <span className="text-primaryColor">Welcome </span>Back
        </h3>
        <h4>Login to continue teaching...</h4>
        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bolder-b border-solid border-[#0866ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-painter "
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bolder-b border-solid border-[#0866ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-painter "
              required
            />
          </div>
          <div className="mt-7">
            <button
              type="submit"
              className="w-[150px] bg-black text-white text-[18px] leading-[30px] px-4 py-3"
            >
              Login
            </button>
            <button
              type="button"
              className="w-[150px] bg-gray-500 text-white text-[18px] leading-[20px] px-4 py-3 ml-4"
              onClick={() => {
                // Add cancel button logic here
              }}
            >
              Cancel
            </button>
          </div>
          <p
            className="
          mt-5 text-textColor text-center"
          >
            Dont have an account?
            <Link
              to="/instructorRegister"
              className="text-primaryColor font-medium ml-1"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}


export default InstructorLogin
