import React, { useState } from "react";
import { useAddcourseMutation } from "../../Slices/authInstructorSlice.js";
import { useParams } from "react-router-dom";
import InstructorSidebar from "../../components/Header/instructorSidebar";
import { toast } from "react-toastify";

const AddCourse = () => {
  const { instructorId } = useParams();

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [paid, setPaid] = useState("");

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
      const { data } = await addCourseMutation({
        courseName,
        description,
        price,
        duration,
        paid,
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

  return (
    <div className="flex ">
      <InstructorSidebar instructorId={instructorId} />
      <div className="bg-gray-200"></div>
      <div className="flex-grow p-4 max-w-sm ">
        <div className="bg-white-200 border-2 border-gray-300 rounded p-4">
          <legend className="text-lg font-bold mb-2">Course Details</legend>
          <form className="w-full">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Course Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  value={courseName}
                  onChange={handleCourseNameChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Description
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="description"
                  type="text"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Paid/Free
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  value={paid}
                  onChange={handlePaidChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Price
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Duration of course
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  value={duration}
                  onChange={handleDurationChange}
                />
              </div>
            </div>
            <div className="flex gap-1">
              <ul className="list-none p-0 m-0">
                <li className="flex items-center gap-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Key"
                      value="My key"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Value"
                      value="My value"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <button className="p-2 border rounded text-red-500">
                    <span>Delete row</span>
                  </button>
                </li>
                <li className="flex items-center gap-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Key"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Value"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <button className="p-2 border rounded text-red-500">
                    <span>Delete row</span>
                  </button>
                </li>
              </ul>
              <button className="p-2 border rounded bg-blue-500 text-white">
                <span>Add row</span>
              </button>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3"></div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-blue-900 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={addCourse} // Change AddCourse to addCourse
                >
                  Add Course
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
