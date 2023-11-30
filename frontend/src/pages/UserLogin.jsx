import React from 'react'
import { useState } from 'react'
import { NavLink, Link } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({
    email: ' ',
    password:' '
  })

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name ]: e.target.value})
  }
  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-HeadingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span>
          Back
        </h3>

        <form className="py-4 md:py-0">
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
              className="w-[150px] bg-primaryColor text-white text-[18px] leading-[30px]  px-4 py-3"
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
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login
