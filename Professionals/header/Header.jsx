import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import profileImg from "../../../assets/Ellipse1.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import logout from "../../../assets/logoutIcon.svg";
import * as AuthService from "../../api/service/AuthService";
import * as NonAuthService from "../../api/service/NonAuthService";
import Avatar from "react-avatar";
import { useTranslation } from "react-i18next";

function DropdownContent({ onLogout }) {
  const { t } = useTranslation();
  return (
    <div className="absolute bg-white flex flex-row shadow-md mt-28 px-4 py-4 rounded gap-2">
      <img src={logout} alt="" className=" w-[25px] h-[25px]" />
      <button onClick={onLogout}>{t("logout")}</button>
    </div>
  );
}

function Header({ onToggleSidebar }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const getUserProfile = async () => {
    try {
      const response = await NonAuthService.getUserProfile();
      setUser(response); // Assuming response.data contains user information
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  const navigate = useNavigate();
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    console.log("Logout clicked");
    setDropdownOpen(false);
    const response = await AuthService.logout();
    try {
      navigate("/ProfessionalRegister");
      history.pushState(null, "/ProfessionalRegister");
    } catch (e) {}
  };

  return (
    <div className="shadow-md fixed w-full z-50 bg-white">
      <div className=" max-w-[80%] mx-auto py-2 2xl:px-56 xl:px-18 lg:px-0 sm:px-5 px-4 flex justify-between items-center">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="logoImage"
              className="lg:w-[165px] lg:h-[63px] sm:w-[100px] sm:h-[50px] w-[80px] h-[30px]"
            />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={handleDropdownToggle}
            className="flex items-center justify-center"
          >
            {/* <img
              src={profileImg}
              alt="Profile Image"
              className=" lg:h-14 lg:w-14 sm:h-12 sm:w-12 w-8 h-8 rounded-full  "
            /> */}
            <Avatar
              name={user?.name ?? "USER"}
              className="rounded-full"
              size={30}
            />
            <IoMdArrowDropdown size={20} />
          </button>
          <div className="ml-3 lg:hidden">
            <RxHamburgerMenu onClick={onToggleSidebar} />
          </div>
          {isDropdownOpen && <DropdownContent onLogout={handleLogout} />}
        </div>
      </div>
    </div>
  );
}

export default Header;
