import React, { useState } from "react";
import { useAddcourseMutation } from "../../Slices/authInstructorSlice";
import { useParams } from "react-router-dom";
import InstructorSidebar from "../../components/Header/instructorSidebar";
import { toast } from "react-toastify";
import uploadToCloudinary from "../../../../backend/utils/uploadCloudinary";
const AddCourse = () => {
  const { instructorId } = useParams();
console.log("Instructor ID:", instructorId);

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [paid, setPaid] = useState("Paid"); // Set a default value for 'Paid'
const [modules, setModules] = useState([
  { title: "", module: "", video: "", videos: [] },
]);
  
  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handlePaidChange = (e) => {
    setPaid(e.target.value);
  };

  const [addCourseMutation] = useAddcourseMutation();

  const addCourse = async () => {
    try {
      console.log(instructorId,'insssssssssssss');
      console.log(modules,'modulesssssssssssssssss');
      const { data } = await addCourseMutation({
        courseName,
        description,
        price,
        duration,
        paid,
      
        modules,
     
        instructorId, // Ensure this is not 'undefined'
      });
      // Check if data is defined before accessing properties
      if (data) {
        toast.success("Course added successfully:", data);
      } else {
        console.error("Failed to add course. Response data is undefined.");
      }
    } catch (error) {
      // Handle error if needed
      console.error("Error adding course:", error);
    }
  };

const handleModuleChange = (index, field, value) => {
  const updatedModules = [...modules];
  updatedModules[index][field] = value;
  setModules(updatedModules);

  console.log("Updated Modules:", updatedModules);
};



// const addModule = (e) => {
//   e.preventDefault();
//     setModules([...modules, { title: "", module: "", video: "" }]);
// };

  const deleteModule = (index) => {
    const updatedModules = [...modules];
    updatedModules.splice(index, 1);
    setModules(updatedModules);
  };

const handleOnUpload = async (file, index) => {
  try {
    const isImage = file.type.startsWith("image");
    const cloudinaryResponse = await uploadToCloudinary(file, isImage);
console.log('kkjk',cloudinaryResponse);
    const updatedModules = [...modules];
    updatedModules[index].video = cloudinaryResponse.secure_url;

    setModules(updatedModules);
    console.log(updatedModules,'modules');
  } catch (error) {
    console.error("Error uploading video:", error);
  }

};


const addModule = (e, isVideo = false) => {
  e.preventDefault();

  // Create a new video module if isVideo is true, else create a regular module
  const newModule = isVideo
    ? { title: "", video: "" }
    : { title: "", module: "", video: "" };

  setModules([...modules, newModule]);
};


const addVideo = (e, index) => {
  e.preventDefault();
console.log('yesssssssssss');
  // Create a new video object
  const newVideo = { video: "" };
console.log(newVideo,'newvideo');
  // Update the state to add the new video to the specific module at the given index
  const updatedModules = [...modules];

  if (!updatedModules[index].videos) {
    updatedModules[index].videos = [];
  }

  updatedModules[index].videos.push(newVideo);
  setModules(updatedModules);
};



  return (
    <div className="flex ">
      <InstructorSidebar instructorId={instructorId} />

      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />

      <section className=" py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Add Course
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Course Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Course Name
                      </label>
                      <input
                        type="text"
                        id="inline-full-name"
                        value={courseName}
                        onChange={handleCourseNameChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Paid/Free{" "}
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={paid}
                        onChange={handlePaidChange}
                      >
                        <option value="Paid" key="0">
                          Paid
                        </option>
                        <option value="Free" key="1">
                          Free
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* <div className="w-full lg:w-6/12 px-4"> */}
                  <div className="relative w-full lg:w-12/12 px-4 mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      description
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={description}
                      onChange={handleDescriptionChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    {/* </div> */}
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        price
                      </label>
                      <input
                        type="text"
                        id="inline-full-name"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={price}
                        onChange={handlePriceChange}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Duration of course
                      </label>
                      <input
                        type="text"
                        id="inline-full-name"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={duration}
                        onChange={handleDurationChange}
                      />
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <div className="flex flex-wrap items-center ml-17">
                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    modules{" "}
                  </h6>
                  <div className="  px-2 flex items-center">
                    <button
                      className="btn btn-outline-success ml-96 w-19 px-5 h-10 text-white bg-blue-900 rounded-md"
                      onClick={(e) => addModule(e)}
                    >
                      + Add Module
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap">
                  {modules.map((module, index) => (
                    <div key={index} className="w-full lg:w-12/12 px-4">
                      <div className="flex">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor={`title-${index}`}
                          >
                            Module
                          </label>
                          <input
                            type="text"
                            id={`title-${index}`}
                            value={module.title}
                            onChange={(e) =>
                              handleModuleChange(index, "title", e.target.value)
                            }
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                      {/* <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor={`module-${index}`}
                        >
                          Module
                        </label>
                        <input
                          type="text"
                          id={`module-${index}`}
                          value={module.module}
                          onChange={(e) =>
                            handleModuleChange(index, "module", e.target.value)
                          }
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div> */}
                      <div className="relative w-full mb-3 ml-2">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor={`video-${index}`}
                        >
                          Video
                        </label>
                        <div className="flex  items-center justify-center bg-grey-lighter">
                          <label className="w-64 flex flex-col items-center px-4 py-7 mr-96 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <button
                              type="button"
                              className="btn btn-outline-success ml-96 w-19 px-5 h-10 text-white bg-blue-900 rounded-md"
                              onClick={(e) => addVideo(e, index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </button>

                            <span className="mt-2 text-base leading-normal">
                              Select a file
                            </span>

                            <input
                              type="file"
                              onChange={(e) =>
                                handleOnUpload(e.target.files[0], index)
                              }
                              className="hidden"
                            />
                          </label>
                          {/* <button
                            className="btn btn-outline-success bg-green-500 text-white p-2 rounded-full flex items-center w-10 h-10 justify-center ml-2"
                            onClick={(e) => addModule(e)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </button> */}
                          <div className="md:flex justify-start ml-3">
                            <button
                              className="btn btn-outline-danger bg-red-500 text-white p-2 rounded-full flex items-center w-10 h-10 justify-center"
                              onClick={() => deleteModule(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-16 h-16 flex items-center mx-auto"
                                viewBox="0 0 20 20"
                                fillRule="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  About Me
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        About me
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        rows={4}
                        defaultValue={
                          " A beautiful UI Kit and Admin for JavaScript & Tailwind CSS. It is Freeand Open Source."
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="md:flex ml-60">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <button
                      className="shadow bg-blue-900 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded "
                      type="button"
                      onClick={addCourse} // Change AddCourse to addCourse
                    >
                      Add Course
                    </button>
                    <button
                      className=" ml-8 shadow bg-gray-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded "
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddCourse;
