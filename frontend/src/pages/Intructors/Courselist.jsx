import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetCourseQuery } from "../../Slices/authInstructorSlice";

import InstructorSidebar from "../../components/Header/instructorSidebar";
import IconChat from "../../components/iconchat";
import apiInstance from "../../../Api";

const Courselists = () => {
  const { instructorId } = useParams();
  const Navigate = useNavigate();
  const { data, error, isLoading } = useGetCourseQuery(instructorId);

  const [courses, setCourses] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Assuming a default value of 1
  const [totalPages, setTotalPages] = useState(1); // Assuming a default value of 1
  const [activePage, setActivePage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    if (data && data.courses) {
      setCourses(data.courses);
      setInstructor(data.instructor); // Assuming data has a property named 'instructor'
      setPagination(data.pagination);
      setCurrentPage(data.pagination.currentPage);
      setTotalPages(data.pagination.totalPages);

      setIsLastPage(data.pagination.currentPage === data.pagination.totalPages);
    } else if (error && error.status === 401) {
      Navigate("/instructorLogin");
    }
  }, [data, error]);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      const fetchData = async () => {
        // Update the pagination state
        setActivePage(pageNumber);

        setPagination((prevPagination) => ({
          ...prevPagination,
          currentPage: pageNumber,
        }));

        // Fetch data for the selected page
        const newData = await fetchInstructorCourses(instructorId, pageNumber);

        // Update state with the new data
        if (newData && newData.courses) {
          setCourses(newData.courses);
          setInstructor(newData.instructor);
        }
      };

      fetchData();
    }
  };
  const fetchInstructorCourses = async (instructorId, page) => {
    try {
      const response = await apiInstance.get(
        `api/instructor/${instructorId}/courselist?page=${page}`
      );

      const { courses, instructor, pagination } = response.data;

      return {
        courses,
        instructor,
        pagination,
      };
    } catch (error) {
      console.error("Error fetching instructor courses:", error);
      return {
        courses: [],
        instructor: {},
        pagination: {
          currentPage: 1,
          totalPages: 1,
        },
      };
    }
  };

  return (
    <div className="flex  ">
      <InstructorSidebar instructorId={instructorId} />
      <IconChat />
      <div className="mx-auto container py-8  pl-2 ">
        <h3 className="font-bold">Your Courses</h3>
<div className=" flex flex-wrap ease-in-out duration-300 items-center lg:justify-between justify-center">
          {isLoading && <div>Loading...</div>}

          {courses &&
            instructor &&
            courses.map((course, index) => (
              <Link
                to={{
                  pathname: `/instructor/instructorcourse/${course._id}`,
                  state: { course },
                }}
                key={index}
                className="hover:no-underline mt-8"
                style={{ maxWidth: "20%" }} // Ensure each card occupies 25% of the container
              >
                {" "}
                <div
                  key={index}
                  className="focus:outline-none mx-2 w-72 xl:mb-0 mb-8"
                >
                  <div>
                    <img
                      alt="profile-picture"
                      src={course.thumbnail}
                      tabIndex={0}
                      className="focus:outline-none w-full h-44"
                    />
                  </div>
                  <div className="bg-white">
                    <div className="flex items-center justify-between px-4 pt-4">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          tabIndex={0}
                          className="focus:outline-none"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                        </svg>
                      </div>
                      <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
                        <p
                          tabIndex={0}
                          className="focus:outline-none text-xs text-yellow-700"
                        >
                          {instructor.name}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center">
                        <h2
                          tabIndex={0}
                          className="focus:outline-none text-lg font-semibold"
                        >
                          {course.courseName}
                        </h2>
                      </div>
                      <p
                        tabIndex={0}
                        className="focus:outline-none text-xs text-gray-600 mt-2"
                      >
                        The Apple iPhone XS is available in 3 colors with 64GB
                        memory. Shoot amazing videos
                      </p>
                      <div className="flex mt-4">
                        <div>
                          <p
                            tabIndex={0}
                            className="focus:outline-none text-xs text-gray-600 px-2 bg-gray-200 py-1"
                          >
                            ₹{course.price}
                          </p>
                        </div>
                        <div className="pl-2">
                          <p
                            tabIndex={0}
                            className="focus:outline-none text-xs text-gray-600 px-2 bg-gray-200 py-1"
                          >
                            {course.duration} Months
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <h3
                          tabIndex={0}
                          className="focus:outline-none text-indigo-700 text-xl font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="mt-auto mb-4">
        <div>
          <div className="mt-auto mb-4">
            <nav>
              <ul className="flex ">
                <li>
                  <a
                    className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${
                      isLastPage ? "disabled" : ""
                    }`}
                    href="#"
                    onClick={() =>
                      paginate(currentPage > 1 ? currentPage - 1 : 1)
                    }
                    aria-label="Previous"
                    disabled={currentPage === 1}
                  >
                    <span className="material-icons text-sm">
                      keyboard_arrow_left
                    </span>
                  </a>
                </li>
                {[...Array(totalPages)].map((page, index) => (
                  <li key={index}>
                    <a
                      className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 p-0 text-sm text-black shadow-md transition duration-150 ease-in-out 
                      ${activePage === index + 1 ? "bg-gray-500" : ""}
                      }`}
                      href="#"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                    href="#"
                    onClick={() =>
                      paginate(
                        currentPage < totalPages ? currentPage + 1 : totalPages
                      )
                    }
                    aria-label="Next"
                    disabled={isLastPage}
                  >
                    <span className="material-icons text-sm">
                      keyboard_arrow_right
                    </span>
                  </a>
                </li>
              </ul>
            </nav>

            <link
              rel="stylesheet"
              href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
            />
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courselists;
