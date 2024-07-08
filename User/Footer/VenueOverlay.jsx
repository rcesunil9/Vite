import { useEffect } from "react";
import React from "react";
import Button from "../../../ui/Button";
import "./overlay.css";
import { IoMdClose } from "react-icons/io";

const VenueOverlay = ({ closeModal }) => {
  const { eventsData } = useContext(DataContext);
  const { setFilterData } = useContext(FilterContext);
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
      document.removeEventListener(
        "mousedown keydown",
        handleClickOutside,
        handleKeyDown
      );
    };
  }, [closeModal]);
  const category = [
    { value: "", label: "Select" },
    { value: "Birthday", label: "Birthday" },
    { value: "Wedding", label: "Wedding" },
    { value: "Anniversary", label: "Anniversary" },
    { value: "Family Gathering", label: "Family Gathering" },
    { value: "Concert/theatre show", label: "Concert/theatre show" },
    { value: "Product launch", label: "Product launch" },
    { value: "Afterwork", label: "Afterwork" },
    { value: "Conference", label: "Conference" },
    { value: "Business meeting", label: "Business meeting" },
    { value: "Gala/Ceremony", label: "Gala/Ceremony" },
  ];
  return (
    <div className="modal-overlay">
      <div className="bg-white text-black p-8 rounded-md modal-content relative">
        <IoMdClose
          className="absolute top-2 right-2"
          onClick={closeModal}
          size={24}
        />
        <div className="text-center font-con text-2xl text-secondary">
          Venue
        </div>
        <div className="grid lg:grid-cols-2 py-3 gap-2">
          <div className="flex flex-col">
            <label htmlFor="" className="font-pop ">
              <h2>What Kind Of Event Do You Want To Organise ?</h2>
            </label>
            <select
              name=""
              id=""
              className="font-lato  rounded border border-borde focus:outline-none py-2"
            >
              {category.map((category, index) => (
                <option value={category.value} key={index}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-pop ">
              Do you want to privatise a venue or book a table ?
            </label>
            <select
              name=""
              id=""
              className="font-lato  rounded border border-borde focus:outline-none py-2"
            >
              <option value="">Privatise</option>
              <option value="">Book a table</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-pop ">
              <h2>How many people will you be?</h2>
            </label>
            <input
             type="number"
              name=""
              id=""
              min="1"
              placeholder="How many people will you be?"
              className="font-lato  rounded border border-borde focus:outline-none py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-pop ">
              Do you plan a sitting or standing event?
            </label>
            <select
              name="capcity_type"
              id=""
              className="font-lato  rounded border border-borde focus:outline-none py-2"
            >
              <option value="0">Sitting</option>
              <option value="1">Standing</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="font-pop ">
              <h2>What is your maximum budget? </h2>
            </label>
            <input
              type="number"
              name=""
              id=""
              placeholder="Budget"
              className="font-lato  rounded border border-borde focus:outline-none py-2"
            />
          </div>
          <div className="lg:col-span-2 font-pop  text-white  flex justify-center">
            <Button onClick={closeModal} to="/filterVenues" type="purpleButton">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueOverlay;
