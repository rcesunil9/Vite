import React, { useContext, useState } from "react";
import Button from "../../../../ui/Button";
import { useLocation } from "react-router-dom";
import MyProperties from "./MyProperties";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../../../Context/LanguageContext";

function MyAnnouncements() {
  const VenueBarArr = [
    {
      title_en: "Venues",
      title_fr: "Lieux",
      title_de: "Veranstaltungsorte",
      to: "/myannouncements",
    },
    {
      title_en: "Entertainment",
      title_fr: "Divertissement",
      title_de: "Unterhaltung",
      to: "/myannouncements",
    },
    {
      title_en: "Rental",
      title_fr: "Location",
      title_de: "Vermietung",
      to: "/myannouncements",
    },
    {
      title_en: "Services",
      title_fr: "Services",
      title_de: "Dienstleistungen",
      to: "/myannouncements",
    },
  ];

  const location = useLocation();
  const [selected, setSelected] = useState(0);
  const { t } = useTranslation();
  const { languagedata } = useContext(LanguageContext);
  const handleRegButtonClick = (index) => {
    setSelected(index);
  };
  return (
    <div>
      <div className="text-[#8D303A] border-b-[1px] border-borde text-2xl font-con py-5 px-10">
        {t("My Announcements List")}
      </div>
      <div className="flex flex-col px-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-row gap-10 w-full flex-wrap mt-6 mb-6">
            {VenueBarArr &&
              VenueBarArr.map((item, index) => {
                return (
                  <Button
                    type={selected == index ? "homeTabBarChange" : "homeTabBar"}
                    to={item.to}
                    onClick={() => {
                      handleRegButtonClick(index);
                    }}
                  >
                    {item?.[`title_${languagedata}`]}
                  </Button>
                );
              })}
          </div>
          <div className="">
            <input
              type="text"
              placeholder="Search..."
              className="border border-borde p-2 w-60 mr-2 focus:outline-none mt-4 rounded-md"
            />
          </div>
        </div>

        {location.pathname == "/myannouncements" && (
          <MyProperties selected={selected + 1} />
        )}
      </div>
    </div>
  );
}

export default MyAnnouncements;
