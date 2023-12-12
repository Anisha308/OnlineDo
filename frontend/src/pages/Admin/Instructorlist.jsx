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
  useUnblockInstructorMutation
} from "../../Slices/adminApiSlice";

const InstructorLists = () => {
  const { data, error, isLoading } = useGetInstructorlistQuery();
  const [instructors, setInstructors] = useState([]);

  const [blockInstructorMutation] = useBlockInstructorMutation();
  const [verifyInstructor] = useVerifyInstructorMutation();
const [unblockInstructorMutation]=useUnblockInstructorMutation()

  useEffect(() => {
    if (data && data.instructors) {
      setInstructors(data.instructors);
    }
  }, [data]);

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
    } catch (error) {
      console.error("Error verifying instructor:", error);
    }
  };

  const handleBlockInstructor = async (instructorId) => {
    try {
      const response = await blockInstructorMutation({
        instructorId,
      }).unwrap();
         setInstructors((prevInstructors) =>
           prevInstructors.map((instructor) =>
             instructor._id === instructorId
               ? { ...instructor, Blocked: true }
               : instructor
           )
         );
    } catch (error) {
      console.error("Error blocking/unblocking instructor:", error);
    }
  };

 const handleUnblockInstructor = async (instructorId) => {
   try {
     const response = await unblockInstructorMutation({
       instructorId,
     }).unwrap();

     console.log("Unblock Instructor Response:", response);

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
  return (
    <div className="flex  ">
      <SideBar />
      <div className="ml-5 flex flex-wrap  gap-5">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}

        {instructors &&
          instructors.map((instructor) => (
            <Card key={instructor._id} className="w-[333px] mb-7 flex-none">
              <CardHeader floated={false} className="h-80">
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
                    onClick={() => handleVerifyInstructor(instructor._id)}
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
                  {instructor.Blocked && (
                    <button
                      onClick={() => handleUnblockInstructor(instructor._id)}
                      className="bg-blue-500 text-white px-10 py-2 w-[140px]  rounded-md ml-3"
                    >
                      Unblock
                    </button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default InstructorLists;
