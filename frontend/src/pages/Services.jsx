import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import SideBar from "../components/Header/SideBar";
import {
  useBlockInstructorMutation,
  useGetInstructorlistQuery,
  useVerifyInstructorMutation,
  useUnblockInstructorMutation,
} from "../Slices/adminApiSlice";
import Instructor from "../../../backend/models/InstructorModel";

const Services = () => {
  const { data, error, isLoading } = useGetInstructorlistQuery();
  const [instructors, setInstructors] = useState([]);

  const [blockInstructorMutation] = useBlockInstructorMutation();
  const [verifyInstructor] = useVerifyInstructorMutation();
  const [unblockInstructorMutation] = useUnblockInstructorMutation();
  const [showModal, setShowModal] = useState(false);
  const [instructorIdToBlock, setInstructorIdToBlock] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [confirmVerify, setConfirmVerify] = useState(null);

  useEffect(() => {
    if (data && data.instructors) {
      setInstructors(data.instructors);
    }
  }, [data]);
  const openPreview = (image) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  const handleVerifyInstructor = async (instructorId) => {
    try {
      const response = await verifyInstructor({ instructorId }).unwrap();
      // Update the state after a successful verification
      setInstructors((prevInstructors) =>
        prevInstructors.map((instructor) =>
          instructor._id === instructorId
            ? { ...instructor, Verified: true }
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
  const cancelBlock = () => {
    setShowModal(false);
    setInstructorIdToBlock(null);
  };

  const handleUnblockInstructor = async (instructorId) => {
    try {
      const response = await unblockInstructorMutation({
        instructorId,
      }).unwrap();

      setInstructors((prevInstructors) =>
        prevInstructors.map((instructor) =>
          instructor._id === instructorId
            ? { ...instructor, Blocked: false }
            : instructor
        )
      );
    } catch (error) {
      console.error("Error blocking/unblocking instructor:", error);
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

  const cancelInstructor = (instructorId) => {
    setConfirmVerify(false);
  };
  const VerificationModal = ({ instructor, onClose }) => (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 max-w-md w-full ">
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
          onClick={() => setSelectedInstructor(null)}
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Close
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
          <div className="flex items-center justify-between">
            {/* <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <svg
                xmlns="{instructor.profilephoto}"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="bg-gray-50 outline-none ml-1 block "
                type="text"
                name=""
                id=""
                placeholder="search..."
              />
            </div> */}
          </div>
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
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handledocs(instructor._id)}
                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            >
                              {instructor.Verified ? "verified" : "verify"}
                            </button>
                            <button
                              onClick={() =>
                                handleBlockInstructor(instructor._id)
                              }
                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            >
                              {instructor.Blocked ? "Unblock" : "Block"}
                            </button>
                            {/* <button
                              onClick={() =>
                                handleUnblockInstructor(instructor._id)
                              }
                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            >
                              Unblock
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div> */}
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
              className="text-white bg-blue-950 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
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

export default Services;
