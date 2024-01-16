import React from "react";
import signupImg from "../../assets/images/hero-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useInstructorSignUpMutation } from "../../Slices/authInstructorSlice.js";
import { useInstructverifyOtpMutation } from "../../Slices/authInstructorSlice.js";
import { Modal } from "react-bootstrap";
import uploadImageToCloudinary from "../../../../backend/utils/uploadCloudinary.js";
import { useSelector, useDispatch } from "react-redux";
import { instructorSetCredentials } from "../../Slices/instructorApiSlice.js";
const InstructorSignup = () => {
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
    e.preventDefault()
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
    };
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
                  <div className="mb-5">
                    <p className="text-lg font-bold mb-3">Upload Documents</p>
                    <label
                      htmlFor="profilephoto"
                      className="block  font-semibold mb-2"
                    >
                      Profile Photo:
                    </label>{" "}
                    <input
                      type="file"
                      id="profilephoto"
                      accept="image/*"
                      onChange={handleprofilephotoUpload}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="idProof"
                      className="block  font-semibold mb-2"
                    >
                      ID Proof:{" "}
                    </label>
                    <input
                      type="file"
                      id="idProof"
                      onChange={handleIdProofUpload}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="experienceCertificate"
                      className="block  font-semibold mb-2"
                    >
                      Experience Certificate:{" "}
                    </label>
                    <input
                      type="file"
                      id="experienceCertificate"
                      onChange={handleExperienceCertificateUpload}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray hover:underline"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handleModalSubmit}
                      className="text-white bg-blue-900 hover:bg-primaryColorDark px-4 py-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </form>
            {Emailverify && (
              <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                  <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div className=" text-gray-500 ">
                      <div className="pr-72">Email Verification</div>
                    </div>
                    <div className="flex flex-row text-sm font-medium text-gray-400">
                      <p>We have sent a code to your email</p>
                    </div>
                  </div>

                  <form action="" method="post">
                    <div className="flex flex-col space-y-16">
                      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        <div className="w-200 ">
                          <input
                            className="w-full h-9 border-black flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            placeholder="Enter OTP"
                            name="otp"
                            value={formData.otp || ""} // Use formData.otp or an empty string if null
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-5">
                        <div>
                          <button
                            onClick={handleVerifyOtp}
                            className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-900 border-none text-white text-sm shadow-sm"
                          >
                            Verify Account
                          </button>
                        </div>

                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                          <p>Didn't receive code?</p>{" "}
                          <a
                            className="flex flex-row items-center text-blue-600"
                            href="http://"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Resend
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default InstructorSignup;
