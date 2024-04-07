import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../../../Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "../../components/Header/SideBar";

const DetailedCourse = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [instructorId, setInstructorId] = useState(null);
  const instructid = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const id = instructid.instructorId;

        const response = await apiInstance.get(`/api/admin/courselist/${id}`);

        setCourse(response.data.courses);
        const instructors = response.data.courses.map(
          (course) => course.instructor
        );
        const instructor = instructors.length > 0 ? instructors[0] : null;
        setInstructor(instructor);
      } catch (error) {
        console.error("Error fetching course", error);
      }
    };
    fetchCourse();
  }, [instructid]);

  const toggleVideos = (moduleId) => {
    const videosElement = document.getElementById(`videos-${moduleId}`);
    if (videosElement) {
      videosElement.classList.toggle("hidden");
    }
  };
  return (
    <div className="flex ">
      <SideBar instructorId={instructorId} />

      {course &&
        course.map((course) => (
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
                        <p>{course.courseName}</p>
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
                        {course.description}
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
                            src={course.thumbnail}
                            alt="product"
                          />
                          <div>
                            <div className="md:w-2/3 ">
                              <p className="font-bold text-gray-500">
                                {course.courseName}
                              </p>
                              <p className="rounded-full  bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                                {course.duration} course
                              </p>
                            </div>

                            <div className="my-6 flex items-center justify-between px-4">
                              <p className="font-bold text-gray-500">
                                ₹ {course.price}
                              </p>
                              <p className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                                {course.paid}
                              </p>
                            </div>
                            <div className="my-4 flex items-center justify-between px-4"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {course.modules && course.modules.length > 0 && (
                      <>
                        <h3 className="text-xl font-bold mt-4">Modules</h3>
                        {course.modules.map((module) => (
                          <div key={module._id} className="mb-4">
                            <h4
                              className="text-lg pb-6 font-medium cursor-pointer"
                              onClick={() => toggleVideos(module._id)}
                            >
                              {module.title}
                            </h4>
                            <div id={`videos-${module._id}`} className="hidden">
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
        ))}
    </div>
  );
};

export default DetailedCourse;
