import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import SideBar from "../../components/Header/SideBar";
const data = [
  {
    name: "Anisha",
    email: "Anisha@gmail.com",
    mobile: 7510994412,
  },
  {
    name: "Anisha",
    email: "Anisha@gmail.com",
    mobile: 7510994412,
  },
  {
    name: "Anisha",
    email: "Anisha@gmail.com",
    mobile: 7510994412,
  },
  { name: "Aswathi", email: "aswathi@gmail.com", mobile: 73338990 },
  { name: "Aswathi", email: "aswathi@gmail.com", mobile: 73338990 },
];

const Userlists = () => {
  return (
    <div className="flex  ">
      <SideBar />
      <div className="ml-5 flex flex-wrap  gap-5">
        {data.map((instructor, index) => (
          <Card
            key={index}
            className="w-[333px] mb-7 flex-none"
          >
            <CardHeader floated={false} className="h-80">
              <img
                src="https://docs.material-tailwind.com/img/team-3.jpg"
                alt="profile-picture"
              />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h4" color="blue-gray" className="font-bold">
                {instructor.name}
              </Typography>
              <Typography color="blue-gray" className="mb-2" textGradient>
                Email:{instructor.email}{" "}
              </Typography>
              <Typography color="blue-gray" className="mb-" textGradient>
                Contact : {instructor.mobile}
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
              <Tooltip content="Like">
                <Typography
                  as="a"
                  href="#facebook"
                  variant="lead"
                  color="blue"
                  textGradient
                ></Typography>
              </Tooltip>
              <Tooltip content="Follow">
                <Typography
                  as="a"
                  href="#twitter"
                  variant="lead"
                  color="light-blue"
                  textGradient
                >
                  <i className="fab fa-twitter" />
                </Typography>
              </Tooltip>
              <Tooltip content="Follow">
                <Typography
                  as="a"
                  href="#instagram"
                  variant="lead"
                  color="purple"
                  textGradient
                >
                  <i className="fab fa-instagram" />
                </Typography>
              </Tooltip>
              <div>
                <button className="bg-red-500 text-white px-10 py-2 w-[200px]  rounded-md">
                  Block
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Userlists;
