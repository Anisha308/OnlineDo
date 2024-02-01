import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUserMutation } from "../../Slices/chatApiSlice"
import PropTypes from "prop-types";

const Conversation = ({ data, currentUser, online }) => {
  const [getUser] = useGetUserMutation();
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        dispatch({ type: "SAVE_USER", data: data });
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [data.members, currentUser, dispatch, getUser]);

  return (
    <>
      <div className="flex items-center gap-4 hover:bg-gray-100 cursor-pointer rounded p-2 md:p-4">
        {online && (
          <div className="bg-green-500 rounded-full w-4 h-4 md:w-2 md:h-2"></div>
        )}
        <img
          src={
            userData?.userDetails?.profilephoto ||
            "https://cdn1.iconfinder.com/data/icons/instagram-ui-colored/48/JD-17-512.png"
          }
          alt="Profile"
          className="followerImage w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
        />
        <div className="text-sm">
          <span className="font-semibold text-gray-800">
            {userData?.userDetails?.name ||
              userData?.instructorDetails?.name}
          </span>
          <br />
          <span className={online ? "text-green-500" : "text-gray-500"}>
            {online ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <hr className="w-5/6 md:w-11/12 mx-auto border-t border-gray-300 my-4" />
    </>
  );
};

Conversation.propTypes = {
  data: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired,
};

export default Conversation;
