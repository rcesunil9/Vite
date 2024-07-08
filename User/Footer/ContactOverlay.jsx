import { useEffect, useState } from "react";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { IoCloseSharp } from "react-icons/io5";
import { t } from "i18next";
import Input from "../../../ui/Input";
import "./overlay.css";
import Button from "../../../ui/Button";
import * as NonAuthService from "../../api/service/NonAuthService";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../../ui/FormikInput";
import { toast } from "react-toastify";
const ContactOverlay = ({ closeContactOverlay }) => {
  const [captchaToken, setCaptchaToken] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleCaptchaChange = (token) => {
    // Called when the user has successfully completed the reCAPTCHA challenge and a token has been generated
    console.log("Captcha Token:", token);
    setCaptchaToken(token);
  };

  // const formik = useFormik({
  //   initialValues: {
  //     firstName: "",
  //     lastName: "",
  //     phoneNum: "",
  //     email: "",
  //     message: "",
  //   },
  //   validationSchema: Yup.object({
  //     firstName: Yup.string().required(t("requiredField")),
  //     lastName: Yup.string().required(t("requiredField")),
  //     phoneNum: Yup.string().required(t("requiredField")),
  //     email: Yup.string().email(t("invalidEmail")).required(t("requiredField")),
  //     message: Yup.string().required(t("requiredField")),
  //   }),
  //   onSubmit: (values) => {
  //     // Handle form submission here
  //     console.log(values);
  //   },
  // });
  // const handleSubmitContact = async () => {
  //   const response = await NonAuthService.enquiry_submit({
  //     first_name: name,
  //     email,
  //     last_name: lastName,
  //     phone: phoneNum,
  //     message,
  //   }).then();
  //   console.log(response, "submitted successfully");
  //   try {
  //     if (response) {
  //       closeContactOverlay();
  //     }
  //   } catch (error) {
  //     alert(`Registration failed: ${error.message}`);
  //   }
  // };
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required(t("required Field")),
    last_name: Yup.string().required(t("required Field")),

    phone: Yup.string().required(t("required Field")),
    email: Yup.string().email(t("invalid Email")).required(t("required Field")),

    message: Yup.string().required(t("required Field")),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",

      phone: "",
      email: "",

      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here, including sending data to server
      // if (captchaToken) {
      //   console.log("Form submitted with values:", values);
      //   console.log("Captcha Token:", captchaToken);
      // }else{
      //   console.log("nhi hoggg")
      // }
      const response = await NonAuthService.enquiry_submit(values).then();
      console.log(response, "submitted successfully");
      try {
        if (response) {
          closeContactOverlay();
          toast.success("Submited");
        }
      } catch (error) {
        // alert(`Registration failed: ${error.message}`);
        console.log("Form submitted with values:", values);
      }

      // Additional logic for form submission can be added
    },
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key == "Escape") {
        closeContactOverlay();
      }
    };
    const handleClickOutside = (event) => {
      const modalContent = document.querySelector(".modal-contentC");

      if (
        modalContent &&
        !event.target.closest(".modal-contentC") &&
        !event.target.closest(".button")
      ) {
        // Close the modal if the click is outside the modal content and not on the excluded class
        closeContactOverlay();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeContactOverlay]);

  return (
    <div className="modal-overlay overflow-y-auto">
      <div className="modal-contentC mx-5 bg-white flex flex-col gap-2 p-8 rounded-3xl w-full md:w-[50vw] overflow-y-auto top-0 text-black">
        <div className="flex w-full justify-center">
          <p className="text-secondary text-2xl"> {t("contactUs")} </p>
          <IoCloseSharp
            onClick={closeContactOverlay}
            size={24}
            className="absolute top-0 mt-2 mr-2 right-0"
            color="white"
          />
        </div>
        <p className="text-xl underline-offset-4 underline">
          {t("personalInfo")}
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full md:w-1/2">
            <label htmlFor="">{t("firstName")}</label>
            <FormikInput
              type="text"
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              placeholder="First Name"
              classes="large"
            ></FormikInput>
            <p className=" text-red-500 text-sm   ">
              {formik.errors.first_name}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <label htmlFor="">{t("lastName")}</label>
            <FormikInput
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              type="text"
              placeholder="Last Name"
              classes="large"
            ></FormikInput>
            {formik.errors && (
              <p className=" text-red-500  text-sm   ">
                {formik.errors.last_name}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full md:w-1/2">
            <label htmlFor=""> {t("phoneNum")} </label>
            <FormikInput
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              placeholder={t("phoneNum")}
              type="number"
              classes="large"
            ></FormikInput>
            {formik.errors && (
              <p className=" text-red-500 text-sm   ">{formik.errors.phone}</p>
            )}
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <label htmlFor="">{t("email")}</label>
            <FormikInput
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              type="mail"
              placeholder={t("email")}
              classes="large"
            ></FormikInput>
            {formik.errors && (
              <p className=" text-red-500 text-sm   ">{formik.errors.email}</p>
            )}
          </div>
        </div>

        <label htmlFor=""> {t("message")} </label>
        <FormikInput
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          placeholder={t("message")}
          classes="textarea"
        ></FormikInput>
        {formik.errors && (
          <p className=" text-red-500 text-sm   ">{formik.errors.message}</p>
        )}

        <div className="flex justify-between flex-col md:flex-row gap-2 items-center">
          <ReCAPTCHA
            
            sitekey="6LcRUacpAAAAAPS2efSYzcjEoNlYXV9bh2S8xHu1" // Replace with your reCAPTCHA Site Key
            onChange={handleCaptchaChange} // Callback function when token is generated
          />
          <Button onClick={formik.handleSubmit} type="purpleButton">
            {" "}
            {t("submit")}{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactOverlay;
