import { React, useState, useEffect, useContext } from "react";
import { Modal, Select } from "flowbite-react";
import Button from "../../../ui/Button";
import * as NonAuthService from "../../api/service/NonAuthService";
import DataContext from "../../../Context/DataContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FilterContext from "../../../Context/FilterContext";
import { useTranslation } from "react-i18next";
import LanguageContext from "../../../Context/LanguageContext";

function VenueModal({ isModalOpen, setIsModalOpen, closeModal }) {
  // console.log(isModalOpen, "Venue Modal");
  const [modalSize, setModalSize] = useState("md");
  const { eventsData } = useContext(DataContext);
  const { setFilterData } = useContext(FilterContext);
  const { t } = useTranslation();
  const { languagedata } = useContext(LanguageContext);
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key == "Escape") {
        closeModal();
      }
    };

    const handleClickOutside = (event) => {
      const modalContent = document.querySelector(".modal-content");

      if (modalContent && !event.target.closest(".modal-content")) {
        // Close the modal if the click is outside the modal content and not on the excluded class
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);
  const validationSchema = Yup.object().shape({
    event_category_ids: Yup.string().required("Event kind is required"),

    min_capacity: Yup.number()
      .required("Number of people is required")
      .positive("Number of people should positive number"),
    capcity_type: Yup.string().required("Event style is required"),
    min_budget: Yup.number().required("Budget is required"),
  });

  // Formik hook with validation schema
  const formik = useFormik({
    initialValues: {
      event_category_ids: "",
      bookingType: "", // Initially no selection
      is_allow_privatization_of_venue: "0", // Default value
      is_allow_booking_of_table: "0", // Default value
      min_capacity: "",
      capcity_type: "0",
      min_budget: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setFilterData(values);
      console.log("Form submitted with values:", values);
      navigate("/filterVenues");
      closeModal();
    },
  });
  const handleBookingTypeChange = (event) => {
    const selectedBookingType = event.target.value;

    formik.setValues({
      ...formik.values,
      bookingType: selectedBookingType,
      is_allow_privatization_of_venue: selectedBookingType == "1" ? "1" : "0",
      is_allow_booking_of_table:
        selectedBookingType == "Book a table" ? "1" : "0",
    });
  };

  return (
    <>
      <Modal className="" show={isModalOpen} onClose={closeModal}>
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white overflow-y-scroll h-[100vh] md:h-fit mx-2 modal-content rounded-lg shadow-lg ">
            <Modal.Header className="!border-none"></Modal.Header>
            <Modal.Body className="px-4 pb-3">
              <div className="text-center font-con text-2xl text-secondary">
                {t("Venue")}
              </div>
              <div className="grid lg:grid-cols-2 py-3 gap-2">
                <div className="flex flex-col">
                  <label htmlFor="" className="font-pop ">
                    <h2>{t("whatWant")} ?</h2>
                  </label>
                  <select
                    name="event_category_ids"
                    value={formik.values.event_category_ids}
                    onChange={formik.handleChange}
                    id=""
                    className="font-lato  rounded border border-borde focus:outline-none py-2"
                  >
                    <option value="">{t("Select")}</option>
                    {eventsData.map((category, index) => (
                      <option value={category.id} key={index}>
                        {category?.[`event_category_name_${languagedata}`]}
                      </option>
                    ))}
                  </select>
                  {formik.touched.event_category_ids &&
                    formik.errors.event_category_ids && (
                      <div className="text-red-500">
                        {formik.errors.event_category_ids}
                      </div>
                    )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-pop ">
                    {t("Do you want to privatise a venue or book a table")} ?
                  </label>
                  <select
                    name="bookingType"
                    value={formik.values.bookingType}
                    onChange={handleBookingTypeChange}
                    id=""
                    className="font-lato  rounded border border-borde focus:outline-none py-2"
                  >
                    <option value="">{t("Select an option")}</option>
                    <option value="1">{t("Privatise")}</option>
                    <option value="Book a table">{t("Book a table")}</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-pop ">
                    <h2>{t("How many people will you be")}?</h2>
                  </label>
                  <input
                    type="number"
                    name="min_capacity"
                    value={formik.values.min_capacity}
                    onChange={formik.handleChange}
                    id=""
                    placeholder={t("How many people will you be")}
                    className="font-lato  rounded border border-borde focus:outline-none  p-2"
                  />
                  {formik.touched.min_capacity &&
                    formik.errors.min_capacity && (
                      <div className="text-red-500">
                        {formik.errors.min_capacity}
                      </div>
                    )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-pop ">
                    {t("Do you plan a sitting or standing event")}?
                  </label>
                  <select
                    name="capcity_type"
                    value={formik.values.capcity_type}
                    onChange={formik.handleChange}
                    id=""
                    className="font-lato  rounded border border-borde focus:outline-none p-2"
                  >
                    <option value="0">{t("Sitting")}</option>
                    <option value="1">{t("Standing")}</option>
                  </select>
                  {formik.touched.capcity_type &&
                    formik.errors.capcity_type && (
                      <div className="text-red-500">
                        {formik.errors.capcity_type}
                      </div>
                    )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="" className="font-pop ">
                    <h2>{t("What is your maximum budget")}? </h2>
                  </label>
                  <input
                    type="number"
                    name="min_budget"
                    value={formik.values.min_budget}
                    onChange={formik.handleChange}
                    id=""
                    placeholder="Budget"
                    className="font-lato  rounded border border-borde focus:outline-none p-2"
                  />
                  {formik.touched.min_budget && formik.errors.min_budget && (
                    <div className="text-red-500">
                      {formik.errors.min_budget}
                    </div>
                  )}
                </div>
                <div className="lg:col-span-2 font-pop  text-white  flex justify-center">
                  <Button onClick={formik.handleSubmit} type="purpleButton">
                    {t("submit")}
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default VenueModal;
