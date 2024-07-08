import React, { useContext, useState } from "react";
import english from "./english.jpeg";
import german from "./german.png";
import french from "./french.png";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../../Context/LanguageContext";
const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const {  setLanguage } = useContext(LanguageContext);
  const handleEnglish = () => {
  
    setLanguage("en");
    localStorage.setItem("lang", "en");
    i18n.changeLanguage("en");
  };
  const handleGerman = () => {
    
    setLanguage("de");
    localStorage.setItem("lang", "de");
    i18n.changeLanguage("gr");
  };
  const handleFrench = () => {
   
    setLanguage("fr");
    localStorage.setItem("lang", "fr");
    i18n.changeLanguage("fr");
  };
  
  return (
    <div className="flex mt-2 text-white font-light items-center">
      <img src={german} className="h-[15px] mx-1" />
      <button className="hover:underline text-lg" onClick={handleGerman}>
        DE |
      </button>

      <img src={french} className="h-[15px] mx-1" />
      <button className="hover:underline text-lg" onClick={handleFrench}>
        FR |
      </button>
      <img src={english} className="h-[15px] mx-1" />
      <button className="hover:underline text-lg" onClick={handleEnglish}>
        EN |
      </button>
    </div>
  );
};

export default LanguageSwitch;
