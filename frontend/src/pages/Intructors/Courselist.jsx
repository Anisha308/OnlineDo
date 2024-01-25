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
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Style } from "@mui/icons-material";

const Courselists = () => {
  const { instructorId } = useParams();
  const Navigate = useNavigate();
  const { data, error, isLoading } = useGetCourseQuery(instructorId);

  const [courses, setCourses] = useState([]);
  const [instructor, setInstructor] = useState([]);
  useEffect(() => {
    if (data && data.courses) {
      setCourses(data.courses);
      setInstructor(data.instructor); // Assuming data has a property named 'instructor'
    } else if (error && error.status === 401) {
      Navigate("/instructorLogin");
    }
  }, [data, error]);

  return (
    <div className="flex  ">
      <InstructorSidebar instructorId={instructorId} />
      <div className="ml-5 flex flex-wrap  gap-5">
        {isLoading && <div>Loading...</div>}

        {courses &&
          instructor &&
          courses.map((course, index) => (
            <Link
              to={{
                pathname: `/instructor/instructorcourse/${course._id}`,
                state: { course },
              }}
              key={index}
              className="hover:no-underline"
            >
              <Card key={index} className="w-[332px] mb-7 p-2  flex-none">
                <CardHeader floated={false} className="h-44 ">
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
                <CardBody className="text-start">
                  <Typography variant="h8" className="font-bold">
                    {course.courseName}
                  </Typography>
                  <Typography color="blue-gray" className="mb-2" textGradient>
                    {instructor.name}
                  </Typography>
                  <Typography color="blue-gray" className="mb-" textGradient>
                    ₹ {course.price}
                  </Typography>
                </CardBody>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Courselists;
