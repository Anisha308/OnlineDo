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

const Courselists = () => {
  const { instructorId } = useParams();

  const { data, error, isLoading } = useGetCourseQuery(instructorId);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (data && data.courses) {
      setCourses(data.courses);
    }
  }, [data]);

  return (
    <div className="flex  ">
      <InstructorSidebar instructorId={instructorId} />
      <div className="ml-5 flex flex-wrap  gap-5">
        {isLoading && <div>Loading...</div>}

        {courses &&
          courses.map((course, index) => (
            <Card key={index} className="w-[333px] mb-7 flex-none">
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
                  {course.name}
                </Typography>
                <Typography color="blue-gray" className="mb-2" textGradient>
                  {course.duration} of {course.description}{" "}
                </Typography>
                <Typography color="blue-gray" className="mb-" textGradient>
                  Price : ₹{course.price}
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
          ))}
      </div>
    </div>
  );
};

export default Courselists;
