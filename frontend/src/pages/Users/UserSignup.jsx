import React from 'react'
import signupImg from '../../assets/images/hero-bg.jpg'
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {  useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../Slices/usersApiSlice";
import { setCredentials } from "../../Slices/authSlice";
import { toast } from "react-toastify";
import Loader from '../../components/Loader';
import uploadImageToCloudinary from '../../../../backend/utils/uploadCloudinary';


const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewURL, setPreviewURL] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    profilephoto: null,
    password: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


    const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const data = await uploadImageToCloudinary(file);
      console.log(data, "data");

      setPreviewURL(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, profilephoto: data.url });
    } catch (error) {
      console.log("error uploading img", error);
    }
  };

   
   const submitHandler = async (e) => {
     e.preventDefault();
     setLoading(true);

     const { name, email, mobile, profilephoto, password, confirmPassword } =
       formData;

     if (password !== confirmPassword) {
       toast.error("Passwords do not match");
     } else {
       try {
         const res = await register({
           name,
           email,
           mobile,
           profilephoto,
           password,
         }).unwrap();
         dispatch(setCredentials({ ...res }));
         toast.success("Registration successful");
         navigate("/login");
       } catch (err) {
         toast.error(err?.data?.message || err.error);
       }
     }

     setLoading(false);
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
              <h3 className="text-headingColor text-[22px] leading-9 front-bold mb-10">
                Create an <span className="text-primaryColor">account</span>
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
                  />
                </div>
                <div className="mb-5">
                  <p className=" text-gray-500 text-md  mb-3 pl-4">
                    Profile Photo
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    name="profilephoto"
                    onChange={handleFileChange}
                    className=""
                    id="profile-photo-input"
                  />
                  <label
                    htmlFor="profile-photo-input"
                    className="cursor-pointer"
                  >
                    <div className="mx-auto w-64 text-center relative">
                      <div className="relative w-64 h-64 flex items-center justify-center">
                        {selectedFile && (
                          <img
                            className="w-10 h-10 rounded-full absolute top-0 left-0"
                            src={selectedFile}
                            alt=""
                          />
                        )}
                        <div className="mt-5 flex justify-between items-center">
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
                          {isLoading && <Loader />}
                        </div>
                      </div>
                      <p
                        className="
          mt-5 text-textColor text-center"
                      >
                        Already have an account?
                        <Link
                          to="/login"
                          className="text-primaryColor font-medium ml-1"
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  </label>
                </div>
              </form>
            </div>
            <div></div>
          </div>
        </div>
      </section>
    );
  }


export default SignUp
