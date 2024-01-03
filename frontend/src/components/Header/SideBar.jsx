import React, { useRef } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Icon from "./Icons";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";

const SideBar = () => {
  return (
    <div className="w-[250px] h-[200px]">
  
        <Navigation
          activeItemId="/users/members"
          onSelect={({ itemId }) => {
            
          }}
          items={[
            {
              title: "Dashboard",
              itemId: "/dashboard",
              elemBefore: () => <Icon name="inbox" />,
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
          ]}
        />
      </div>
   
   
  )
}

export default SideBar;
