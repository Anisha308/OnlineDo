import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useInstructorSignUpMutation } from "../../Slices/authInstructorSlice.js";
import { useInstructverifyOtpMutation } from "../../Slices/authInstructorSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { instructorSetCredentials } from "../../Slices/instructorApiSlice.js";
import Modal from "react-modal";
function InstructorSignup() {
  const [previewURL, setPreviewURL] = useState("");
  const [previewCertificate, setPreviewCertificate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProof, setIdProofFile] = useState(null);
  const [experienceCertificateFile, setExperienceCertificateFile] =
    useState(null);

  const [recievedOtp, setRecievedOtp] = useState("");
  const [profilephoto, setprofilephoto] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    experience: "",
    jobrole: "",
    companyname: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [Emailverify, setEmailverify] = useState(false);

  const [register] = useInstructorSignUpMutation(); // Use your register mutation hook
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [verifyOtp] = useInstructverifyOtpMutation();
  const { instructorInfo } = useSelector((state) => state.authInstructor) || {};

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onRequestClose = () => {
    // Logic to handle closing the modal
    setEmailverify(false);
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        name,
        email,
        otp,
        mobile,
        password,
        experience,
        jobrole,
        companyname,
      } = formData;
      const res = await register({
        ...formData,
        name,
        email,
        mobile,
        experience,
        jobrole,
        companyname,
        password,
        profilephoto,
        idProof,
        experienceCertificateFile,
        otp,
      }).unwrap();
      const recievedOtp = res.otp;
      setRecievedOtp(recievedOtp);
      setIsModalOpen(false);
      setEmailverify(true);
      toast.success("otp send successful");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      // if (!formData.otp) {
      //   toast.error("otp is invalid")
      // }

      if (!formData.email) {
        console.error("OTP or email is not set");
        return;
      }

      const response = await verifyOtp({
        otp: formData.otp,
        email: formData.email,
        name: formData.name,
        mobile: formData.mobile,
        password: formData.password,
        profilephoto,
        idProof,
        experienceCertificateFile,
        experience: formData.experience,
        jobrole: formData.jobrole,
        companyname: formData.companyname,
        typedOtp: recievedOtp, // Include the user-typed OTP
      });
      if (response.error) {
        toast.error("Invalid otp");
        console.error("OTP verification failed:", response.error);
        // Handle OTP verification failure
      } else {
        const data = response.data;
        if (data.success) {
          dispatch(instructorSetCredentials({ ...data }));
          setEmailverify(false); // Close the modal after successful verification
          setIsModalOpen(false); // Open the Email Verification Modal

          toast.success("Registration successfull");
          navigate("/instructorLogin");
        } else {
          console.error("OTP verification failed:", data.message);
          // Handle OTP verification failure
        }
      }
    } catch (error) {
      console.error("Error triggering OTP verification:", error.message);
      // Handle other errors, e.g., network issues or server errors
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      mobile,
      experience,
      jobrole,
      companyname,
      password,
      confirmPassword,
    } = formData;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      // Open the modal for file uploads
      setIsModalOpen(true);
      // setIsOpen(true);
    }
  };

  const handleprofilephotoUpload = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setprofilephoto(reader.result);
      setPreviewURL(reader.result); // Set preview URL here
    };
  };

  const handleIdProofUpload = (e) => {
    const file = e.target.files[0];
    setFileToBase2(file);
  };

  const setFileToBase2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setIdProofFile(reader.result);
    };
  };

  const handleExperienceCertificateUpload = (e) => {
    const file = e.target.files[0];
    setFileToBase3(file);
  };

  const setFileToBase3 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setExperienceCertificateFile(reader.result);
      setPreviewCertificate(reader.result);
    };
  };

  return (
    <>
      <div className=" md:flex min-h-screen ">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              OnlineDo
            </h1>
            <p className="text-white mt-1">
              Don't worry about failure; you only have to be right once.
            </p>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        </div>
        <div className="sm:w-1/3 md:w-3/3 lg:w-3/4 xl:w-3/5 flex py-10 bg-white">
          <div className="ml-10  ">
            <h1 className="text-gray-800 font-bold text-2xl">Get Started!</h1>
            <p className="text-sm font-normal text-gray-600 mb-4">
              Welcome to OnlineDo
            </p>

            <form onSubmit={submitHandler}>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex w-19 items-center border-2 py-2 px-3 rounded-2xl mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5  text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm  sm:text-sm"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="lg:flex ">
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="16"
                    fill="#899499	"
                    className="bi bi-telephone"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />{" "}
                  </svg>{" "}
                  <input
                    className="pl-2 outline-none border-none w-full sm:w-40 py-1 text-sm"
                    type="number"
                    placeholder="Mobile number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    style={{ fill: "#899499" }}
                  >
                    <path d="M 9 3 L 9 4 L 2 4 L 2 12 C 2 13.105 2.895 14 4 14 L 20 14 C 21.105 14 22 13.105 22 12 L 22 4 L 15 4 L 15 3 L 9 3 z M 12 10 C 12.552 10 13 10.448 13 11 C 13 11.552 12.552 12 12 12 C 11.448 12 11 11.552 11 11 C 11 10.448 11.448 10 12 10 z M 2 15.443359 L 2 20 L 22 20 L 22 15.443359 C 21.409 15.787359 20.732 16 20 16 L 4 16 C 3.268 16 2.591 15.787359 2 15.443359 z"></path>
                  </svg>

                  <input
                    className="pl-2 outline-none border-none w-full sm:w-40 py-1 text-sm"
                    type="number"
                    placeholder="Year of experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2 mr-2">
                <svg fill="#000000" class="w-5 h-5" viewBox="0 0 256 256">
                  <g fill="#a19b9b">
                    <rect x="92.8" y="134.1" width="2" height="2"></rect>
                    <circle cx="79.9" cy="29.4" r="24.6"></circle>
                    <path
                      d="M117.2,151H75.7v-30.8L54.5,83.7c-0.8-1.5-0.2-3.3,1-4.2c1.5-0.8,3.3-0.2,4.2,1l24.6,42.3c1.9,3.1,5.2,5.4,9.2,5.4h42.3
        c6,0,10.8-5,10.8-10.8c0-6-5-10.8-10.8-10.8l-35.4,0.4L72.2,59.6c-2.1-3.7-6.2-5.8-11.2-5.8c-0.6,0-2.3,0.2-2.9,0.4
        c-0.6,0.2-1.7,0.4-2.3,0.6c-20.6,6.9-36.9,39.6-36.9,73.3c-0.2,10.2,0,18.7,0.6,26.9c-0.8,9.8,5,19.4,14.6,22.9
        c2.5,0.8,5,1.5,7.5,1.5h61.7V237c0,7.9,6.2,14,14,14c7.9,0,14-6.2,14-14v-71.9c0-3.5-1.5-7.3-4.2-9.8
        C124.1,152.5,120.5,151,117.2,151z"
                    ></path>
                    <polygon points="212,126 212.2,126.2 238,62.9 229.7,59.4 205.9,117.7 152.4,117.7 152.4,126.9 212,126.9"></polygon>
                  </g>
                </svg>

                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  placeholder="Job role"
                  name="jobrole"
                  value={formData.jobrole}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2 mr-2">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 16 16"
                  id="company-small-16px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    id="Retângulo_223"
                    data-name="Retângulo 223"
                    width="16"
                    height="16"
                    fill="#899499"
                    opacity="0"
                  ></rect>
                  <g id="Icone" transform="translate(0.648 -0.621)">
                    <g
                      id="Retângulo_203"
                      data-name="Retângulo 203"
                      transform="translate(2.352 2.621)"
                      fill="none"
                      stroke="#899499"
                      strokeWidth="1"
                    >
                      <path
                        d="M1,0H9a1,1,0,0,1,1,1V12a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V1A1,1,0,0,1,1,0Z"
                        stroke="none"
                      ></path>
                      <rect
                        x="0.5"
                        y="0.5"
                        width="9"
                        height="11"
                        rx="0.5"
                        fill="none"
                      ></rect>
                    </g>
                    <g
                      id="Retângulo_227"
                      data-name="Retângulo 227"
                      transform="translate(5.352 9.621)"
                      fill="none"
                      stroke="#899499"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                    >
                      <rect width="4" height="5" stroke="none"></rect>
                      <rect
                        x="0.5"
                        y="0.5"
                        width="3"
                        height="4"
                        fill="none"
                      ></rect>
                    </g>
                    <g id="Grupo_334" data-name="Grupo 334">
                      <g
                        id="Retângulo_206"
                        data-name="Retângulo 206"
                        transform="translate(5.352 5.621)"
                        fill="none"
                        stroke="#899499"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                      >
                        <rect width="1" height="1" stroke="none"></rect>
                        <rect x="0.5" y="0.5" fill="none"></rect>
                      </g>
                      <g
                        id="Retângulo_225"
                        data-name="Retângulo 225"
                        transform="translate(5.352 7.621)"
                        fill="none"
                        stroke="#899499"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                      >
                        <rect width="1" height="1" stroke="none"></rect>
                        <rect x="0.5" y="0.5" fill="none"></rect>
                      </g>
                      <g
                        id="Retângulo_224"
                        data-name="Retângulo 224"
                        transform="translate(8.352 5.621)"
                        fill="none"
                        stroke="#899499"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                      >
                        <rect width="1" height="1" stroke="none"></rect>
                        <rect x="0.5" y="0.5" fill="none"></rect>
                      </g>
                      <g
                        id="Retângulo_226"
                        data-name="Retângulo 226"
                        transform="translate(8.352 7.621)"
                        fill="none"
                        stroke="#899499"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                      >
                        <rect width="1" height="1" stroke="none"></rect>
                        <rect x="0.5" y="0.5" fill="none"></rect>
                      </g>
                    </g>
                  </g>
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  placeholder="Company name"
                  name="companyname"
                  value={formData.companyname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="lg:flex">
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none w-full sm:w-40 py-1 text-sm"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none w-full sm:w-40 py-1 text-sm"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button
                type="submit" // Ensure the type is "button"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-1"
              >
                Register
              </button>
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

            {isModalOpen && (
              <div
                id="popup-modal"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white-1009 p-8 w-[400px] h-500px"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
                  // Add other inline styles as needed
                }}
              >
                {" "}
                <h3 className="font-bold mb-4">Upload Your Files</h3>
                <div className="flex items-center border-2 py-3 px-3 rounded-2xl relative mb-2">
                  <input
                    className="hidden"
                    type="file"
                    name="profilephoto"
                    id="profilephoto"
                    accept="image/*"
                    onChange={handleprofilephotoUpload}
                  />
                  {previewURL && (
                    <figure className="w-[50px] h-[50px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center relative mr-4">
                      <img
                        className="w-[50px] h-[50px] rounded-full"
                        src={previewURL}
                        alt=""
                      />
                    </figure>
                  )}
                  <label
                    htmlFor="profilephoto"
                    className="flex-grow h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer text-right"
                  >
                    Upload profile photo
                  </label>
                </div>
                <div className="flex items-center border-2 py-3 px-3 rounded-2xl relative mb-2">
                  <input
                    className="hidden"
                    type="file"
                    name="idProof"
                    id="idProof"
                    onChange={handleIdProofUpload}
                  />
                  {idProof && (
                    <figure className="w-[50px] h-[50px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center relative mr-4">
                      <img
                        className="w-[50px] h-[50px] rounded-full"
                        src={idProof}
                        alt=""
                      />
                    </figure>
                  )}
                  <label
                    htmlFor="idProof"
                    className="flex-grow h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer text-right"
                  >
                    Upload ID Proof
                  </label>
                </div>
                <div className="flex items-center border-2 py-3 px-3 rounded-2xl relative mb-2">
                  <input
                    className="hidden"
                    type="file"
                    name="experienceCertificate"
                    id="experienceCertificate"
                    onChange={handleExperienceCertificateUpload}
                  />
                  {previewCertificate && (
                    <figure className="w-[50px] h-[50px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center relative mr-4">
                      <img
                        className="w-[50px] h-[50px] rounded-full"
                        src={previewCertificate}
                        alt=""
                      />
                    </figure>
                  )}
                  <label
                    htmlFor="experienceCertificate"
                    className="flex-grow h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer text-right"
                  >
                    Upload Experience Certificate
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray border border-gray-600 p-1 mt-6 w-20 h-9 rounded-md hover:underline"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleModalSubmit}
                    className="text-white bg-blue-900 hover:bg-primaryColorDark px-4 py-2 mt-6 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>

          <Modal
            isOpen={Emailverify}
            onRequestClose={onRequestClose}
            contentLabel="Email Verification Modal"
            className="modal-content"
          >
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-8 max-w-lg w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-gray-800 text-2xl font-semibold">
                  Verify Your Email
                </h2>
                <button
                  onClick={onRequestClose}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none transition duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                We've sent a verification code to your email address. Please
                enter the code below:
              </p>

              <form action="" method="post" className="mt-6">
                <div className="max-w-xs mx-auto">
                  <div className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 rounded-xl">
                    <input
                      className="w-full md:w-56 h-12 px-4 text-lg border-none outline-none focus:bg-gray-50"
                      type="text"
                      placeholder="Enter OTP"
                      name="otp"
                      value={formData.otp || ""}
                      onChange={handleInputChange}
                    />
                    <button
                      onClick={handleVerifyOtp}
                      className="w-full md:w-auto px-6 py-3 mt-2 md:mt-0 text-white text-sm bg-blue-900 hover:bg-blue-900 rounded-xl transition duration-300 ease-in-out"
                    >
                      Verify
                    </button>
                  </div>

                  <div className="mt-5 text-center text-sm text-gray-600">
                    <p>Didn't receive the code?</p>
                    <a
                      className="text-blue-600 hover:underline"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default InstructorSignup;