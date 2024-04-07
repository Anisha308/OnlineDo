import React from "react";
import failedImage from "../../../src/assets/images/fail.png";
const Fail = () => {
  return (
    <div>
      <>
        <div className="bg-gray-100 h-screen">
          <div className="bg-white p-6  md:mx-auto">
            <img
              src={failedImage}
              alt="Failed"
              className="w-30 h-20 pl-48         "
            />

            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Failed!
              </h3>
              <p className="text-gray-600 my-2">Oops,Something went wrong.</p>
              <p> Try again!</p>
              <div className="py-10 text-center">
                <a
                  href="#"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  Retry
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Fail;
