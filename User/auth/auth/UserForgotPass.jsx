import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import authBackground from "../../../assets/auth-background.jpeg";
import Logo from "../../../assets/logo.png";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import * as AuthService from "../../api/service/AuthService";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
const ForgotPass = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const handleForgetPassword = async () => {
    try {
      const response = await AuthService.handleForgetPassword({ email });
      Swal.fire({
        title: "Good job!",
        text: response.message ,
        icon: "success"
      });
    } catch (error) {
      console.log(error);
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
        <img className="w-[167px]" src={Logo} alt="" />
        <div className="flex flex-col items-center w-[100%] justify-around">
          {/* <input type="text" placeholder='Name' className='border-2 text-[#CACACA] h-[]' /> */}
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
            {/* <Input placeholder={t('newpassword')} type="password" classes="large"  />
            <Input placeholder={t('verpassword')} type="password" classes="large"  /> */}
            <Button onClick={handleForgetPassword} type="purpleButton">
              {t("submit")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
