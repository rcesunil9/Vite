import React, { useState, useEffect, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import VenueOverlay from "./VenueOverlay";
import EntOverlay from "./EntOverlay";
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../../../Context/DataContext";
import { Menu, Transition } from "@headlessui/react";
import Modaal from "../Header/Modaal";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import FilterContext from "../../../Context/FilterContext";
import LanguageContext from "../../../Context/LanguageContext";
const UserSectionFooter = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const navigate = useNavigate();
  const { setFilterCatagorys } = useContext(FilterContext);

  const { categoryData, subcategoryData } = useContext(DataContext);

  // (request, false)(subcategoryData,"iudwhahduahdiuqahdiuq")
  const { languagedata } = useContext(LanguageContext);
  const { t } = useTranslation();
  //   const data = [
  //     {
  //       category: "Venue",
  //       subcategory: [
  //         { href: "", label: t("castles") },
  //         { href: "", label: t("partyRooms") },
  //         { href: "", label: t("bars") },
  //         { href: "", label: t("hotelsRes") },
  //         { href: "", label: t("confMeet") },
  //         { href: "", label: t("openAir") },
  //         { href: "", label: t("nightClubs") },
  //       ],
  //     },
  //     {
  //       category: t("entertainment"),
  //       subcategory: [
  //         { href: "", label: "DJ" },
  //         { href: "", label: t("singers") },
  //         { href: "", label: t("magicians") },
  //         { href: "", label: t("liveMusic") },
  //         { href: "", label: t("coverBands") },
  //       ],
  //     },
  //     {
  //       category: t("rental"),
  //       subcategory: [
  //         { href: "/filter", label: t("audioSound") },
  //         { href: "/filter", label: t("lighting") },

  //         { href: "/filter", label: t("screens") },
  //         { href: "/filter", label: t("tents") },
  //         { href: "/filter", label: t("fotoboxes") },
  //         { href: "/filter", label: t("bouncyCastle") },
  //         { href: "/filter", label: t("furniture") },
  //         { href: "/filter", label: t("heating") },
  //         { href: "/filter", label: t("cars") },
  //       ],
  //     },
  //     {
  //       category: t("services"),
  //       subcategory: [
  //         { href: "/filter", label: t("decorators") },
  //         { href: "/filter", label: t("evePlanner") },

  //         { href: "/filter", label: t("photographers") },
  //         { href: "/filter", label: t("catering") },
  //         { href: "/filter", label: t("bakeries") },
  //         { href: "/filter", label: t("foodTrucks") },
  //         { href: "/filter", label: t("wine") },
  //         { href: "/filter", label: t("other") },
  //         { href: "/filter", label: t("staff") },
  //         { href: "/filter", label: t("security") },
  //         { href: "/filter", label: t("buses") },
  //       ],
  //     },
  //   ];

  const [openMenu, setOpenMenu] = useState(null);
  const active = true;
  const menuRef = useRef(null);

  const handleMenufirst = (category) => {
    setOpenMenu(null ?? category);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleMenuItemClick = (category, item) => {
    console.log(item, "footer check");
    setFilterCatagorys({
      category_id: category.id,
      sub_category_id: item.id,
    });
    if (item.category_id == "1" || item.category_id == "2") {
      setIsModalOpen(true);

    } else {
      navigate("/filter");
    }
    setSelectedCategory(category?.[`category_name_${languagedata}`]);
  };

  return (
    <div>
      <div className="flex flex-col gap-2   ">
        {categoryData?.map((category, index) => (
          <Menu
            as="div"
            className=" inline-block  relative  text-left"
            key={"category__" + index}
          >
            <div ref={menuRef}>
              <Menu.Button
                className="inline-flex w-full justify-start items-center font-pop gap-x-1.5  py-2 text-lg  text-white "
                onClick={() => handleMenufirst(category)}
              >
                {({ open }) => (
                  <>
                    {category?.[`category_name_${languagedata}`]}

                    <RiArrowDownSFill
                      className={` ${
                        open ? "transform rotate-180  text-gray-400 " : ""
                      } -mr-1 h-5 w-5 text-gray-400`}
                      aria-hidden="true"
                    />
                  </>
                )}
                {/* {openMenu == category ? (
                  <RiArrowUpSFill
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <RiArrowDownSFill
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )} */}
              </Menu.Button>
            </div>

            <Menu.Items
              className={`absolute ${
                index < 2 ? " " : " bottom-0 mb-[40px] "
              }   z-50  left-0  w-72 text-lg   bg-white text-black shadow-lg `}
            >
              <div className="py-1">
                {subcategoryData.map((item) => {
                  if (category.id == item.category_id) {
                    return (
                      // <Menu.Item key={item.id}>
                      //   {category.category_name_en == "Rental" ||
                      //   category.category_name_en == "Services" ? (
                      //     <Link
                      //       to={"/filter"}
                      //       onClick={() => {
                      //         handleMenuItemClick(category, item);
                      //       }}
                      //       className={classNames(
                      //         active
                      //           ? "bg-gray-100 text-gray-900"
                      //           : "text-gray-700",
                      //         "block px-4 text-lg font-pop"
                      //       )}
                      //     >
                      //       {item.sub_category_name_en}
                      //     </Link>
                      //   ) : (
                      //     <Link
                      //       onClick={() => {
                      //         handleMenuItemClick(category, item);
                      //       }}
                      //       className={classNames(
                      //         active
                      //           ? "bg-gray-100 text-gray-900"
                      //           : "text-gray-700",
                      //         "block px-4 py-1 text-lg font-pop"
                      //       )}
                      //     >
                      //       {item.sub_category_name_en}
                      //     </Link>
                      //   )}
                      // </Menu.Item>
                      <Menu.Item key={item.id}>
                        {category.category_name_en == "Rental" ||
                        category.category_name_en == "Services" ? (
                          <Link
                            onClick={() => {
                              handleMenuItemClick(category, item);
                            }}
                            to={"/filter"}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 text-lg font-pop"
                            )}
                          >
                            {item?.[`sub_category_name_${languagedata}`]}
                          </Link>
                        ) : (
                          <Link
                            onClick={() => {
                              handleMenuItemClick(category, item);
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-1 text-lg font-pop"
                            )}
                          >
                            {item?.[`sub_category_name_${languagedata}`]}
                          </Link>
                        )}
                      </Menu.Item>
                    );
                  }
                })}
              </div>
            </Menu.Items>
          </Menu>
        ))}
      </div>
      {selectedCategory && <Modaal
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen(true)}
        closeModal={() => setIsModalOpen(false)}
        category={selectedCategory}
        subcategory={selectedCategory}
      />}
    </div>
  );
};

export default UserSectionFooter;
