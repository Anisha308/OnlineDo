import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Icon from "./Icons";
import { NavLink, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const SideBar = () => {
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
          <div className="bg-gray-200 h-full">
            <Navigation
              activeItemId="/users/members"
              onSelect={({ itemId }) => {}}
              items={[
                {
                  itemId: "/admin/dashboard",

                  elemBefore: () => (
                    <>
                      <Icon name="inbox" />
                      <Link
                        to="/admin/dashboard"
                        className=" ml-4 font-semibold"
                      >
                        Dashboard
                      </Link>
                    </>
                  ),
                },
                {
                  title: "Users",
                  itemId: "/users",
                  elemBefore: () => <Icon name="users" />,
                  subNav: [
                    {
                      elemBefore: () => (
                        <Link
                          to="/admin/userlist"
                          className="text-primaryColor font-medium ml-1"
                        >
                          UserLists
                        </Link>
                      ),
                    },
                  ],
                },
                {
                  title: "Instructors",
                  itemId: "/Instructor",
                  elemBefore: () => <Icon name="instructor" />,
                  subNav: [
                    {
                      elemBefore: () => (
                        <Link
                          to="/admin/instructorlist"
                          className="text-primaryColor font-medium ml-1"
                        >
                          InstructorLists
                        </Link>
                      ),
                    },
                  ],
                },
                {
                  title: "Categories",
                  itemId: "/addcategory",
                  elemBefore: () => <Icon name="users" />,
                  subNav: [
                    {
                      elemBefore: () => (
                        <Link
                          to="/admin/addcategory"
                          className="text-primaryColor font-medium ml-1"
                        >
                          Category
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

export default SideBar;
