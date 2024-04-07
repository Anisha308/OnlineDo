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

const ITEMS_PER_PAGE = 6;

const Allcourse = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetAllCourseQuery(ITEMS_PER_PAGE);
  const [ratings, setRatings] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [sortBy, setSortBy] = useState(null);

  const [filterOrder, setFilterOrder] = useState(null);

  useEffect(() => {
    if (data && data.courses) {
      const filteredCourses = data.courses.filter((course) =>
        course.courseName.toLowerCase().includes(search.toLowerCase())
      );
      setCourses(filteredCourses);
      const totalPagesCount = Math.ceil(
        filteredCourses.length / ITEMS_PER_PAGE
      );
      setTotalPages(totalPagesCount);
    }
  }, [data, search]);

  useEffect(() => {
    const fetchrating = async () => {
      try {
        const res = await apiInstance.get(`api/users/rating`);
        console.log(res, "fresss");
        setRatings(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchrating();
  }, []);
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
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalRating =
    ratings && ratings.ratings
      ? ratings.ratings.reduce((acc, rating) => acc + rating.count, 0)
      : 0;
  const averageRating =
    totalRating / (ratings && ratings.ratings ? ratings.ratings.length : 1);

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
            <div className="flex flex-col md:flex-row items-baseline justify-between border-b border-gray-200 pb-6 pt-2">
              <h1 className="text-3xl font-bold  tracking-tight text-gray-800">
                All Courses
              </h1>
              <div
                className="flex  rounded mt-5 mb-5 ml-6  mr-8 w-80 bg-gray-300"
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
                  className={`m-2 bg-black  text-white rounded px-4 py-2 font-semibold ${
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

            <div tabIndex={0} className="focus:outline-none">
              <div className="mx-auto container py-8  pl-2 ">
                <div className="flex flex-wrap ease-in-out duration-300 items-center lg:justify-between justify-center">
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
                          className="hover:no-underline mx-2 w-72 xl:mb-0 mb-8 transition-transform duration-300 ease-in-out transform hover:scale-110"
                          style={{ maxWidth: "20%" }}
                        >
                          {" "}
                          <div
                            tabIndex={0}
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
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                                  </svg>
                                </div>
                                <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
                                  <p
                                    tabIndex={0}
                                    className="focus:outline-none text-xs text-yellow-700"
                                  >
                                    {course.instructor.name}
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
                                  <div className="flex  ">
                                    {Array.from({ length: 5 }).map(
                                      (_, index) => (
                                        <svg
                                          key={index}
                                          className={`w-4 h-4 ${
                                            index < averageRating
                                              ? "text-yellow-500"
                                              : "text-gray-500"
                                          }`}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                      )
                                    )}
                                    <p>{averageRating.toFixed(1)}</p>{" "}
                                  </div>
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
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default Allcourse;
