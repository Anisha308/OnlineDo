import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/Header/SideBar";
import {
  useBlockInstructorMutation,
  useGetInstructorlistQuery,
  useVerifyInstructorMutation,
  useUnblockInstructorMutation,
} from "../../Slices/adminApiSlice";
import apiInstance from "../../../Api";
import { toast } from "react-toastify";

const InstructorLists = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showActions, setShowActions] = useState(false);

  const { data, error, isLoading } = useGetInstructorlistQuery(currentPage);
  const [instructors, setInstructors] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [blockInstructorMutation] = useBlockInstructorMutation();
  const [verifyInstructor] = useVerifyInstructorMutation();
  const [unblockInstructorMutation] = useUnblockInstructorMutation();
  const [showModal, setShowModal] = useState(false);
  const [instructorIdToBlock, setInstructorIdToBlock] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [confirmVerify, setConfirmVerify] = useState(null);
  const [reason, setReason] = useState("");
  const [reject, setReject] = useState(null);
const [showModalUnblock, setShowModalUnblock] = useState(false);
  const [instructorIdToUnblock, setInstructorIdToUnblock] = useState(null);

  const isLastPage = currentPage === totalPages;


    useEffect(() => {
      const storedInstructors = JSON.parse(localStorage.getItem("instructors"));
      if (storedInstructors) {
        setInstructors(storedInstructors);
      }
    }, []);
  
  
useEffect(() => {
  if (data && data.data && data.data.instructors) {
    setInstructors(data.data.instructors);
    setTotalPages(data.data.pagination.totalPages);
    localStorage.setItem("instructors", JSON.stringify(data.data.instructors));
  } else {
    if (error) {
      console.error("Error fetching instructors:", error);
      // navigate('admin/Login')
    }
    // Handle error or redirect if needed
  }
}, [currentPage, data, error]);
  const openPreview = (image) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };


const cancelUnblock = () => {
  setShowModalUnblock(false);
  setInstructorIdToUnblock(null);
};
  const handleBlockUnblockInstructor = (e, instructor) => {
  e.preventDefault()
  if (instructor.Blocked) {
    handleUnblockInstructor(e,instructor._id);
  } else {
    handleBlockInstructor(instructor._id);
  }
};

  
  

const handleVerifyInstructor = async (instructorId) => {
  try {
    const response = await verifyInstructor({ instructorId }).unwrap();
    setInstructors((prevInstructors) =>
      prevInstructors.map((instructor) =>
        instructor._id === instructorId
          ? { ...instructor, Verified: true, rejected: false } 
          : instructor
      )
    );
    setSelectedInstructor(null);
    setConfirmVerify(null);
  } catch (error) {
    console.error("Error verifying instructor:", error);
  }
};

  const handledocs = async (instructorId) => {
    try {
      const selected = instructors.find(
        (instructor) => instructor._id === instructorId
      );
      setSelectedInstructor(selected);
      setShowVerificationModal(true);
    } catch (error) {
      console.error("Error in modal", error);
    }
  };

  const handleBlockInstructor = async (instructorId) => {
    setInstructorIdToBlock(instructorId);
    setShowModal(true);
  };

  const confirmBlock = async () => {
    if (instructorIdToBlock) {
      try {
        const result = await blockInstructorMutation({
          instructorId: instructorIdToBlock,
        }).unwrap();
        setInstructors((prevInstructors) =>
          prevInstructors.map((instructor) =>
            instructor._id === instructorIdToBlock
              ? { ...instructor, Blocked: !instructor.Blocked }
              : instructor
          )
        );
        if (result.error) {
          console.error("Error in blockUser response:", result.error);
        }
      } catch (error) {
        console.error("Error blocking/unblocking instructor:", error);
      } finally {
        setShowModal(false);
        setInstructorIdToBlock(null);
      }
    }
  };
  const handleview = (instructorId) => {
    navigate(`/admin/course/${instructorId}`)
  }
  const cancelBlock = () => {
    setShowModal(false);
    setInstructorIdToBlock(null);
  };


  const handleUnblockInstructor = async (e, instructorId) => {
    e.preventDefault()
    setInstructorIdToUnblock(instructorId)
    setShowModalUnblock(true)
  }
  const confirmUnblock = async (instructorId) => {
    try {
      const response = await unblockInstructorMutation({ instructorId });
      setInstructors((prevInstructors) =>
        prevInstructors.map((instructor) =>
          instructor._id === instructorId
            ? { ...instructor, Blocked: false }
            : instructor
        )
      );
      setShowModalUnblock(false)
    } catch (error) {
      console.error("Error blocking/unblocking instructor:", error);
    }
  };


  const mailreason = async (reason) => {
    try {
      const res = await apiInstance.post(`api/admin/sendmail`, {
        reason,
        instructorId: selectedInstructor._id,
      });
      setInstructors((prevInstructors) =>
        prevInstructors.map((instructor) =>
          instructor._id === selectedInstructor._id
            ? { ...instructor, rejected: true }
            : instructor
        )
      );

      setShowVerificationModal(false);
      toast.success("Rejected successfully");
    } catch (error) {
      console.error("Error sending rejection email:", error);
    }
  };
  const handleReject = async (instructor) => {
    if (!selectedInstructor) return;
    try {
      const res = await apiInstance.post(`api/admin/sendmail`, {
        reason,
        instructorId: selectedInstructor._id,
      });
      setInstructors((prevInstructors) =>
        prevInstructors.map((instructor) =>
          instructor._id === selectedInstructor._id
            ? { ...instructor, rejected: true, Verified: false } // Set Verified to false if previously verified
            : instructor
        )
      );
      setShowVerificationModal(false);
      toast.success("Rejected successfully");
    } catch (error) {
      console.error("Error sending rejection email:", error);
    }
  };

  const PreviewModal = () => (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 max-w-2xl w-full">
      <img src={previewImage} alt="Preview" className="w-full max-h-96" />

      <button
        onClick={closePreview}
        type="button"
        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mt-4 float-right"
      >
        Close Preview
      </button>
    </div>
  );

  const confirmInstructor = (instructorId) => {
    setConfirmVerify(true);
  };

 const paginate = async (pageNumber) => {
   try {
     const response = await fetch(
       `/api/admin/instructorlist?page=${pageNumber}`,
       {
         headers: {
           Accept: "application/json",
           // Add other headers if needed
         },
       }
     );


     if (!response.ok) {
       throw new Error("Failed to fetch data");
     }

     const responseData = await response.json();
   
     setInstructors(responseData.data.instructors);
     setCurrentPage(pageNumber);
     setTotalPages(responseData.data.pagination.totalPages);

   
   } catch (error) {
     console.error("Error fetching data:", error);
     // Handle error (e.g., display error message)
   }
 };


  const cancelInstructor = (instructorId) => {
    setConfirmVerify(false);
  };

  const VerificationModal = ({ instructor, onClose }) => (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 max-w-md w-full ">
      <button
        onClick={onClose}
        type="button"
        className="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring focus:ring-gray-200 rounded-full w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.35 5.64a1 1 0 0 0-1.42 0L10 8.59 6.06 4.64a1 1 0 1 0-1.42 1.42L8.59 10 4.64 13.94a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L10 11.41l3.94 3.95a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L11.41 10l3.94-3.94a1 1 0 0 0 0-1.42z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <p className="font-bold mb-4">Documents verification</p>
      <p className="mb-4">ID Proof : </p>
      <img
        src={selectedInstructor.idProof}
        alt="ID Proof"
        className="w-full max-h-40 cursor-pointer"
        onClick={() => openPreview(selectedInstructor.idProof)}
      />

      <p className="mt-8 mb-4">Experience Certificate : </p>
      <img
        src={selectedInstructor.experienceCertificateFile}
        alt="Experience Certificate"
        className="w-full max-h-40 cursor-pointer"
        onClick={() =>
          openPreview(selectedInstructor.experienceCertificateFile)
        }
      />

      <div className="flex justify-end gap-4 mt-7">
        <button
          onClick={() => confirmInstructor(instructor._id)}
          type="button"
          className="text-white bg-blue-900 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-white-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-white-700 dark:text-white-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Verify
        </button>

        <button
          onClick={() => handleReject(instructor._id)}
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
  return (
    <div className="flex flex-wrap   bg-white p-8 rounded-md ">
      <SideBar />
      <div className=" w-[1000px]   ">
        <div className=" flex items-center justify-between pb-6">
          <div className="float-left">
            <h2 className="text-gray-600 font-semibold">Instructors list</h2>
            <span className="text-xs">All instructors</span>
          </div>
          <div className="flex items-center justify-between"></div>
        </div>

        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal ">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      mobile
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Jobrole
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Company Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {instructors &&
                    instructors.map((instructor) => (
                      <tr key={instructor._id} className="">
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src={instructor.profilephoto}
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {instructor.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {instructor.email}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {instructor.mobile}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {instructor.experience} years
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {instructor.jobrole}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {instructor.companyname}
                            {instructor.rejected}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex justify-center space-x-4">
                            <button
                              onClick={() => handleview(instructor._id)}
                              className="relative inline-block  py-1 font-semibold text-red-900 leading-tight bg-blue-200 rounded-full h-8"
                              style={{ minWidth: "100px" }} // Adjust the minWidth as needed
                            >
                              View Course
                            </button>

                            <div className="relative inline-block">
                              <select
                                value=""
                                onChange={(e) => {
                                  e.preventDefault(); // Prevent default form submission behavior

                                  const value = e.target.value;
                                  if (value === "verify") {
                                    // Set the selected instructor
                                    setSelectedInstructor(instructor);
                                    // Open the verification modal
                                    setShowVerificationModal(true);
                                  } else if (value === "reject") {
                                    setReject(true); // Set the reject state to true to trigger the rejection modal
                                    setShowVerificationModal(true); // Open the verification modal
                                  } else if (value === "unblock") {
                                    handleBlockUnblockInstructor(e, instructor);
                                  }
                                }}
                                className={`px-3 py-1 font-semibold text-red-900 leading-tight appearance-none border-none bg-transparent`}
                              >
                                <option disabled value="">
                                  &#8942; {/* Vertical ellipsis */}
                                </option>
                                {instructor.Verified && (
                                  <option value="reject">Reject</option>
                                )}
                                {instructor.Verified && (
                                  <option value="verified">Verified</option>
                                )}
                                {instructor.rejected && (
                                  <option value="rejected">rejected</option>
                                )}
                                {instructor.rejected && (
                                  <option value="verify">verify</option>
                                )}{" "}
                                {!instructor.rejected && !instructor.Verified && (
                                  <option value="verify">verify</option>
                                )}
                                <option value="unblock">
                                  {instructor.Blocked ? "Unblock" : "Block"}
                                </option>
                              </select>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
              className="text-white bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
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
      {showVerificationModal && selectedInstructor && (
        <VerificationModal
          instructor={selectedInstructor}
          onClose={() => setShowVerificationModal(false)}
        />
      )}
      {confirmVerify && (
        <div
          id="popup-modal"
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8"
        >
          <p className="mb-4">
            {" "}
            Are you sure you want to verify this instructor?
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => handleVerifyInstructor(selectedInstructor._id)}
              type="button"
              className="text-white bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={cancelInstructor}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      )}
      {previewImage && <PreviewModal />}
      {showModalUnblock && (
        <div
          id="popup-modal"
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8"
        >
          <p className="mb-4"> Are you sure you want to unblock this user?</p>
          <div className="flex gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                confirmUnblock(instructorIdToUnblock); // Pass instructorIdToUnblock instead of instructors._id
              }}
              type="button"
              className="text-white bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              Yes, I'm sure
            </button>

            <button
              // onClick={cancelunBlock}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center h-screen">
        <div x-data="{ showModal: true, email: '' }">
          {reject && (
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={() => setReject(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
          )}
          {/* Modal */}
          {reject && (
            <div className="fixed z-10 inset-0 overflow-y-auto" x-cloak>
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Modal panel */}
                <div
                  className="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    {/* Modal content */}
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        {/* Icon for newsletter */}
                        <svg
                          width="64px"
                          height="64px"
                          viewBox="0 0 24 24"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#2563eb"
                          strokeWidth="0.36"
                        >
                          {/* ... */}
                        </svg>
                      </div>
                      <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-headline"
                        >
                          You are about to reject the instructor.Are you sure??
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Enter the reason before rejecting..
                          </p>
                          <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Type Here..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    {/* Subscribe button */}
                    <button
                      onClick={() => {
                        mailreason(reason);
                        setReject(false);
                      }}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Confirm
                    </button>
                    {/* Cancel button */}
                    <button
                      onClick={() => setReject(false)}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex ">
            <li>
              <button
                className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                aria-label="Previous"
              >
                <span className="material-icons text-sm">
                  keyboard_arrow_left
                </span>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <li key={pageNumber}>
                  <button
                    className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 p-0 text-sm text-black shadow-md transition duration-150 ease-in-out ${
                      currentPage === pageNumber ? "bg-gray-500" : ""
                    }`}
                    onClick={() => paginate(pageNumber)}
                    disabled={isLoading} // Disable button while loading
                  >
                    {pageNumber}
                  </button>
                </li>
              )
            )}
            <li>
              <button
                className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                onClick={() =>
                  paginate(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={isLastPage}
                aria-label="Next"
              >
                <span className="material-icons text-sm">
                  keyboard_arrow_right
                </span>
              </button>
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
  );
};

export default InstructorLists;
