import React from 'react'
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Icon from './Icons';
import { NavLink, Link } from "react-router-dom";


const SideBar = () => {
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
              title: "Users",
              itemId: "/users",
              elemBefore: () => <Icon name="users" />,
              subNav: [
                {
                  elemBefore: () => (
                    <Link
                      to="/userlist"
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
                      to="/instructorlist"
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
    );
}

export default SideBar
