import React from "react";
import signupImg from "../../assets/images/hero-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useInstructorSignUpMutation } from "../../Slices/authInstructorSlice.js";
import { Modal } from "react-bootstrap";
import uploadImageToCloudinary from '../../../../backend/utils/uploadCloudinary';


const InstructorSignup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [idProof, setIdProofFile] = useState(null)
  const [experienceCertificateFile, setExperienceCertificateFile] = useState(null)
  const [profilephoto,setprofilephoto]=useState(null)
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
  const [register] = useInstructorSignUpMutation(); // Use your register mutation hook
const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
 
  const handleprofilephotoUpload = async (file) => {
    try {
      const data = await uploadImageToCloudinary(file)
      setprofilephoto(data.url)
    } catch (error) {
      console.error("upload error",error);
    }
   
  }
  
  const handleIdProofUpload = async(file) => {
    try {
      const data = await uploadImageToCloudinary(file)

    setIdProofFile(data.url)
    } catch (error) {
            console.error("upload id proof error",error);

    }
      
  }

  const handleExperienceCertificateUpload = async (file) => {
    try {
            const data = await uploadImageToCloudinary(file);
    setExperienceCertificateFile(data.url)

    } catch (error) {
                  console.error("upload exp error", error);

    }

  }
 const handleModalSubmit = async () => {
   try {
     // Upload files to Cloudinary or your desired service
     const profilephotoUrl = await uploadImageToCloudinary(profilephoto);
     const idProofUrl = await uploadImageToCloudinary(idProof);
     const experienceCertificateUrl = await uploadImageToCloudinary(
       experienceCertificateFile
     );

     // Perform registration with the obtained URLs
     const res = await register({
       name: formData.name,
       email: formData.email,
       mobile: formData.mobile,
       experience: formData.experience,
       jobrole: formData.jobrole,
       companyname: formData.companyname,
       password: formData.password,
       profilephoto: profilephotoUrl,
       idProof: idProofUrl,
       experienceCertificateFile: experienceCertificateUrl.url,
     }).unwrap();


   
     toggleModal();
           toast.success("Successfully Registered");
     navigate("/instructorLogin");


   } catch (err) {
     toast.error(err?.data?.message || err.error);
   }
 };

 const submitHandler = async (e) => {
e.preventDefault();
const { password, confirmPassword } = formData;


if (password !== confirmPassword) {
  toast.error("Passwords do not match");
} else {

  // Open the modal for file uploads
  toggleModal();
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
            <form onSubmit={submitHandler} encType="multipart/form-data">
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
                  onClick={submitHandler}
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
                      onChange={(e) =>
                        handleprofilephotoUpload(e.target.files[0])
                      }
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
                     
                      onChange={(e) => handleIdProofUpload(e.target.files[0])}
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
                      
                      onChange={(e) =>
                        handleExperienceCertificateUpload(e.target.files[0])
                      }
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
          </div>
        </div>
      </div>
    </section>
  );
}
export default InstructorSignup;
