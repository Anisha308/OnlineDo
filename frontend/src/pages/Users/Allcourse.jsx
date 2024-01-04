import React, { useEffect, useState } from "react";
import Pagination from "../../components/Header/Pagination";
import apiInstance from "../../../Api";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import InstructorSidebar from "../../components/Header/instructorSidebar";
import { useGetAllCourseQuery } from "../../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

const Allcourse = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetAllCourseQuery();

  if (!data) {
    navigate("/login");
  }

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (data && data.courses) {
      setCourses(data.courses);
    }
  }, [data]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Assuming courses is an array of your courses
  const totalPages = Math.ceil((courses && courses.length) / ITEMS_PER_PAGE);

  const handleSearch = async () => {
    try {
      console.log(search);
      const response = await apiInstance.get("/api/users/getcourse/search", {
        params: { query: search },
      });
      console.log("API Response:", response);

      if (response.data && response.data.courses) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.error("Error searching courses:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <div
        className="flex w-[30rem] rounded mt-5 mb-5 w-80 bg-gray-300"
        data-x-data="{ search: '' }"
      >
        <input
          type="search"
          className="w-full border-none bg-transparent px-4 py-1 text-white-900 focus:outline-none"
          placeholder="Type Here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className={`m-2 bg-black text-white rounded px-4 py-2 font-semibold ${
            search ? "bg-purple-500" : "bg-black-500 cursor-not-allowed"
          }`}
          onClick={handleSearch}
          disabled={!search}
        >
          Search
        </button>
      </div>
      <div className="flex ml-5">
        <div className="ml-5  flex flex-wrap  gap-5">
          {courses &&
            courses.length > 0 &&
            courses
              .slice(
                (currentPage - 1) * ITEMS_PER_PAGE,
                currentPage * ITEMS_PER_PAGE
              )
              .map((course, index) => (
                <Card key={index} className="w-[330px]  mb-7 p-2 flex-none">
                  <CardHeader floated={false} className="h-44">
                    <img
                      src="https://docs.material-tailwind.com/img/team-3.jpg"
                      alt="profile-picture"
                    />
                  </CardHeader>
                  <CardBody className="text-center">
                    <Typography
                      variant="h4"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {course.name}
                    </Typography>
                    <Typography color="blue-gray" className="mb-2" textGradient>
                      {course.duration} of {course.description}{" "}
                    </Typography>
                    <Typography color="blue-gray" className="mb-" textGradient>
                      Price : ₹{course.price}
                    </Typography>
                  </CardBody>
                  <CardFooter className="flex justify-center gap-7 pt-2">
                    <div>
                      <button className="bg-blue-900 text-white px-10 mb-6 py-2 w-[200px]  rounded-md">
                        view
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          {(!courses || courses.length === 0) && <p>No courses found.</p>}
        </div>
      </div>
      {/* <div className="mt-auto mb-4">
        <nav>
          <ul className="flex ">
            <li>
              <a
                className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                href="#"
                onClick={() =>
                  handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                }
                aria-label="Previous"
                disabled={currentPage === 1}
              >
                <span className="material-icons text-sm">
                  keyboard_arrow_left
                </span>
              </a>
            </li>
            {[...Array(Math.ceil(courses.length / ITEMS_PER_PAGE))].map(
              (page, index) => (
                <li key={index}>
                  <a
                    className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 p-0 text-sm text-black shadow-md transition duration-150 ease-in-out"
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              )
            )}
            <li>
              <a
                className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                href="#"
                onClick={() =>
                  handlePageChange(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                aria-label="Next"
                disabled={currentPage === totalPages}
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
      </div> */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Allcourse;
