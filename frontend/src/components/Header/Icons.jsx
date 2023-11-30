import React from "react";
import { FaInbox, FaUsers } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";


const Icon = ({ name }) => {
  switch (name) {
    case "inbox":
      return <FaInbox />;
    case "users":
      return <FaUsers />;
    case "instructor":
      return <FaUserGraduate />;
    default:
      return null;
  }
};

export default Icon;
