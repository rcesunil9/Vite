import React, { useState, useEffect, useContext } from "react";
import MainCard from "../commanCard/MainCard";
import Footer from "../Footer/Footer";
import img1 from "../../../assets/img1.jpeg";
import img2 from "../../../assets/img2.png";
import img3 from "../../../assets/img3.png";
import img4 from "../../../assets/img4.png";
import img5 from "../../../assets/img5.png";
import img6 from "../../../assets/img6.png";
import img7 from "../../../assets/img7.png";
import { Link } from "react-router-dom";
import * as NonAuthService from "../../api/service/NonAuthService";
import empty from "../../../assets/empty.jpg";
import { EndPoints } from "../../api/EndPoints";
import NOITEM from "./NOITEM";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../../Context/LanguageContext";
import { Drawer } from "@material-tailwind/react";
const cardData = [
  {
    id: 1,
    photoSrc: img1,
    name: "David Classic Rock",
  },
  {
    id: 2,
    photoSrc: img2,
    name: "Classical Music Band",
  },
  {
    id: 3,
    photoSrc: img3,
    name: "Night club",
  },
  {
    id: 4,
    photoSrc: img4,
    name: "Party room",
  },
  {
    id: 5,
    photoSrc: img5,
    name: "Electronic Arrangement",
  },
  {
    id: 6,
    photoSrc: img6,
    name: "Conference & Meeting room",
  },
  {
    id: 7,
    photoSrc: img7,
    name: "Herry Metal",
  },
  // Add more data as needed
];

function FilterEntertainment1() {
  const [selectedSubFeatureIds, setSelectedSubFeatureIds] = useState([]);
  const [selectedSubSubFeatureIds, setSelectedSubSubFeatureIds] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const storedUserData = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { languagedata } = useContext(LanguageContext);
  let iddata;
  if (storedUserData !== undefined  && !storedUserData) {
    iddata = JSON.parse(storedUserData);
  } else {
    iddata = null;
  }
  const [Feturs, setFetures] = useState([]);
  const get_entertainment_feature = async () => {
    try {
      const response = await NonAuthService.get_entertainment_feature();
      console.log(response, "entertanment feture ");
      setFetures(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_entertainment_feature();
  }, []);

  // Function to handle checkbox change
  const handleCheckboxChange = (subFeatureId, subSubFeatureId, isChecked) => {
    if (isChecked) {
      // Checkbox is checked, add ids to arrays
      setSelectedSubFeatureIds([...selectedSubFeatureIds, subFeatureId]);
      setSelectedSubSubFeatureIds([
        ...selectedSubSubFeatureIds,
        subSubFeatureId,
      ]);
    } else {
      // Checkbox is unchecked, remove only the first occurrence of the ids from arrays
      setSelectedSubFeatureIds(
        selectedSubFeatureIds.filter((id) => id !== subFeatureId)
      );
      setSelectedSubSubFeatureIds(
        selectedSubSubFeatureIds.filter((id) => id !== subSubFeatureId)
      );
    }
  };

  const FilterPayload = {
    category_id: 2,

    sub_feature_id: selectedSubFeatureIds,
    sub_sub_feature_id: selectedSubSubFeatureIds,
    ...(iddata !== null && { auth_user_id: iddata }),
  };
  const get_entertainment_list_with_filter = async () => {
    try {
      const response = await NonAuthService.get_entertainment_list_with_filter(
        FilterPayload
      );
      setPropertyData(response);
      const initialFavoriteIds = response
        .filter((data) => data.is_bookmarked == "1")
        .map((data) => data.property_id);
      setFavoritePropertyIds(initialFavoriteIds);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_entertainment_list_with_filter();
  }, [selectedSubSubFeatureIds]);
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
  const handleCleardata = () => {
    setSelectedSubFeatureIds([]);
    setSelectedSubSubFeatureIds([]);
  };
  const [hamburger, setHamburger] = useState(false);
  const showSidebar = () => {
    setHamburger(!hamburger);
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-8 w-[90vw] py-6 mx-auto">
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
          <div>
            {Feturs?.map((mainf, idx) => (
              <div key={idx}>
                <p className="text-xl font-pop mt-4">
                  {mainf?.[`feature_name_${languagedata}`]}
                </p>
                {mainf?.sub_feature?.map((item, index) => (
                  <div className="" key={index}>
                    <h3 className="font-pop pb-2 mt-2 text-xl font-light">
                      {item?.[`feature_name_${languagedata}`]}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {item?.sub_sub_feature_name?.map((labelData, idxn) => (
                        <div
                          className="flex justify-start items-baseline"
                          key={idxn}
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubSubFeatureIds.includes(
                              labelData.id
                            )}
                            id={labelData.id}
                            className="checkbox-input p-1"
                            onChange={(e) =>
                              handleCheckboxChange(
                                item.id,
                                labelData.id,
                                e.target.checked
                              )
                            }
                          />
                          <label
                            htmlFor={labelData.id}
                            className="font-pop ps-2 font-extralight"
                          >
                            {labelData?.[`feature_name_${languagedata}`]}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
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
            <div>
          <div className=" flex justify-between items-center ">
            <h3 className="text-secondary text-2xl font-con">{t("Filters")}</h3>
            <button
              onClick={handleCleardata}
              className=" outline-none bg-none border-none font-con text-secondary text-sm mr-5"
            >
              {t("Clear")}
            </button>
          </div>
          <div>
            {Feturs?.map((mainf, idx) => (
              <div key={idx}>
                <p className="text-xl font-pop mt-4">
                  {mainf?.[`feature_name_${languagedata}`]}
                </p>
                {mainf?.sub_feature?.map((item, index) => (
                  <div className="" key={index}>
                    <h3 className="font-pop pb-2 mt-2 text-xl font-light">
                      {item?.[`feature_name_${languagedata}`]}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {item?.sub_sub_feature_name?.map((labelData, idxn) => (
                        <div
                          className="flex justify-start items-baseline"
                          key={idxn}
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubSubFeatureIds.includes(
                              labelData.id
                            )}
                            id={labelData.id}
                            className="checkbox-input p-1"
                            onChange={(e) =>
                              handleCheckboxChange(
                                item.id,
                                labelData.id,
                                e.target.checked
                              )
                            }
                          />
                          <label
                            htmlFor={labelData.id}
                            className="font-pop ps-2 font-extralight"
                          >
                            {labelData?.[`feature_name_${languagedata}`]}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
          </div>
        </Drawer>
        <div className="col-span-4 md:col-span-3">
          {loading ? (
            <div className="flex justify-center h-[400px] items-center mt-8">
              <svg
                aria-hidden="true"
                class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              {propertyData?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                  {propertyData.map((data) => (
                    // <Link
                    //   key={data.property_id}
                    //   to={`/details/1/${data.property_id}`}
                    // >
                    <MainCard
                      photoSrc={
                        data?.property_images
                          ? EndPoints.IMAGE_BASEURL + data?.property_images
                          : empty
                      }
                      completdata={data}
                      name={data.entertainment_name_en}
                      city={data.city_name}
                      fav={favoritePropertyIds.includes(data.property_id)}
                      to={`/details/1/${data.property_id}`}
                      onIconClick={() => addToFav(1, data.property_id)}
                    />
                    // </Link>
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
    </>
  );
}

export default FilterEntertainment1;

// <div>
//   <h3 className="text-secondary text-2xl font-pop">Filters</h3>
//   <p className="text-xl font-pop mt-4">
//     Offers rental of audio and lights
//   </p>
//   <div className="flex justify-start items-baseline mt-2">
//     <input type="checkbox" className=" checkbox-input p-1" />{" "}
//     <label className="font-pop ps-2 font-extralight">Audio</label>
//   </div>
//   <div className="flex justify-start items-baseline mt-1">
//     <input type="checkbox" className=" checkbox-input p-1" />{" "}
//     <label className="font-pop ps-2 font-extralight">Light</label>
//   </div>
//   <p className="text-xl font-pop mt-4">Music Genre</p>

//   <div className="mt-5 flex flex-col gap-4">
//     {checkBoxArry &&
//       checkBoxArry.map((item, index) => {
//         return (
//           <div className=" " key={index}>
//             <h3 className="font-pop pb-2 text-xl font-light">
//               {item.Heading}{" "}
//             </h3>
//             <div className=" flex flex-col gap-3">
//               {item.labels.map((labelData, idx) => (
//                 <div
//                   className="flex justify-start items-baseline "
//                   key={idx}
//                 >
//                   <input
//                     type="checkbox"
//                     id={labelData.id}
//                     className=" checkbox-input p-1"
//                   />{" "}
//                   <label
//                     htmlFor={labelData.id}
//                     className="font-pop ps-2 font-extralight"
//                   >
//                     {labelData.label}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       })}
//   </div>
// </div>
