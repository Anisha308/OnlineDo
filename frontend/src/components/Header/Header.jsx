import React,{useEffect,useRef} from 'react'
import ONLINEDO from '../../assets/images/ONLINEDO.png'
import {NavLink,Link} from 'react-router-dom'
import userImg from '../../assets/images/profile.png'
import {BiMenu} from 'react-icons/bi'
import { Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../Slices/usersApiSlice"
import { logout } from "../../Slices/authSlice"

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/getcourse",
    display: "Courses",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  
];

const Header = () => {

  const headerRef = useRef(null)
  const menuRef = useRef(null)
  
    const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  const handleStickyHeader = () => {
    if (headerRef.current) {
      window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          headerRef.current.classList.add('sticky__header')
        }
        else {
          headerRef.current.classList.remove('sticky__header')
        }
      
      })
    }
  }
  useEffect(() => {
    handleStickyHeader()
    return () => window.removeEventListener('scroll', handleStickyHeader)
  },[headerRef])
  
  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')
  
  return (
    <header className="header flex Items-center bg-blue-900" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/*-------- logo ------- */}
          <div>
            <img
              src={ONLINEDO}
              alt=""
              style={{ maxWidth: "90px" }}
              className="pr-[20px] w-300 h-25 "
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
            {userInfo ? (
              <div className="flex items-center">
              
                <span className="mr-2 text-white">Welcome {userInfo.name}</span>
                <div>
                  <Link to={`/profile/${userInfo._id}`}>
                    <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                      <img
                        src={userImg}
                        className="w-full rounded full"
                        alt=""
                      />
                    </figure>
                  </Link>
                </div>
                <button
                  onClick={logoutHandler}
                  className="bg-black py-2 px-5 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <div className="hidden"></div>
                <Link to="/login">
                  <button className="bg-black py-2 px-5 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                    <FaSignInAlt /> Login
                  </button>
                </Link>
              </>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="text-[white] w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header
