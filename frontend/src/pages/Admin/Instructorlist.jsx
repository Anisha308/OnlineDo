import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import SideBar from "../../components/Header/SideBar";
import {
  useBlockInstructorMutation,
  useGetInstructorlistQuery,
  useVerifyInstructorMutation,
  useUnblockInstructorMutation,
} from "../../Slices/adminApiSlice";
import Instructor from "../../../../backend/models/InstructorModel";

const InstructorLists = () => {
  const { data, error, isLoading } = useGetInstructorlistQuery();
  const [instructors, setInstructors] = useState([]);

  const [blockInstructorMutation] = useBlockInstructorMutation();
  const [verifyInstructor] = useVerifyInstructorMutation();
  const [unblockInstructorMutation] = useUnblockInstructorMutation();
  const [showModal, setShowModal] = useState(false);
  const [instructorIdToBlock, setInstructorIdToBlock] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showVerificationModal,setShowVerificationModal]=useState(false)
  const [previewImage, setPreviewImage] = useState(null);
  const [confirmVerify,setConfirmVerify]=useState(null)

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
      setConfirmVerify(null)
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
      console.error('Error in modal',error);
    }
  }

  const handleBlockInstructor = async (instructorId) => {
    setInstructorIdToBlock(instructorId);
    setShowModal(true);
   
  }


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
      };
    }
  }
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
       className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mt-4 float-right"     >
       Close Preview
     </button>
   </div>
 );

  
  const confirmInstructor =(instructorId) => {
    setConfirmVerify(true)

    
  }


  const cancelInstructor = (instructorId) => {
    setConfirmVerify(false)
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
              onClick={() =>confirmInstructor(instructor._id)}
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
  )
  
  return (
    <div className="flex  ">
      <SideBar />
      <div className="ml-5 flex flex-wrap  gap-5">
        {isLoading && <div>Loading...</div>}

        {instructors &&
          instructors.map((instructor) => (
            <Card key={instructor._id} className="w-[333px] mb-7 flex-none">
              <CardHeader floated={false} className="h-80">
                <img
                  src={instructor.profilephoto} // Use the profilephoto URL here
                  alt={`${instructor.name}'s Profile`}
                  className="w-full h-full object-cover rounded-t-md"
                />
              </CardHeader>
              <CardBody className="text-center">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold"
                >
                  {instructor.name}
                </Typography>
                <Typography color="blue-gray" className="mb-2" textGradient>
                  Email:{instructor.email}{" "}
                </Typography>
                <Typography color="blue-gray" className="mb-" textGradient>
                  Contact : {instructor.mobile}
                </Typography>
                <Typography color="blue-gray" className="mb-" textGradient>
                  {instructor.experience} year experienced {instructor.jobrole}{" "}
                  at {instructor.companyname}
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-center gap-7 pt-2">
                <div className="flex">
                  <button
                    onClick={() => handledocs(instructor._id)}
                    className="bg-green-500 text-white px-7 py-2 w-[140px]  rounded-md"
                  >
                    {instructor.Verified ? "verified" : "verify"}
                  </button>
                  <button
                    onClick={() => handleBlockInstructor(instructor._id)}
                    className="bg-red-500 text-white px-10 py-2 w-[140px]  rounded-md ml-3"
                  >
                    {instructor.Blocked ? "Unblock" : "Block"}
                  </button>
                  {/* {instructor.Blocked && (
                    <button
                      onClick={() => handleUnblockInstructor(instructor._id)}
                      className="bg-blue-500 text-white px-10 py-2 w-[140px]  rounded-md ml-3"
                    >
                      Unblock
                    </button>
                  )} */}
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>

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

export default InstructorLists;
