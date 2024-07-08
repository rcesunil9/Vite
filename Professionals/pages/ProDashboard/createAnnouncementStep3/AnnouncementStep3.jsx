import { React, useContext, useEffect, useState } from "react";
import "../../../../../styles/checkbox.css";
import Button from "../../../../../ui/Button";
import vectorImg from "../../../../../assets/Frame.svg";
import { t } from "i18next";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import "./Tooltip.css";
import DataContext from "../../../../../Context/DataContext";
import { useProFormDataContext } from "../proFormDataContext/ProFormDataContext";
import * as NonAuthService from "../../../../api/service/NonAuthService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../../../../Context/LanguageContext";
import { Link } from "react-router-dom";
import MyModal from "../../../../../utility/termsAndPaymentModal";
function AnnouncementStep3() {
  const location = useLocation();
  let navigate = useNavigate();
  const { eventsData } = useContext(DataContext);
  const [highlighted, setHighlighted] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  console.log(eventsData, "this is events data");
  const { proFormData, updateProFormFormData } = useProFormDataContext();
  const [eventError, setEventError] = useState(null);
  const [annoucmentError, setannoucmentError] = useState(null);
  const [bookintypeError, setBookingTypeError] = useState(null);

  const [termsError, setTermsError] = useState(null);
  const [bugdeutError, setBugutError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state } = location;
  const { t } = useTranslation();
  const { languagedata } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [pageId, setPageId] = useState(1);
  const ToggalModal = (page) => {
    setIsOpen(!isOpen);
    setPageId(page);
  };
  if (state) {
    console.log(state, "check dataa ");
  }
  useEffect(() => {
    console.log(proFormData, "aaagyaaaaaaaaaa");
  }, [proFormData]);
  const handleInputChange = (field, value) => {
    if (proFormData) {
      updateProFormFormData({ ...proFormData, [field]: value });
    }
    setBugutError(null);
    // console.log(`Field "${field}" updated with value:`, value);
  };

  const handleCheckboxColorChange = (
    is_allow_privatization_of_venue,
    isChecked
  ) => {
    setHighlighted(!highlighted);
    setReadOnly(!readOnly);
    const value = isChecked ? 1 : 0;
    updateProFormFormData({
      ...proFormData,
      [is_allow_privatization_of_venue]: value,
    });
  };

  const handleCheckboxChangeEvents = (id, isChecked) => {
    if (isChecked) {
      updateProFormFormData({
        ...proFormData,
        event_category_ids: [...proFormData.event_category_ids, id],
      });
      setEventError(null);
    } else {
      updateProFormFormData({
        ...proFormData,
        event_category_ids: proFormData.event_category_ids.filter(
          (labelData) => labelData !== id
        ),
      });
    }
  };

  const handleCheckboxChange = (is_allow_booking_of_table, isChecked) => {
    const value = isChecked ? 1 : 0;

    updateProFormFormData({
      ...proFormData,
      [is_allow_booking_of_table]: value,
    });
    if (isChecked) {
      setBookingTypeError(null);
    }
  };
  const handleCheckboxis_standard_announcement = (fieldName, isChecked) => {
    updateProFormFormData({
      ...proFormData,
      [fieldName]: isChecked ? 1 : 0,
      premium_announcement: isChecked ? 0 : proFormData.premium_announcement,
    });
    if (isChecked) {
      setannoucmentError(null);
    }
  };

  const handleCheckboxpremium_announcement = (fieldName, isChecked) => {
    updateProFormFormData({
      ...proFormData,
      [fieldName]: isChecked ? 1 : 0,
      is_standard_announcement: isChecked
        ? 0
        : proFormData.is_standard_announcement,
    });
    if (isChecked) {
      setannoucmentError(null);
    }
  };
  const handleCheckboxis_is_term = (fieldName, isChecked) => {
    updateProFormFormData({
      ...proFormData,
      [fieldName]: isChecked ? 1 : 0,
    });
    if (isChecked) {
      setTermsError(null);
    }
  };

  const handleCheckbox_is_pricing_policy = (fieldName, isChecked) => {
    console.log("Pricing policy checkbox clicked:", isChecked);
    updateProFormFormData({
      ...proFormData,
      [fieldName]: isChecked ? 1 : 0,
    });
    if (isChecked) {
      setTermsError(null);
    }
  };

  const handleSubmitFormData = async () => {
    let isValid = true;
    if (proFormData.category_id == "1") {
      if (proFormData?.event_category_ids?.length == 0) {
        setEventError("Please select at least one event");
        isValid = false;
      } else {
        setEventError(null);
      }
      if (
        proFormData?.is_allow_booking_of_table == 0 &&
        proFormData?.is_allow_privatization_of_venue == 0
      ) {
        setBookingTypeError("Please select at least one");
        isValid = false;
      } else {
        setBookingTypeError(null);
      }
      if (
        proFormData?.is_allow_privatization_of_venue == 1 &&
        (proFormData?.min_budget == "" || !proFormData?.min_budget)
      ) {
        setBugutError("Budget required");
        isValid = false;
      } else {
        setBugutError(null);
      }
      console.log(
        proFormData?.is_term,
        proFormData?.is_pricing_policy,
        "check data"
      );
      if (
        proFormData?.is_standard_announcement == 0 &&
        proFormData?.premium_announcement == 0
      ) {
        setannoucmentError("Please choose an announcement type");
        isValid = false;
      } else {
        setannoucmentError(null);
      }
      if (proFormData?.is_term !== 1 || proFormData?.is_pricing_policy !== 1) {
        setTermsError("Please Accept Policies");
        isValid = false;
      } else {
        setTermsError(null);
      }
    } else if (proFormData.category_id == "2") {
      if (proFormData?.event_category_ids?.length == 0) {
        setEventError("Please select at least one event");
        isValid = false;
      } else {
        setEventError(null);
      }

      if (
        proFormData?.is_standard_announcement == 0 &&
        proFormData?.premium_announcement == 0
      ) {
        setannoucmentError("Please choose an announcement type");
        isValid = false;
      } else {
        setannoucmentError(null);
      }
      if (proFormData?.is_term !== 1 || proFormData?.is_pricing_policy !== 1) {
        setTermsError("Please Accept Policies");
        isValid = false;
      } else {
        setTermsError(null);
      }
    } else {
      if (
        proFormData?.is_standard_announcement == 0 &&
        proFormData?.premium_announcement == 0
      ) {
        setannoucmentError("Please choose an announcement type");
        isValid = false;
      } else {
        setannoucmentError(null);
      }
      if (proFormData?.is_term !== 1 || proFormData?.is_pricing_policy !== 1) {
        setTermsError("Please Accept Policies");
        isValid = false;
      } else {
        setTermsError(null);
      }
    }

    if (isValid) {
      if (proFormData.category_id == "1") {
        try {
          setLoading(true);
          if (state?.id) {
            const updatedFormData = {
              ...proFormData,

              edit_id: state.id,
            };
            const response = await NonAuthService.add_edit_venue(
              updatedFormData
            );
            console.log("venue form data", response);
            toast.success("Announcement has been Edited successfully");
            updateProFormFormData({});
            navigate("/myannouncements");
          } else {
            const response = await NonAuthService.add_edit_venue(proFormData);
            console.log("venue form data", response);
            toast.success("Announcement has been created successfully");
            navigate("/myannouncements");
          }
          setLoading(false);
        } catch (error) {
          console.log(error, "venue form data jsd");
          toast(error);
          setLoading(false);
        }
      } else if (
        proFormData.category_id == "3" ||
        proFormData.category_id == "4"
      ) {
        try {
          // if (proFormData.min_budget == ("" || 0)) {
          //   proFormData.min_budget == "0.00";
          // }
          setLoading(true);

          if (state?.id) {
            const updatedFormData = {
              ...proFormData,

              edit_id: state.id,
            };
            const response = await NonAuthService.add_edit_rental_and_service(
              updatedFormData
            );
            console.log("Rental form data", response);
            toast.success("Announcement has been Edited successfully");
            navigate("/myannouncements");
            updateProFormFormData({});
          } else {
            const response = await NonAuthService.add_edit_rental_and_service(
              proFormData
            );
            console.log("Rental form data", response);
            toast.success("Announcement has been created successfully");
            navigate("/myannouncements");
            updateProFormFormData({});
            console.log(proFormData);
          }
          setLoading(false);
        } catch (error) {
          console.log(error, "Rental form data jsd");
          toast(error);
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);

          if (state?.id) {
            const updatedFormData = {
              ...proFormData,

              edit_id: state.id,
            };
            const response = await NonAuthService.add_edit_entertainment(
              updatedFormData
            );
            console.log("entertanment", response);
            toast.success("Announcement has been Edited successfully");
            navigate("/myannouncements");
            updateProFormFormData({});
            console.log(proFormData);
            setLoading(false);
          } else {
            const response = await NonAuthService.add_edit_entertainment(
              proFormData
            );

            toast.success("Announcement has been created successfully");
            navigate("/myannouncements");
            updateProFormFormData({});
            setLoading(false);
          }
        } catch (error) {
          console.log(error, "Rental form data jsd");
          toast(error);
          setLoading(false);
        }
      }
    } else {
      console.log(annoucmentError, eventError, "check that ");
    }
  };

  return (
    <>
      <div className="text-2xl text-secondary  font-con border-b-[1px] border-borde py-5 px-10">
        {t("createAnn")}
      </div>
      {location.pathname == "/Rental/myannouncementss" ||
      location.pathname == "/Services/myannouncementss" ? (
        <></>
      ) : (
        <div className="mt-3 px-10">
          <div>
            <h2 className="font-con text-2xl pb-2">{t("acptevt")}</h2>
            <div className="flex flex-col md:flex-row md:flex-wrap   gap-2 ">
              {eventsData.map((labelData) => (
                <div
                  className="flex justify-start items-baseline basis-1/5"
                  key={labelData.id}
                >
                  <input
                    type="checkbox"
                    id={labelData.id}
                    className="checkbox-input p-1"
                    onChange={(e) =>
                      handleCheckboxChangeEvents(labelData.id, e.target.checked)
                    }
                    checked={proFormData.event_category_ids.includes(
                      labelData.id
                    )}
                  />
                  <label htmlFor={labelData.id} className="font-pop ps-2">
                    {labelData?.[`event_category_name_${languagedata}`]}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {eventError && <p className="text-red-500">{eventError}</p>}
        </div>
      )}

      {location.pathname == "/Entertainment/myannouncementss" ? (
        <></>
      ) : (
        <>
          {proFormData?.category_id == "1" ||
          proFormData?.category_id == "2" ? (
            <div className="mt-3 px-10">
              <h2 className="text-2xl font-con  pb-2">
                {t("Accepted Kinds Of Booking")}
              </h2>

              <div className="flex flex-wrap gap-4">
                <div className=" flex justify-start items-baseline ">
                  <input
                    type="checkbox"
                    className="checkbox-input p-1"
                    checked={proFormData?.is_allow_booking_of_table == 1}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "is_allow_booking_of_table",
                        e.target.checked
                      )
                    }
                  />
                  <label htmlFor="" className="font-pop ps-2 ">
                    {t("Allow Booking Of Tables")}
                  </label>
                </div>

                <div className=" flex flex-col md:flex-row gap-2 md:gap-0 justify-start items-baseline ">
                  <div className=" flex justify-start items-baseline ">
                    <input
                      type="checkbox"
                      className="checkbox-input p-1"
                      checked={
                        proFormData?.is_allow_privatization_of_venue == 1
                      }
                      onClick={(e) =>
                        handleCheckboxColorChange(
                          "is_allow_privatization_of_venue",
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor="" className="font-pop ps-2 ">
                      {t("Allow Privatisation Of The Venue")}
                    </label>
                  </div>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={proFormData?.min_budget ?? ""}
                    onChange={(e) =>
                      handleInputChange("min_budget", e.target.value)
                    }
                    placeholder="Minimum budget"
                    readOnly={proFormData?.is_allow_privatization_of_venue == 0}
                    className={`ms-3 border-2 focus:outline-none px-2 ${
                      highlighted ? "highlightedd" : "hight"
                    }`}
                  />
                </div>
                {bugdeutError && <p className="text-red-500">{bugdeutError}</p>}
                {bookintypeError && (
                  <p className="text-red-500">{bookintypeError}</p>
                )}
                <div></div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
      <div className="mt-3 px-10">
        <div className="flex   pb-2">
          <h2 className="text-2xl font-con flex items-center gap-2">
            {t("Premium Announcement")}{" "}
            <span
              className="info-icon"
              title="Premium announcements are shown as top results on the starting page and on top of the search results"
            >
              {" "}
              <BsFillInfoCircleFill
                className="info-icon"
                color="#8D303A"
                size={16}
              />
            </span>
          </h2>{" "}
        </div>
        <h2 className="pb-4 mt-2 text-xl">
          {t("Do you want to create your announcement as premium or standard")}
        </h2>
        <div className="flex flex-wrap gap-7">
          <div className=" flex justify-start items-baseline ">
            <input
              type="checkbox"
              className="checkbox-input p-1"
              checked={proFormData?.is_standard_announcement == 1}
              onChange={(e) =>
                handleCheckboxis_standard_announcement(
                  "is_standard_announcement",
                  e.target.checked
                )
              }
            />
            <label htmlFor="" className="font-pop ps-2 ">
              {t("Standard Announcement")}
            </label>
          </div>
          <div className=" flex justify-start items-baseline ">
            <input
              type="checkbox"
              className="checkbox-input p-1"
              checked={proFormData?.premium_announcement == 1}
              onChange={(e) =>
                handleCheckboxpremium_announcement(
                  "premium_announcement",
                  e.target.checked
                )
              }
            />
            <label htmlFor="" className="font-pop ps-2 ">
              {t("Premium Announcement")}
            </label>
          </div>
        </div>
        {annoucmentError && <p className="text-red-500">{annoucmentError}</p>}
      </div>
      <h2 className="text-2xl font-con ml-10 mt-4 pb-2">
        {t("Our Terms & Conditions")}
      </h2>
      <div className="flex flex-col mx-10  gap-5 flex-wrap  ">
        <div className="  flex justify-start items-baseline ">
          <input
            type="checkbox"
            className="checkbox-input p-1"
            checked={proFormData?.is_term == 1}
            onChange={(e) =>
              handleCheckboxis_is_term("is_term", e.target.checked)
            }
          />

          <label htmlFor="" className="font-pop ps-2 ">
            <Link onClick={() => ToggalModal(1)} className=" text-[#352c80] ">
              {t("I have read and accept the general terms and conditions")}
            </Link>
          </label>
        </div>
        <div className="   flex justify-start items-baseline ">
          <input
            type="checkbox"
            className="checkbox-input p-1"
            checked={proFormData?.is_pricing_policy == 1}
            onChange={(e) =>
              handleCheckbox_is_pricing_policy(
                "is_pricing_policy",
                e.target.checked
              )
            }
          />
          <label htmlFor="" className="font-pop ps-2 ">
            <Link onClick={() => ToggalModal(3)} className=" text-[#352c80] ">
              {t("I have read and accept the pricing policy")}
            </Link>
          </label>
        </div>
      </div>

      {termsError && <p className=" ml-10 text-red-500">{termsError}</p>}

      <div className="flex justify-between items-center mt-16 px-10">
        <Button onClick={() => navigate(-1)} type="grayButton">
          {t("Back")}
        </Button>

        <Button
          disabled={loading}
          onClick={handleSubmitFormData}
          type="purpleButton"
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
              {t("Submiting...")}
            </>
          ) : (
            <>{t("submit")}</>
          )}
        </Button>
      </div>
      <MyModal pageID={pageId} toogleModal={ToggalModal} isOpen={isOpen} />
    </>
  );
}
export default AnnouncementStep3;
