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
import { useGetAllCourseQuery } from "../../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ViewCourse from "./ViewCourse";

const ITEMS_PER_PAGE = 2;

const Allcourse = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetAllCourseQuery(ITEMS_PER_PAGE);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Assuming a default value of 1

  const [totalPages, setTotalPages] = useState(1); // Assuming a default value of 1

  const [sortBy, setSortBy] = useState(null);

  const [filterOrder, setFilterOrder] = useState(null);

  useEffect(() => {
    if (data && data.courses) {
      setCourses(data.courses);
      // Calculate total pages
      const totalPagesCount = Math.ceil(data.courses.length / ITEMS_PER_PAGE);
      setTotalPages(totalPagesCount);
    }
  }, [data]);

  const indexOfLastCourse = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCourse = indexOfLastCourse - ITEMS_PER_PAGE;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
const isLastPage = currentPage === totalPages;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchSortFilter = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const params = {};
      if (search) {
        params.query = search;
      }
      if (sortBy) {
        params.sortBy = sortBy;
      }

      if (filterOrder) {
        params.filterOrder = filterOrder;
      }

      const response = await apiInstance.get(
        "/api/users/getcourse/searchSortFilter",
        {
          params,
        }
      );
      if (response.data && response.data.courses) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.error("Error searching courses:", error.message);
    }
  };
  // Allcourse component
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="bg-white">
        <div>
          <div
            className={`relative z-40 ${isSidebarOpen ? "" : "hidden"}`}
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="fixed inset-0 z-40 flex">
              {isSidebarOpen && (
                <div
                  className={`relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 ${
                    isSidebarOpen ? "" : "hidden"
                  }`}
                >
                  {" "}
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    <div className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-mobile-0"
                          aria-expanded="false"
                        >
                          <span className="font-medium text-gray-900">
                            Price
                          </span>
                          <span className="ml-6 flex items-center"></span>
                        </button>
                      </h3>
                      <div className="pt-6" id="filter-section-mobile-0">
                        <div className="space-y-6">
                          <div className="flex items-center">
                            <button
                              onClick={(e) => {
                                setFilterOrder("1-500");
                                handleSearchSortFilter(e);
                              }}
                              className="mr-44 min-w-0 flex-1 text-gray-500"
                            >
                              ₹1 - ₹500
                            </button>
                          </div>
                          <div className="flex items-center">
                            <button
                              onClick={(e) => {
                                setFilterOrder("501-1000");
                                handleSearchSortFilter(e);
                              }}
                              className="mr-40 min-w-0 flex-1 text-gray-500"
                            >
                              ₹501-₹1,000
                            </button>
                          </div>
                          <div className="flex items-center">
                            <button
                              onClick={(e) => {
                                setFilterOrder("1001-2000");
                                handleSearchSortFilter(e);
                              }}
                              className="mr-36 min-w-0 flex-1 text-gray-500"
                            >
                              ₹1001-₹2,000
                            </button>
                          </div>
                          <div className="flex items-center">
                            <button
                              onClick={(e) => {
                                setFilterOrder("2001-above");
                                handleSearchSortFilter(e);
                              }}
                              className="mr-32 min-w-0 flex-1 text-gray-500"
                            >
                              ₹2001 and above
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
          <main className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-2">
              <h1 className="text-3xl font-bold  tracking-tight text-gray-800">
                All Courses
              </h1>
              <div
                className="flex  rounded mt-5 mb-5 w-80 bg-gray-300"
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
                  onClick={(e) => handleSearchSortFilter(e)}
                  disabled={!search}
                >
                  Search
                </button>
              </div>
              <div className="flex items-center">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                      id="menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={() => setIsSort(!isSort)}
                    >
                      Sort
                      <svg
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {isSort && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex={-1}
                    >
                      <div className="py-1" role="none">
                        <button
                          onClick={(e) => {
                            setSortBy("newest");
                            console.log(
                              "Sorting by newest. Current sortBy:",
                              sortBy
                            );
                            handleSearchSortFilter(e);
                          }}
                          className="text-gray-500 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-2"
                        >
                          Newest
                        </button>
                        <button
                          onClick={(e) => {
                            setSortBy("lowtohigh");
                            handleSearchSortFilter(e);
                          }}
                          className="text-gray-500 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-3"
                        >
                          Price: Low to High
                        </button>
                        <button
                          onClick={(e) => {
                            setSortBy("hightolow");
                            handleSearchSortFilter(e);
                          }}
                          className="text-gray-500 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-4"
                        >
                          Price: High to Low
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6  "
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <span className="sr-only">Filters</span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <div className="lg:col-span-3 flex-wrap">
                  {
                    <div className="lg:col-span-3">
                      {
                        <div className="flex flex-col items-center ">
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
                                    <Link
                                      to={{
                                        pathname: `/viewcourse/${course._id}`,
                                        state: { course },
                                      }}
                                      key={index}
                                      className="hover:no-inderline"
                                    >
                                      {/* <ViewCourse course={course}/> */}
                                      <Card
                                        key={index}
                                        className="w-[332px]  mb-7 p-2 flex-none"
                                      >
                                        <CardHeader
                                          floated={false}
                                          className="h-44"
                                        >
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
                                          <Typography
                                            variant="h8"
                                            className="font-bold"
                                          >
                                            {course.courseName}
                                          </Typography>
                                          <Typography
                                            color="blue-gray"
                                            className="mb-2"
                                          >
                                            {/* {/* {course.duration} of{" "} */}
                                            {course.instructor.name}
                                          </Typography>
                                          <Typography
                                            color="blue-gray"
                                            className="mb-"
                                            textGradient
                                          >
                                            ₹{course.price}
                                          </Typography>
                                        </CardBody>

                                        <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
                                      </Card>
                                    </Link>
                                  ))}
                              {(!courses || courses.length === 0) && (
                                <p>No courses found.</p>
                              )}
                            </div>
                          </div>

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
                                      handlePageChange(
                                        currentPage > 1 ? currentPage - 1 : 1
                                      )
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
                                      className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 p-0 text-sm text-black shadow-md transition duration-150 ease-in-out ${
                                        currentPage === index + 1
                                          ? "bg-gray-500"
                                          : ""
                                      }`}
                                      href="#"
                                      onClick={() =>
                                        handlePageChange(index + 1)
                                      }
                                    >
                                      {index + 1}
                                    </a>
                                  </li>
                                ))}
                                <li>
                                  <a
                                    className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${
                                      currentPage === totalPages
                                        ? "disabled"
                                        : ""
                                    }`}
                                    href="#"
                                    onClick={() =>
                                      handlePageChange(
                                        currentPage < totalPages
                                          ? currentPage + 1
                                          : totalPages
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
                      }
                    </div>
                  }
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};
export default Allcourse;
