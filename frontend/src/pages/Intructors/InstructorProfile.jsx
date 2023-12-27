import { useState, useEffect} from "react";
import { Avatar } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import {
  useGetInstructProfileQuery,
  useUpdateInstructProfileMutation
} from "../../Slices/authInstructorSlice";

const InstructorProfile = () => {
  const instructor = JSON.parse(localStorage.getItem("instructorInfo"));

const { data, error, isLoading } = useGetInstructProfileQuery(instructor._id);
  const [instructors, setInstructors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState(null); // Add this state

  const [editedInstructorData, setEditedInstructorData] = useState({
    name: "",
    email: "",
    mobile: "",
    experience: "",
    jobrole: "",
    companyname:"",
    profilephoto: "",
  });


 
  const [updateProfile, { isLoading: isUpdating }] = useUpdateInstructProfileMutation();

  useEffect(() => {
    if (error) {
    console.error("Error fetching instructor profile:", error);
      // Handle the error, e.g., show a user-friendly message
    } else if (data && data.instructors) {
      setInstructors(data.instructors);
    }
  }, [data, error]);

  const handleEditProfile = () => {
    setEditedInstructorData({
      name: instructors.name || "",
      email: instructors.email || "",
      mobile: instructors.mobile || "",
      experience: instructors.experience || "",
      jobrole: instructors.jobrole || "",
      companyname:instructors.companyname || "",
      profilephoto: instructors.profilephoto || "",
    });
    setSelectedInstructorId(instructors._id); // Set the selected user ID

    setIsModalOpen(true);
  };

  const handleUpdateProfile = async () => {
    try {
     
      

      const response = await updateProfile({
        instructorId: selectedInstructorId,
        ...editedInstructorData
      }).unwrap();
      if (response.error) {
        console.error("Profile update failed:", response.error.message);
      } else {
        setEditedInstructorData((prevData) => ({
          ...prevData,
          name: response.name,
          email: response.email,
          mobile: response.mobile,
          experience: response.experience,
          jobrole: response.jobrole,
          companyname:response.companyname,
          profilephoto: response.profilephoto,
        }));

        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("An error occurred while updating profile:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedInstructorData((prevData) => ({
          ...prevData,
          profilephoto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseModal = () => {

    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      handleFileChange(e);
    } else {
      setEditedInstructorData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? e.target.files[0] : value,
      }));
    }
  };

  return (
    <section className="bg-gray-100 ">
      <div key="#key" className="container mx-auto ">
        <div className="row">
          <div className=" lg:flex lg:items-center lg:justify-between flex-wrap">
            <nav
              aria-label="breadcrumb"
              className="bg-light rounded-3 p-3 mb-4 flex items-center lg:mb-0 w-full lg:w-auto"
            >
              <ol className="list-none flex space-x-2">
                <li className="breadcrumb-item">
                  <a href="#" className="text-blue-500">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <span className="text-gray-500">/</span>
                </li>
                <li className="breadcrumb-item">
                  <a href="#" className="text-blue-500">
                    Instructor
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <span className="text-gray-500">/</span>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Instructor Profile
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="   lg:flex lg:items-center justify-between md:mb-10 px-6  ">
          <div className="lg:w-1/2   lg:mr-4 lg:h-full h-96">
            <div className="card  bg-gradient-to-r from-white via-white to-gray-200 border shadow-2xl">
              <div className="card-body text-center bg-white p-4 flex flex-col items-center">
                <img
                  src={instructors.profilephoto}
                  alt={`Profile Photo of ${instructors.name}`}
                  className="rounded-circle mb-3"
                  style={{ width: 150, height: 150 }}
                />
                <h5 className="my-2">{instructors.name}</h5>
                <p className="text-muted mb-2">{instructors.jobrolef}</p>
                <p className="text-muted mb-4">{instructors.email}</p>
                <div className="flex justify-center mb-2">
                  {/* <button type="button" className="btn btn-blue me-1">
                    Edit profile
                  </button> */}
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => handleEditProfile(instructors._id)}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-full mr-4 h-85 bg-gradient-to-r from-white via-white to-gray-200 border shadow-2xl sm:w-full px-6 ">
            <div className="card-body justify-content-center flex flex-col">
              <div className="flex mb-7">
                <div className="col-sm-3">
                  <p className="mb-2 mt-10 ">Full Name :</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted  mt-9 ml-20">{instructors.name}</p>
                </div>
              </div>

              <hr className="mb-0" />
              <div className="flex mb-10">
                <div className="col-sm-3">
                  <p className="mb-1">Email :</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-1 ml-24">{instructors.email}</p>
                </div>
              </div>
              <hr className="mb-0" />
              <div className="flex mb-10">
                <div className="col-sm-3">
                  <p className="mb-2">Mobile : </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-1 ml-24">{instructors.mobile}</p>
                </div>
              </div>
              <hr className="mb-0" />

              <div className="flex mb-10">
                <div className="col-sm-3">
                  <p className="mb-1">Experience : </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-1 ml-16">
                    {instructors.experience} years
                  </p>
                </div>
              </div>
              <hr className="mb-0" />

              <div className="flex mb-10">
                <div className="col-sm-3">
                  <p className="mb-1">Company Name : </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-1 ml-7">
                    {instructors.companyname}
                  </p>
                </div>
              </div>

              {/* <hr className="mb-5" /> */}
              {/* <div className="flex mb-6">
                  <div className="col-sm-3">
                    <p className="mb-4">Address :</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted ml-14 ">
                      Bay Area, San Francisco, CA
                    </p>
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* ))} */}

      {isModalOpen && (
        <div className="fixed top-0 right-0 left-0  flex items-center z-50 overflow-y-auto overflow-x-hidden justify-center items-center w-full inset-0 h-modal md:h-90">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Update Product
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCloseModal}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form
                action="#"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className=" mb-0 ">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={editedInstructorData.name}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid gap-2 mb-4 ">
                  <label
                    htmlFor="Email"
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={editedInstructorData.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Eg: email@gmail.com"
                  />
                </div>
                <div className="grid gap-2 mb-4 ">
                  <label
                    htmlFor="mobile"
                    className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mobile
                  </label>
                  <input
                    type="number"
                    value={editedInstructorData.mobile}
                    onChange={handleInputChange}
                    name="mobile"
                    id="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your contact number"
                  />
                </div>
                <div className="grid gap-2 mb-4 ">
                  <label
                    htmlFor="experience"
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Experience
                  </label>
                  <input
                    type="number"
                    name="experience"
                    id="experience"
                    defaultValue={editedInstructorData.experience}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your experience"
                  />
                </div>
                <div className="grid gap-2 mb-4 ">
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Job Role
                  </label>
                  <input
                    type="text"
                    name="jobrole"
                    id="jobrole"
                    defaultValue={editedInstructorData.jobrole}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid gap-2 mb-4 ">
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Name :
                  </label>
                  <input
                    type="text"
                    name="companyname"
                    id="companyname"
                    defaultValue={editedInstructorData.companyname}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="profilephoto"
                    className="block mb-4 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Profile photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="profilephoto"
                    id="profilephoto"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {editedInstructorData.profilephoto && (
                    <Avatar
                      src={editedInstructorData.profilephoto}
                      alt="avatar"
                      withBorder={true}
                      className="p-0.5 w-16 mb-4"
                    />
                  )}
                  <label
                    htmlFor="profilephoto"
                    className="cursor-pointer text-blue-500 hover:underline"
                  >
                    {editedInstructorData.profilephoto
                      ? "Change profilePhoto"
                      : "Add profilePhoto"}
                  </label>
                </div>

                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => handleUpdateProfile()} // Assuming `.id` is the user ID
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InstructorProfile;
