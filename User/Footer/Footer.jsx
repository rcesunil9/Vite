import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import UserSectionFooter from "./UserSectionFooter";
import LanguageSwitch from "./LanguageSwitch";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import whiteLogo from "./logoWhite.png";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import ContactOverlay from "./ContactOverlay";

const Footer = () => {
  const { t } = useTranslation();

  const [contactModal, setContactModal] = useState(false);
  const openContactOverlay = () => {
    setContactModal(true);
  };
  const closeContactOverlay = () => {
    setContactModal(false);
  };
  return (
    <div className="bg-[#141626] w-full text-white font-pop pt-12 flex flex-col">
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row w-[80%] mx-auto lg:items-end  justify-between">
        <div className="flex flex-col  relative gap-2">
          <p className="text-xl font-semibold"> {t("forUser")} </p>
          <UserSectionFooter />
          <LanguageSwitch />
        </div>
        <div className="flex flex-col md:items-stretch md:h-[280px] gap-2 md:w-1/3 font-light">
          <div className=" flex-1 ">
            <p className="text-xl font-semibold">{t("forPro")}</p>
            <div className=" flex flex-col" >
            <Link to="/ProfessionalRegister" className="text-lg">
              {" "}
              {t("createAccLogin")}{" "}
            </Link>

            <Link to="/ProfessionalLogin" className="text-lg">
              {" "}
              {t("Login")}
            </Link>
            </div>

            <div
              onClick={() => {
                openContactOverlay();
              }}
              className="px-4 w-40 py-2 mt-2 rounded-sm bg-secondary font-light cursor-pointer"
            >
              <p className="flex text-lg  items-center gap-2">
                {" "}
                <FaPhoneAlt size={20} /> {t("contactMe")}{" "}
              </p>
            </div>
          </div>

          <img src={whiteLogo} className="w-40 bg-[#141626] mt-2" alt="" />
        </div>
        {contactModal && (
          <ContactOverlay closeContactOverlay={closeContactOverlay} />
        )}
        <div className="flex flex-col md:items-stretch md:h-[280px] gap-2 md:w-1/3 font-light">
          <div className=" flex-1 flex flex-col  ">
            <h1 className="text-xl  font-semibold ">{t("Policies")}</h1>
            <Link to="/terms&condition" onClick={()=>window.scrollTo(0, 0)} className="text-lg">
              {" "}
              {t("termsCon")}{" "}
            </Link>
            <Link to="/privcy&policy" onClick={()=>window.scrollTo(0, 0)} className=" mt-2  text-lg">
              {" "}
              {t("pripol")}{" "}
            </Link>
          </div>
          <div>
            <p className="text-lg font-light mt-8">{t("joinUsOn")}</p>
            <div className="flex gap-2 mt-2">
              <FaSquareFacebook size={24} />
              <FaInstagram size={24} />
              <FaLinkedinIn size={24} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center border-t border-[#352C80] py-4 px-3 mt-16">
        {" "}
        {t("copyrights")}{" "}
      </div>
    </div>
  );
};

export default Footer;
