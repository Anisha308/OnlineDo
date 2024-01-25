import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../../../Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InstructorSidebar from "../../components/Header/instructorSidebar";
const InstructCourseView = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  //   // const [categoryId, setCategoryId] = useState(null);
  const [instructorId, setInstructorId] = useState(null);
  //   // const [category, setCategory] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiInstance.get(
          `/api/instructor/instructorcourse/${id}`
        );
        setCourse(response.data);
        // Extracting instructorid from course data
        const instructorId = response.data.course.instructor;
        // const categoryId = response.data.course.category;
        setInstructorId(instructorId);
        // setCategoryId(categoryId);
        const instructorresponse = await apiInstance.get(
          `/api/users/getInstructor/${instructorId}`
        );
        setInstructor(instructorresponse.data);
        // const categoryresponse = await apiInstance.get(
        //   `api/instructor/getCategory/${categoryId}`
        // );
        // setCategory(categoryresponse.data);
      } catch (error) {
        console.error("Error fetching course", error);
        navigate("/login");
      }
    };
    fetchCourse();
  }, [id]);
  const handleEditClick = () => {
    // Navigate to the 'instructor/updatecourse' route
    navigate(`/instructor/updatecourse/${id}`);
  };
  return (
    <div className="flex ">
      <InstructorSidebar instructorId={instructorId} />

      {course && (
        <>
          <section
            className="max-w-9xl px-6 py-8 mx-auto  bg-white dark:bg-gray-900 mr-52"
            style={{ textAlign: "start" }}
          >
            <div className=" container px-6 py-10 mx-auto">
              <div className="lg:items-start">
                <div className="mx-auto space-y-12 max-w-8xl">
                  <div>
                    <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
                      <p>{course.course.courseName}</p>
                    </h1>
                    <div className="mt-2">
                      <span className="inline-block w-40 h-1 rounded-full bg-blue-500" />
                      <span className="inline-block w-3 h-1 ml-1 rounded-full bg-blue-500" />
                      <span className="inline-block w-1 h-1 ml-1 rounded-full bg-blue-500" />
                    </div>
                  </div>
                  <div className="md:flex md:items-start ">
                    <p
                      className="mt-2 leading-loose  text-black-600 dark:text-black-500"
                      style={{
                        fontSize: "18px",
                        textAlign: "justify",
                        width: "80%",
                      }}
                    >
                      {course.course.description}
                    </p>
                    <div
                      className="w-full pl-8 md:w-1/3 md:ml-4"
                      style={{ width: "30%" }}
                    >
                      <div
                        className=" cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md"
                        style={{ fontSize: "18px" }}
                      >
                        {" "}
                        <img
                          className="w-full rounded-lg object-cover object-center"
                          src={course.course.thumbnail}
                          alt="product"
                        />
                        <div>
                          <div className="md:w-2/3 ">
                            <p className="font-bold text-gray-500">
                              {course.course.courseName}
                            </p>
                            <p className="rounded-full  bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                              {course.course.duration} course
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
                          <div className="my-4 flex items-center justify-between px-4">
                            {/* <button
                                onClick={handleEditClick}
                              className="text-sm font-semibold text-white bg-violet-500 px-10 h-10"
                            >
                              Edit
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {course.course.modules &&
                    course.course.modules.length > 0 && (
                      <>
                        <h3 className="text-xl font-bold mt-4">Modules</h3>
                        {course.course.modules.map((module) => (
                          <div key={module._id} className="mb-4">
                            <h4 className="text-lg pb-6 font-medium">
                              {module.title}
                            </h4>

                            {module.videos && module.videos.length > 0 && (
                              <div className="mt-2">
                                <h5 className="text-md font-semibold mb-2">
                                  Videos
                                </h5>
                                {module.videos.map((video) => (
                                  <div key={video._id} className="mb-2">
                                    <p className="text-gray-600 dark:text-gray-300">
                                      {video.title}
                                    </p>
                                    <div className="max-w-3xl ml-3 pt-8 mx-auto rounded-lg overflow-hidden">
                                      <video
                                        className="w-full h-full rounded-lg"
                                        controls
                                      >
                                        <source
                                          src={video.url}
                                          type="video/mp4"
                                        />
                                      </video>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                </div>
                <div className="md:flex md:items-start md:-mx-4"></div>
              </div>
              <hr className="border-gray-200 my-12 dark:border-gray-700" />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default InstructCourseView;
