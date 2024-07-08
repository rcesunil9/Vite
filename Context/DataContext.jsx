// DataContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import * as NonAuthService from "../components/api/service/NonAuthService"
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState([]);

  // Any other logic to fetch or manage your data

  const [eventsData, setEventsData] = useState([])


  // Any other logic to fetch or manage your data

  const getEventCategory = async () => {
    try{
      const response = await NonAuthService.event_category()
      if(response){
        setEventsData(response);
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const getCategory = async () => {
    try {
      const response = await NonAuthService.getCategory();
      if (response) {
        setCategoryData(response);
        // Create an array to store promises for fetching subcategories
        const subCategoryPromises = response.map(item => NonAuthService.get_sub_category({ category_id: item.id }));
        // Wait for all subcategory promises to resolve
        const subCategories = await Promise.all(subCategoryPromises);
        // Flatten the array of arrays into a single array
        const allSubCategories = subCategories.flat();
        // Now you have all subcategory data in allSubCategories
        setSubcategoryData(allSubCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
    getEventCategory();
  }, []);

  return (
    <DataContext.Provider value={{ categoryData, setCategoryData, subcategoryData, setSubcategoryData, eventsData, setEventsData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
