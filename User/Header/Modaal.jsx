import React from "react";
import { Button, Modal } from "flowbite-react";
import VenueModal from "./VenueModal";
import EnterModal from "./EnterModal";
// function Modaal({ isModalOpen, setIsModalOpen })

function Modaal({ isModalOpen, setIsModalOpen, category, closeModal }) {
  console.log(category)
  if (category == "Venue" || category == "Venues"  || category == "1") {
    return (
      <VenueModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} closeModal={closeModal} />
    );
  } else {
    return (
      <EnterModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} closeModal={closeModal} />
    );
  }
}

export default Modaal;
