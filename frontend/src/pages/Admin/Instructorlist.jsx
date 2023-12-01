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
    experience: 7,
    joberole: "Javascript developer",
    company: "Samsung",
  },
  {
    name: "Nesla",
    email: "nes@gmail.com",
    mobile: 7333899055,
    experience: 5,
    joberole: "software developer",
    company: "Nokia",
  },
  {
    name: "asii",
    email: "asi@gmail.com",
    mobile: 7333899055,
    experience: 5,
    joberole: "software developer",
    company: "Nokia",
  },
];
const Instructorlist = () => {
  return (
    <div className="flex ">
      <SideBar />
      <div className="ml-5 flex flex-wrap gap-5">
        {data.map((instructor, index) => (
          <Card key={index} className="w-[333px] mb-7 flex-none">
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
              <Typography color="blue-gray" className="mb-2" textGradient>
                Contact : {instructor.mobile}
              </Typography>
              <Typography color="blue-gray" className="mb-2" textGradient>
                {instructor.name} has {instructor.experience} year of experience
                as a {instructor.joberole} at {instructor.company}
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
                <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-10">
                  Verify
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">
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

export default Instructorlist;
