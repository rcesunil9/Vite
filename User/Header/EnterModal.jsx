import React, { useContext, useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import Button from "../../../ui/Button";
import * as NonAuthService from "../../api/service/NonAuthService";
import DataContext from "../../../Context/DataContext";
import LanguageContext from "../../../Context/LanguageContext";
import { useTranslation } from "react-i18next";

function EnterModal({ isModalOpen, setIsModalOpen, closeModal }) {
  const [categoryData, setCatagoryData] = useState([]);
  const { eventsData } = useContext(DataContext);
  const { languagedata } = useContext(LanguageContext);
  const { t } = useTranslation();
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

  return (
    <Modal show={isModalOpen} onClose={closeModal}>
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="bg-white mx-2 rounded-lg modal-content shadow-lg ">
          <Modal.Header className="!border-none"></Modal.Header>
          <Modal.Body className="px-3">
            <div className="text-center font-con text-2xl text-secondary">
              {t("Music")}
            </div>
            <div className="flex flex-col py-3 ">
              <label htmlFor="" className="font-pop ">
                <h2>{t("whatWant")} ?</h2>
              </label>
              <select
                name=""
                id=""
                className="font-lato font-medium rounded border border-borde focus:outline-none py-2"
              >
                <option value="">{t("Select")}</option>
                {eventsData.map((category, index) => (
                  <option value={category.id} key={index}>
                    {category[`event_category_name_${languagedata}`]}
                  </option>
                ))}
              </select>
            </div>
            <div className="font-pop text-white flex justify-center">
              <Button to="/filterEnt" onClick={isModalOpen} type="purpleButton">
                {t("submit")}
              </Button>
            </div>
          </Modal.Body>
        </div>
      </div>
    </Modal>
  );
}

export default EnterModal;
