import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import ProLayout from "./components/Professionals/prolayout/ProLayout";
import MyAccount from "./components/Professionals/pages/Myaccount/MyAccount";
import MyAnnouncements from "./components/Professionals/pages/MyAnnouncements/MyAnnouncements";
import Prodashboard from "./components/Professionals/pages/ProDashboard/Prodashboard";
import Register from "./components/Professionals/auth/Register";
import VenuesForm from "./components/Professionals/pages/ProDashboard/VenuesForm/VenuesForm";
import EntertainmentForm from "./components/Professionals/pages/ProDashboard/EntertainmentForm/EntertainmentForm";
import Rental from "./components/Professionals/pages/ProDashboard/rentalForm/Rental";
import ServicesForm from "./components/Professionals/pages/ProDashboard/servicesForm/ServicesForm";
import AnnouncementStep3 from "./components/Professionals/pages/ProDashboard/createAnnouncementStep3/AnnouncementStep3";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./Languages/i18n";
import UserLogin from "./components/User/auth/UserLogin";
import UserRegister from "./components/User/auth/UserRegister";
import UserForgotPass from "./components/User/auth/UserForgotPass";
import LandingPage from "./components/User/LandingPage/LandingPage";
import Header from "./components/User/Header/Header";
import Details from "./components/User/PropertyDetails/CardDetails";
import FilterVenues from "./components/User/filterPages/FilterVenues";
import FilterRentalAndService from "./components/User/filterPages/FilterRentalAndService";
import FilterEntertainment1 from "./components/User/filterPages/FilterEntertainment1";
import Profile from "./components/User/ProfilePage/Profile";
import Favourites from "./components/User/Favourites/Favourites";
import TermCondition from "./components/User/TermCondition/TermCondition";
import MainLayout from "./Layout/MainLayout";
import Login from "./components/Professionals/auth/Login";
import ForgotPass from "./components/Professionals/auth/ForgotPass";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageProvider } from "./Context/LanguageContext";
import PrivcyAndPolicy from "./components/User/TermCondition/PrivicyPloicy";
// import ViewVenuePage from './components/Professionals/pages/VIewProperty/ViewVenuePage';
// import ViewEntPage from './components/Professionals/pages/VIewProperty/ViewEntPage';
// import ViewRentalServicesPage from './components/Professionals/pages/VIewProperty/ViewRentalServicesPage';
import BlogDetails from "./components/User/PropertyDetails/BlogDetails";
import BlogListPage from "./components/User/PropertyDetails/BlogListPage";
import PricingPolicy from "./components/User/TermCondition/PricingPlicy";
import ScrollToTop from "./ui/ScrollSmoth";
import ResetPassword from "./components/Professionals/auth/ResetPassword";

function App() {
  const { i18n } = useTranslation();

  // if (localStorage.getItem("lang")) {
  //   i18n.changeLanguage(localStorage.getItem("lang") ?? "en");
  // } else {
  //   i18n.changeLanguage("en");
  // }
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>

        
          <Routes>
            {/* {/           {/ User Routes /} /} */}
            <Route path="/userLogin" element={<UserLogin />} />
            <Route path="/userRegister" element={<UserRegister />} />

            <Route path="/userForgotpass" element={<UserForgotPass />} />
            <Route path="/restePassword/:id" element={<ResetPassword />} />
            <Route element={<MainLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="/filterVenues" element={<FilterVenues />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/filterEnt" element={<FilterEntertainment1 />} />
              <Route path="/filter" element={<FilterRentalAndService />} />
              <Route path="/fav" element={<Favourites />} />
              <Route path="/terms&condition" element={<TermCondition />} />
              <Route path="/pricing&policy" element={<PricingPolicy />} />
              <Route path="/privcy&policy" element={<PrivcyAndPolicy />} />
              <Route path="/details/:pid/:id" element={<Details />} />
              <Route path="/bloglist" element={<BlogListPage />} />
              <Route path="/blogdetails/:id" element={<BlogDetails />} />
            </Route>
            {/* {/           {/ Professional Routes /} /} */}
            <Route path="/ProfessionalRegister" index element={<Register />} />
            <Route path="/ProfessionalLogin" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPass />} />
            <Route element={<ProLayout />}>
              <Route
                path="/ProfessionalDashboard"
                element={<Prodashboard index="0" />}
              />
              <Route path="/myaccount" element={<MyAccount />} />
              <Route path="/venues" element={<VenuesForm />} />
              <Route path="/Entertainment" element={<EntertainmentForm />} />
              <Route path="/Rental" element={<Rental />} />
              <Route path="/Services" element={<ServicesForm />} />
              <Route path="/myannouncements" element={<MyAnnouncements />} />
              <Route
                path="/Venues/myannouncementss"
                element={<AnnouncementStep3 />}
              />
              <Route
                path="/Entertainment/myannouncementss"
                element={<AnnouncementStep3 />}
              />
              <Route
                path="/Rental/myannouncementss"
                element={<AnnouncementStep3 />}
              />
              <Route
                path="/Services/myannouncementss"
                element={<AnnouncementStep3 />}
              />
              {/* <Route path='/edit/Venue' element={<ViewVenuePage />} /> */}
              {/* <Route path='/edit/Entertainment' element={<ViewEntPage />} />
            <Route path='/edit/Rental-Services' element={<ViewRentalServicesPage />} /> */}
            </Route>
          </Routes>
        </LanguageProvider>
        <ToastContainer />
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
