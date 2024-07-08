import { useEffect } from 'react'
import React from 'react'
import Button from '../../../ui/Button'
import './overlay.css'
import { IoMdClose } from "react-icons/io";
const EntOverlay = ({ closeModal }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key == 'Escape') {
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
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown)
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
    <div className='modal-overlay'>
        <div className='bg-white text-black p-8 rounded-md modal-content relative'>
          <IoMdClose className='absolute top-2 right-2' onClick={closeModal} size={24} />
        <div className="text-center font-con text-2xl text-secondary">
              Entertainment
            </div>
            <div className="flex flex-col py-3">
              <label htmlFor="" className="font-pop ">
                <h2>What Kind Of Event Do You Want To Organise ?</h2>
              </label>
              <select
                name=""
                id=""
                className="font-lato font-medium rounded border border-borde focus:outline-none py-2"
              >
                {category.map((category, index) => (
                  <option value={category.value} key={index}>{category.label}</option>
                ))}
              </select>
            </div>
            <div className="font-pop text-white flex justify-center">
              <Button onClick={closeModal} to='/filterEnt' type="purpleButton">Submit</Button>
            </div>
        </div>
    </div>
  )
}

export default EntOverlay