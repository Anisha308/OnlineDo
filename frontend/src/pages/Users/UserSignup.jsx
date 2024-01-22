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
      setIsEmailVerificationModalOpen(true); // Open the email verification modal
      navigate('/')
    }
  }, [userInfo]);
  const onRequestClose = () => {
    // Logic to handle closing the modal
    setIsOpen(false);
    setIsEmailVerificationModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const data = await uploadImageToCloudinary(file);

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
      if (response.error) {
        toast.error("Invalid otp");

        console.error("OTP verification failed:", response.error);
        // Handle OTP verification failure
      } else {
        const data = response.data;

        if (data.success) {
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
        setIsOpen(true); // Open the modal
        toast.success("otp send successful");
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

              <div className="flex flex-col  gap-3 mb-5 mt-7">
                {previewURL && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center relative">
                    <img
                      className="w-19 h-19 rounded-full"
                      src={previewURL}
                      alt=""
                    />
                  </figure>
                )}

                <div className="relative w-[160px] h-[50px]  ">
                  <input
                    type="file"
                    name="profilephoto"
                    id="profilephoto"
                    onChange={handleFileChange}
                    className="absolute top-0 left-0 h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="profilephoto"
                    className="absolute top-0 left-0 w-full h-fullflex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor 
                       font-semibold rounded-lg truncate cursor-pointer flex justify-center "
                  >
                    Upload Certificate
                  </label>
                </div>
              </div>
              <div className="mx-auto w-64 text-center relative">
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
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
