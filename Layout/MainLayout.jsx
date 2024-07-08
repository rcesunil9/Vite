import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/User/Footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/User/Header/Header";
import DataContext from "../Context/DataContext";
// import * as NonAuthService from "../components/api/service/NonAuthService"

function MainLayout() {
  const { categoryData, subcategoryData } = useContext(DataContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Header categoryData={categoryData} subcategoryData={subcategoryData} />

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;
