import React, { createContext, useState, useContext } from "react";

const ProFormDataContext = createContext();

export const useProFormDataContext = () => {
  return useContext(ProFormDataContext);
};

export const ProFormDataProvider = ({ children }) => {
  const [proFormData, setProFormData] = useState({
    // Initialize proFormData with empty values or null
    category_id: "",
    sub_category_id: "",
    // phone: "",
    // website: "",
    // selectedAddress: null,
    // description: "",
    // venueSize: "",
    // maxCapSit: "",
    // maxCapStand: "",
    // maxPark: "",
    // cateringChoice: "",
    // kindOfCuisine:"",
    is_standard_announcement: "0",
    premium_announcement: "0",
    is_allow_booking_of_table: "0",
    is_allow_privatization_of_venue: "0",
    // uploadPic: [], // Initialize as an empty array to store image data
    features_id: [], // Initialize as an empty array to store checkbox data
    sub_feature_ids: [],
    sub_sub_feature_ids: [],
    event_category_ids: [],
  });

  const updateProFormFormData = (data) => {
    setProFormData((prevData) => ({
      ...data,
    }));
  };

  return (
    <ProFormDataContext.Provider value={{ proFormData, updateProFormFormData }}>
      {children}
    </ProFormDataContext.Provider>
  );
};

export default ProFormDataContext;
