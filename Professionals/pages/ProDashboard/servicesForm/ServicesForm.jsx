import React, { useState, useEffect } from "react";
import Input from "../../../../../ui/Input";
import AddImages from "../../../../../ui/AddImages";
import Button from "../../../../../ui/Button";
import { t } from "i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useProFormDataContext } from "../proFormDataContext/ProFormDataContext";
import AddressAutoComplete from "../AddressAutoComplete";
import * as NonAuthServices from "../../../../api/service/NonAuthService";
import { EndPoints } from "../../../../api/EndPoints";
function Rental() {
  const location = useLocation();
  let navigate = useNavigate();

  const state = location?.state;
  const id = state?.id;
  const { proFormData, updateProFormFormData } = useProFormDataContext();
  const [propertyData, setpropertyData] = useState({});
  const [errors, setErrors] = useState({});
  const [formCompleted, setFormCompleted] = useState(false);
  const [prevImageArray, setPrevImageArray] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async (id) => {
    try {
      const response = await NonAuthServices.get_property_detail({
        property_type: 3,
        property_id: id,
      });

      const propertyDetail = response[0];
      console.log(propertyDetail);

      // Update proFormData with property details and features_id based on item.id match
      const updatedFormData = {
        // features_id: propertyDetail.features.map((item) => item.id),
        event_category_ids: propertyDetail?.rental_event_category.map(
          (item) => item.id
        ),
        property_name_en: propertyDetail.property_name_en,
        phone_no: propertyDetail.phone_no,
        website: propertyDetail.website,
        address_en: propertyDetail.address_en,
        longitude: propertyDetail.longitude,
        latitude: propertyDetail.latitude,
        description_en: propertyDetail.description_en,
        description_de: propertyDetail.description_de,
        description_fr: propertyDetail.description_fr,
        // min_budget: propertyDetail.min_budget,
        is_standard_announcement: propertyDetail.is_standard_announcement,
        premium_announcement: propertyDetail.premium_announcement,
        is_allow_booking_of_table: propertyDetail.is_allow_booking_of_table,
        is_allow_privatization_of_venue:
          propertyDetail.is_allow_privatization_of_venue,
        category_id: propertyDetail.category_id,
        sub_category_id: propertyDetail.sub_category_id,
        property_type: propertyDetail.property_type,
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

  const handleInputChange = (field, value) => {
    if (proFormData) {
      updateProFormFormData({
        ...proFormData,
        [field]: value,
        property_type: 1,
      });
      setErrors((prevErrors) => {
        const { [field]: removedError, ...rest } = prevErrors;
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
    const fileList = Array.from(files);

    updateProFormFormData({
      ...proFormData,
      rental_image: [...fileList],
    });
    setErrors((prevErrors) => {
      const { rental_image: removedError, ...rest } = prevErrors;
      return rest;
    });
  };
  const HandleNext = async () => {
    let requiredFields = [];
    if (state) {
      requiredFields = [
        "property_name_en",

        "address_en",
        "latitude",
        "longitude",
        "description_en",
        "description_de",
        "description_fr",
      ];
    } else {
      requiredFields = [
        "property_name_en",

        "address_en",
        "latitude",
        "longitude",
        "description_en",
        "description_de",
        "description_fr",

        "rental_image",
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
    setErrors(errors);
    setFormCompleted(isFormComplete);
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
          rental_image: [
            ...(proFormData.rental_image ?? []),
            ...updatedPrevImages,
          ],
        });
      };
      await loadImages();
      setLoading(false);
    }
    console.log(proFormData);
    console.log(formCompleted);
    if (isFormComplete) {
      if (state) {
        navigate(location.pathname + "/myannouncementss", {
          state: { cat: 3, id },
        });
      } else {
        navigate(location.pathname + "/myannouncementss");
      }
    } else {
      if (errors) console.log(errors);
    }
  };
  return (
    <div className=" ">
      <div className="text-[#8D303A] text-2xl font-con border-b-[1px] border-borde py-5 px-10">
        {t("createAnn")}
      </div>
      <div className=" max-w-[1220px] px-10">
        <p className="mt-8 font-con ">{t("services")} </p>
        <form className="" action="">
          <div className="flex flex-wrap mt-8 font-pop">
            <div className="flex flex-col md:w-[33%] w-full">
              <label htmlFor="">{t("name")}</label>
              <Input
                placeholder={t("name")}
                type="text"
                classes="large"
                value={proFormData?.property_name_en ?? ""}
                onChange={(value) =>
                  handleInputChange("property_name_en", value)
                }
              ></Input>
              {errors.property_name_en && (
                <p className="text-red-500">{errors.property_name_en}</p>
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
              <label htmlFor="">{t("Website")}</label>
              <Input
                placeholder={t("Website")}
                type="website"
                classes="large"
                value={proFormData?.website ?? ""}
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
                value={proFormData?.description_en ?? ""}
                type="text"
                classes="textarea"
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
                classes="textarea"
                value={proFormData?.description_de ?? ""}
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
            {/* <div className="flex flex-col md:w-[33%] w-full">
              <label htmlFor="">Minimum budget</label>
              <Input
                placeholder="Minimum budget"
                type="number"
                value={proFormData?.min_budget ?? ""}
                classes="large"
                onChange={(value) => handleInputChange("min_budget", value)}
              ></Input>
            </div> */}
          </div>
          <div className=" grid grid-cols-1">
            <div className="flex flex-col md:w-[100%] w-full">
              <p>{t("Upload of pictures (max 15)")}</p>
              <AddImages
                prevImagesURL={prevImageArray}
                setPrevImageUrl={setPrevImageArray}
                onChange={(files) => handleImageChange(files)}
              />
              {errors.rental_image && (
                <p className="text-red-500">{errors.rental_image}</p>
              )}
            </div>
          </div>
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

export default Rental;
