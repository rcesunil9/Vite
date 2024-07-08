import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import authBackground from "../../../assets/auth-background.jpeg";
import Logo from "../../../assets/logo.png";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { Link, useNavigate } from "react-router-dom";
import * as AuthService from "../../api/service/AuthService";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validRegister, setValidRegister] = useState("");

  const LoginHandler = async () => {
    try {
      console.log(email, "aaja plzz");
      console.log(password, "password");
      const response = await AuthService.loginAccount({ email, password });
      if (response) {
        // Check if user_type is 2 (professional)
        console.log(response.user_type, "check kro useer type");
        if (response.user_type == "2") {
          navigate("/ProfessionalDashboard");
        } else {
          
        }
      }
    } catch (error) {
      setValidRegister(`${error}`);
    }
  };

  return (
    <div className="relative w-full h-[100vh] flex items-center justify-center">
      <img
        src={authBackground}
        className="absolute z-1 w-full h-full object-cover top-0"
        alt=""
      />
      <div className="flex flex-col relative items-center bg-white lg:w-[40%] md:w-[60%] w-[95%] z-10 p-8 rounded-lg opacity-90">
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
        <Link to="/" >
          <img className="w-[167px]" src={Logo} alt="" />
        </Link>

        <p className="text-primary text-2xl mb-2 font-semibold">
          {t("Professional Login")}
        </p>

        <div className="flex flex-col items-center w-[100%] justify-around">
          {/* {/ <input type="text" placeholder='Name' className='border-2 text-[#CACACA] h-[]' /> /} */}
          <form
            className="flex sm:flex-row w-full flex-col flex-wrap justify-around items-center gap-2"
            action=""
          >
            <Input
              placeholder={t("email")}
              type="email"
              classes="large"
              value={email}
              onChange={setEmail}
            />
            <Input
              placeholder={t("password")}
              type="password"
              classes="large"
              value={password}
              onChange={setPassword}
            />
            <Button onClick={LoginHandler} type="purpleButton">
              {t("login")}
            </Button>
          </form>
          {validRegister !== "" && (
            <div className="text-sm text-red-500 ml-1 mt-2">
              {validRegister}
            </div>
          )}

          <div className="flex justify-between w-full mt-8">
            <Link className="p-2 border rounded-sm" to="/ProfessionalRegister">
              {t("createAcc")}
            </Link>
            <Link to="/forgotPassword" className="p-2 border rounded-sm">
              {t("forgotPass")}
            </Link>
          </div>
          <div className=" w-full flex justify-center  mt-2 ">
            <Button to="/userLogin" className="mt-6">
              {t("Continue as User?")} {t("login")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
