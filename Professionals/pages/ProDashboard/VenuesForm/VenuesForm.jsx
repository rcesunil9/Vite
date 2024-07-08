import React, { useContext, useEffect, useState } from "react";
import Input from "../../../../../ui/Input";
import AddImages from "../../../../../ui/AddImages";
import Button from "../../../../../ui/Button";
import { useTranslation } from "react-i18next";
import "./numberForm.css";
import AddressAutoComplete from "../AddressAutoComplete";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as NonAuthService from "../../../../api/service/NonAuthService";
import { useProFormDataContext } from "../proFormDataContext/ProFormDataContext";
import LanguageContext from "../../../../../Context/LanguageContext";
import { EndPoints } from "../../../../api/EndPoints";

const VenuesForm = () => {
  const location = useLocation();
  const { t } = useTranslation();
  let navigate = useNavigate();
  const { languagedata } = useContext(LanguageContext);
  const [venueFormData, setVenueFormData] = useState(null);
  const { proFormData, updateProFormFormData } = useProFormDataContext();
  const [formCompleted, setFormCompleted] = useState(false);
  const [propertyData, setpropertyData] = useState({});
  const [prevImageArray, setPrevImageArray] = useState(null);
  const [errors, setErrors] = useState({});
  const [maxImage, setMaxImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const state = location?.state;
  const id = state?.id;
  console.log(maxImage, "max chweck");
  const fetchData = async (id) => {
    try {
      const response = await NonAuthService.get_property_detail({
        property_type: 0,
        property_id: id,
      });

      const propertyDetail = response[0];

      // Update proFormData with property details and features_id based on item.id match
      const updatedFormData = {
        ...proFormData,

        features_id: propertyDetail.features.map((item) => item.id),
        event_category_ids: propertyDetail.event_category.map(
          (item) => item.id
        ),
        venue_name_en: propertyDetail.venue_name_en,
        phone_no: propertyDetail.phone_no,
        website: propertyDetail.website,
        address_en: propertyDetail.address_en,

        longitude: propertyDetail.longitude,
        latitude: propertyDetail.latitude,
        description_en: propertyDetail.description_en,
        description_de: propertyDetail.description_de,
        description_fr: propertyDetail.description_fr,
        venue_size: propertyDetail.venue_size,
        max_sitting_capacity: propertyDetail.max_sitting_capacity,
        min_sitting_capacity: propertyDetail.min_sitting_capacity,
        no_of_parking_space: propertyDetail.no_of_parking_space,
        catering_choice: propertyDetail.catering_choice,
        kind_of_cuisine: propertyDetail.kind_of_cuisine,
        is_standard_announcement: propertyDetail.is_standard_announcement,
        premium_announcement: propertyDetail.premium_announcement,
        is_allow_booking_of_table: propertyDetail.is_allow_booking_of_table,
        is_allow_privatization_of_venue:
          propertyDetail.is_allow_privatization_of_venue,
        category_id: propertyDetail.category_id,
        sub_category_id: propertyDetail.sub_category_id,
      };
      console.log(updatedFormData, "check this daatttttt");
      setPrevImageArray(propertyDetail?.images);
      // Update proFormData state with the updatedFormData
      updateProFormFormData(updatedFormData);

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
  console.log(proFormData);

  const get_venue_feature = async () => {
    try {
      const response = await NonAuthService.get_venue_feature();
      setVenueFormData(response);
    } catch (error) {}
  };
  useEffect(() => {
    get_venue_feature();
  }, []);
  const handleInputChange = (field, value) => {
    // Update the context with the new field value
    if (proFormData) {
      updateProFormFormData({ ...proFormData, [field]: value });
      setErrors((prevErrors) => {
        const { [field]: removedError, ...rest } = prevErrors;
        return rest;
      });
    }
    // console.log(`Field "${field}" updated with value:`, value);
  };
  const onSelectAddress = (defaultValueAddress) => {
    // Update context with defaultValue address data
    let address_en = defaultValueAddress ? defaultValueAddress.address : null;
    let latitude = defaultValueAddress ? defaultValueAddress.latLng.lat : null;
    let longitude = defaultValueAddress ? defaultValueAddress.latLng.lng : null;
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
    console.log("hii");
    const fileList = Array.from(files);
    updateProFormFormData({
      ...proFormData,
      venue_image: [...fileList],
    });
    setErrors((prevErrors) => {
      const {venue_image: removedError, ...rest } = prevErrors;
      return rest;
    });
  };
  const handleCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      updateProFormFormData({
        ...proFormData,
        features_id: [...proFormData.features_id, id],
      });
    } else {
      updateProFormFormData({
        ...proFormData,
        features_id: proFormData.features_id.filter((item) => item !== id),
      });
    }
  };

  const handleNext = async () => {
    let requiredFields = [];
    if (state) {
      requiredFields = [
        "venue_name_en",

        "address_en",
        "latitude",
        "longitude",
        "description_en",
        "description_de",
        "description_fr",
        "venue_size",
        "max_sitting_capacity",
        "min_sitting_capacity",

        "catering_choice",
        "kind_of_cuisine",

        "features_id",
      ];
    } else {
      requiredFields = [
        "venue_name_en",

        "address_en",
        "latitude",
        "longitude",
        "description_en",
        "description_de",
        "description_fr",
        "venue_size",
        "max_sitting_capacity",
        "min_sitting_capacity",

        "catering_choice",
        "kind_of_cuisine",
        "venue_image",
        "features_id",
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
    if (prevImageArray) {
      console.log(prevImageArray,"liten h")
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
          venue_image: [
            ...(proFormData.venue_image ?? []),
            ...updatedPrevImages,
          ],
        });
      };
      await loadImages();
      setLoading(false);
    }

    // if (!proFormData?.features_id?.length) {
    //   errors[`sub_sub_feature_ids`] = "At least one selection required.";
    //   isFormComplete = false;
    // }

    setErrors(errors);
    setFormCompleted(isFormComplete);

    console.log(proFormData);
    console.log(formCompleted);
    if (isFormComplete) {
      if (state) {
        navigate(location.pathname + "/myannouncementss", {
          state: { cat: 1, id },
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
  console.log(propertyData?.features_id);
  return (
    <div className=" ">
      <div className="text-[#8D303A] border-b border-gray pb-4 text-2xl font-con px-10">
        {t("createAnn")}
      </div>
      <div className=" max-w-[1220px] px-10">
        <p className="mt-8 font-con text-[18px]">{t("venues")}</p>
        <form className="flex flex-wrap mt-8 font-pop" action="">
          <div className="flex flex-col md:w-[33%] w-full">
            <label htmlFor="">{t("name")}</label>
            <Input
              placeholder={t("name")}
              type="text"
              classes="large"
              value={proFormData?.venue_name_en ?? ""}
              onChange={(value) => handleInputChange("venue_name_en", value)}
            ></Input>
            {errors.venue_name_en && (
              <p className="text-red-500">{errors.venue_name_en}</p>
            )}
          </div>
          <div className="flex flex-col md:w-[33%] w-full">
            <label htmlFor="">{t("phoneNum")}</label>
            <Input
              placeholder={t("phoneNum")}
              type="number"
              classes="large"
              value={proFormData?.phone_no ?? ""}
              onChange={(value) => handleInputChange("phone_no", value)}
            ></Input>
            {/* {errors.phone_no && (
              <p className="text-red-500">{errors.phone_no}</p>
            )} */}
          </div>
          <div className="flex flex-col md:w-[33%] w-full">
            <label htmlFor="">{t("website")}</label>

            <Input
              placeholder="Url..."
              type="url"
              classes="large"
              value={proFormData?.website ?? ""}
              onChange={(value) => handleInputChange("website", value)}
            ></Input>
            {/* {errors.website && <p className="text-red-500">{errors.website}</p>} */}
          </div>
          <div className="flex flex-col md:w-[50%] w-full">
            <label htmlFor="">{t("address")}</label>

            <AddressAutoComplete
              value={proFormData?.address_en ?? ""}
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
              value={proFormData?.description_de ?? ""}
              type="text"
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
              value={proFormData?.description_fr ?? ""}
              type="text"
              classes="textarea"
              onChange={(value) => handleInputChange("description_fr", value)}
            ></Input>
            {errors.description_fr && (
              <p className="text-red-500">{errors.description_fr}</p>
            )}
          </div>
          <div className="flex flex-col md:w-[33%] w-full">
            <label htmlFor="">{t("venueSize")}</label>
            <Input
              placeholder={t("venueSize")}
              value={proFormData?.venue_size ?? ""}
              type="number"
              classes="large"
              onChange={(value) => handleInputChange("venue_size", value)}
            ></Input>
            {errors.venue_size && (
              <p className="text-red-500">{errors.venue_size}</p>
            )}
          </div>
          <div className="flex flex-col md:w-[33%] w-full">
            <label htmlFor="">{t("maxCapSit")}</label>
            <Input
              value={proFormData?.max_sitting_capacity ?? ""}
              placeholder={t("maxCapSit")}
              type="number"
              classes="large"
              onChange={(value) =>
                handleInputChange("max_sitting_capacity", value)
              }
            ></Input>
            {errors.max_sitting_capacity && (
              <p className="text-red-500">{errors.max_sitting_capacity}</p>
            )}
          </div>
          <div className="flex flex-col md:w-[33%] w-full">
            <label htmlFor="">{t("maxCapStand")}</label>
            <Input
              placeholder={t("maxCapStand")}
              value={proFormData?.min_sitting_capacity ?? ""}
              type="number"
              classes="large"
              onChange={(value) =>
                handleInputChange("min_sitting_capacity", value)
              }
            ></Input>
            {errors.min_sitting_capacity && (
              <p className="text-red-500">{errors.min_sitting_capacity}</p>
            )}
          </div>
          <div className="flex flex-col md:w-[33%] w-full">
            <label htmlFor="">{t("maxPark")}</label>
            <Input
              placeholder={t("maxPark")}
              value={proFormData?.no_of_parking_space ?? ""}
              type="number"
              classes="large"
              onChange={(value) =>
                handleInputChange("no_of_parking_space", value)
              }
            ></Input>
            {/* {errors.no_of_parking_space && (
              <p className="text-red-500">{errors.no_of_parking_space}</p>
            )} */}
          </div>
          <div className="flex flex-col md:w-[33%] w-full">
            <label htmlFor="">{t("cateringChoice")}</label>
            <select
              className="p-2 border rounded-md border-borde placeholder:text-placeholderText my-2 w-[95%] outline-none"
              name="Catering Choice"
              id=""
              value={proFormData?.catering_choice ?? ""}
              onChange={(e) =>
                handleInputChange("catering_choice", e.target.value)
              }
            >
              <option className=" text-borde" disabled defaultValue value="">
                {t("Select")}
              </option>
              <option value="Free">{t("Free")}</option>
              <option value="Limited">{t("Limited")}</option>
              <option value="No Caterer Allowed">
                {t("No Caterer Allowed")}
              </option>
            </select>
            {errors.catering_choice && (
              <p className="text-red-500">{errors.catering_choice}</p>
            )}
          </div>
          <div className="flex flex-col md:w-[33%] w-full">
            <label htmlFor="">{t("kindOfCuisine")}</label>
            <select
              className="p-2 border rounded-md border-borde placeholder:text-placeholderText my-2 w-[95%] outline-none"
              name="Catering Choice"
              id=""
              value={proFormData?.kind_of_cuisine ?? ""}
              onChange={(e) =>
                handleInputChange("kind_of_cuisine", e.target.value)
              }
            >
              <option className=" text-borde" disabled defaultValue value="">
                {t("Select")}
              </option>
              <option value="No cuisine">{t("No Internal Cuisine")}</option>
              <option value="Luxembourgish">{t("Luxembourgish")}</option>
              <option value="French">{t("French")}</option>
              <option value="Italian">{t("Italian")}</option>
              <option value="Greek">{t("Greek")}</option>
              <option value="Spanish">{t("Spanish")}</option>
              <option value="Other European">{t("Other European")}</option>
              <option value="Japanese">{t("Japanese")}</option>
              <option value="Chinese">{t("Chinese")}</option>
              <option value="Indian">{t("Indian")}</option>
              <option value="Other Asian">{t("Other Asian")}</option>
              <option value="Middle Eastern">{t("Middle Eastern")}</option>
              <option value="American">{t("American")}</option>
              <option value="Vegetarian">
                {t("Vegetarian and Vegan Cuisine")}
              </option>
              <option value="International Fusion">
                {t("International Fusion")}
              </option>
            </select>
            {errors.kind_of_cuisine && (
              <p className="text-red-500">{errors.kind_of_cuisine}</p>
            )}
          </div>
          <div className="flex flex-col w-[100%]">
            <p>{t("uploadPic")}</p>
            <AddImages
              prevImagesURL={prevImageArray}
              setPrevImageUrl={setPrevImageArray}
              maxget={handleMaxGet}
              onChange={(files) => handleImageChange(files)}
            />
            {maxImage == true && (
              <p className="text-red-500">{"Only 15 Max Allowed"}</p>
            )}
            {errors.venue_image && (
              <p className="text-red-500">{errors.venue_image}</p>
            )}
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <div className=" ">
              <h3 className="text-2xl font-con pb-2">{t("indicateCri")}</h3>
              <div className="flex flex-wrap gap-3">
                {venueFormData &&
                  venueFormData?.map((item, index) => (
                    <div
                      className="flex justify-start items-baseline basis-52"
                      key={index}
                    >
                      <input
                        type="checkbox"
                        id={item.id}
                        className="checkbox-input p-1"
                        onChange={(e) =>
                          handleCheckboxChange(item.id, e.target.checked)
                        }
                        checked={proFormData?.features_id?.includes(item.id)}
                      />
                      <label htmlFor={item.id} className="font-pop ps-2">
                        {item?.[`feature_name_${languagedata}`]}
                      </label>
                    </div>
                  ))}
              </div>
              {/* {errors.sub_sub_feature_ids && (
                <p className="text-red-500">{errors.sub_sub_feature_ids}</p>
              )} */}
            </div>
          </div>
        </form>
        <div className="flex justify-between w-full mt-8 mb-8">
          <Button onClick={() => navigate(-1)} type="grayButton">
            {t("back")}
          </Button>
          <Button
            type="purpleButton"
            onClick={handleNext}
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
};
export default VenuesForm;
