import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Icon from "./Icons";
import { NavLink, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const InstructorSidebar = ({ instructorId }) => {
  const isLargeScreen = useMediaQuery({ minWidth: 768 });

  const [showSidebar, setShowSidebar] = useState(isLargeScreen);
  const handleMenuClick = () => {
    if (!isLargeScreen) {
      setShowSidebar(!showSidebar);
    }
  };
  const handleSidebarClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="relative w-[250px]">
      <button className="md:hidden" onClick={handleMenuClick}>
        <FaBars />
      </button>
      {showSidebar && (
        <div
          className="absolute top-0 left-0 h-full z-10"
          onClick={handleSidebarClick}
        >
          <div className="bg-gray-200 h-full ">
            <Navigation
              activeItemId="/users/members"
              onSelect={({ itemId }) => {}}
              items={[
                {
                  itemId: "/instructor/Dashboard",

                  elemBefore: () => (
                    <>
                      <Icon name="inbox" />
                      <Link
                        to="/instructor/Dashboard"
                        className=" ml-4 font-semibold"
                      >
                        Dashboard
                      </Link>
                    </>
                  ),
                },
                {
                  title: "Courses",
                  itemId: "/users",
                  elemBefore: () => <Icon name="instructor" />,
                  subNav: [
                    {
                      elemBefore: () => (
                        <Link
                          to={`/instructor/${instructorId}/courselist`}
                          className="text-primaryColor font-medium ml-1"
                        >
                          CourseList
                        </Link>
                      ),
                    },
                    {
                      elemBefore: () => (
                        <Link
                          to={`/instructor/addcourse/${instructorId}`}
                          className="text-primaryColor font-medium ml-1"
                        >
                          Add Courses
                        </Link>
                      ),
                    },
                  ],
                },
                {
                  title: "Purchases",
                  itemId: "/purchases",
                  elemBefore: () => <Icon name="instructor" />,
                  subNav: [
                    {
                      elemBefore: () => (
                        <Link
                          to={`/instructor/coursepurchase`}
                          className="text-primaryColor font-medium ml-1"
                        >
                          PurchaseList
                        </Link>
                      ),
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorSidebar;
