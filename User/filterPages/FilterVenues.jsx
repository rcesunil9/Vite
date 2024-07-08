import React, { useState, useContext, useEffect } from "react";
import MainCard from "../commanCard/MainCard";
import img1 from "../../../assets/img1.jpeg";
import img2 from "../../../assets/img2.png";
import img3 from "../../../assets/img3.png";
import img4 from "../../../assets/img4.png";
import img5 from "../../../assets/img5.png";
import premiumStar from "../../../assets/Premiumstar 1.svg";
import Map from "./Map";
import { t } from "i18next";
import person from "../../../assets/Vector.png";
import group from "../../../assets/Group.png";
import { Link } from "react-router-dom";
import FilterContext from "../../../Context/FilterContext";
import * as NonAuthService from "../../api/service/NonAuthService";
import empty from "../../../assets/empty.jpg";
import { EndPoints } from "../../api/EndPoints";
import AddressAutoComplete from "../../Professionals/pages/ProDashboard/AddressAutoComplete";
import e from "cors";
import { LatLng } from "leaflet";
import NOITEM from "./NOITEM";

import MultiRangeSlide from "../../../utility/MultiRangeSlide";
import { max } from "lodash";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../../Context/LanguageContext";
import { Drawer } from "@material-tailwind/react";
function FilterVenues() {
  const { filterData, filterCatagorys, setFilterCatagorys, setFilterData } = useContext(FilterContext);
  const { t } = useTranslation();
  const { languagedata } = useContext(LanguageContext);
  console.log(filterCatagorys, "check krna context");
  const [maxDistance, setMaxDistance] = useState(100);
  const [subCatData, setSubCatData] = useState([]);
  const [capacity, setCapacity] = useState(filterData?.min_capacity ?? 0);
  console.log(capacity, "kya capcityy h");
  const [size, setSize] = useState(0);
  const [distance, setDistance] = useState(0);
  const [feture, setFeture] = useState([]);
  const [location, setLocattion] = useState(null);
  const [address, setAddress] = useState("");
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [maxlimits, setMaxLimits] = useState({});
  const [selectSubCat, setSelectSubCat] = useState(
    filterCatagorys ? [filterCatagorys.sub_category_id] : []
  );
  // maulti range slice implement
  const [minCapcity, set_minCapcity] = useState(0);
  const [maxCapcity, set_maxCapcity] = useState(1000);
  const [minSize, set_minSize] = useState(0);
  const [maxSize, set_maxSize] = useState(1000);

  const handleMultiCapacity = debounce((min, max) => {
    console.log(min, max)
    set_minCapcity(min);
    set_maxCapcity(max);
  }, 500);

  const handleMultiSize = debounce((min, max) => {
    set_minSize(min);
    set_maxSize(max);
  }, 500);

  const handleFeatureChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedFeatures([...selectedFeatures, parseInt(id)]);
    } else {
      setSelectedFeatures(
        selectedFeatures.filter((featureId) => featureId !== parseInt(id))
      );
    }
  };
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  const handleCapacityChange = debounce((event) => {
    setCapacity(event);
  }, 500);

  const handleSizeChange = debounce((event) => {
    setSize(event);
  }, 500);

  const handleDistanceChange = debounce((event) => {
    setDistance(event);
  }, 500);
  const get_sub_category = async () => {
    try {
      const response = await NonAuthService.get_sub_category({
        category_id: 1,
      });

      setSubCatData(response);
    } catch (error) {
      console.log(error);
    }
  };
  const get_venue_feature = async () => {
    try {
      const response = await NonAuthService.get_venue_feature();

      setFeture(response);
    } catch (error) {
      console.log(error);
    }
  };

  const get_max_limit = async () => {
    try {
      const response = await NonAuthService.venue_max_filter_data();
      setMaxLimits(response);
      console.log(response, "checxk data");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(maxlimits, "lmit");

  const handleSubCatChange = (event) => {
    const { id, checked } = event.target;

    console.log(checked, id, "check data hfjkjjh");

    // If checkbox is checked, add its ID to the array, else remove it
    if (checked) {
      setSelectSubCat((prevState) => [...prevState, parseInt(id)]);
    } else {
      setSelectSubCat((prevState) =>
        prevState.filter((item) => item !== parseInt(id))
      );
      console.log(selectSubCat);
      if (filterCatagorys.sub_category_id == id) {
        filterCatagorys.sub_category_id = "";
      }
    }
  };
  console.log(selectSubCat);

  // useEffect(() => {
  //   if (filterData) {
  //     console.log("aaya useEffect")
  //     filterData?.bookingType == "Privatise"
  //       ? setprivate(1)
  //       : setTableResreve(1);
  //   }
  // }, [filterData]);
  const storedUserData = localStorage.getItem("user_id");
  let iddata;
  if (storedUserData !== undefined && !storedUserData) {
    iddata = JSON.parse(storedUserData);
  } else {
    iddata = null;
  }

  const onSelectAddress = (defaultValueAddress) => {
    // Update context with defaultValue address data
    let address_en = defaultValueAddress ? defaultValueAddress.address : null;
    let lat = defaultValueAddress ? defaultValueAddress.latLng.lat : null;
    let lng = defaultValueAddress ? defaultValueAddress.latLng.lng : null;
    const latlang = new LatLng(lat, lng);
    setAddress(defaultValueAddress?.address);
    setLocattion(latlang);
    // User location if add some address then show on that basess
    setUserLocation({
      lat: lat,
      lng: lng,
      // lat: 26.2738937,
      // lng: 73.03074090000001,
    });
  };
  console.log(location, "data passesss");

  const FetchData = async () => {
    const FilterPayload = {
      category_id: 1,

      ...(selectSubCat && { sub_category_id: selectSubCat }),

      is_allow_booking_of_table: filterData?.is_allow_booking_of_table,
      is_allow_privatization_of_venue:
        filterData?.is_allow_privatization_of_venue,
      features: selectedFeatures,
      // min_budget: filterData?.min_budget ?? "",
      event_category_id: filterData?.event_category_ids ?? "",

      // ...(size != 0 && { min_size: "0", max_size: size }),
      // ...(size != 0 && {
      //   min_size: size,
      //   max_size: maxlimits?.max_venue_size ?? 1000,
      // }),

      min_size: minSize,
      max_size: maxSize,

      // ...(minCapcity != 0   && {
      //   min_capacity: minCapcity,
      //   max_capacity: maxCapcity,
      //   capacity_type: filterData?.capcity_type ?? "0",
      // }),
      min_capacity: minCapcity,
      max_capacity: maxCapcity,
      capacity_type: filterData?.capcity_type ?? "0",

      ...(location != null && {
        latitude: location?.lat,
        longitude: location?.lng,
        property_filter: "nearby",
        // ...(distance !== 0 && { min_distance: "0", max_distance: distance }),
      }),
      ...(iddata != null && { auth_user_id: iddata }),
    };
    setLoading(true);
    try {
      const response = await NonAuthService.get_venue_list_with_filter(
        FilterPayload
      );
      console.log(response, "dataaaaa", response?.length);
      setPropertyData(response);
      setLoading(false);

      const initialFavoriteIds = response
        .filter((data) => data.is_bookmarked == "1")
        .map((data) => data.property_id);
      setFavoritePropertyIds(initialFavoriteIds);
      if (response.length !== 0) {
        const maxDistance = response.reduce((max, data) => {
          const distance = parseInt(data.distance);
          return distance > max ? distance : max;
        }, 0);
        setMaxDistance(maxDistance);
      }
      if (location) {
        // Filter response data based on distance
        const filteredData = response.filter(
          (data) => parseInt(data.distance) <= distance
        );
        console.log(filteredData, "that is filterdata");

        // Set the filtered data to setPropertyData
        setPropertyData(filteredData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (filterCatagorys?.category_id == "1") {
      FetchData();
    }
  }, [
    selectSubCat,
    selectedFeatures,
    filterData,
    maxCapcity,
    minCapcity,
    size,
    maxSize,
    minSize,
    location,
    distance,
  ]);
  const handleCleardata = () => {
    setLocattion(null);
    setFilterCatagorys({

      category_id: "1"
    })
    setFilterData({

    })
    set_minCapcity(0)

    setDistance(0);
    setSelectSubCat([]);
    setSize(0);
    setSelectedFeatures([]);
    setAddress("");

  };

  const ShowAll = () => {
    console.log("click hua kya");

    if (filterData?.event_category_ids) {
      filterData.event_category_ids = "";
    }

    if (filterCatagorys?.sub_category_id) {
      filterCatagorys.sub_category_id = "";
    }

    if (filterData?.sub_category_id) {
      filterData.sub_category_id = "";
    }

    setSelectSubCat([]);
  };


  // useEffect(() => {
  //   setDistance(0);
  //   setLocattion(null);
  // }, [selectSubCat, selectedFeatures, filterData, capacity, size]);

  useEffect(() => {
    get_sub_category();
    get_venue_feature();
    get_max_limit();
  }, []);
  console.log(filterCatagorys?.sub_category_id, "ye aato rha h");
  useEffect(() => {
    set_minCapcity(filterData?.min_capacity ?? 0);

    set_maxCapcity(
      filterData?.capacity_type == "1"
        ? maxlimits?.max_standing_capacity
        : maxlimits?.max_sitting_capacity ?? 1000
    );
    set_maxSize(maxlimits?.max_venue_size ?? 1000);
    if (filterCatagorys && filterCatagorys?.sub_category_id) {
      setSelectSubCat([filterCatagorys?.sub_category_id]);
    }
  }, [filterData, filterCatagorys]);
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
    // console.log("Updated favoritePropertyIds:", favoritePropertyIds);
  };
  const [userLocation, setUserLocation] = useState(null);

  // Function to get user's location
  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Get user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            // lat: 26.2738937,
            // lng: 73.03074090000001,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Handle errors here if necessary
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Function to calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };
  console.log(
    filterData?.capacity_type == 0
      ? maxlimits?.max_sitting_capacity
      : maxlimits?.max_standing_capacity
  );
  const [hamburger, setHamburger] = useState(false);
  const showSidebar = () => {
    setHamburger(!hamburger);
  };


  return (
    <>
      <div className="grid grid-cols-4 gap-8 w-[90vw] mx-auto py-6">
        <div className=" hidden md:flex md:flex-col col-span-1 ">
          <div className=" flex justify-between items-center ">
            <h3 className="text-secondary text-2xl font-con">{t("Filters")}</h3>
            <button
              onClick={handleCleardata}
              className=" outline-none bg-none border-none font-con text-secondary text-sm mr-5"
            >
              {t("Clear")}
            </button>
          </div>

          <div className=" mt-2 flex flex-col w-full">
            <label className="text-2xl text-pop" htmlFor="">
              {t("Location")}
            </label>
            <div className=" flex  items-start  justify-between  w-full">
              <div className=" w-full ">
                <AddressAutoComplete onSelect={onSelectAddress} />
              </div>
              <div className=" mt-3 ">
                <Map location={location} setLocattion={setLocattion} />
              </div>
            </div>
          </div>
          <label className=" flex flex-col w-full mt-4 text-2xl relative text-pop group">
            {t("distance")}
            <input
              type="range"
              value={distance}
              max={100}
              disabled={location == null}
              onChange={(e) => handleDistanceChange(e.target.value)}
              className={distance > 0 ? "pruple " : "pp  "}
            />
            {location == null && (
              <div
                id="tooltip-default"
                role="tooltip"
                className="absolute z-10 px-3 py-2 bottom-[-20px] hidden  group-hover:block text-sm font-medium text-white bg-black rounded-lg shadow-sm tooltip"
              // Adjust the distance between the input and the tooltip
              >
                <div className="relative">
                  {t("Please select a location first")}
                  <div className="tooltip-arrow absolute w-3 h-3 bg-black border-t border-l border-r border-black transform rotate-45 bottom-full left-[1px] -translate-x-1/2"></div>
                </div>
              </div>
            )}

            <div className="slider-value text-sm ">{distance} Km</div>
          </label>
          <div className="mt-5 flex flex-col gap-4">
            <div className=" ">
              <div className=" flex justify-between items-center ">
                <h3 className="text-2xl font-pop font-light pb-2">
                  {t("Kind of venue")}
                </h3>
                <button
                  onClick={ShowAll}
                  className=" outline-none bg-none border-none font-con  text-sm mr-5"
                >
                  {t("Show All")}
                </button>
              </div>
              <div className=" flex flex-col gap-3">
                {subCatData?.map((labelData, idx) => (
                  <div className="flex justify-start items-baseline" key={idx}>
                    <input
                      type="checkbox"
                      id={labelData.id}
                      className="checkbox-input p-1"
                      checked={
                        selectSubCat.includes(labelData.id) ||
                        filterCatagorys?.sub_category_id == labelData.id
                      }
                      onChange={handleSubCatChange}
                    />
                    <label
                      htmlFor={labelData.id}
                      className="font-pop ps-2 font-light"
                    >
                      {labelData?.[`sub_category_name_${languagedata}`]}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <label className=" flex flex-col w-full mt-4 text-2xl text-pop">
              {t("size")}

              <MultiRangeSlide
                initialMinValue={0}
                maxValueProp={maxlimits?.max_venue_size ?? 1000}
                onValuesChanged={handleMultiSize}
              />
              {/* <input
                type="range"
                value={size}
                max={maxlimits?.max_venue_size ?? 1000}
                onChange={(e) => {
                  handleSizeChange(e.target.value);
                }}
                className={capacity > 0 ? "pruple" : "pp"}
              /> */}
              <div className="slider-value text-sm  ">
                {minSize} - {maxSize} {t("Square meters")}
              </div>
            </label>

            <label className=" flex flex-col w-full mt-4 text-2xl text-pop">
              {/* {t("capacity")} */}
              {/* Standing Capacity */}

              {filterData?.capcity_type == 1
                ? "Standing Capacity"
                : `${t("Sitting Capacity")}` ?? "Sitting Capacity"}

              <MultiRangeSlide
                initialMinValue={filterData?.min_capacity ?? 0}
                maxValueProp={
                  filterData?.capacity_type == 1
                    ? maxlimits?.max_standing_capacity
                    : maxlimits?.max_sitting_capacity ?? 1000
                }
                onValuesChanged={handleMultiCapacity}
              />

              {/* <input
                type="range"
                value={capacity}
                max={
                  filterData?.capacity_type == 1
                    ? maxlimits?.max_standing_capacity
                    : maxlimits?.max_sitting_capacity ?? 10000
                }
                onChange={(e) => {
                  handleCapacityChange(e.target.value);
                }}
                className={capacity > 0 ? "pruple" : "pp"}
              /> */}
              <div className="slider-value text-sm  ">
                {minCapcity} - {maxCapcity} {t("People")}
              </div>
            </label>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <div className=" ">
              <h3 className="text-2xl font-con pb-2">
                {t("Features of the venue")}{" "}
              </h3>
              <div className=" flex flex-col gap-3">
                {feture?.map((labelData, idx) => (
                  <div className="flex justify-start items-baseline " key={idx}>
                    <input
                      type="checkbox"
                      id={labelData.id}
                      className=" checkbox-input p-1"
                      onChange={handleFeatureChange}
                      checked={selectedFeatures.includes(labelData.id)}
                    />{" "}
                    <label
                      htmlFor={labelData.id}
                      className="font-pop ps-2 font-light"
                    >
                      {labelData?.[`feature_name_${languagedata}`]}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          className="text-secondary text-2xl flex justify-between items-center  md:hidden font-con"
          onClick={showSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="black"
              stroke-dasharray="24"
              stroke-dashoffset="24"
              stroke-linecap="round"
              stroke-width="2"
            >
              <path d="M5 5H19">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.2s"
                  values="24;0"
                />
              </path>
              <path d="M5 12H19">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.2s"
                  dur="0.2s"
                  values="24;0"
                />
              </path>
              <path d="M5 19H19">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.4s"
                  dur="0.2s"
                  values="24;0"
                />
              </path>
            </g>
          </svg>
        </button>
        <Drawer
          className=" bg-white z-20 "
          open={hamburger}
          onClose={showSidebar}
          overlayProps={{ className: "bg-transparent" }}
        >
          <div className=" overflow-y-scroll  h-[100vh] relative w-full pt-10 px-2 ">
            <button
              className=" absolute top-2 right-2 outline-none bg-none   "
              onClick={showSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="black"
                  stroke-dasharray="16"
                  stroke-dashoffset="16"
                  stroke-linecap="round"
                  stroke-width="2"
                >
                  <path d="M7 7L17 17">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.4s"
                      values="16;0"
                    />
                  </path>
                  <path d="M17 7L7 17">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.4s"
                      dur="0.4s"
                      values="16;0"
                    />
                  </path>
                </g>
              </svg>
            </button>
            <div className="   ">
              <div className=" flex justify-between items-center ">
                <h3 className="text-secondary text-2xl font-con">
                  {t("Filters")}
                </h3>
                <button
                  onClick={handleCleardata}
                  className=" outline-none bg-none border-none font-con text-secondary text-sm mr-5"
                >
                  {t("Clear")}
                </button>
              </div>

              <div className=" mt-2 flex flex-col w-full">
                <label className="text-2xl text-pop" htmlFor="">
                  {t("Location")}
                </label>
                <div className=" flex  items-start  justify-between  w-full">
                  <div className=" w-full ">
                    <AddressAutoComplete onSelect={onSelectAddress} />
                  </div>
                  <div className=" mt-3 ">
                    <Map location={location} setLocattion={setLocattion} />
                  </div>
                </div>
              </div>
              <label className=" flex flex-col w-full mt-4 text-2xl relative text-pop group">
                {t("distance")}
                <input
                  type="range"
                  value={distance}
                  max={100}
                  disabled={location == null}
                  onChange={(e) => handleDistanceChange(e.target.value)}
                  className={distance > 0 ? "pruple " : "pp  "}
                />
                {location == null && (
                  <div
                    id="tooltip-default"
                    role="tooltip"
                    className="absolute z-10 px-3 py-2 bottom-[-20px] hidden  group-hover:block text-sm font-medium text-white bg-black rounded-lg shadow-sm tooltip"
                  // Adjust the distance between the input and the tooltip
                  >
                    <div className="relative">
                      {t("Please select a location first")}
                      <div className="tooltip-arrow absolute w-3 h-3 bg-black border-t border-l border-r border-black transform rotate-45 bottom-full left-[1px] -translate-x-1/2"></div>
                    </div>
                  </div>
                )}

                <div className="slider-value text-sm ">{distance} Km</div>
              </label>
              <div className="mt-5 flex flex-col gap-4">
                <div className=" ">
                  <div className=" flex justify-between items-center ">
                    <h3 className="text-2xl font-pop font-light pb-2">
                      {t("Kind of venue")}
                    </h3>
                    <button
                      onClick={ShowAll}
                      className=" outline-none bg-none border-none font-con  text-sm mr-5"
                    >
                      {t("Show All")}
                    </button>
                  </div>
                  <div className=" flex flex-col gap-3">
                    {subCatData?.map((labelData, idx) => (
                      <div
                        className="flex justify-start items-baseline"
                        key={idx}
                      >
                        <input
                          type="checkbox"
                          id={labelData.id}
                          className="checkbox-input p-1"
                          checked={
                            selectSubCat.includes(labelData.id) ||
                            filterCatagorys?.sub_category_id == labelData.id
                          }
                          onChange={handleSubCatChange}
                        />
                        <label
                          htmlFor={labelData.id}
                          className="font-pop ps-2 font-light"
                        >
                          {labelData?.[`sub_category_name_${languagedata}`]}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <label className=" flex flex-col w-full mt-4 text-2xl text-pop">
                  {t("size")}

                  <MultiRangeSlide
                    initialMinValue={0}
                    maxValueProp={maxlimits?.max_venue_size ?? 1000}
                    onValuesChanged={handleMultiSize}
                  />
                  {/* <input
                type="range"
                value={size}
                max={maxlimits?.max_venue_size ?? 1000}
                onChange={(e) => {
                  handleSizeChange(e.target.value);
                }}
                className={capacity > 0 ? "pruple" : "pp"}
              /> */}
                  <div className="slider-value text-sm  ">
                    {minSize} - {maxSize} {t("Square meters")}
                  </div>
                </label>

                <label className=" flex flex-col w-full mt-4 text-2xl text-pop">
                  {/* {t("capacity")} */}
                  {/* Standing Capacity */}

                  {filterData?.capcity_type == 1
                    ? "Standing Capacity"
                    : `${t("Sitting Capacity")}` ?? "Sitting Capacity"}

                  <MultiRangeSlide
                    initialMinValue={filterData?.min_capacity ?? 0}
                    maxValueProp={
                      filterData?.capacity_type == 1
                        ? maxlimits?.max_standing_capacity
                        : maxlimits?.max_sitting_capacity ?? 1000
                    }
                    onValuesChanged={handleMultiCapacity}
                  />

                  {/* <input
                type="range"
                value={capacity}
                max={
                  filterData?.capacity_type == 1
                    ? maxlimits?.max_standing_capacity
                    : maxlimits?.max_sitting_capacity ?? 10000
                }
                onChange={(e) => {
                  handleCapacityChange(e.target.value);
                }}
                className={capacity > 0 ? "pruple" : "pp"}
              /> */}
                  <div className="slider-value text-sm  ">
                    {minCapcity} - {maxCapcity} {t("People")}
                  </div>
                </label>
              </div>
              <div className="mt-5 flex flex-col gap-4">
                <div className=" ">
                  <h3 className="text-2xl font-con pb-2">
                    {t("Features of the venue")}{" "}
                  </h3>
                  <div className=" flex flex-col gap-3">
                    {feture?.map((labelData, idx) => (
                      <div
                        className="flex justify-start items-baseline "
                        key={idx}
                      >
                        <input
                          type="checkbox"
                          id={labelData.id}
                          className=" checkbox-input p-1"
                          onChange={handleFeatureChange}
                          checked={selectedFeatures.includes(labelData.id)}
                        />{" "}
                        <label
                          htmlFor={labelData.id}
                          className="font-pop ps-2 font-light"
                        >
                          {labelData?.[`feature_name_${languagedata}`]}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer>

        <div className="col-span-4 md:col-span-3">
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
          ) : propertyData?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">

              {propertyData.map((data) => {
                const distanceForUser =
                  userLocation &&
                  calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    data.latitude,
                    data.longitude
                  );
                console.log(distanceForUser, "check distance");
                return (
                  <div
                    key={data.property_id}
                    className="hover:shadow-2xl relative rounded-lg border-[1px] border-[#C5C5C5]"
                  >
                    <MainCard
                      photoSrc={
                        data?.property_images
                          ? EndPoints.IMAGE_BASEURL + data?.property_images
                          : empty
                      }
                      completdata={data}
                      name={data.venue_name_en}
                      city={data?.address_en}
                      fav={favoritePropertyIds.includes(data?.property_id)}
                      to={`/details/0/${data.property_id}`}
                      distance={distanceForUser ?? null}
                      onIconClick={() => addToFav(0, data?.property_id)}
                    />
                    <div className="grid grid-cols-2 px-2 mb-2 text-[#8D303A] font-lato">
                      <div className="flex gap-3 ">
                        <img className="w-8 h-8" src={person} alt="" />
                        <div className="flex flex-col text-sm">
                          <span>{data?.min_sitting_capacity}</span>
                          <span>{t("People")}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <img className="w-8 h-8" src={group} alt="" />
                        <div className="flex flex-col text-sm">
                          <span>{data?.max_sitting_capacity}</span>
                          <span>{t("People")}</span>
                        </div>
                      </div>
                    </div>
                    {/* <div
                      className={`absolute bottom-[-2px] right-[-2px] ${data?.premium_announcement == "1" ? "" : "hidden"
                        }`}
                    >
                      <img
                        className="w-10 h-10"
                        src={premiumStar}
                        alt="premium"
                      />
                    </div> */}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[500px] flex-col justify-center items-center mt-8">
              <NOITEM />

              <h2 className="text-xl font-bold text-gray-600">
                {t("Sorry, no results found according to your search criteria")}
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FilterVenues;
