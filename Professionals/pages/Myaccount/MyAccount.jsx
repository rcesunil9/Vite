import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Input from "../../../../ui/Input";
import { MdOutlineEdit } from "react-icons/md";
import Button from "../../../../ui/Button";
import * as NonAuthService from "../../../api/service/NonAuthService";
import ChangePasswordModal from "../../../User/ProfilePage/ChangePasswordModal";
import Swal from "sweetalert2";

function MyAccount() {
  const { t } = useTranslation();
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [phone, setPhone] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [editing, setEditing] = useState(false);
  const [changePass, setChangePass] = useState(false);

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  const handleEditButton = async () => {
    setEditing(true);
    setPhone(user?.phone);
    setContactPerson(user?.company_name);
    setAddress(user?.address);
    setEmail(user?.email);
    setName(user?.user_name);
  };
  const handleChangePassword = () => {
    setChangePass(true);
  };
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const handleCloseModal = () => {
    setChangePass(false);
  };

  useEffect(() => {
    const textarea = document.getElementById("address");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [textareaHeight]);

  const handleNewPass = (event) => {
    setNewPass(event.target.value);
  };
  const handleConfirmPass = (event) => {
    setConfirmPass(event.target.value);
  };
  const handleChangeProfileDetails = async () => {
    try {
      const { value: password } = await Swal.fire({
        title:  `${t("Enter your password")}`,
        input: "password",
        inputLabel: "Password",
        inputPlaceholder: `${t("Enter your password")}`,
        inputAttributes: {
        
          autocapitalize: "off",
          autocorrect: "off",
        },
      });
      if (password) {
        try {
          const response = await NonAuthService.password_verify_api({
            password: password,
            email: user?.email,
          });
          if (response) {
            const response = await NonAuthService.update_user_profile({
              user_name: name,
              phone,
              address,
              email,
              company_name: contactPerson,
            });
            console.log(response?.message, response, "chjhkjhkhk");
            if (response) {
              Swal.fire({
                title: `${t("Success")} !`,
                text: `${t("user profile information updated successfully!!")}`,
                icon: "success",
              });
              setEditing(false);
            } else {
              Swal.fire({
                title: "Error!",
                text: "The email has already been taken",
                icon: "error",
              });
            }
          }
        } catch (error) {
          Swal.fire({
            title: "Error !",
            text: error.message,
            icon: "error",
          });
        }
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: "Error!",
        text: "The email has already been taken",
        icon: "error",
      });
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await NonAuthService.getUserProfile();
      setUser(response); // Assuming response.data contains user information
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between flex-col md:flex-row  items-center border-b-2 border-[#CCCCCC]  bg-[#F8F8F8]">
        <div className="text-2xl text-secondary font-con py-5 pl-10">
          {t("myAcc")}
        </div>
        <div className="pr-10 flex flex-wrap gap-4">
          <Button type="purpleButton" onClick={handleChangePassword}>
            {t("Change Password")}
          </Button>
          {editing ? (
            <Button onClick={handleChangeProfileDetails} type="purpleButton">
              {t("Save")}
            </Button>
          ) : (
            <Button onClick={handleEditButton} type="purpleButton">
              <FaRegEdit size={16} />
              <span className="ms-1">{t("edit")}</span>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-5 p-4 bg-white px-5 mx-10">
        <h2 className="text-2xl font-con text-center pb-3">
          {t("personalInfo")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label htmlFor="" className="font-pop">
              {t("name")}
            </label>
            <input
              type="text"
              value={!editing ? user?.name : name}
              onChange={(e) => setName(e.target.value)}
              className="font-lato font-medium rounded border border-borde focus:outline-none p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-pop">
              {t("phoneNum")}
            </label>
            <input
              type="number"
              value={!editing ? user?.phone : phone}
              onChange={(e) => setPhone(e.target.value)}
              className="font-lato font-medium rounded border border-borde focus:outline-none p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-pop">
              {t("contactPerson")}
            </label>
            <input
              type="text"
              value={!editing ? user?.company_name : contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="font-lato font-medium rounded border border-borde focus:outline-none p-2"
            />
          </div>
          {/* <div className="flex flex-col">
            <label htmlFor="" className="font-pop">
              {t('nameOfCom')}
            </label>
            <input
              type="text"
              placeholder="Name of the company"
              className="font-lato font-medium rounded border border-borde focus:outline-none p-2"
            />
          </div> */}
          <div className="flex flex-col">
            <label htmlFor="" className="font-pop">
              {t("email")}
            </label>
            <input
              type="text"
              value={!editing ? user?.email : email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-lato font-medium rounded border border-borde focus:outline-none p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-pop">
              {t("address")}
            </label>
            <Input
              id="address"
              classes="textarea"
              value={!editing ? user?.address : address}
              onChange={(e) => setAddress(e)}
            />
          </div>
        </div>
        {changePass && (
          <ChangePasswordModal
            onClose={handleCloseModal}
            // onSave={handleSavePassword}
          />
        )}
        <div className="mt-8 flex flex-end"></div>
      </div>
    </div>
  );
}

export default MyAccount;
