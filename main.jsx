import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LanguageProvider } from "./Context/LanguageContext.jsx";
import { DataProvider } from "./Context/DataContext.jsx";
import { ProFormDataProvider } from "./components/Professionals/pages/ProDashboard/proFormDataContext/ProFormDataContext.jsx";
import { FilterProvider } from "./Context/FilterContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <DataProvider>
      <FilterProvider>
        <ProFormDataProvider>
          <App />
        </ProFormDataProvider>
      </FilterProvider>
    </DataProvider>
  </LanguageProvider>
);
