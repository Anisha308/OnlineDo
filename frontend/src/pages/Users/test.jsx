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
const test = () => {
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    profilephoto: null,
    password: "",
    confirmPassword: "",
    otp: "", // Add OTP state
  });
  const [isOpen, setIsOpen] = useState(false); // Define isOpen state

  const [isEmailVerificationModalOpen, setIsEmailVerificationModalOpen] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const [verifyOtp, { data, error }] = useVerifyOtpMutation();
  const [recievedOtp, setRecievedOtp] = useState(""); // Add state for received OTP

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
      if (userInfo) {
        console.log('isemail');
      setIsEmailVerificationModalOpen(true); // Open the email verification modal
      navigate("/");
    }
  }, [userInfo]);
  const onRequestClose = () => {
    // Logic to handle closing the modal
    setIsOpen(false);
    setIsEmailVerificationModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
console.log(name,value,'nsme');
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
      const file = event.target.files[0];
      console.log(file);
    try {
      const data = await uploadImageToCloudinary(file);
console.log(data,'data');
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
        typedOtp: recievedOtp, // Include the user-typed OTP
      });
        console.log(response,'response');
      if (response.error) {
        toast.error("Invalid otp");

        console.error("OTP verification failed:", response.error);
      } else {
        const data = response.data;
console.log(data,'daata');
          if (data.success) {
            console.log(success);
          dispatch(setCredentials({ ...data }));
          navigate("/");
          setIsOpen(false); // Close the modal after successful verification
          toast.success("Registration successfull");
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
      console.log('you are here');
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
          console.log(res);
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
      {/* Hello world */}
      {/* component */}
      <div className=" md:flex">
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
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white">
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
                  className="pl-2 outline-none border-none"
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
                  {" "}
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />{" "}
                </svg>{" "}
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
              type="button" // Ensure the type is "button"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-1"
              onClick={submitHandler} // Handle the click event
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
            className="modal-content" // Add your custom styling for the modal content
          >
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
          </Modal>
        </div>
      </div>
    </>
  );
};

export default test;
