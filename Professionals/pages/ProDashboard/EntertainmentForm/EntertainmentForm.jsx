import React, { useContext, useEffect, useState } from "react";
import Input from "../../../../../ui/Input";
import AddImages from "../../../../../ui/AddImages";
import Button from "../../../../../ui/Button";
import AddVideo from "../../../../../ui/AddVedio";
import { t } from "i18next";
import AddressAutoComplete from "../AddressAutoComplete";
import { useNavigate, useLocation } from "react-router-dom";
import { useProFormDataContext } from "../proFormDataContext/ProFormDataContext";
import * as NonAuthServices from "../../../../api/service/NonAuthService";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../../../../Context/LanguageContext";
import { EndPoints } from "../../../../api/EndPoints";

function EntertainmentForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location?.state;
  const id = state?.id;
  const { t } = useTranslation();
  const { languagedata } = useContext(LanguageContext);
  const [entertainmentFormData, setEntertainmentFormData] = useState(null);
  const { proFormData, updateProFormFormData } = useProFormDataContext();
  const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);
  const [selectedSubFeatureIds, setSelectedSubFeatureIds] = useState([]);
  const [selectedSubSubFeatureIds, setSelectedSubSubFeatureIds] = useState([]);
  const [propertyData, setpropertyData] = useState({});
  const [errors, setErrors] = useState({});
  const [formCompleted, setFormCompleted] = useState(false);
  const [maxImage, setMaxImage] = useState(false);
  const [maxVedio, setMaxVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prevImageArray, setPrevImageArray] = useState(null);
  const fetchData = async (id) => {
    try {
      const response = await NonAuthServices.get_property_detail({
        property_type: 1,
        property_id: id,
      });

      const propertyDetail = response[0];
      setSelectedFeatureIds(
        (response?.my_selected_feature_ids ?? []).map(Number)
      );
      setSelectedSubFeatureIds(
        (response?.my_selected_sub_feature_ids ?? []).map(Number)
      );
      setSelectedSubSubFeatureIds(
        (response?.my_selected_sub_sub_feature_ids ?? [30]).map(Number)
      );

      // Update proFormData with property details and features_id based on item.id match
      const updatedFormData = {
        ...proFormData,

        // features_id: propertyDetail.features.map((item) => item.id),
        event_category_ids: propertyDetail.event_category.map(
          (item) => item.id
        ),
        entertainment_name_en: propertyDetail.entertainment_name_en,
        phone_no: propertyDetail.phone_no,
        website: propertyDetail.website,

        address_en: propertyDetail.address_en,
        longitude: propertyDetail.longitude,
        latitude: propertyDetail.latitude,
        description_en: propertyDetail.description_en,
        description_de: propertyDetail.description_de,
        description_fr: propertyDetail.description_fr,
        min_budget: propertyDetail.min_budget,
        is_standard_announcement: propertyDetail.is_standard_announcement,
        premium_announcement: propertyDetail.premium_announcement,
        is_allow_booking_of_table: propertyDetail.is_allow_booking_of_table,
        is_allow_privatization_of_venue:
          propertyDetail.is_allow_privatization_of_venue,
        category_id: propertyDetail.category_id,
        sub_category_id: propertyDetail.sub_category_id,
        features_id: response?.my_selected_feature_ids,
        sub_feature_ids: response?.my_selected_sub_feature_ids,
        sub_sub_feature_ids: response?.my_selected_sub_sub_feature_ids,
      };

      // console.log(updatedFormData, "check this daatttttt");

      // Update proFormData state with the updatedFormData
      updateProFormFormData(updatedFormData);
      setPrevImageArray(propertyDetail?.images);
      // Optionally, you can set the propertyData state with the fetched property details
      setpropertyData(propertyDetail);
    } catch (error) {
      console.log("Error fetching property details:", error);
    }
  };
  console.log(state?.id);

  useEffect(() => {
    if (state?.id) {
      fetchData(state?.id);
    }
  }, []);
  console.log(propertyData);

  const get_entertainment_feature = async () => {
    try {
      const response = await NonAuthServices.get_entertainment_feature();
      setEntertainmentFormData(response);
      console.log(response, "entertaiment data");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    get_entertainment_feature();
  }, []);

  const handleInputChange = (field, value) => {
    if (proFormData) {
      updateProFormFormData({ ...proFormData, [field]: value });
      setErrors((prevErrors) => {
        const {[field]: removedError, ...rest } = prevErrors;
        return rest;
      });
    }

    console.log(`Field "${field}" updated with value:`, value);
  };
  const onSelectAddress = (selectedAddress) => {
    // Update context with selected address data
    let address_en = selectedAddress ? selectedAddress.address : null;
    let latitude = selectedAddress ? selectedAddress.latLng.lat : null;
    let longitude = selectedAddress ? selectedAddress.latLng.lng : null;

    updateProFormFormData({
      ...proFormData,
      address_en,
      latitude,
      longitude,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      address_en: null,
      latitude: null,
      longitude: null,
    }));

  };

  const handleImageChange = (files) => {
    // Ensure files is an array
    const fileList = Array.from(files);

    updateProFormFormData({
      ...proFormData,
      entertainment_image: [...fileList],
    });
    setErrors((prevErrors) => {
      const {entertainment_image: removedError, ...rest } = prevErrors;
      return rest;
    });
  };
  const handleVideoChange = (files) => {
    // Ensure files is an array
    const fileList = Array.from(files);

    updateProFormFormData({
      ...proFormData,
      entertainment_video: [
        ...(proFormData.entertainment_video || []),
        ...fileList,
      ],
    });
  };

  // const handleCheckboxChange = (
  //   FeaturID,
  //   subFeatureId,
  //   subSubFeatureId,
  //   isChecked
  // ) => {
  //   if (isChecked) {
  //     // Checkbox is checked, add ids to arrays
  //     setSelectedFeatureIds([...selectedFeatureIds, FeaturID]);
  //     setSelectedSubFeatureIds([...selectedSubFeatureIds, subFeatureId]);
  //     setSelectedSubSubFeatureIds([
  //       ...selectedSubSubFeatureIds,
  //       subSubFeatureId,
  //     ]);
  //     updateProFormFormData({
  //       ...proFormData,
  //       features_id: [...proFormData.features_id, FeaturID],
  //       sub_feature_ids: [...proFormData.sub_feature_ids, subFeatureId],
  //       sub_sub_feature_ids: [
  //         ...proFormData.sub_sub_feature_ids,
  //         subSubFeatureId,
  //       ],
  //     });
  //   } else {
  //     // Checkbox is unchecked, remove only the first occurrence of the ids from arrays
  //     setSelectedSubFeatureIds(
  //       selectedSubFeatureIds.filter((id) => id !== subFeatureId)
  //     );
  //     setSelectedSubSubFeatureIds(
  //       selectedSubSubFeatureIds.filter((id) => id !== subSubFeatureId)
  //     );
  //     setSelectedFeatureIds(selectedFeatureIds.filter((id) => id !== FeaturID));
  //     updateProFormFormData({
  //       ...proFormData,
  //       sub_feature_ids: proFormData.sub_feature_ids.filter(
  //         (item) => item !== subFeatureId
  //       ),
  //       features_id: proFormData.features_id.filter(
  //         (item) => item !== FeaturID
  //       ),
  //       sub_sub_feature_ids: proFormData.sub_sub_feature_ids.filter(
  //         (item) => item !== subSubFeatureId
  //       ),
  //     });
  //   }
  // };
  const handleCheckboxChange = (
    FeaturID,
    subFeatureId,
    subSubFeatureId,
    isChecked
  ) => {
    if (isChecked) {
      // Checkbox is checked, add ids to arrays
      const idExists = (id, array) => {
        return array.includes(id);
      };

      // Check if the feature IDs already exist before adding them
      if (!idExists(FeaturID, selectedFeatureIds)) {
        setSelectedFeatureIds([...selectedFeatureIds, FeaturID]);
      }

      if (!idExists(subFeatureId, selectedSubFeatureIds)) {
        setSelectedSubFeatureIds([...selectedSubFeatureIds, subFeatureId]);
      }

      if ((subSubFeatureId, selectedSubSubFeatureIds)) {
        setSelectedSubSubFeatureIds([
          ...selectedSubSubFeatureIds,
          subSubFeatureId,
        ]);
      }
      updateProFormFormData({
        ...proFormData,
        features_id: selectedFeatureIds,
        sub_feature_ids: selectedSubFeatureIds,
        sub_sub_feature_ids: selectedSubSubFeatureIds,
      });
    } else {
      // Checkbox is unchecked, remove only the first occurrence of the ids from all arrays
      setSelectedFeatureIds(
        removeFirstOccurrence(selectedFeatureIds, FeaturID)
      );
      setSelectedSubFeatureIds(
        removeFirstOccurrence(selectedSubFeatureIds, subFeatureId)
      );
      setSelectedSubSubFeatureIds(
        removeFirstOccurrence(selectedSubSubFeatureIds, subSubFeatureId)
      );
      // updateProFormFormData({
      //   ...proFormData,
      //   features_id: removeFirstOccurrence(proFormData.features_id, FeaturID),
      //   sub_feature_ids: removeFirstOccurrence(
      //     proFormData.sub_feature_ids,
      //     subFeatureId
      //   ),
      //   sub_sub_feature_ids: removeFirstOccurrence(
      //     proFormData.sub_sub_feature_ids,
      //     subSubFeatureId
      //   ),
      // });
      updateProFormFormData({
        ...proFormData,
        features_id: selectedFeatureIds,
        sub_feature_ids: selectedSubFeatureIds,
        sub_sub_feature_ids: selectedSubSubFeatureIds,
      });
    }
  };

  // Function to remove only the first occurrence of a value from an array
  const removeFirstOccurrence = (array, value) => {
    const index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
  };

  // const handleNext = () => {
  //   const requiredFields = [
  //     "venue_name_en",
  //     "phone_no",
  //     "website",
  //     "address_en",
  //     'latitude',
  //     'longitude',
  //     "description_en",
  //     "description_de",
  //     "description_fr",
  //     "venue_size",
  //     "max_sitting_capacity",
  //     "min_sitting_capacity",
  //     "no_of_parking_space",
  //     "catering_choice",
  //     "kind_of_cuisine",
  //     "venue_image",
  //     "features_id",
  //   ];

  //   const errors = {};
  //   let isFormComplete = true;

  //   requiredFields.forEach((field) => {
  //     if (!proFormData[field]) {
  //       errors[field] = "Field is required";
  //       isFormComplete = false;
  //     }
  //   });

  //   setErrors(errors);
  //   setFormCompleted(isFormComplete);

  //   console.log(proFormData);
  //   console.log(formCompleted);
  //   if (formCompleted) {
  //     navigate(location.pathname + "/myannouncementss");
  //   } else {
  //     if(errors)
  //       console.log(errors);
  //   }
  // };

  const checkBoxArry = [
    {
      Heading: "Flexible ",
      labels: [{ id: "1", label: "as resquested by host" }],
    },
    {
      Heading: "Classical Music ",
      labels: [
        { id: "1", label: "Baroque" },
        { id: "2", label: "Classical " },
        { id: "3", label: "Romantic  " },
        { id: "4", label: "Contemporary  " },
      ],
    },
    {
      Heading: "Jazz ",
      labels: [
        { id: "1", label: "Swing" },
        { id: "1", label: "Bebop " },
        { id: "1", label: "Fusion " },
      ],
    },
    {
      Heading: "Rock ",
      labels: [
        { id: "1", label: "Classical Rock" },
        { id: "1", label: "Punk " },
        { id: "1", label: "Alternative " },
        { id: "1", label: "Indie Rock " },
      ],
    },
    {
      Heading: "Metal ",
      labels: [
        { id: "1", label: "Heavy Metal" },
        { id: "1", label: "Black Metal " },
        { id: "1", label: "Death Metal " },
      ],
    },
    {
      Heading: "Pop ",
      labels: [
        { id: "1", label: "Pop-Rock" },
        { id: "1", label: "Electro Pop " },
        { id: "1", label: "Dance Pop " },
        { id: "1", label: "Indie Pop " },
      ],
    },
    {
      Heading: "Hip-Hop/Rap ",
      labels: [{ id: "1", label: "Hip-Hop/Rap" }],
    },
    {
      Heading: "Electronic ",
      labels: [
        { id: "1", label: "Techno" },
        { id: "1", label: "House " },
        { id: "1", label: "Trance " },
        { id: "1", label: "Dubstep " },
      ],
    },
    {
      Heading: "Blues ",
      labels: [{ id: "1", label: "Blues" }],
    },
    {
      Heading: "R&B ",
      labels: [
        { id: "1", label: "Raggea" },
        { id: "2", label: "Latin" },
      ],
    },
    {
      Heading: "Folk ",
      labels: [{ id: "1", label: "Flok" }],
    },
    {
      Heading: "Indie ",
      labels: [{ id: "1", label: "Indie" }],
    },
  ];

  const HandleNext = async () => {
    let requiredFields = [];
    if (state) {
      requiredFields = [
        "entertainment_name_en",

        "address_en",
        "latitude",
        "longitude",
        "description_en",
        "description_de",
        "description_fr",
        "min_budget",
      ];
    } else {
      requiredFields = [
        "entertainment_name_en",

        "address_en",
        "latitude",
        "longitude",
        "description_en",
        "description_de",
        "description_fr",

        "entertainment_image",
        "min_budget",
      ];
    }

    const errors = {};
    let isFormComplete = true;

    requiredFields.forEach((field) => {
      if (!proFormData[field]) {
        errors[field] = "Field is required";
        isFormComplete = false;
      }
    });
    console.log(proFormData?.sub_feature_ids?.length);

    if (!selectedSubSubFeatureIds.length) {
      errors[`sub_sub_feature_ids`] = "At least one selection required.";
      isFormComplete = false;
    }
    if (prevImageArray) {
      console.log(prevImageArray, "liten h");
      setLoading(true);

      const loadImages = async () => {
        const updatedPrevImages = [];
        for (const item of prevImageArray) {
          try {
            const response = await fetch(
              EndPoints.IMAGE_BASEURL + item.image_name
            );
            const blob = await response.blob();
            const file = new File([blob], item.image_name, { type: blob.type });
            updatedPrevImages.push(file);
          } catch (error) {
            console.error("Error loading image:", error);
          }
        }
        updateProFormFormData({
          ...proFormData,
          entertainment_image: [
            ...(proFormData.entertainment_image ?? []),
            ...updatedPrevImages,
          ],
        });
      };
      await loadImages();
      setLoading(false);
    }
    setErrors(errors);
    setFormCompleted(isFormComplete);

    console.log(proFormData);
    console.log(formCompleted);
    if (isFormComplete) {
      if (state) {
        navigate(location.pathname + "/myannouncementss", {
          state: { cat: 2, id },
        });
      } else {
        navigate(location.pathname + "/myannouncementss");
      }
    } else {
      if (errors) console.log(errors);
    }
  };

  const handleMaxGet = (maxReached) => {
    setMaxImage(maxReached);
  };
  const handleMaxGetVideo = (maxReached) => {
    setMaxVideo(maxReached);
  };

  return (
    <div className=" ">
      <div className="text-[#8D303A] text-2xl font-con border-b-[1px] border-borde py-5 px-10">
        {t("createAnn")}
      </div>
      <div className=" max-w-[1220px] px-10">
        <p className="mt-8 font-con text-[18px]">{t("entertainment")} </p>
        <form className="" action="">
          <div className="flex flex-wrap mt-8 font-pop">
            <div className="flex flex-col md:w-[33%] w-full">
              <label htmlFor="">{t("name")}</label>
              <Input
                placeholder={t("name")}
                value={proFormData?.entertainment_name_en ?? ""}
                type="text"
                classes="large"
                onChange={(value) =>
                  handleInputChange("entertainment_name_en", value)
                }
              ></Input>
              {errors.entertainment_name_en && (
                <p className="text-red-500">{errors.entertainment_name_en}</p>
              )}
            </div>
            <div className="flex flex-col md:w-[33%] w-full">
              <label htmlFor="">{t("phoneNum")}</label>
              <Input
                value={proFormData?.phone_no}
                placeholder={t("phoneNum")}
                type="number"
                classes="large"
                onChange={(value) => handleInputChange("phone_no", value)}
              ></Input>
              {/* {errors.phone_no && (
                <p className="text-red-500">{errors.phone_no}</p>
              )} */}
            </div>
            <div className="flex flex-col md:w-[33%] w-full">
              <label htmlFor="">{t("Website")}</label>
              <Input
                placeholder={t("Website")}
                value={proFormData?.website ?? ""}
                type="website"
                classes="large"
                onChange={(value) => handleInputChange("website", value)}
              ></Input>
              {/* {errors.website && (
                <p className="text-red-500">{errors.website}</p>
              )} */}
            </div>
            <div className="flex flex-col md:w-[50%] w-full">
              <label htmlFor="">{t("address")}</label>
              <AddressAutoComplete
                value={proFormData?.address_en}
                onSelect={onSelectAddress}
              />
              {(errors.address_en || errors.latitude || errors.longitude) && (
                <p className="text-red-500">
                  {errors.address_en ?? errors.latitude ?? errors.longitude}
                </p>
              )}
            </div>
            <div className="flex flex-col md:w-[50%] w-full">
              <label htmlFor="">{t("Description (EN)")}</label>
              <Input
                placeholder={t("description")}
                type="text"
                classes="textarea"
                value={proFormData?.description_en ?? ""}
                onChange={(value) => handleInputChange("description_en", value)}
              ></Input>
              {errors.description_en && (
                <p className="text-red-500">{errors.description_en}</p>
              )}
            </div>
            <div className="flex flex-col md:w-[50%] w-full">
              <label htmlFor="">{t("Description (DE)")}</label>
              <Input
                placeholder={t("description")}
                type="text"
                value={proFormData?.description_de ?? ""}
                classes="textarea"
                onChange={(value) => handleInputChange("description_de", value)}
              ></Input>
              {errors.description_de && (
                <p className="text-red-500">{errors.description_de}</p>
              )}
            </div>
            <div className="flex flex-col md:w-[50%] w-full">
              <label htmlFor="">{t("Description (FR)")}</label>
              <Input
                placeholder={t("description")}
                type="text"
                classes="textarea"
                value={proFormData?.description_fr ?? ""}
                onChange={(value) => handleInputChange("description_fr", value)}
              ></Input>
              {errors.description_fr && (
                <p className="text-red-500">{errors.description_fr}</p>
              )}
            </div>
            <div className="flex flex-col md:w-[33%] w-full">
              <label htmlFor="">{t("minBug")}</label>
              <Input
                placeholder={t("minBug")}
                type="number"
                classes="large"
                value={proFormData?.min_budget}
                onChange={(value) => handleInputChange("min_budget", value)}
              ></Input>
              {errors.min_budget && (
                <p className="text-red-500">{errors.min_budget}</p>
              )}
            </div>
          </div>
          <div className=" grid md:grid-cols-2 grid-cols-1">
            <div className="flex flex-col md:w-[100%] w-full">
              <p>{t("Upload of pictures (max 15)")}</p>
              {/* <AddImages
                prevImagesURL={propertyData?.images ?? null}
                onChange={(files) => handleImageChange(files)}
              /> */}
              <AddImages
                maxget={handleMaxGet}
                prevImagesURL={prevImageArray}
                setPrevImageUrl={setPrevImageArray}
                onChange={(files) => handleImageChange(files)}
              />
              {maxImage == true && (
                <p className="text-red-500">{"Only 15 Max Allowed"}</p>
              )}
              {errors.entertainment_image && (
                <p className="text-red-500">{errors.entertainment_image}</p>
              )}
            </div>
            <div>
              <div className="flex flex-col md:w-[100%] w-full">
                <p>{t("Upload of samples (mp3/video/mp4) (max 10)")}</p>
                <AddVideo
                  maxget={handleMaxGetVideo}
                  onChange={(files) => handleVideoChange(files)}
                />
                {maxVedio == true && (
                  <p className="text-red-500">{"Only 10 Max Allowed"}</p>
                )}
              </div>
            </div>
          </div>

          <div className=" mt-5 flex flex-col gap-4 w-full ">
            {entertainmentFormData?.map((mainf, idx) => (
              <div key={idx}>
                <p className="text-xl font-pop mt-4">
                  {mainf?.[`feature_name_${languagedata}`]}
                </p>
                {mainf?.sub_feature?.map((item, index) => (
                  <div className="" key={index}>
                    <h3 className="font-pop pb-2 mt-2 text-xl font-light">
                      {item?.[`feature_name_${languagedata}`]}
                    </h3>
                    <div className="flex flex-wrap  gap-5 w-full ">
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
                                mainf.id,
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
            {errors.sub_sub_feature_ids && (
              <p className="text-red-500">{errors.sub_sub_feature_ids}</p>
            )}
          </div>
          {/* <div className=" flex flex-col gap-4">
            {entertainmentFormData && (
              <div className="mt-5 flex flex-col gap-4">
                <h3 className="text-xl font-con">
                  {entertainmentFormData[1].feature_name_en}
                </h3>
                <div className=" flex flex-col gap-4">
                  {entertainmentFormData[1].sub_feature.map(
                    (subfeature, idx) => (
                      <div>
                        <div className="text-xl pb-2" key={idx}>
                          {subfeature.feature_name_en}
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {subfeature.sub_sub_feature_name.map(
                            (sub_sub_feature, idx) => (
                              <div
                                className="flex justify-start items-baseline basis-52"
                                key={idx}
                              >
                                <input
                                  type="checkbox"
                                  id={sub_sub_feature.id}
                                  className=" checkbox-input p-1"
                                  onChange={(e) =>
                                    handleSubCheckboxChange(
                                      sub_sub_feature.id,
                                      e.target.checked
                                    )
                                  }
                                  checked={proFormData.sub_sub_feature_ids.includes(
                                    sub_sub_feature.id
                                  )}
                                />{" "}
                                <label
                                  htmlFor={sub_sub_feature.id}
                                  className="font-pop ps-2"
                                >
                                  {sub_sub_feature.feature_name_en}
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div> */}
        </form>
        <div className="flex justify-between w-full mt-8 mb-8">
          <Button onClick={() => navigate(-1)} type="grayButton">
            {t("back")}
          </Button>
          <Button
            type="purpleButton"
            onClick={() => HandleNext()}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                {t("next")}
              </>
            ) : (
              <>{t("next")}</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EntertainmentForm;
