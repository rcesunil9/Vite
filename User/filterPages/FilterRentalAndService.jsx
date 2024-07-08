import React from "react";
import MainCard from "../commanCard/MainCard";
import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import img4 from "../../../assets/img4.png";
import img5 from "../../../assets/img5.png";
import img6 from "../../../assets/img6.png";
import { Link } from "react-router-dom";
import FilterContext from "../../../Context/FilterContext";
import * as NonAuthService from "../../api/service/NonAuthService";
import empty from "../../../assets/empty.jpg";
import { EndPoints } from "../../api/EndPoints";
import NOITEM from "./NOITEM";
import LanguageContext from "../../../Context/LanguageContext";
function FilterRentalAndService() {
  const { filterCatagorys } = useContext(FilterContext);
  const [propertyData, setPropertyData] = useState([]);
  const { t } = useTranslation();
  const { languagedata } = useContext(LanguageContext);
  const storedUserData = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(false);
  let iddata;
  if (storedUserData !== undefined && !storedUserData) {
    iddata = JSON.parse(storedUserData);
  } else {
    iddata = null;
  }

  const cardData = [
    {
      id: 1,
      photoSrc: img6,
      name: t("confMeet"),
    },
    {
      id: 2,
      photoSrc: img4,
      name: t("partyRooms"),
    },
    {
      id: 3,
      photoSrc: img5,
      name: "Bar",
    },
    {
      id: 4,
      photoSrc: img6,
      name: t("confMeet"),
    },
    {
      id: 5,
      photoSrc: img4,
      name: t("partyRooms"),
    },
    {
      id: 3,
      photoSrc: img5,
      name: "Bar",
    },
    {
      id: 4,
      photoSrc: img6,
      name: t("confMeet"),
    },
    {
      id: 5,
      photoSrc: img4,
      name: t("partyRooms"),
    },
    // Add more data as needed
  ];
  const FilterPayload = {
    category_id: filterCatagorys?.category_id,
    sub_category_id: filterCatagorys?.sub_category_id,
    property_type: filterCatagorys?.category_id == "3" ? 0 : 1,
    ...(iddata !== null && { auth_user_id: iddata }),
  };
  const get_rental_and_services_list_with_filter = async () => {
    setLoading(true);
    try {
      const response =
        await NonAuthService.get_rental_and_services_list_with_filter(
          FilterPayload
        );
      setPropertyData(response);
      const initialFavoriteIds = response
        .filter((data) => data.is_bookmarked == "1")
        .map((data) => data.property_id);
      setFavoritePropertyIds(initialFavoriteIds);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (filterCatagorys?.category_id == "3" ||filterCatagorys?.category_id == "4" ) {
      get_rental_and_services_list_with_filter();
    }
    
  }, [filterCatagorys]);
  // const addToFav = async (property_type, property_id) => {
  //   console.log(property_type, property_id);
  //   const response = await NonAuthService.add_to_bookmark({
  //     property_type,
  //     property_id,
  //   });
  // };

  const [favoritePropertyIds, setFavoritePropertyIds] = useState([]);

  const addToFav = async (property_type, property_id) => {
    console.log(property_type, property_id);

    // Check if property_id is already in the array
    const index = favoritePropertyIds.indexOf(property_id);

    if (index == -1) {
      // If property_id is not in the array, add it
      setFavoritePropertyIds([...favoritePropertyIds, property_id]);
    } else {
      // If property_id is already in the array, remove it
      const updatedIds = favoritePropertyIds.filter((id) => id !== property_id);
      setFavoritePropertyIds(updatedIds);
    }

    // Now make the API call to add or remove from bookmarks
    try {
      const response = await NonAuthService.add_to_bookmark({
        property_type,
        property_id,
      });
      console.log("API call response:", response);
    } catch (error) {
      console.error("Error adding to bookmark:", error);
      // Handle error as needed
    }

    // For testing purposes, log the updated array of favorite property_ids
    console.log("Updated favoritePropertyIds:", favoritePropertyIds);
  };
  return (
    <div className="grid grid-cols-3 gap-8 w-[90vw] mx-auto mt-10">
      <div className="col-span-3">
        {loading ? (
          <div className="flex justify-center h-[400px] col-span-3 items-center mt-8">
            <svg
              aria-hidden="true"
              className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            {propertyData?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {propertyData.map((data) => (
                  <MainCard
                    key={data.property_id}
                    name={data.rental_and_service_name_en}
                    city={data.city_name}
                    photoSrc={
                      data?.property_images
                        ? EndPoints.IMAGE_BASEURL + data?.property_images
                        : empty
                    }
                    completdata={data}
                    fav={favoritePropertyIds.includes(data.property_id)}
                    to={`/details/${filterCatagorys?.category_id - 1}/${
                      data.property_id
                    }`}
                    onIconClick={() =>
                      addToFav(
                        filterCatagorys?.category_id - 1,
                        data.property_id
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[500px] flex-col justify-center items-center mt-8">
                <NOITEM />
                <h2 className="text-xl font-bold text-gray-600">
                  {t(
                    "Sorry, no results found according to your search criteria"
                  )}
                </h2>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FilterRentalAndService;
