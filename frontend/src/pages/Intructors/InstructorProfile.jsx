import { useState, useEffect } from "react";
import { Avatar } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {
  useGetInstructProfileMutation,
  useUpdateInstructProfileMutation,
} from "../../Slices/authInstructorSlice";
import IconChat from "../../components/iconchat";
import { useDispatch, useSelector } from "react-redux";
import { instructorSetCredentials } from "../../Slices/instructorApiSlice";

const InstructorProfile = () => {
  const instruct = useSelector((state) => state.instructorAuth.instructorInfo);
  const dispatch = useDispatch();

  const [getProfile] = useGetInstructProfileMutation();

  const [instructors, setInstructors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);
  const [count, setCount] = useState(0);
  const [showDocmodal, setShowDocmodal] = useState(false);
  const [showcerificate, setShowCerticate] = useState(false);
  const [editedInstructorData, setEditedInstructorData] = useState({
    name: "",
    email: "",
    mobile: "",
    experience: "",
    jobrole: "",
    companyname: "",
    profilephoto: "",
    experienceCertificateFile: "",
    idProof: "",
  });
  const navigate = useNavigate();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateInstructProfileMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile({ instructorId: instruct?._id || null });
        setInstructors(data.data.instructors);
      } catch (error) {
        console.log("error fetching", error);
        navigate("/instructorLogin");
      }
    };
    fetchData();
  }, [count, getProfile]);

  const handleEditProfile = () => {
    setEditedInstructorData({
      name: instructors.name || "",
      email: instructors.email || "",
      mobile: instructors.mobile || "",
      experience: instructors.experience || "",
      jobrole: instructors.jobrole || "",
      companyname: instructors.companyname || "",
      profilephoto: instructors.profilephoto || "",
      experienceCertificateFile: instructors.experienceCertificateFile || "",
      idProof: instructors.idProof || "",
    });
    setSelectedInstructorId(instructors._id);

    setIsModalOpen(true);
  };
  const handleview = (e) => {
    e.preventDefault();
    try {
      setShowDocmodal(true);
    } catch (error) {
      console.error(error, "error viewing idproof");
    }
  };
  const handlecertificateview = (e) => {
    e.preventDefault();
    try {
      setShowCerticate(true);
    } catch (error) {
      console.error(error, "error viewing idproof");
    }
  };
  const handleUpdateProfile = async () => {
    try {
      const response = await updateProfile({
        instructorId: selectedInstructorId,
        ...editedInstructorData,
      }).unwrap();
      if (response.error) {
        console.error("Profile update failed:", response.error.message);
      } else {
        dispatch(instructorSetCredentials(response));

        setCount((prevCount) => prevCount + 1);

        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("An error occurred while updating profile:", error);
    }
  };
  const close = () => {
    setShowDocmodal(false);
  };
  const certificateclose = () => {
    setShowCerticate(false);
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
  const handlecertificateFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedInstructorData((prevData) => ({
          ...prevData,
          experienceCertificateFile: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleidFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedInstructorData((prevData) => ({
          ...prevData,
          idProof: reader.result,
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
      <IconChat />

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
                <p className="text-muted mb-2">{instructors.jobrole}</p>
                <p className="text-muted mb-4">{instructors.email}</p>
                <div className="flex justify-center mb-2">
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
              <div className="flex mb-5">
                <div className="col-sm-3">
                  <p className="mb-2 mt-10 ">Full Name :</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted  mt-9 ml-20">{instructors.name}</p>
                </div>
              </div>

              <hr className="mb-0" />

              <div className="flex mb-5">
                <div className="col-sm-3">
                  <p className="mb-2">Mobile : </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-1 ml-24">{instructors.mobile}</p>
                </div>
              </div>
              <hr className="mb-0" />

              <div className="flex mb-8">
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

              <div className="flex mb-8">
                <div className="col-sm-3">
                  <p className="mb-1 ">Company Name : </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-1 ml-7">
                    {instructors.companyname}
                  </p>
                </div>
              </div>

              <hr className="mb-0" />

              <div className="flex mb-1">
                <div className="col-sm-3">
                  <p className="mb-1">Certificates : </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  name="certificate"
                  id="certificate"
                  className="hidden"
                />
                <Avatar
                  src={instructors.experienceCertificateFile}
                  alt="avatar"
                  onClick={(e) => handlecertificateview(e)}
                  className="p-0.5 w-16 mb-2 ml-12"
                />
              </div>
              <hr className="mb-0" />

              <div className="flex mb-1">
                <div className="col-sm-3">
                  <p className="mb-1">Id proof : </p>
                </div>
                <div className="col-sm-9">
                  <input
                    type="file"
                    accept="image/*"
                    name="idproof"
                    id="idproof"
                    onChange={handleidFileChange}
                    className="hidden"
                  />
                  <Avatar
                    src={instructors.idProof}
                    alt="avatar"
                    onClick={(e) => {
                      handleview(e);
                    }}
                    className="p-0.5 w-16 mb-2 ml-16"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 right-0 left-0  flex items-center z-50 overflow-y-auto overflow-x-hidden justify-center items-center w-full inset-0 h-modal md:h-90">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-1 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Update Profile
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
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
                <div className="grid gap-2 mb-1 ">
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
                <div className="grid gap-2 mb-1 ">
                  <label
                    htmlFor="mobile"
                    className="block mb-1  text-sm font-medium text-gray-900 dark:text-white"
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
                <div className="grid gap-2 mb-1 ">
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
                <div className="grid gap-2 mb-1 ">
                  <label
                    htmlFor="text"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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

                <div className="grid gap-2 mb-1 ">
                  <label
                    htmlFor="text"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
                    className="block mb-1 mt-1 text-sm font-medium text-gray-900 dark:text-white"
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
                      className="p-0.5 w-16 mb-1"
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

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="certificateFile"
                      className="block mb-1 mt-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      certificate
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="certificateFile"
                      id="certificateFile"
                      onChange={handlecertificateFileChange}
                      className="hidden"
                    />

                    {editedInstructorData.experienceCertificateFile && (
                      <Avatar
                        src={editedInstructorData.experienceCertificateFile}
                        alt="avatar"
                        withBorder={true}
                        className="p-0.5 w-16 mb-1"
                      />
                    )}
                    <label
                      htmlFor="certificateFile"
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      {editedInstructorData.experienceCertificateFile
                        ? "Change certificate"
                        : "Add certificate"}
                    </label>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="idproof"
                        className="block mb-1 mt-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        idproof
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="idproof"
                        id="idproof"
                        onChange={handleidFileChange}
                        className="hidden"
                      />

                      {editedInstructorData.idProof && (
                        <Avatar
                          src={editedInstructorData.idProof}
                          alt="avatar"
                          withBorder={true}
                          className="p-0.5 w-16 mb-1"
                        />
                      )}
                      <label
                        htmlFor="idproof"
                        className="cursor-pointer text-blue-500 hover:underline"
                      >
                        {editedInstructorData.idProof
                          ? "Change idProof"
                          : "Add idProof"}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => handleUpdateProfile()}
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
      {showcerificate && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 max-w-md w-full ">
          <button
            onClick={() => certificateclose()}
            type="button"
            className="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring focus:ring-gray-200 rounded-full w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.35 5.64a1 1 0 0 0-1.42 0L10 8.59 6.06 4.64a1 1 0 1 0-1.42 1.42L8.59 10 4.64 13.94a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L10 11.41l3.94 3.95a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L11.41 10l3.94-3.94a1 1 0 0 0 0-1.42z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <p className="mb-4">ID Proof : </p>
          <img
            src={instructors.experienceCertificateFile}
            onClick={() => handlecertificateview()}
            alt="experience"
            className="w-full max-h-400 cursor-pointer"
          />
        </div>
      )}
      {showDocmodal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 max-w-md w-full ">
          <button
            onClick={() => close()}
            type="button"
            className="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring focus:ring-gray-200 rounded-full w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.35 5.64a1 1 0 0 0-1.42 0L10 8.59 6.06 4.64a1 1 0 1 0-1.42 1.42L8.59 10 4.64 13.94a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L10 11.41l3.94 3.95a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L11.41 10l3.94-3.94a1 1 0 0 0 0-1.42z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <p className="mb-4">ID Proof : </p>
          <img
            src={instructors.idProof}
            onClick={() => handleview()}
            alt="ID Proof"
            className="w-full max-h-400 cursor-pointer"
          />
        </div>
      )}
    </section>
  );
};

export default InstructorProfile;
