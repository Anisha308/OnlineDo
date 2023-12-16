import { useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import userImg from "../../assets/images/profile.png";
import { BiMenu } from "react-icons/bi";
import { useLogoutMutation } from "../../Slices/usersApiSlice";
import { logout } from "../../Slices/authSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const InstructorHeader = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      navigate("/instructorLogin");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  return (
    <header className="header flex Items-center bg-blue" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/*-------- logo ------- */}
          <div>
            <img
              src={logo}
              alt=""
              style={{ maxWidth: "90px" }}
              className="pr-[20px] "
            />
          </div>
          {/*-------menu-------*/}

          {/* ==================nav right ==============*/}
          <div className="flex items-center gap-4">
            <button
              onClick={logoutHandler}
              className="bg-black py-2 px-5 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
            >
              Logout
            </button>

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className=" text-[white] w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default InstructorHeader;
