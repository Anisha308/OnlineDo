import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import InstructorSidebar from "../../components/Header/instructorSidebar";
import { useGetCourseQuery } from "../../Slices/authInstructorSlice";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Style } from "@mui/icons-material";
import apiInstance from "../../../Api";
import SideBar from "../../components/Header/SideBar";

const Course = () => {
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
        `api/admin/getCourse/${instructorId}?page=${page}`
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
      <SideBar instructorId={instructorId} />
      <div className="ml-5 flex flex-wrap  gap-5">
        {isLoading && <div>Loading...</div>}

        {courses &&
          instructor &&
          courses.map((course, index) => (
            <Link
              to={{
                pathname: `/admin/getcourse/${instructor._id}`,
                state: { course },
              }}
              key={index}
              className="hover:no-underline"
            >
              <Card key={index} className="w-[332px] mb-7 p-2  flex-none">
                <CardHeader floated={false} className="h-44 ">
                  <img
                    src={course.thumbnail}
                    alt="profile-picture"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </CardHeader>
                <CardBody className="text-start">
                  <Typography variant="h8" className="font-bold">
                    {course.courseName}
                  </Typography>
                  <Typography color="blue-gray" className="mb-2" textGradient>
                    {instructor.name}
                  </Typography>

                  <Typography color="blue-gray" className="mb-" textGradient>
                    ₹ {course.price}
                  </Typography>
                </CardBody>
              </Card>
            </Link>
          ))}
      </div>{" "}
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

export default Course;
