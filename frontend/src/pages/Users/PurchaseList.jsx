import React, { useEffect, useState } from "react";
import apiInstance from "../../../Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useCreateChatMutation } from "../../Slices/chatApiSlice";
const YourCourse = () => {
  const [purchases, setPurchases] = useState([]);
  const [createChat] = useCreateChatMutation()
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await apiInstance.get(
          `api/users/${user._id}/purchaselist`,
          {
            user: user._id,
          }
        );
        setPurchases(response.data.detailedCourses);
      } catch (error) {
        console.error("Error fetching purchases", error);
      }
    };

    fetchPurchases();
  }, [user._id]);

   const handleChatWith = async (instructorId) => {
     try {
       let senderId = user._id;    
       let receiverId = instructorId;
       const result = await createChat({ senderId, receiverId }).unwrap();
       if (result) {
         navigate("/chat");
       } else {
         console.error("Error creating chat. No data returned:", result);
       }
     } catch (error) {
       console.error("Error creating chat:", error);
     }
   };

  return (
    <div>
      <div className="mt-4 text-gray-500 dark:text-gray-300">
        <h2 className="font-bold text-xl pb-5 text-black">Your Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-5 min-h-[145px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
          {purchases.map((purchase) => (
            <div
              key={purchase._id}
              className="flex w-960 max-w-[990px] rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-5"
            >
              <div className="md:w-1/3">
                <div className="w-full h-600px overflow-hidden">
                  <img
                    src={purchase.thumbnail}
                    alt={purchase.title}
                    className="object-cover w-full h-full"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {purchase.courseName}
                </h4>
                <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  {purchase.description}
                </p>
                <p className="block mb-8 font-sans text-base antialiased font-bold leading-relaxed text-gray-400">
                  {purchase.duration} Months
                </p>
                <Link
                  to={`/${purchase._id}/courseview`}
                  className="flex inline-block"
                >
                  <button
                    className="flex bg-blue-900 text-white items-center gap-2 px-6 py-4 mr-28 font-sans text-xs font-bold text-center text-red-500 uppercase align-middle transition-all rounded-lg select-none hover:bg-blue-900/60 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Start Learning
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </button>
                </Link>
                <button
                  className="flex bg-blue-900 text-white items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-red-500 uppercase align-middle transition-all rounded-lg select-none hover:bg-blue-900/60 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={()=>handleChatWith(purchase.instructor)}
                >
                  Chat Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourCourse;
