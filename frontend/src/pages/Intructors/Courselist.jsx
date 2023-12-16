import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import SideBar from "../../components/Header/SideBar";
import InstructorSidebar from '../../components/Header/instructorSidebar'
import { useGetUserListQuery } from "../../Slices/adminApiSlice";
import { useBlockuserMutation } from "../../Slices/adminApiSlice";

const Userlists = () => {
  const { data, error, isLoading } = useGetUserListQuery();
  const [users, setUsers] = useState([]);
  const [blockUserMutation] = useBlockuserMutation();

  useEffect(() => {
    console.log("Data:", data);
    if (data && data.users) {
      console.log("setusers:", data.users);
      setUsers(data.users);
    }
  }, [data]);

  const handleBlockUser = async (userId) => {
    console.log("hggggggggggggggggggggggggggggggggggggggg");
    try {
      console.log(userId, "id");

      const result = await blockUserMutation(userId).unwrap();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? { ...user, Blocked: !user.Blocked } // Toggle the Blocked status
            : user
        )
      );
      console.log("Block user result:", result);

      // Check if there's an error in the response
      if (result.error) {
        console.error("Error in blockUser response:", result.error);
      }
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  return (
    <div className="flex  ">
      <InstructorSidebar />
      <div className="ml-5 flex flex-wrap  gap-5">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {users &&
          users.map((user, index) => (
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
                  {user.name}
                </Typography>
                <Typography color="blue-gray" className="mb-2" textGradient>
                  Email:{user.email}{" "}
                </Typography>
                <Typography color="blue-gray" className="mb-" textGradient>
                  Contact : {user.mobile}
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-center gap-7 pt-2">
                <div>
                  <button
                    onClick={() => handleBlockUser(user._id)}
                    className="bg-red-500 text-white px-10 py-2 w-[200px]  rounded-md"
                  >
                    {user.Blocked ? "Unblock" : "Block"}
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
