import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import InstructorSidebar from "../../components/Header/instructorSidebar";
import { useGetCourseQuery } from "../../Slices/authInstructorSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Style } from "@mui/icons-material";

const Courselists = () => {
  const { instructorId } = useParams();
const Navigate=useNavigate()
  const { data, error, isLoading } = useGetCourseQuery(instructorId);

  const [courses, setCourses] = useState([]);
const [instructor,setInstructor]=useState([])
  useEffect(() => {
    if (data && data.courses) {
      setCourses(data.courses);
      setInstructor(data.instructor); // Assuming data has a property named 'instructor'
    } else if (error && error.status === 401) {
      Navigate("/instructorLogin");
    }
  }, [data,error]);

  return (
    <div className="flex  ">
      <InstructorSidebar instructorId={instructorId} />
      <div className="ml-5 flex flex-wrap  gap-5">
        {isLoading && <div>Loading...</div>}

        {courses &&
           instructor &&
          courses.map((course, index) => (
            <Card key={index} className="w-[240px] mb-7 flex-none">
              <CardHeader floated={false} className="h-25">
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
              <CardBody className="">
                <Typography
                  variant="h8"
                  className="font-bold"
                >
                  {course.courseName}
                </Typography>
                <Typography color="blue-gray" className="mb-2" textGradient>
                  {instructor.name}
                </Typography>
                <Typography color="blue-gray" className="mb-" textGradient>
                  ₹ {course.price}
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-center gap-7 pt-2">
                <div>
                  <button className="bg-blue-900 text-white px-10 mb-6 py-2 w-[200px]  rounded-md">
                    view
                  </button>
                </div>
              </CardFooter>
            </Card>
          )
          )
        }
          
      </div>
    </div>
  );
};

export default Courselists;
