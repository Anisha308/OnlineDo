import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../../../Api";
import { useNavigate
} from "react-router-dom";
 import { useSelector } from "react-redux";


const ViewCourse = () => {
  const user = useSelector((state) => state.auth.userInfo);
console.log(user,'useerrrrrrrrrr');
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  // const [categoryId, setCategoryId] = useState(null);
  const [instructorId, setInstructorId] = useState(null);
  // const [category, setCategory] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log("kjsaaaaaaaahjhnmmma");
        const response = await apiInstance.get(`/api/users/getCourse/${id}`);
        console.log("hjjjjjjjjjjj", response);
        setCourse(response.data);
        console.log(response.data.course.modules, "responsedata");
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
    console.log("fetchcourseee");
    fetchCourse();
  }, [id]);

  const handleBuyClick = async (price) => {
    try {
      const instructorName = instructor.instructor.name;
      const courses = course
      console.log(instructorName, 'inst');
      console.log(user, 'user');
      console.log(courses,'coursessssssss');
      console.log(price, "price");
      const response = await apiInstance.post(
        `api/users/create-checkout-session/${price}`,
        {
          instructorName: instructorName,
          user,
          courses
        }
      );
      console.log("yes");
      const stripeCheckoutUrl = response.data;

      // Navigate to the Stripe checkout page
      window.location.href = stripeCheckoutUrl;
    } catch (error) {
      console.error(error, "error");
    }
  };

  return (
    <div>
      {course && instructor && (
        <>
          <section className="bg-white dark:bg-gray-900 min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="container px-6 py-10 mx-auto">
              <div className="lg:flex lg:items-center">
                <div className="w-full space-y-12 lg:w-1/2 ">
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
                  <div className="md:flex md:items-start md:-mx-4">
                    {/* <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500"> */}
                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg> */}
                    {/* </span> */}
                    <div className="mt-4 md:mx-4 md:mt-0">
                      <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                        {course.course.description}{" "}
                      </h1>
                      <p className="mt-3 text-gray-500 dark:text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident ab nulla quod dignissimos vel non corrupti
                        doloribus voluptatum eveniet
                      </p>
                    </div>
                  </div>
                  {/* <div className="md:flex md:items-start md:-mx-4"> */}
                  {/* <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
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
                          strokeWidth={2}
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                    </span> */}
                  <div className="mt-3 text-gray-500 dark:text-gray-300">
                    <h2 className="font-bold text-black">Modules</h2>
                    {Array.isArray(course.course.modules) ? (
                      course.course.modules.map((module, index) => (
                        <div key={index}>
                          Module {index + 1}: {module.title}
                        </div>
                      ))
                    ) : (
                      <div>Module 1: {course.course.modules.title}</div>
                    )}
                  </div>
                  {/* </div> */}
                  {/* <div className="md:flex md:items-start md:-mx-4"> */}
                  {/* <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
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
                          strokeWidth={2}
                          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                        />
                      </svg>
                    </span> */}
                  {/* <div className="mt-4 md:mx-4 md:mt-0">
                      <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                        elegant Dark Mode
                      </h1>
                      <p className="mt-3 text-gray-500 dark:text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident ab nulla quod dignissimos vel non corrupti
                        doloribus voluptatum eveniet
                      </p>
                    </div> */}
                  {/* </div> */}
                </div>

                {/* component */}
                {/* Create By Joker Banny */}
                {/* Create By Joker Banny */}
                <div className="mx-auto px-5">
                  <div className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                    <img
                      className="w-full rounded-lg object-cover object-center"
                      src={course.course.thumbnail}
                      alt="product"
                    />
                    <div>
                      <div className="my-6 flex items-center justify-between px-4">
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
                        <p className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                          {/* {category.category.categoryName} course */}
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
                        <button
                          onClick={() => handleBuyClick(course.course.price)}
                          className="text-sm font-semibold text-white bg-violet-500 px-10 h-10"
                        >
                          Buy this course
                        </button>
                        {/* <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">
                                23
                              </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-gray-200 my-12 dark:border-gray-700" />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ViewCourse;
