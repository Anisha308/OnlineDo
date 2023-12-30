import React from "react";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { PiUsersBold } from "react-icons/pi";
import { LuClock } from "react-icons/lu";
import { useSelector } from "react-redux";

function Home() {
  return (
    <>
      <div className="py-[3px]"></div>
      {/* ================Hero Section===========*/}
      <div style={{ backgroundColor: "bisque" }}>
        <section className="hero__section pt-[300px] 2xl:h-[800px]">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
              {/* ============Hero content ===================*/}
              <div>
                <div className="lg:w-[570px]">
                  <h1 className=" text-[30px] leading-[46px] text-whiteText font-[500] md:text-[50px] md:leading-[70px]">
                    I touch the future. I teach!!!{" "}
                  </h1>
                  <p className="text__para text-whiteText">
                    Teaching is more than imparting knowledge; it is inspiring
                    change. Learning is more than absorbing facts; it is
                    acquiring understanding.
                  </p>
                  <button className="btn">Start teaching</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* =============hero Counter============*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <MdOutlineVideoLibrary style={{ fontSize: "4em" }} />
            </div>

            <div className="mt-[30px]">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Explore a Rich Teaching Experience
              </h2>
              <p className="text-[16px] leading-7 text-black font-[400] mt-4 text-center ">
                Choose what you’d like to teach from our experience
              </p>
            </div>
          </div>

          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <PiUsersBold style={{ fontSize: "4em" }} />
            </div>

            <div className="mt-[30px]">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Earn from OnlineDo
              </h2>
              <p className="text-[16px] leading-7 text-black font-[400] mt-4 text-center ">
                Teach and learn from onlineDo
              </p>
            </div>
          </div>
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <LuClock style={{ fontSize: "4em" }} />
            </div>

            <div className="mt-[30px]">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                On your schedule
              </h2>
              <p className="text-[16px] leading-7 text-black font-[400] mt-4 text-center ">
                Empower yourself with the flexibility to design your teaching
                approach according to your unique timeline{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
