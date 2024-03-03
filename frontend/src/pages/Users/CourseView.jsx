import React, { useEffect, useState } from "react";
import apiInstance from "../../../Api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Rating from "react-rating-stars-component";

const CourseView = () => {
  const { purchaseId } = useParams();
  const [course, setCourse] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const [rating, setRating] = useState(0);
  const [count,setCount]=useState(0)
 const [ratings, setRatings] = useState([
   { _id: 1, count: 0 },
   { _id: 2, count: 0 },
   { _id: 3, count: 0 },
   { _id: 4, count: 0 },
   { _id: 5, count: 0 },
 ]);
 
  const [comment, setComment] = useState("");
  

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiInstance.get(
          `/api/users/${purchaseId}/course`
        );
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching course", error);
      }
    };
    fetchCourse();
  }, [purchaseId]);


  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await apiInstance.get(`api/users/rating`);
        console.log(response, "ratingrespone");
        setRatings(response.data.ratings);
        setCount(response.data.count)
        
        
      } catch (error) {
        console.error(error);
      }
    }
    fetchRating()
  },[])
  const toggleVideos = (moduleId) => {
    const videosElement = document.getElementById(`videos-${moduleId}`);
    if (videosElement) {
      videosElement.classList.toggle("hidden");
    }
  };

  const handleRating = () => {
    console.log("rting button clicked");
    setShowRatingModal(true);
  };
  const submitRating = async () => {
    try {
      console.log("gi");
      console.log(purchaseId, "ummm");
      console.log(comment, "comment");
      console.log(rating, "rting");
      const response = await apiInstance.post(`/api/users/rating`, {
        purchaseId,
        rating,
        comment,
      });
      console.log(response, "repone");
      setRatings([response.data.newRating.rating]); // Wrap the single object in an array
      setShowRatingModal(false);
      toast.success("Rating submitted successfully");
    } catch (error) {
      console.error("Error submitting rating", error);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <>
      <section className="max-w-7xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
        <main className="mt-8">
          <h2 className="mt-6 text-gray-700 dark:text-gray-200"></h2>
          {course && (
            <>
              <h2 className="mt-6 font-bold text-3xl  dark:text-gray-200">
                {course.courseName}
              </h2>
              <p
                className="mt-2 leading-loose text-black-600 pt-4 dark:text-black-500"
                style={{ fontSize: "18px" }}
              >
                {course.description}
              </p>
              {course.modules && course.modules.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-2 pb-6 pt-7">
                    Modules
                  </h3>
                  {course.modules.map((module) => (
                    <div key={module._id} className="mb-4">
                      <h4
                        className="text-lg pb-6 font-medium cursor-pointer"
                        onClick={() => toggleVideos(module._id)}
                      >
                        {module.title}
                      </h4>
                      <div
                        id={`videos-${module._id}`}
                        className={`hidden ${
                          course.modules[0]._id === module._id ? "" : "hidden"
                        }`}
                      >
                        {" "}
                        {module.videos && module.videos.length > 0 && (
                          <div className="mt-2">
                            <h5 className="text-md font-semibold mb-2">
                              Videos
                            </h5>
                            {module.videos.map((video) => (
                              <div key={video._id} className="mb-2">
                                <div className="pl-8 pr-8 pb-5 text-grey-darkest">
                                  <div className="max-w-3xl ml-3 pt-8 mx-auto rounded-lg overflow-hidden">
                                    <video
                                      className="w-full h-full rounded-lg"
                                      controls
                                    >
                                      <source
                                        src={video.url}
                                        type="video/mp4"
                                      />
                                    </video>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </main>
      </section>

      {/* component */}
      {/* review item */}
      <h5 className="font-bold pl-9">Feedback</h5>
      <div className="mx-autoshadow-lg rounded-lg my-25 px-8 py-8 max-w-xl ">
        <div className="mb-1 tracking-wide px-4 py-4">
          <h2 className="text-gray-800 font-semibold mt-1">
            {count} Users reviews
          </h2>
          <div className="border-b -mx-8 px-8 pb-3">
            {[1, 2, 3, 4, 5].map((ratingValue) => {
              const ratingItem = ratings.find(
                (item) => item._id === ratingValue
              );
              const count = ratingItem ? ratingItem.count : 0;
              const totalRatings = ratings.reduce(
                (total, rating) => total + rating.count,
                0
              );
              return (
                <div key={ratingValue} className="flex items-center mt-1">
                  <div className=" w-1/5 text-yellow-500 tracking-tighter">
                    <span>{ratingValue} star</span>
                  </div>
                  <div className="w-3/5">
                    <div className="bg-gray-300 w-full rounded-lg h-2">
                      <div
                        className=" w-full bg-yellow-600 rounded-lg h-2"
                        style={{
                          width: `${((count / totalRatings) * 100).toFixed(
                            0
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-1/5 text-gray-700 pl-3">
                    <span className="text-sm">
                      {((count / totalRatings) * 100).toFixed(0)}%
                    </span>
                  </div> 
                </div>
              );
            })}

            {/* 5th */}
          </div>
        </div>
       
        <div className="w-full px-4">
          <h3 className="font-medium tracking-tight">Review this item</h3>
          <p className="text-gray-700 text-sm py-1">
            give your opinion about this item.
          </p>
          <button
            onClick={handleRating}
            className="bg-blue-800 border border-white-400 px-3 py-1 rounded  text-white mt-2"
          >
            Leave a review
          </button>
        </div>
      </div>
      {showRatingModal && (
        <div className="fixed inset-0 pt-9 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="py-3 sm:max-w-xl sm:mx-auto">
            <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
              <div className="px-12 py-2">
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="  mt-3 mr-7 ml-0 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                  </svg>
                </button>
                <h2 className="text-gray-800 text-3xl font-semibold pl-3">
                  Your opinion matters to us!
                </h2>
              </div>
              <div className="bg-gray-200 w-full flex flex-col items-center">
                <div className="flex flex-col items-center py-6 space-y-3">
                  <span className="text-lg text-gray-800">
                    Are you enjoying the course?
                  </span>
                  <div className="flex space-x-3">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <svg
                        key={index}
                        className={`w-12 h-12 ${
                          index <= rating ? "text-yellow-500" : "text-gray-500"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        onClick={() => handleRatingChange(index)}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="w-3/4 flex flex-col">
                  <textarea
                    rows={3}
                    className="p-4 text-gray-500 rounded-xl resize-none"
                    placeholder="share your feedback"
                    // value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    onClick={submitRating}
                    className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                  >
                    Rate now
                  </button>
                </div>
              </div>
              <div className="h-20 flex items-center justify-center">
                <a href="#" className="text-gray-600">
                  Maybe later
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseView;
