import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children, newLanguage }) => {
  const storedLanguage = localStorage.getItem("lang") ?? "en";
  const [languagedata, setLanguage] = useState(storedLanguage);

  console.log(languagedata , "consol languaggee");
  const toggleLanguage = () => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ languagedata, toggleLanguage, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
