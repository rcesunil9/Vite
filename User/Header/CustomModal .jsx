import { useEffect } from "react";
import React from 'react';

const CustomModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key == 'Escape') {
        onClose();
      }
    };

      const handleClickOutside = (event) => {
        const modalContent = document.querySelector(".modal-content");
  
        if (modalContent && !event.target.closest(".modal-content")) {
          // Close the modal if the click is outside the modal content and not on the excluded class
          onClose();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener("mousedown keydown", handleClickOutside, handleKeyDown);
      };
    }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg modal-content">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-4">{content}</div>
      </div>
    </div>
  );
};

export default CustomModal;
