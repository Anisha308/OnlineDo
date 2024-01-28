import React, { useState } from "react";
import { useAddcourseMutation } from "../../Slices/authInstructorSlice";
import { useNavigate, useParams } from "react-router-dom";
import InstructorSidebar from "../../components/Header/instructorSidebar";
import { toast } from "react-toastify";
import uploadToCloudinary from "../../../../backend/utils/uploadCloudinary";
import apiInstance from "../../../Api";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const AddCourse = () => {
  const { instructorId } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [paid, setPaid] = useState("Paid");
  const [modules, setModules] = useState([
    { title: "", videos: [{ url: "" }] },
  ]);

  const [previewVideo, setPreviewVideo] = useState(null);
  const [chapterQueue, setChapterQueue] = useState([]); // Step 1: Define Queue State

  const [categories, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");
  const Navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const response = await uploadToCloudinary(file);
      setImage(response);
    } catch (error) {
      console.log("error in image upload", error);
    }
  };
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

  const enqueueChapter = (chapter) => {
    setChapterQueue([...chapterQueue, chapter]);
  };
  useEffect(() => {
    processChapterQueue(); // Trigger processing of queued modules
  }, [chapterQueue]); // Ensure this effect runs whenever the queue changes

  const dequeueChapter = () => {
    const [firstChapter, ...restChapters] = chapterQueue;
    setChapterQueue(restChapters);
    return firstChapter;
  };

  const addCourse = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(previewVideo, "previewVideo");
    try {
      const { data } = await addCourseMutation({
        courseName,
        description,
        price,
        duration,
        paid,
        categories,
        image: image.secure_url, // Extract the secure URL from the Cloudinary response
        modules,
        instructorId,
        previewVideo,
      });

      if (data) {
        toast.success("Course added successfully:", data);
      } else {
        console.error("Failed to add course. Response data is undefined.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...modules];
    updatedModules[index][field] = value;
    setModules(updatedModules);
  };

  const deleteModule = (index) => {
    const updatedModules = [...modules];

    updatedModules.splice(index, 1);
    setModules(updatedModules);
  };
  const processChapterQueue = async () => {
    for (const chapter of chapterQueue) {
      // Process each chapter/module
      console.log("Processing chapter:", chapter);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dequeueChapter(); // Dequeue the processed module
    }
  };
  const handleOnUpload = async (file, moduleIndex, videoIndex) => {
    try {
      const isVideo = file.type.startsWith("video"); // Corrected variable name
      setLoading(true);
      const cloudinaryResponse = await uploadToCloudinary(file, isVideo);

      if (isVideo) {
        const updatedModules = [...modules];

        updatedModules[moduleIndex].videos[videoIndex].url =
          cloudinaryResponse.secure_url;

        setModules(updatedModules);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setLoading(false);
    }
  };

  const addModule = (e) => {
    e.preventDefault();

    const newModule = {
      title: "",
      videos: [{ url: "" }], // Add a default video when adding a module
    };
    setModules([...modules, newModule]);

    enqueueChapter(newModule);
  };

  const addVideo = (e, moduleIndex) => {
    e.preventDefault();
    const updatedModules = [...modules];
    if (!updatedModules[moduleIndex].videos) {
      updatedModules[moduleIndex].videos = [];
    }
    const newVideo = { url: "" };

    updatedModules[moduleIndex].videos.push(newVideo);

    setModules(updatedModules);
  };
  const handlecategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const getCategories = async (req, res) => {
    try {
      const response = await apiInstance.get("api/instructor/categories");

      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
      Navigate("/instructorLogin");
      console.error("Unauthorized access. Redirecting to login...");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handlePreviewVideoUpload = async (e) => {
    console.log("im here");
    const file = e.target.files[0];
    try {
      console.log("dpone");
      setLoading(true);
      const response = await uploadToCloudinary(file);

      console.log(response, "response");
      setPreviewVideo(response.secure_url);
    } catch (error) {
      console.error("Error uploading preview video:", error);
    } finally {
      setLoading(false);
    }
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
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
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
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Category
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={selectedCategory}
                        onChange={handlecategoryChange}
                      >
                        <option value="" key="0">
                          Select a category
                        </option>
                        {categories.map((category) => (
                          <option value={category._id} key="{category._id}">
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className=" flex flex-wrap w-full   lg:w-6/12 px-4">
                    <div className=" relative w-full mb-3">
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
                <div className=" flex flex-wrap w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {" "}
                      Add Thumbnail
                    </label>

                    <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray">
                      {loading ? (
                        <img
                          className="h-16 w-16"
                          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                          alt=""
                        />
                      ) : (
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                      )}

                      <span className="mt-2 text-base leading-normal">
                        Select a file
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          handleImageUpload(e);
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Add Preview Video
                    </label>
                    <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray">
                      {loading ? (
                        <img
                          className="h-16 w-16"
                          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                          alt=""
                        />
                      ) : (
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                      )}

                      <span className="mt-2 text-base leading-normal">
                        Select a file
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          handlePreviewVideoUpload(e);
                        }}
                      />
                    </label>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <div className="flex flex-wrap items-center ml-17">
                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    modules{" "}
                  </h6>
                </div>

                <div className="flex flex-wrap">
                  {modules.map((module, index) => (
                    <div key={index} className="w-full lg:w-12/12 px-4 ">
                      <div className="flex items-center">
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
                            className="module-input border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>

                        {index === modules.length - 1 && (
                          <div className="flex items-center ml-auto px-3 ">
                            <button
                              className="module-input btn btn-outline-success w-30 px-4 pt-0 h-10 text-white bg-blue-900 rounded-md"
                              onClick={(e) => addModule(e)}
                            >
                              +
                            </button>
                          </div>
                        )}

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
                      {module.videos &&
                        module.videos.map((video, videoIndex) => (
                          <div
                            key={videoIndex}
                            className="flex items-center mb-3 ml-2"
                          >
                            <label
                              className="block uppercase  text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor={`video-${index}-${videoIndex}`}
                            >
                              Video{videoIndex + 1}
                            </label>
                            {/* <div className="flex flex-row items-center ml-2"> */}
                            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray">
                              {loading ? (
                                <img
                                  className="h-16 w-16"
                                  src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                                  alt=""
                                />
                              ) : (
                                <svg
                                  className="w-8 h-8"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                              )}

                              <span className="mt-2 text-base leading-normal">
                                Select a file
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  handleOnUpload(
                                    e.target.files[0],
                                    index,
                                    videoIndex
                                  );
                                }}
                              />
                            </label>
                            {videoIndex === module.videos.length - 1 && (
                              <button
                                className="btn btn-outline-success ml-5  w-19 px-5 h-10 text-white bg-blue-900 rounded-full"
                                onClick={(e) => addVideo(e, index)}
                              >
                                +Add video
                              </button>
                            )}
                          </div>
                          // </div>
                        ))}
                    </div>
                  ))}
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />

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
