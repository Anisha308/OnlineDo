import React from "react";
import signupImg from "../../assets/images/hero-bg.jpg";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useInstructorSignUpMutation } from "../../Slices/authInstructorSlice,js";
const InstructorSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    experience: "",
    jobrole: "",
    companyname: "",
    password: "",
    confirmPassword: "",
  });
  const [  register ] = useInstructorSignUpMutation(); // Use your register mutation hook

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      mobile,
      experience,
      jobrole,
      password,
      companyname,
      confirmPassword,
    } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          name,
          email,
          mobile,
          experience,
          jobrole,
          companyname,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/userlists");
        
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[900px] mx-auto  ">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {/*======img box ========*/}
          <div className="hidden lg:block  rounded-l-lg">
            <figure className="rounded-l-lg overflow-hidden">
              <img
                src={signupImg}
                alt=""
                className="w-full min-h-full object-cover rounded-l-lg"
              />
            </figure>
          </div>
          {/*=========sign up form======*/}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 front-bold mb-10 w-[500px]">
              Register{" "}
              <span className="text-primaryColor">to be an Instructor!!</span>
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bolder-b border-solid border-[#0866ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-painter "
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bolder-b border-solid border-[#0866ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-painter "
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="number"
                  placeholder="Enter your mobile number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bolder-b border-solid border-[#0866ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-painter "
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="number"
                  placeholder="Enter your total year of experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bolder-b border-solid border-[#0866ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-painter "
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter your job role"
                  name="jobrole"
                  value={formData.jobrole}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bolder-b border-solid border-[#0866ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-painter "
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter your company/institute name"
                  name="companyname"
                  value={formData.companyname}
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
                  className="w-full px-4 py-3 bolder-b border-solid border-[#0866ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-painter "
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bolder-b border-solid border-[#0866ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-painter "
                  required
                />
              </div>

              <div className="mt-7 flex justify-between items-center">
                <button
                  type="submit"
                  className="w-[150px] bg-black text-white text-[18px] leading-[20px] px-4 py-3"
                >
                  Register
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
                Already have an account?
                <Link
                  to="/instructorLogin"
                  className="text-primaryColor font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSignup;
