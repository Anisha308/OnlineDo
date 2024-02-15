import React, { useEffect, useState } from "react";
import apiInstance from "../../../Api";
import { useSelector } from "react-redux";
import IconChat from "../../components/iconchat";
import InstructorSidebar from "../../components/Header/instructorSidebar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCreateChatMutation } from "../../Slices/chatApiSlice";
import { instructApiSlice } from "../../Slices/authInstructorSlice";

const PurchaseCourse = () => {
  const [purchases, setPurchases] = useState([]);
  const instructor = useSelector((state) => state.instructorAuth.instructorInfo);
console.log(instructor._id);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        console.log(instructor._id);
    const response = await apiInstance.get(`api/instructor/purchaselist`, {
      params: { instructorId: instructor._id }, // Pass instructorId in params
    });
        console.log(response.data);
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases", error);
      }
    };

    fetchPurchases();
  },[instructor._id] );


  return (
    <div className="flex flex-wrap   bg-white p-8 rounded-md ">
      <InstructorSidebar />
      <IconChat />

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
                  {purchases &&
                    purchases.map((user, index) => (
                      <tr key={user._id} className="">
                        <td>
                          <div className="ml-3">
                            <p className="text-gray-900 text-sm whitespace-no-wrap">
                              {new Date(user.purchaseDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
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
              {/* {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <li key={pageNumber}>
                    <a
                      className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 p-0 text-sm text-black shadow-md transition duration-150 ease-in-out 
        ${currentPage === pageNumber ? "bg-gray-500" : ""}
      `}
                      href="#"
                      onClick={() => paginate(pageNumber)}
                    >
                      {pageNumber}
                    </a>
                  </li>
                )
              )} */}
              <li>
                <a
                  className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 `}
                  href="#"
                  // onClick={() =>
                  //   paginate(
                  //     currentPage < totalPages ? currentPage + 1 : totalPages
                  //   )
                  // }
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
    </div>
  );
};

export default PurchaseCourse;
