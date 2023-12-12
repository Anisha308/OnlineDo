import { useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import userImg from "../../assets/images/profile.png";
import { BiMenu } from "react-icons/bi";
const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/courses",
    display: "Courses",
  },
  {
    path: "/contact",
    display: "yyy",
  },
];

const AdminHeader = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

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
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading=7 font-[600]"
                        : "text-whiteText text-[16px] leading=7 font-[500] hover:text-primaryColour"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* ==================nav right ==============*/}
          <div className="flex items-center gap-4">
            
            <Link to="/logout">
              <button className="bg-black py-2 px-5 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                Logout
              </button>
            </Link>
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className=" text-[white] w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;