import React from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Icon from "./Icons";
import { NavLink, Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-[250px]">
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
  );
};

export default SideBar;
