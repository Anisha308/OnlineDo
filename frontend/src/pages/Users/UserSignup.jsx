import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../Slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import uploadImageToCloudinary from "../../../../backend/utils/uploadCloudinary";
import { useVerifyOtpMutation } from "../../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../Slices/authSlice";
import Modal from "react-modal";
import signupImg from "../../assets/images/hero-bg.jpg";
const SignUp = () => {
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    profilephoto: null,
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const [isEmailVerificationModalOpen, setIsEmailVerificationModalOpen] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const [verifyOtp, { data, error }] = useVerifyOtpMutation();
  const [recievedOtp, setRecievedOtp] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setIsEmailVerificationModalOpen(true);
      navigate("/");
    }
  }, [userInfo]);
  const onRequestClose = () => {
    setIsOpen(false);
    setIsEmailVerificationModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "nsme");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const data = await uploadImageToCloudinary(file);
      console.log(data, "data");
      setPreviewURL(data.url);

      setFormData({ ...formData, profilephoto: data.url });
    } catch (error) {
      console.log("error uploading img", error);
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
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
        profilephoto: formData.profilephoto,
        typedOtp: recievedOtp,
      });
      console.log(response, "response");
      if (response.error) {
        toast.error("Invalid otp");

        console.error("OTP verification failed:", response.error);
      } else {
        const data = response.data;
        console.log(data, "daata");
        if (data.success) {
          console.log("success");
          dispatch(setCredentials({ ...data }));
          navigate("/");
          setIsOpen(false);
          toast.success("Registration successfull");
        } else {
          console.error("OTP verification failed:", data.message);
        }
      }
    } catch (error) {
      console.error("Error triggering OTP verification:", error.message);
    }
  };
  const submitHandler = async (e) => {
    console.log("you are here");
    e.preventDefault();
    setLoading(true);

    const {
      name,
      email,
      otp,
      mobile,
      profilephoto,
      password,
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
          profilephoto,
          password,
          otp,
        }).unwrap();
        const recievedOtp = res.otp;
        setRecievedOtp(recievedOtp);
        setIsOpen(true);
        toast.success("otp send successful");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <div className=" md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-400 to-blue-700 i justify-around items-center hidden">
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
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white ">
            <h1 className="text-gray-800 font-bold text-2xl ">Get Started!</h1>
            <p className="text-sm font-normal text-gray-600 mb-4">
              Welcome to OnlineDo
            </p>
            <form onSubmit={submitHandler}>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
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
                  className="pl-2  outline-none border-none"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
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
                  className="pl-2 outline-none border-none"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#899499	"
                  class="bi bi-telephone"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />{" "}
                </svg>
                <input
                  className="pl-2 outline-none border-none"
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
                  className="pl-2 outline-none border-none"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
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
                  className="pl-2 outline-none border-none"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center border-2 py-3 px-3 rounded-2xl relative mb-2">
                <input
                  className="hidden"
                  type="file"
                  name="profilephoto"
                  id="profilephoto"
                  onChange={handleFileChange}
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
            </form>
            <button
              type="button"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-1"
              onClick={submitHandler}
            >
              Register
            </button>
            <p
              className="
                     mt-3 text-textColor text-center"
            >
              Already have an account?
              <Link to="/login" className="text-primaryColor font-medium ml-1">
                Login
              </Link>
            </p>
          </form>
          <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Email Verification Modal"
            className="modal-content"
          >
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-8 max-w-lg">
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
                  <div className="flex items-center justify-between border border-gray-200 rounded-xl">
                    <input
                      className="w-full h-12 px-4 text-lg border-none outline-none focus:bg-gray-50"
                      type="text"
                      placeholder="Enter OTP"
                      name="otp"
                      value={formData.otp || ""}
                      onChange={handleInputChange}
                    />
                    <button
                      onClick={handleVerifyOtp}
                      className="px-6 py-3 text-white text-sm bg-blue-600 hover:bg-blue-700 rounded-xl transition duration-300 ease-in-out"
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
};

export default SignUp;
