import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Icon from "./Icons";
import { NavLink, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Import menu icon
import { useMediaQuery } from "react-responsive"; // Import media query hook

const SideBar = () => {
  const isLargeScreen = useMediaQuery({ minWidth: 768 });

  const [showSidebar, setShowSidebar] = useState(isLargeScreen); // Initialize sidebar visibility based on screen size
  const handleMenuClick = () => {
    if (!isLargeScreen) {
      // Only toggle sidebar visibility on small screens
      setShowSidebar(!showSidebar);
    }
  };
  const handleSidebarClick = (e) => {
    // Prevent toggling the sidebar when clicking inside the navigation component
    e.stopPropagation();
  };
  return (
    <div className="relative w-[250px]">
      <button className="md:hidden" onClick={handleMenuClick}>
        <FaBars />
      </button>
      {showSidebar && ( // Show sidebar only if showSidebar is true
        <div
          className="absolute top-0 left-0 h-full z-10" // Apply gray background color
          onClick={handleSidebarClick} // Prevent toggling sidebar when clicking inside
        >
          <div className="bg-gray-200 h-full">
            {" "}
            {/* Apply gray background color to entire sidebar */}
            <Navigation
              activeItemId="/users/members"
              onSelect={({ itemId }) => {}}
              items={[
                {
                  // title: "Dashboard",
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
