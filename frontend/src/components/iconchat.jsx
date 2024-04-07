import React from "react";
import { useNavigate } from "react-router-dom";
const IconChat = () => {
  const navigate = useNavigate();
  const handlechat = () => {
    navigate("/instructor/chat");
  };
  return (
    <>
      <div className="relative">
        <button
          className="z-20 text-white flex flex-col shrink-0 grow-0 justify-around 
            fixed bottom-0 right-0 right-5 rounded-lg
            mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
          onClick={handlechat}
        >
          <div className="p-3 rounded-full border-4 border-white bg-blue-950">
            <svg
              className="w-6 h-6 lg:w-13 lg:h-11 xl:w-11 xl:h-11"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>
    </>
  );
};

export default IconChat;
