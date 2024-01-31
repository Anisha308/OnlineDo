import React, { useEffect, useState } from "react";

import SideBar from "../../components/Header/SideBar";
import { useGetUserListQuery } from "../../Slices/adminApiSlice";
import { useBlockuserMutation } from "../../Slices/adminApiSlice";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../../Api";

const UserLists = () => {
  const [page, setPage] = useState(1); // Initialize page state variable with 1

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false); // Added state for last page

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const { data, error, isLoading } = useGetUserListQuery({
    page: currentPage, // Pass the current page to fetch data
  });
  const [users, setUsers] = useState([]);
  const [blockUserMutation] = useBlockuserMutation();
  const [showModal, setShowModal] = useState(false);
  const [userIdToBlock, setUserIdToBlock] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.users) {
      setUsers(data.users);
      // setPagination(data.pagination);
      setCurrentPage(data.pagination.currentPage);
      setTotalPages(data.pagination.totalPages);
      setIsLastPage(data.pagination.currentPage === data.pagination.totalPages); // Update isLastPage state
    } else {
      navigate('/admin/Login')
    }
  }, [data, error]);

  const handleBlockUser = async (userId) => {
    setUserIdToBlock(userId);
    setShowModal(true);
  };

  const confirmBlock = async () => {
    if (userIdToBlock) {
      try {
        const result = await blockUserMutation(userIdToBlock).unwrap();
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userIdToBlock
              ? { ...user, Blocked: !user.Blocked } // Toggle the Blocked status
              : user
          )
        );

        if (result.error) {
          console.error("Error in blockUser response:", result.error);
        }
      } catch (error) {
        console.error("Error blocking/unblocking user:", error);
      } finally {
        setShowModal(false);
        setUserIdToBlock(null);
      }
    }
  };

  const cancelBlock = () => {
    setShowModal(false);
    setUserIdToBlock(null);
  };

  const fetchUsers = async (pageNumber) => {
    try {
      const response = await fetch(`/api/admin/userlist?page=${pageNumber}`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const paginate = async (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      try {
        setCurrentPage(pageNumber);
        const newData = await fetchUsers(pageNumber); // Fetch data for the selected page
        if (newData && newData.users) {
          setUsers(newData.users); // Update state with the new data
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error
      }
    }
 


  

  };  return (
    <div className="flex flex-wrap   bg-white p-8 rounded-md ">
      <SideBar />
      <div className=" w-[1000px]   ">
        <div className=" flex items-center justify-between pb-6">
          <div className="float-left">
            <h2 className="text-gray-600 font-semibold">Users list</h2>
            <span className="text-xs">All students</span>
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
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mobile
                    </th>

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user, index) => (
                      <tr key={user._id} className="">
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src={user.profilephoto}
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {user.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.email}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.mobile}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div>
                            <button
                              onClick={() => handleBlockUser(user._id)}
                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            >
                              {user.Blocked ? "Unblock" : "Block"}
                            </button>
                          </div>
                        </td>
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
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
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
              )}
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

      {showModal && (
        <div
          id="popup-modal"
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8"
        >
          <p className="mb-4"> Are you sure you want to block this user?</p>
          <div className="flex gap-4">
            <button
              onClick={confirmBlock}
              type="button"
              className="text-white bg-blue-950 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={cancelBlock}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLists;
