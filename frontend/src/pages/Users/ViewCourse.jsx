import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../../../Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewCourse = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [instructorId, setInstructorId] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiInstance.get(`/api/users/getCourse/${id}`);
        setCourse(response.data);
        const instructorId = response.data.course.instructor;
        setInstructorId(instructorId);
        const instructorresponse = await apiInstance.get(
          `/api/users/getInstructor/${instructorId}`
        );
        setInstructor(instructorresponse.data);
      } catch (error) {
        console.error("Error fetching course", error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleBuyClick = async (price) => {
    try {
      const instructorName = instructor.instructor.name;
      const courses = course;

      const response = await apiInstance.post(
        `api/users/create-checkout-session/${price}`,
        {
          instructorName: instructorName,
          user,
          courses,
        }
      );
      const stripeCheckoutUrl = response.data;

      window.location.href = stripeCheckoutUrl;
    } catch (error) {
      console.error(error, "error");
    }
  };

  return (
    <div>
      {course && instructor && (
        <>
          <section className="bg-white w-full dark:bg-gray-900 max-h-screen bg-gray-100 py-9 mr-48 flex flex-col justify-start sm:py-12">
            <div className="container px-4 mx-auto">
              <div className="lg:flex">
                <div className="w-full md:w-2/3">
                  <div>
                    <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
                      <p>{course.course.courseName}</p>
                    </h1>
                    <div className="mt-2">
                      <div className="inline-block w-40 h-1 rounded-full bg-blue-500" />
                      <div className="inline-block w-3 h-1 ml-1 rounded-full bg-blue-500" />
                      <div className="inline-block w-1 h-1 ml-1 rounded-full bg-blue-500" />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="md:flex w-full md:items-center md:-mx-4">
                      <div className="mt-4 md:mx-4 md:mt-0">
                        <p className="mt-3 text-black-400">
                          {course.course.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-4 text-gray-500 dark:text-gray-300">
                      <h2 className="font-bold text-xl pb-5 text-black">
                        Modules
                      </h2>

                      {Array.isArray(course.course.modules) ? (
                        course.course.modules.map((module, index) => (
                          <div
                            key={index}
                            className="text-black pb-3"
                            style={{ fontSize: "18px" }}
                          >
                            Module {index + 1}: {module.title}
                          </div>
                        ))
                      ) : (
                        <div>Module 1: {course.course.modules.title}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 md:ml-4 mt-8 md:mt-0">
                  <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                    <video
                      className="w-full rounded-lg object-cover object-center"
                      controls
                    >
                      <source
                        src={course.course.previewVideo}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>

                    <div className="md:w-2/3 p-6">
                      <p className="font-bold text-gray-500">
                        {course.course.courseName}
                      </p>
                      <p className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                        {course.course.duration} course
                      </p>
                    </div>
                    <div className="my-6 flex items-center justify-between px-4">
                      <p className="font-bold text-gray-500">
                        {instructor.instructor.name}
                      </p>
                    </div>
                    <div className="my-6 flex items-center justify-between px-4">
                      <p className="font-bold text-gray-500">
                        ₹ {course.course.price}
                      </p>
                      <p className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                        {course.course.paid}
                      </p>
                    </div>
                    <div className="my-2 flex items-center justify-between px-3">
                      <button
                        onClick={() => handleBuyClick(course.course.price)}
                        className="text-sm font-semibold text-white bg-violet-500 px-10 h-10"
                        style={{ fontSize: "18px" }}
                      >
                        Buy this course
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ViewCourse;
