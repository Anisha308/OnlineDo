import React, { useState } from "react";
import { PiFirstAid } from "react-icons/pi";
import { useAddcourseMutation } from "../../Slices/authInstructorSlice.js";

const AddCourse = () => {
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

  const [addCourseMutation ] = useAddcourseMutation();

 const addCourse = async () => {
   try {
     const { data } = await addCourseMutation({
       courseName,
       description,
       price,
       duration,
       paid,
     });

     // Check if data is defined before accessing properties
     if (data) {
       console.log("Course added successfully:", data);
     } else {
       console.error("Failed to add course. Response data is undefined.");
     }
   } catch (error) {
     // Handle error if needed
     console.error("Error adding course:", error);
   }
 };

  return (
    <div>
      <p className="w-full flex text-align-center">Add Course</p>
      <form className="w-full max-w-sm">
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
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={addCourse} // Change AddCourse to addCourse
            >
              Add Course
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
