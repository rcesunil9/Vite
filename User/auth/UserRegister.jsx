import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import authBackground from "../../../assets/auth-background.jpeg";
import Logo from "../../../assets/logo.png";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../../api/service/AuthService";
import "./style.css";
import { Link } from "react-router-dom";
const UserRegister = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [contactName, setContactName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registered, setRegistered] = useState(false);

  const [validRegister, setValidRegister] = useState("");

  const RegisterHandler = async () => {
    try {
      const response = await AuthService.handleRegister({
        user_name: name,
        email,
        phone: phoneNumber,
        // contact_name: contactName,
        // address,
        password,
        confirm_password: confirmPassword,
        user_type: 3,
      });
      // Optionally, you can perform additional actions after successful registration
      if (response) {
        console.log(response, "Registration successful");
        setRegistered(true);
      }
    } catch (error) {
      // console.error("Registration failed:", error);
      setValidRegister(` ${error.message}`);
      // Handle registration failure
    }
  };

  return (
    <div className="relative w-full h-[100vh] flex items-center justify-center">
      <img
        src={authBackground}
        className="absolute z-1 w-full h-full object-cover top-0"
        alt=""
      />
      <div className="flex flex-col items-center relative bg-white lg:w-[60%] md:w-[80%] w-[95%] z-10 p-8 rounded-lg opacity-90">
        <Link className=" absolute top-3 left-3 " to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <path strokeDasharray={20} strokeDashoffset={20} d="M21 12H3.5">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.3s"
                  values="20;0"
                ></animate>
              </path>
              <path
                strokeDasharray={12}
                strokeDashoffset={12}
                d="M3 12L10 19M3 12L10 5"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.3s"
                  dur="0.2s"
                  values="12;0"
                ></animate>
              </path>
            </g>
          </svg>
        </Link>
        <Link to="/">
          <img className="w-[167px]" src={Logo} alt="" />
        </Link>
        <p className="text-primary text-2xl mb-2 font-semibold">
          {t("User Register")}
        </p>

        {!registered && (
          <div className="flex flex-col items-center w-[100%] justify-around">
            <form
              className="flex sm:flex-row w-full flex-col flex-wrap justify-around items-center gap-2"
              action=""
            >
              <Input
                placeholder={t("name")}
                type="text"
                classes="small"
                value={name}
                onChange={setName}
              />
              <Input
                placeholder={t("email")}
                type="email"
                classes="small"
                value={email}
                onChange={setEmail}
              />
              <Input
                placeholder={t("phoneNum")}
                type="number"
                classes="small"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
              {/* <Input
              placeholder={t("Name Of Contact")}
              type="text"
              classes="small"
              value={contactName}
              onChange={setContactName}
            /> */}
              {/* <Input
                placeholder={t("address")}
                type="text"
                classes="small"
                value={address}
                onChange={setAddress}
              /> */}
              <Input
                value={password}
                onChange={setPassword}
                placeholder={t("password")}
                type="password"
                classes="small"
              />
              <Input
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder={t("Confirm Password")}
                type="password"
                classes="large"
              />
              <Button onClick={RegisterHandler} type="purpleButton">
                {t("register")}
              </Button>
            </form>
            {validRegister !== "" && (
              <div className="text-sm text-red-500 ml-1 mt-2">
                {validRegister}
              </div>
            )}
            <div className=" w-full flex justify-between mt-4 gap-y-2 flex-wrap items-center ">
              <Button to="/userLogin" className="mt-6">
                {t("alreadyHaveAnAccount")} {t("login")}
              </Button>
              <Button to="/ProfessionalRegister" className="mt-4">
                {t("Continue as Professional?")} {t("SingUp")}
              </Button>
            </div>
          </div>
        )}

        {registered && (
          <div className="flex flex-col items-center w-[100%] justify-around gap-4 loader">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 130.2 130.2"
            >
              <circle
                class="path circle"
                fill="none"
                stroke="#73AF55"
                stroke-width="6"
                stroke-miterlimit="10"
                cx="65.1"
                cy="65.1"
                r="62.1"
              />
              <polyline
                class="path check"
                fill="none"
                stroke="#73AF55"
                stroke-width="6"
                stroke-linecap="round"
                stroke-miterlimit="10"
                points="100.2,40.2 51.5,88.8 29.8,67.5 "
              />
            </svg>
            <p>{t("Thankyou for registering, please confirm your e-mail")}</p>
            <Button to="/userLogin" type="purpleButton">
              {t("Login")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRegister;
