import React, { useEffect, useState, useContext } from "react";
import MainCard from "../commanCard/MainCard";
import empty from "../../../assets/empty.jpg";
import person from "../../../assets/Vector.png";
import group from "../../../assets/Group.png";
import * as NonAuthService from "../../api/service/NonAuthService";
import { EndPoints } from "../../api/EndPoints";
import Button from "../../../ui/Button";
import { select } from "@material-tailwind/react";
import DataContext from "../../../Context/DataContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../../Context/LanguageContext";
function Favourites() {
  const [bookmarkData, setBookmarkData] = useState([]);

  // const { categoryData } = useContext(DataContext);
  const [selectedCategory, setSelectedCatogry] = useState({
    key: "venue_list",
    id: 0,
  });
  const { t } = useTranslation();
  const { languagedata } = useContext(LanguageContext);

  const getBookmarks = async () => {
    try {
      const response = await NonAuthService.getBookmarks({
        property_type: selectedCategory.key,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await NonAuthService.getBookmarks({
  //      "property_type": selectedCategory.key,
  //     });
  //     setBookmarkData(response?.data);
  //     console.log(response, "fav ka data that want ");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const fetchData = async () => {
    try {
      const response = await NonAuthService.getBookmarks({
        property_type: selectedCategory.id,
      });
      setBookmarkData(response?.data);
      console.log(response, "fav ka data that want ");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const addToFav = async (property_type, property_id) => {
    console.log(property_type, property_id);
    const response = await NonAuthService.add_to_bookmark({
      property_type,
      property_id,
    });
    if (response.status == true) {
      fetchData();
    }
  };

  const categoryData = [
    // { name: "Venue", value: "venue_list", id: 0 },
    // { name: "Entertainment", value: "entertainment_list", id: 1 },
    // // { name: "Rental and Services", value: "rental_and_services_list", id: 2 },
    // { name: "Rental ", value: "rental_and_services_list", id: 2 },

    // { name: "Services ", value: "rental_and_services_list", id: 3 },
    {
      name: "Venue",
      name_fr: "Lieu",
      name_de: "Veranstaltungsort",
      name_en: "Venue",
      value: "venue_list",
      id: 0,
    },
    {
      name: "Entertainment",
      name_fr: "Divertissement",
      name_de: "Unterhaltung",
      name_en: "Entertainment",
      value: "entertainment_list",
      id: 1,
    },
    {
      name: "Rental",
      name_fr: "Location",
      name_de: "Vermietung",
      name_en: "Rental",
      value: "rental_and_services_list",
      id: 2,
    },
    {
      name: "Services",
      name_fr: "Services",
      name_de: "Dienstleistungen",
      name_en: "Services",
      value: "rental_and_services_list",
      id: 3,
    },
  ];
  const handleCategoryClick = (categoryValue) => {
    setSelectedCatogry(categoryValue);
  };

  return (
    <div className="mt-8 min-h-[400px] h-[100%] ">
      <div className="text-center text-secondary text-2xl font-con">
        {t("Favourites")}
      </div>
      <div className="flex flex-row gap-10 w-[90vw] mx-auto mt-6 mb-6">
        {categoryData &&
          categoryData?.map((item, index) => {
            return (
              <Button
                key={"btn" + index}
                type={
                  selectedCategory.id == item.id
                    ? "homeTabBarChange"
                    : "homeTabBar"
                }
                className="font-pop "
                onClick={() =>
                  handleCategoryClick({ key: item.value, id: item.id })
                }
              >
                {item?.[`name_${languagedata}`]}
              </Button>
            );
          })}
      </div>

      <div className=" w-[90vw] mx-auto">
        {selectedCategory &&
          (bookmarkData[selectedCategory.key]?.length == 0 ? (
            <div className="col-span-4 h-[400px] font-lato mb-4 flex items-center justify-center text-center text-gray-500">
              {t("Please Add Some Favorites in the Selected Category")}
            </div>
          ) : (
            bookmarkData[selectedCategory.key]?.map((item) => (
              <div className=" z-10 ">
                <h3 className="font-pop font-semibold mb-4  ">
                  {item.category_list?.[`category_name_${languagedata}`]}
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {item?.property_list?.map((item, index) => (
                    <div
                      // to={`/details/${selectedCategory.id}/` + item.property_id}
                      key={item.property_id}
                      className="col-span-1 mb-4"
                    >
                      <MainCard
                        onIconClick={() =>
                          addToFav(selectedCategory.id, item.property_id)
                        }
                        photoSrc={
                          item?.property_images
                            ? EndPoints.IMAGE_BASEURL + item?.property_images
                            : empty
                        }
                        name={
                          item.venue_name_en ??
                          item.entertainment_name_en ??
                          item.property_name_en
                        }
                        city={item.city_name}
                        fav={true}
                        to={`/details/${selectedCategory?.id}/${item.property_id}`}
                      />
                      {item.max_sitting_capacity &&
                        item.min_sitting_capacity && (
                          <div className="flex justify-between items-center w-full mt-2 text-[#8D303A] font-lato">
                            <div className="flex col-span-2 gap-3">
                              <img className="w-8 h-8" src={person} alt="" />
                              <div className="flex flex-col text-sm">
                                <span>{item.max_sitting_capacity}</span>
                                <span>{t("Persons")}</span>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <img className="w-8 h-8" src={group} alt="" />
                              <div className="flex flex-col text-sm">
                                <span>{item.min_sitting_capacity}</span>
                                <span>{t("Persons")}</span>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ))}
      </div>

      {/* {Object.keys(bookmarkData).map((key, index) => (
        <div
          key={key}
          className={`col-span-3 w-[90vw] mx-auto ${
            index != "0" ? "my-7" : ""
          }`}
        >
          <div className="font-pop text-xl pb-4">
            {key == "venue_list"
              ? "Venue"
              : key == "entertainment_list"
              ? "Entertainment"
              : key == "rental_and_services_list"
              ? "Rental and Services"
              : ""}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {bookmarkData[key].map((data) => (
              <div key={data.id + "sfxbc"}>
                <MainCard
                  onIconClick={() => addToFav(index, data.id)}
                  photoSrc={
                    data.images.length > 0
                      ? EndPoints.IMAGE_BASEURL + data.images[0]["image_name"]
                      : empty
                  }
                  name={
                    data.venue_name_en ??
                    data.entertainment_name_en ??
                    data.property_name_en
                  }
                  city={data.city_name}
                  fav={true}
                />
                {data.max_sitting_capacity && data.min_sitting_capacity ? (
                  <div className="grid grid-cols-2 mt-2 text-[#8D303A] font-lato">
                    <div className="flex gap-3">
                      <img className="w-8 h-8" src={person} alt="" />
                      <div className="flex flex-col text-sm">
                        <span>{data.max_sitting_capacity}</span>
                        <span>persons</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <img className="w-8 h-8" src={group} alt="" />
                      <div className="flex flex-col text-sm">
                        <span>{data.min_sitting_capacity}</span>
                        <span>persons</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default Favourites;
