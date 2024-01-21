import React, { useEffect, useState } from 'react'
import apiInstance from '../../../Api'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const YourCourse = () => {
  const [purchases, setPurchases] = useState([])
       const user = useSelector((state) => state.auth.userInfo);
console.log(user,'user');
  useEffect(() => {
    
    const fetchPurchases = async () => {
      
      try {
        console.log('cxzkmvl');
        console.log(user._id,'jjj');
        const response = await apiInstance.get(`api/users/${user._id}/purchaselist`, {
          user:user._id
        })
        
        console.log(response,'redsds');
              setPurchases(response.data.detailedCourses);
console.log(response.data.detailedCourses,'kkkkkkk');
      } catch (error) {
                console.error("Error fetching purchases", error);

         }
    }
   
        fetchPurchases();

  },[user._id])
  
  return (
    <div>
      <div className="flex   mt-9">
        <div className="font-bold  w-600 text-4xl pl-36">
          Your Courses
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-5 min-h-[145px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
            {purchases.map((purchase) => (
              <div
                key={purchase._id}
                className={`relative flex w-90 max-w-[900rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md                  // index < purchases.length - 1 ? "mr-5" : "" // Add right margin to all cards except the last one
                `}
              >
                <div style={{ width: "700px", height: "350px" }}>
                  <img
                    src={purchase.thumbnail}
                    alt={purchase.title}
                    className="object-cover w-full h-full"
                  />

                  <div className="absolute  flex items-center justify-center text-white bg-black bg-opacity-75 rounded-xl">
                    {/* <h2 className="text-4xl font-bold text-center">
                      {purchase.courseName}
                      <br />
                      <span className="text-red-500"> 50% Off</span>
                    </h2> */}
                  </div>
                  {/* End Black Friday Mega Offer */}
                </div>
                <div className="p-6">
                  <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-red-500 uppercase">
                    {/* {purchase.courseName} */}
                  </h6>
                  <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {purchase.courseName}
                  </h4>
                  {/* {purchase.description} */}
                  <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                    {purchase.description}
                  </p>
                  <p className="block mb-8 font-sans text-base antialiased font-bold leading-relaxed text-gray-400">
                    {purchase.duration}
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
                    <button
                      className="flex bg-blue-900 text-white items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-red-500 uppercase align-middle transition-all rounded-lg select-none hover:bg-blue-900/60 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      Chat Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourCourse
