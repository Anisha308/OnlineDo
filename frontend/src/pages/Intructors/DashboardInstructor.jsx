import React, { useEffect, useState } from 'react'
import InstructorSidebar from "../../components/Header/instructorSidebar.jsx"
import apiInstance from '../../../Api.js'
import { useSelector } from "react-redux";
import IconChat from "../../components/iconchat";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCreateChatMutation } from "../../Slices/chatApiSlice";
import { instructApiSlice } from "../../Slices/authInstructorSlice";

const DashboardInstructor = () => {
    const [totalusers, setTotalUsers] = useState(0)
const [yearlyRevenue, setYearlyRevenue] = useState([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    
    useEffect(() => {
        const fetchData = async()=> {
    const response = await apiInstance.get(`/api/instructor/getusers`)
            setTotalUsers(response.data.countusers)

            const result= await apiInstance.get(`api/instructor/yearlyrevenue`)

            setYearlyRevenue(result.data)

            const res=await apiInstance.get(`/api/instructor/monthlyrevenue`)
            setMonthlyRevenue(res.data)
        }
    fetchData()
    }, [])
    
    
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthRevenue = monthlyRevenue.find(
    (data) => data.month === currentMonth
  );
  const currentYear = new Date().getFullYear(); // Get the current year
  const currentYearRevenue = yearlyRevenue.find(
    (data) => data.year === currentYear
  );
const [purchases, setPurchases] = useState([]);
const instructor = useSelector((state) => state.instructorAuth.instructorInfo);
const navigate = useNavigate();
useEffect(() => {
  const fetchPurchases = async () => {
    try {
      const response = await apiInstance.get(`api/instructor/purchaselist`, {
        params: { instructorId: instructor._id }, // Pass instructorId in params
      });
      setPurchases(response.data);
    } catch (error) {
      console.error("Error fetching purchases", error);
    }
  };

  fetchPurchases();
}, [instructor._id]);


  return (
    <div>
      <div className="flex">
        <InstructorSidebar />

        <main className="w-full md:w-[calc(100%-256px)] md:ml-6 bg-gray-200 min-h-screen transition-all main p-4">
          <div className="p-4 w-full flex flex-wrap justify-between">
            <div className="flex flex-col bg-white shadow-sm rounded p-4 mb-4 md:mb-0 md:w-80">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-500">Users</div>
                  <div className="font-bold text-lg">{totalusers}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-white shadow-sm rounded p-4 mb-4 md:mb-0 md:w-80">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500 flex items-center justify-center">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-500">Monthly Revenue</div>
                  <div className="font-bold text-lg">
                    {currentMonthRevenue && (
                      <div>{currentMonthRevenue.revenue}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-white shadow-sm rounded p-4 mb-4 md:mb-0 md:w-80">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500 flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-500">Monthly Revenue</div>
                  <div className="font-bold text-lg">
                    {currentYearRevenue && (
                      <div>{currentYearRevenue.revenue}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div />
          {/* Your JSX for UI */}
          <div className=" w-[1000px]   ">
            <div className=" flex items-center justify-between pb-6">
              <div className="float-left">
                <h2 className="text-gray-600 font-semibold">Purchase list</h2>
                <span className="text-xs">All orders</span>
              </div>
              <div className="flex items-center justify-between"></div>
            </div>

            <div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          course
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(purchases) &&
                        purchases.map((user, index) => (
                          <tr key={user._id} className="">
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm date-cell">
                              <div className="ml-3">
                                <p className="text-gray-900 text-sm whitespace-no-wrap">
                                  {new Date(
                                    user.purchaseDate
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                  <img
                                    className="w-full h-full rounded-full"
                                    src={user.user.profilephoto}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {user.user.name}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {user.user.email}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {user.courses.courseName}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                ₹{user.courses.price}
                              </p>
                            </td>
                            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div>
                            <button
                              onClick={() => handleBlockUser(user._id)}
                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            >
                              {user.Blocked ? "Unblock" : "Block"}
                            </button>
                          </div>
                        </td> */}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <nav>
                <ul className="flex ">
                  <li>
                    <a
                      className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300
                  `}
                      href="#"
                      // onClick={() =>
                      //   paginate(currentPage > 1 ? currentPage - 1 : 1)
                      // }
                      aria-label="Previous"
                      // disabled={currentPage === 1}
                    >
                      <span className="material-icons text-sm">
                        keyboard_arrow_left
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 `}
                      href="#"
                      aria-label="Next"
                      // disabled={isLastPage}
                    >
                      <span className="material-icons text-sm">
                        keyboard_arrow_right
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <link
              rel="stylesheet"
              href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
            />
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            />
          </div>

          {/* End Content */}
        </main>
      </div>
      <script src="https://unpkg.com/@popperjs/core@2"></script>
    </div>
  );
}

export default DashboardInstructor
