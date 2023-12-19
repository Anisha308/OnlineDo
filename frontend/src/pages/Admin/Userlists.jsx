import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import SideBar from "../../components/Header/SideBar";
import { useGetUserListQuery } from "../../Slices/adminApiSlice";
import { useBlockuserMutation } from "../../Slices/adminApiSlice";


const Userlists = () => {
  const { data, error, isLoading } = useGetUserListQuery();
  const [users, setUsers] = useState([]);
  const [blockUserMutation] = useBlockuserMutation();
const [showModal, setShowModal] = useState(false);
  const [userIdToBlock, setUserIdToBlock] = useState(null);
  
  useEffect(() => {
    console.log("Data:", data);
    if (data && data.users) {
      console.log("setusers:", data.users);
      setUsers(data.users);
    }
  }, [data]);

  const handleBlockUser = async (userId) => {
    setUserIdToBlock(userId);
    setShowModal(true);
  };
  const confirmBlock = async () => {
    if (userIdToBlock) {
      try {
        console.log(userIdToBlock, "id"); // Use userIdToBlock instead of userId

        const result = await blockUserMutation(userIdToBlock).unwrap();
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userIdToBlock
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
      } finally {
        setShowModal(false);
        setUserIdToBlock(null);
      }
    }
  };

  const cancelBlock = () => {
    setShowModal(false);
    setUserIdToBlock(null);
  };
  return (
    <div className="flex  ">
      <SideBar />
      <div className="ml-5 flex flex-wrap  gap-5">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {users &&
          users.map((user, index) => (
            <Card key={user._id} className="w-[333px] mb-7 flex-none">
              <CardHeader floated={false} className="h-80">
                <img
                  src={user.profilephoto}
                  alt={`${user.name}'s Profile`}
                  className="w-full h-full"
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
                    className="bg-red-500 text-white px-10 py-2 w-[200px]  rounded-md mb-3"
                  >
                    {user.Blocked ? "Unblock" : "Block"}
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
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
    </div>
  );
};
export default Userlists;
