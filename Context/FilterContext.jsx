// DataContext.jsx
import React, { createContext, useEffect, useState } from "react";
import * as NonAuthService from "../components/api/service/NonAuthService";
const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterData, setFilterData] = useState(null);
  const [filterCatagorys, setFilterCatagorys] = useState(null);

  return (
    <FilterContext.Provider
      value={{
        filterData,
        setFilterData,
        filterCatagorys,
        setFilterCatagorys,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
