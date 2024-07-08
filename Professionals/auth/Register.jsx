import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import authBackground from "../../../assets/auth-background.jpeg";
import Logo from "../../../assets/logo.png";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { Link } from "react-router-dom";
import * as AuthService from "../../api/service/AuthService";
import "../../User/auth/style.css";

const Register = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactName, setContactName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [validRegister, setValidRegister] = useState("");

  const RegisterHandler = async () => {
    try {
      console.log(email, "aaja plzz");
      const response = await AuthService.handleRegister({
        user_name: name,
        email,
        phone: phoneNumber,
        company_name: contactName,
        address,
        password,
        confirm_password: confirmPassword,
        user_type: 2,
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

      <div className="flex flex-col relative items-center bg-white lg:w-[60%] md:w-[80%] w-[95%] z-10 p-8 rounded-lg opacity-90">
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
          {t("Professional Register")}
        </p>

        {!registered && (
          <div className="flex flex-col items-center w-[100%] justify-around">
            {/* {/ {/ <input type="text" placeholder='Name' className='border-2 text-[#CACACA] h-[]' /> /} /} */}
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
              <Input
                placeholder={t("nameOfC")}
                type="text"
                classes="small"
                value={contactName}
                onChange={setContactName}
              />
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
                classes="small"
              />
              <Input
                placeholder={t("address")}
                type="text"
                classes="textarea"
                value={address}
                onChange={setAddress}
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
            <div className=" flex w-full justify-between  items-center ">
              <span className="mt-4">
                {t("alreadyHaveAnAccount")}{" "}
                <Link to="/ProfessionalLogin"> {t("login")}</Link>
              </span>
              <span className="mt-2">
                {t("Continue as User?")}{" "}
                <Link to="/userRegister"> {t("SingUp")}</Link>
              </span>
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
            <p>{t("Thank you for registering. Please verify your e-mail")}.</p>
            <Button to="/ProfessionalLogin" type="purpleButton">
              {t("Login")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import authBackground from "../../../assets/auth-background.jpeg";
// import Logo from "../../../assets/logo.png";
// import Button from "../../../ui/Button";
// import Input from "../../../ui/Input";
// import { Link } from "react-router-dom";
// import * as AuthService from "../../api/service/AuthService";
// import "../../User/auth/style.css";

// const Register = () => {
//   const { t } = useTranslation();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [contactName, setContactName] = useState("");
//   const [address, setAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [registered, setRegistered] = useState(false);
//   const [validRegister, setValidRegister] = useState("");
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     let errors = {};
//     if (!name) errors.name = t("Name is required");
//     if (!email) {
//       errors.email = t("Email is required");
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = t("Email address is invalid");
//     }
//     if (!contactName) errors.contactName = t("Company name is required");
//     if (!password) {
//       errors.password = t("Password is required");
//     } else if (password.length < 6) {
//       errors.password = t("Password must be at least 6 characters");
//     }
//     if (password !== confirmPassword) errors.confirmPassword = t("Passwords do not match");

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const RegisterHandler = async () => {
//     if (!validate()) return;
//     try {
//       const response = await AuthService.handleRegister({
//         user_name: name,
//         email,
//         phone: phoneNumber,
//         company_name: contactName,
//         address,
//         password,
//         confirm_password: confirmPassword,
//         user_type: 2,
//       });
//       if (response) {
//         setRegistered(true);
//       }
//     } catch (error) {
//       setValidRegister(` ${error.message}`);
//     }
//   };

//   return (
//     <div className="relative w-full h-[100vh] flex items-center justify-center">
//       <img
//         src={authBackground}
//         className="absolute z-1 w-full h-full object-cover top-0"
//         alt=""
//       />

//       <div className="flex flex-col items-center bg-white lg:w-[60%] md:w-[80%] w-[95%] z-10 p-8 rounded-lg opacity-90">
//         <Link to="/">
//           <img className="w-[167px]" src={Logo} alt="" />
//         </Link>
//         <p className="text-primary text-2xl mb-2 font-semibold">
//           {t("Professional Register")}
//         </p>

//         {!registered && (
//           <div className="flex flex-col items-center w-[100%] justify-around">
//             <form
//               className="flex sm:flex-row w-full flex-col flex-wrap justify-around items-center gap-2"
//               onSubmit={(e) => { e.preventDefault(); RegisterHandler(); }}
//             >
//               <div className="w-full flex flex-col items-start">
//                 <Input
//                   placeholder={t("name")}
//                   type="text"
//                   classes="small"
//                   value={name}
//                   onChange={setName}
//                 />
//                 {errors.name && <span className="text-red-500">{errors.name}</span>}
//               </div>
//               <div className="w-full flex flex-col items-start">
//                 <Input
//                   placeholder={t("email")}
//                   type="email"
//                   classes="small"
//                   value={email}
//                   onChange={setEmail}
//                 />
//                 {errors.email && <span className="text-red-500">{errors.email}</span>}
//               </div>
//               <Input
//                 placeholder={t("phoneNum")}
//                 type="number"
//                 classes="small"
//                 value={phoneNumber}
//                 onChange={setPhoneNumber}
//               />
//               <div className="w-full flex flex-col items-start">
//                 <Input
//                   placeholder={t("nameOfC")}
//                   type="text"
//                   classes="small"
//                   value={contactName}
//                   onChange={setContactName}
//                 />
//                 {errors.contactName && <span className="text-red-500">{errors.contactName}</span>}
//               </div>
//               <div className="w-full flex flex-col items-start">
//                 <Input
//                   value={password}
//                   onChange={setPassword}
//                   placeholder={t("password")}
//                   type="password"
//                   classes="small"
//                 />
//                 {errors.password && <span className="text-red-500">{errors.password}</span>}
//               </div>
//               <div className="w-full flex flex-col items-start">
//                 <Input
//                   value={confirmPassword}
//                   onChange={setConfirmPassword}
//                   placeholder={t("Confirm Password")}
//                   type="password"
//                   classes="small"
//                 />
//                 {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
//               </div>
//               <Input
//                 placeholder={t("address")}
//                 type="text"
//                 classes="textarea"
//                 value={address}
//                 onChange={setAddress}
//               />
//               <Button onClick={RegisterHandler} type="purpleButton">
//                 {t("register")}
//               </Button>
//             </form>
//             {validRegister !== "" && (
//               <div className="text-sm text-red-500 ml-1 mt-2">
//                 {validRegister}
//               </div>
//             )}
//             <div className="flex w-full justify-between items-center">
//               <span className="mt-4">
//                 {t("alreadyHaveAnAccount")}{" "}
//                 <Link to="/ProfessionalLogin"> {t("login")}</Link>
//               </span>
//               <span className="mt-2">
//                 {t("Continue as User?")}{" "}
//                 <Link to="/userRegister"> {t("SingUp")}</Link>
//               </span>
//             </div>
//           </div>
//         )}
//         {registered && (
//           <div className="flex flex-col items-center w-[100%] justify-around gap-4 loader">
//             <svg
//               version="1.1"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 130.2 130.2"
//             >
//               <circle
//                 className="path circle"
//                 fill="none"
//                 stroke="#73AF55"
//                 strokeWidth="6"
//                 strokeMiterlimit="10"
//                 cx="65.1"
//                 cy="65.1"
//                 r="62.1"
//               />
//               <polyline
//                 className="path check"
//                 fill="none"
//                 stroke="#73AF55"
//                 strokeWidth="6"
//                 strokeLinecap="round"
//                 strokeMiterlimit="10"
//                 points="100.2,40.2 51.5,88.8 29.8,67.5 "
//               />
//             </svg>
//             <p>{t("Thank you for registering. Please verify your e-mail")}.</p>
//             <Button to="/ProfessionalLogin" type="purpleButton">
//               {t("Login")}
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Register;
