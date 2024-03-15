import React, { useEffect, useState } from "react";
import apiInstance from "../../../Api";
import { useSelector } from "react-redux";
import IconChat from "../../components/iconchat";
import InstructorSidebar from "../../components/Header/instructorSidebar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PurchaseCourse = () => {
  const [purchases, setPurchases] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const instructor = useSelector(
    (state) => state.instructorAuth.instructorInfo
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await apiInstance.get(`api/instructor/purchaselist`, {
          params: {
            instructorId: instructor._id,
            page: pagination.currentPage,
            limit: 10, // Adjust as needed
          },
        });
        setPurchases(response.data.data);
        setPagination({
          currentPage: response.data.pagination.currentPage,
          totalPages: response.data.pagination.totalPages,
        });
      } catch (error) {
        console.error("Error fetching purchases", error);
      }
    };

    fetchPurchases();
  }, [instructor._id, pagination.currentPage]);

  const handlePagination = (pageNumber) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  return (
    <div className="flex flex-wrap bg-white p-8 rounded-md ">
      <InstructorSidebar />
      <IconChat />

      <div className="w-[1000px]">
        <div className="flex items-center justify-between pb-6">
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
                      Course
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
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
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-auto mb-4 text-center">
          <nav>
            <ul className="flex justify-center">
              <li>
                <button
                  onClick={() =>
                    handlePagination(
                      pagination.currentPage > 1
                        ? pagination.currentPage - 1
                        : 1
                    )
                  }
                  disabled={pagination.currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(pagination.totalPages)].map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePagination(index + 1)}
                    disabled={pagination.currentPage === index + 1}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() =>
                    handlePagination(
                      pagination.currentPage < pagination.totalPages
                        ? pagination.currentPage + 1
                        : pagination.totalPages
                    )
                  }
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCourse;
