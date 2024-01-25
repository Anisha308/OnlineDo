import React from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Icon from "./Icons";
import { NavLink, Link } from "react-router-dom";

const InstructorSidebar = ({ instructorId }) => {
  return (
    <div className="w-[250px]">
      <Navigation
        activeItemId="/users/members"
        onSelect={({ itemId }) => {}}
        items={[
          {
            title: "Dashboard",
            itemId: "/dashboard",

            elemBefore: () => <Icon name="inbox" />,
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
        ]}
      />
    </div>
  );
};

export default InstructorSidebar;
