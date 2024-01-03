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
import { useGetAllCourseQuery } from "../../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
const Allcourse = () => {
  const navigate = useNavigate()
  const { data, error, isLoading } = useGetAllCourseQuery();

  if (!data) {
   navigate('/login')
  }

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (data && data.courses) {
      setCourses(data.courses);
    }
  }, [data]);

  return (
    <div className="flex  ">
      <div className="ml-5 flex flex-wrap  gap-5">
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
      <div>
        <ul className="flex">
          <li>
            <a
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              href="#"
              aria-label="Previous"
            >
              <span className="material-icons text-sm">
                keyboard_arrow_left
              </span>
            </a>
          </li>
          <li>
            <a
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 p-0 text-sm text-white shadow-md transition duration-150 ease-in-out"
              href="#"
            >
              1
            </a>
          </li>
          <li>
            <a
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              href="#"
            >
              2
            </a>
          </li>
          <li>
            <a
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              href="#"
            >
              3
            </a>
          </li>
          <li>
            <a
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              href="#"
              aria-label="Next"
            >
              <span className="material-icons text-sm">
                keyboard_arrow_right
              </span>
            </a>
          </li>
        </ul>

        {/* stylesheet */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
        />
        {/* Material Icons Link */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </div>
    </div>
  );
};

export default Allcourse;
