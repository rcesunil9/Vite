import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { Menu, Transition } from "@headlessui/react";
import { Sidebar } from "flowbite-react";
import logo from "../../../assets/logo.png";
import profileImg from "../../../assets/profile.svg";
import favourtie from "../../../assets/favourites.svg";
import logout from "../../../assets/logoutIcon.svg";
import flag1 from "../../../assets/flag1.png";
import flag2 from "../../../assets/flag2.png";
import flag3 from "../../../assets/flag3.png";
import { RiArrowDownSFill } from "react-icons/ri";
import { RiArrowUpSFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { t } from "i18next";
import * as AuthService from "../../api/service/AuthService";
import * as NonAuthService from "../../api/service/NonAuthService";
import { useTranslation } from "react-i18next";
import Modaal from "./Modaal";
import Button from "../../../ui/Button";
import FilterContext from "../../../Context/FilterContext";
import LanguageContext from "../../../Context/LanguageContext";
import LanguageSwitch from "../Footer/LanguageSwitch";
// import * as NonAuthService from "../../api/service/NonAuthService"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ categoryData, subcategoryData }) {
  // console.log(subcategoryData, "xcvwetewrw");
  const { setFilterCatagorys } = useContext(FilterContext);
  const { languagedata, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  // console.log(categoryData, "category data")
  // console.log(subcategoryData, "subcategory data")
  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    try {
      const response = await NonAuthService.getUserProfile();
      setUser(response);
    } catch (e) {
      // console.log('error in getting user details')
      return e;
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  console.log(user, "user how is that");

  const profile = [
    {
      image: profileImg,
      subcategory: [
        {},
        {
          id: 2,
          image: favourtie,
          href: "/fav",
          label_en: "Favourites",
          label_fr: "Favoris",
          label_de: "Favoritinnen",
        },
      ],
    },
  ];

  if (user?.role_id == "2") {
    // Modify the subcategory at index 0 in profile array
    profile[0].subcategory[0] = {
      id: 3,
      image: profileImg,
      href: "/ProfessionalDashboard",
      label_en: "Dashboard",
      label_fr: "Tableau de bord",
      label_de: "Armaturenbrett",
    };
  } else {
    // Modify the subcategory at index 0 in profile array
    profile[0].subcategory[0] = {
      id: 1,
      href: "/profile",
      image: profileImg,
      label_en: "My Profile",
      label_fr: "Mon profil",
      label_de: "Mein Profil",
    };
  }
  const [imgflag, setimgflag] = useState(flag1);
  const [langshow, setlangshow] = useState("EN");
  const { i18n } = useTranslation();

  const handleEnglish = () => {
    setimgflag(flag1);
    setlangshow("EN");
    setLanguage("en");
    localStorage.setItem("lang", "en");
    i18n.changeLanguage("en");
  };
  const handleGerman = () => {
    setlangshow("DE");
    setimgflag(flag2);
    setLanguage("de");
    localStorage.setItem("lang", "de");
    i18n.changeLanguage("gr");
  };
  const handleFrench = () => {
    setimgflag(flag3);
    setlangshow("FR");
    setLanguage("fr");
    localStorage.setItem("lang", "fr");
    i18n.changeLanguage("fr");
  };

  const language = [
    {
      flag: imgflag,
      lang: langshow,
      subcategory: [
        { id: 2, flag: flag2, lang: "DE", func: handleGerman },
        { id: 3, flag: flag3, lang: "FR", func: handleFrench },
        { id: 1, flag: flag1, lang: "EN", func: handleEnglish },
      ],
    },
  ];

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

  const [hamburger, setHamburger] = useState(false);
  const showSidebar = () => {
    setHamburger(!hamburger);
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [selectedCategory, setSelectedCategory] = useState(null);

  // const handleMenuItemClick = (category) => {
  //   // console.log(category);
  //   setIsModalOpen(true);
  //   setSelectedCategory(category.category_name_en);
  //   setFilterCatagorys({
  //     category_id: selectedCategory,
  //     sub_category_id: selectedSubcategory,
  //   });
  // };

  const handleMenuItemClick = (category, item) => {
    console.log(category, item)
    setFilterCatagorys({
      category_id: item.category_id,
      sub_category_id: item.id,
    });
    if (item.category_id == "1" || item.category_id == "2") {
      setIsModalOpen(true);

    } else {
      navigate("/filter");
    }
    setSelectedCategory(category.id);
  };
  console.log(selectedCategory)
  const handleLogout = async () => {
    // console.log("Logout clicked");
    const response = await AuthService.logout();
    try {
      if (response) {
        navigate("/");
        localStorage.clear();
        history.pushState(null, "/");
        window.location.reload();
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="border-b max-w-full border-[#A2A2A2]">
      <header className="mx-4 lg:mx-auto flex max-w-[80%] items-center justify-between ">
        <div className="flex flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src={logo} alt="logo-image" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon
              className="h-6 w-6"
              aria-hidden="true"
              onClick={showSidebar}
            />
          </button>
        </div>
        <div className="hidden lg:flex justify-center items-center">
          <div className="flex gap-2">
            {categoryData?.map((category, index) => (
              <Menu
                as="div"
                className="relative inline-block text-left"
                key={"category" + index}
              >
                <div ref={menuRef}>
                  <Menu.Button
                    className="inline-flex w-full justify-center items-center font-pop gap-x-1.5  bg-white px-3 py-2 text-lg  text-[#1A2737] "
                    onClick={() => handleMenufirst(category)}
                  >
                    {/* {category?.category_name_en} */}
                    {
                      category?.[
                      (languagedata == "en" && "category_name_en") ||
                      (languagedata == "de" && "category_name_de") ||
                      (languagedata == "fr" && "category_name_fr")
                      ]
                    }
                    {openMenu == category ? (
                      <RiArrowUpSFill
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <RiArrowDownSFill
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </Menu.Button>
                </div>

                <Menu.Items className="absolute right-0 z-50  w-56 origin-top-right  bg-white shadow-lg ">
                  <div className="py-1">
                    {subcategoryData.map((item) => {
                      if (category.id == item.category_id) {
                        return (
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
                                  "block px-4 py-2 text-lg font-pop"
                                )}
                              >
                                {
                                  item?.[
                                  (languagedata == "en" &&
                                    "sub_category_name_en") ||
                                  (languagedata == "de" &&
                                    "sub_category_name_de") ||
                                  (languagedata == "fr" &&
                                    "sub_category_name_fr")
                                  ]
                                }
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
                                  "block px-4 py-2 text-lg font-pop"
                                )}
                              >
                                {
                                  item?.[
                                  (languagedata == "en" &&
                                    "sub_category_name_en") ||
                                  (languagedata == "de" &&
                                    "sub_category_name_de") ||
                                  (languagedata == "fr" &&
                                    "sub_category_name_fr")
                                  ]
                                }
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


          <Link
            to={`/bloglist`}
            className="text-[#1A2736]   px-4 text-lg"
            key={"link_random_1"}
          >
            Blog
          </Link>

          {user &&
            profile.map(({ image, subcategory }) => (
              <Menu
                key={"image" + image + subcategory}
                as="div"
                className="relative inline-block text-left z-10"
              >
                <div ref={menuRef}>
                  <Menu.Button
                    className="inline-flex w-full justify-center items-center font-pop gap-x-1.5  bg-white px-3 py-2 text-lg  text-[#1A2737]  "
                    onClick={() =>
                      setOpenMenu((prevOpenMenu) =>
                        prevOpenMenu == image ? null : image
                      )
                    }
                  >
                    <img
                      src={image}
                      alt=""
                      className="2xl:w-[50px] 2xl:h-[50px] w-[30px] h-[30px]"
                    />
                    {openMenu == image ? (
                      <RiArrowUpSFill
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <RiArrowDownSFill
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </Menu.Button>
                </div>

                <Menu.Items className="absolute right-0  w-[200px] origin-top-right z-10 bg-white shadow-lg ">
                  <div className="py-1">
                    {subcategory.map((data) => (
                      <>
                        {data.id == 3 ? (
                          <Link to={data.href} target="_" key={data.id}>
                            <Menu.Item key={data.id}>
                              {({ active }) => (
                                <div className="flex flex-row pl-4 justify-start items-center py-2 gap-2 text-lg font-pop">
                                  <img
                                    src={data.image}
                                    alt=""
                                    className=" w-[25px] h-[25px]"
                                  />
                                  {data[`label_${languagedata}`]}
                                </div>
                              )}
                            </Menu.Item>
                          </Link>
                        ) : (
                          <Link to={data.href} key={data.id}>
                            <Menu.Item key={data.id}>
                              {({ active }) => (
                                <div className="flex flex-row pl-4 justify-start items-center py-2 gap-2 text-lg font-pop">
                                  <img
                                    src={data.image}
                                    alt=""
                                    className=" w-[25px] h-[25px]"
                                  />
                                  {data[`label_${languagedata}`]}
                                </div>
                              )}
                            </Menu.Item>
                          </Link>
                        )}
                      </>
                    ))}
                    <a className="cursor-pointer" onClick={handleLogout}>
                      <Menu.Item>
                        <div className="flex flex-row pl-4 items-start py-2 gap-2 text-lg font-pop">
                          <img
                            src={logout}
                            alt=""
                            className=" w-[25px] h-[25px]"
                          />
                          {/* Log out */}
                          {t("logout")}
                        </div>
                      </Menu.Item>
                    </a>
                  </div>
                </Menu.Items>
              </Menu>
            ))}

          {language.map(({ flag, subcategory, index }) => (
            <Menu
              as="div"
              className="relative inline-block text-left"
              key={"flag" + index + flag}
            >
              <div ref={menuRef}>
                <Menu.Button
                  className="inline-flex w-full justify-center items-center font-pop gap-x-1.5  bg-white px-3 py-2 text-lg  text-[#1A2737] "
                  onClick={() =>
                    setOpenMenu((prevOpenMenu) =>
                      prevOpenMenu == flag ? null : flag
                    )
                  }
                >
                  <img src={flag} alt="" className=" w-[20px] h-[15px]" />

                  {openMenu == flag ? (
                    <RiArrowUpSFill
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <RiArrowDownSFill
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </Menu.Button>
              </div>

              <Menu.Items className="absolute right-0 z-10  w-40 origin-top-right  bg-white shadow-lg ">
                <div className="py-1">
                  {subcategory.map(({ id, flag, lang, func }) => (
                    <Menu.Item key={id}>
                      <div
                        onClick={func}
                        className="flex flex-row pl-4 cursor-pointer items-center gap-2 text-lg font-pop"
                      >
                        <img src={flag} alt="" className=" w-[20px] h-[15px]" />{" "}
                        {lang}
                      </div>
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
          ))}
          {!user && (
            <div className="gap-2 flex" key={"end_buttons"}>
              <Button to="/userRegister" type="purpleButton">
                {/* Signup */}
                {t("signup")}
              </Button>
              <Button to="/userLogin" type="purpleButton">
                {/* Login */}
                {t("login")}
              </Button>
            </div>
          )}
        </div>
      </header>
      <div className="lg:hidden  max-w-[80%]  z-50 fixed h-[100vh] top-0 bg-black right-0">
        {hamburger && (
          <Sidebar
            className=" w-[250px] z-50 mt-4"
            aria-label="Sidebar with multi-level dropdown example"
          >
            <div className="flex items-center justify-between  p-3">
              <Link href="#" className="-m-1.5 p-1.5">
                <img
                  className="h-8 w-auto"
                  src={logo}
                  alt="mediafy-image1"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </Link>
              <button
                className="absolute right-4 top-5 lg:"
                onClick={showSidebar}
              >
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>

            {/* {language.map(({ func, subcategory, index }) => (
              <div className="flex gap-2" key={index}>
                {subcategory.map(({ id, flag, lang }) => (
                  <div
                    onKeyPress={func}
                    className="flex flex-row  cursor-pointer gap-1 justify-center items-center"
                    key={id}
                  >
                    <img src={flag} alt="" className="w-5 h-3" />
                    <span className="text-white">{lang}</span>
                  </div>
                ))}
              </div>
            ))} */}
            <LanguageSwitch />

            {categoryData?.map((category, index) => (
              <Menu
                as="div"
                className="relative flex flex-col text-left mt-2"
                key={category + index}
              >
                <div ref={menuRef}>
                  <Menu.Button
                    className="inline-flex w-full items-center font-pop gap-x-1.5  px-2 py-1 text-lg  text-white "
                    onClick={() => handleMenufirst(category)}
                  >
                    {
                      category?.[
                      (languagedata == "en" && "category_name_en") ||
                      (languagedata == "de" && "category_name_de") ||
                      (languagedata == "fr" && "category_name_fr")
                      ]
                    }
                    {openMenu == category ? (
                      <RiArrowUpSFill
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <RiArrowDownSFill
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </Menu.Button>
                </div>

                <Menu.Items className="w-56 origin-top-right shadow-lg text-white">
                  <div className="py-1">
                    {subcategoryData.map((item) => {
                      if (category.id == item.category_id) {
                        return (
                          <Menu.Item key={item.id}>
                            {category.category_name_en == "Rental" ||
                              category.category_name_en == "Services" ? (
                              <Link
                                onClick={() => {
                                  handleMenuItemClick(category, item);
                                }}
                                to={"/filter"}
                                // onClick={() => { console.log("clityjutjtyjck") }}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-lg font-pop"
                                )}
                              >
                                {
                                  item?.[
                                  (languagedata == "en" &&
                                    "sub_category_name_en") ||
                                  (languagedata == "de" &&
                                    "sub_category_name_de") ||
                                  (languagedata == "fr" &&
                                    "sub_category_name_fr")
                                  ]
                                }
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
                                  "block px-4 py-2 text-lg font-pop"
                                )}
                              >
                                {
                                  item?.[
                                  (languagedata == "en" &&
                                    "sub_category_name_en") ||
                                  (languagedata == "de" &&
                                    "sub_category_name_de") ||
                                  (languagedata == "fr" &&
                                    "sub_category_name_fr")
                                  ]
                                }
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
            <Link
              to={`/bloglist`}
              className="text-white  p-2 text-lg font-pop "
            >
              Blog
            </Link>
            {user &&
              profile.map(({ image, subcategory }) => (
                <Menu
                  key={"image" + image + subcategory}
                  as="div"
                  className="relative flex text-left z-10"
                >
                  <div ref={menuRef}>
                    <Menu.Button
                      className="inline-flex w-full justify-center items-center font-pop gap-x-1.5  my-2 px-3 py-2 text-lg  text-[#1A2737]  "
                      onClick={() =>
                        setOpenMenu((prevOpenMenu) =>
                          prevOpenMenu == image ? null : image
                        )
                      }
                    >
                      <img
                        src={image}
                        alt=""
                        className="2xl:w-[50px] 2xl:h-[50px] w-[30px] h-[30px]"
                      />
                      {openMenu == image ? (
                        <RiArrowUpSFill
                          className="-mr-1 h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      ) : (
                        <RiArrowDownSFill
                          className="-mr-1 h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      )}
                    </Menu.Button>
                  </div>

                  <Menu.Items className="absolute top-12 left-0 bg-white  w-[200px]  z-10  shadow-lg ">
                    <div className="py-1">
                      {subcategory.map((data) => (
                        <>
                          {data.id == 3 ? (
                            <Link to={data.href} target="_" key={data.id}>
                              <Menu.Item key={data.id}>
                                {({ active }) => (
                                  <div className="flex flex-row pl-4 justify-start items-center py-2 gap-2 text-lg font-pop">
                                    <img
                                      src={data.image}
                                      alt=""
                                      className=" w-[25px] h-[25px]"
                                    />
                                    {data[`label_${languagedata}`]}
                                  </div>
                                )}
                              </Menu.Item>
                            </Link>
                          ) : (
                            <Link to={data.href} key={data.id}>
                              <Menu.Item key={data.id}>
                                {({ active }) => (
                                  <div className="flex flex-row pl-4 justify-start items-center py-2 gap-2 text-lg font-pop">
                                    <img
                                      src={data.image}
                                      alt=""
                                      className=" w-[25px] h-[25px]"
                                    />
                                    {data[`label_${languagedata}`]}
                                  </div>
                                )}
                              </Menu.Item>
                            </Link>
                          )}
                        </>
                      ))}
                      <a className="cursor-pointer" onClick={handleLogout}>
                        <Menu.Item>
                          <div className="flex flex-row pl-4 items-start py-2 gap-2 text-lg font-pop">
                            <img
                              src={logout}
                              alt=""
                              className=" w-[25px] h-[25px]"
                            />
                            {/* Log out */}
                            {t("logout")}
                          </div>
                        </Menu.Item>
                      </a>
                    </div>
                  </Menu.Items>
                </Menu>
              ))}
            {!user && (
              <div className="gap-2 flex-col flex mt-5 pr-3" key={"end_buttons"}>
                <Button to="/userRegister" type="purpleButton">
                  {/* Signup */}
                  {t("signup")}
                </Button>
                <Button to="/userLogin" type="purpleButton">
                  {/* Login */}
                  {t("login")}
                </Button>
              </div>
            )}

            <div>
              <h2 className="text-white text-lg font-pop p-2">Join Us On</h2>
              <ul className="flex flex-row gap-2 mt-1 p-2">
                <li className="">
                  <Link to="#">
                    <FaFacebookF style={{ color: "white" }} />
                  </Link>
                </li>
                <li className="">
                  <Link to="#">
                    <FaInstagram style={{ color: "white" }} />
                  </Link>
                </li>
                <li className=" ">
                  <Link to="#">
                    <FaLinkedinIn style={{ color: "white" }} />
                  </Link>
                </li>
              </ul>
            </div>
          </Sidebar>
        )}
      </div>
    </div>
  );
}
