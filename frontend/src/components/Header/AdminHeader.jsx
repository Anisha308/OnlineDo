import { useEffect, useRef } from "react";
import ONLINEDO from "../../assets/images/ONLINEDO.png";
import { NavLink, Link } from "react-router-dom";
import userImg from "../../assets/images/profile.png";
import { BiMenu } from "react-icons/bi";
import { useAdminlogoutMutation } from "../../Slices/adminApiSlice";
import { adminlogout } from "../../Slices/authAdminSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const AdminHeader = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.authAdmin);

  const navigate = useNavigate();

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
  const [logoutApiCall] = useAdminlogoutMutation();

  const logoutHandler = async () => {
    try {
      const res = await logoutApiCall().unwrap();

      dispatch(adminlogout());
      navigate("/admin/Login");
    } catch (err) {
      console.error("Error during logout:", err);
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
          <div>
            <img
              src={ONLINEDO}
              alt=""
              style={{ maxWidth: "90px" }}
              className="pr-[20px] w-300 h-25 "
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="text-white">Welcome Admin!</div>
            {adminInfo ? (
              <button
                onClick={logoutHandler}
                className="bg-black py-2 px-5 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
              >
                Logout
              </button>
            ) : (
              <span className="md:hidden" onClick={toggleMenu}>
                <BiMenu className=" text-[white] w-6 h-6 cursor-pointer" />
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
