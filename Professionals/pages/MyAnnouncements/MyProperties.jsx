import React, { useState, useEffect, useContext } from "react";
import * as NonAuthService from "../../../api/service/NonAuthService";
import AnnouncementCard from "./AnnouncementCard";
import { EndPoints } from "../../../api/EndPoints";
// import card from '@material-tailwind/react/theme/components/card'
import empty from "../../../../assets/empty.jpg";
import { Card } from "@material-tailwind/react";
import { FaCrown, FaEye } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import LanguageContext from "../../../../Context/LanguageContext";

import Button from "../../../../ui/Button";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
const MyProperties = ({ selected }) => {
  const [properties, setProperties] = useState();
  const [subCatName, setSubCatName] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { t } = useTranslation();
  const { languagedata } = useContext(LanguageContext);
  // const getUserProfile = async () => {
  //   try {
  //     const response = await NonAuthService.getUserProfile();
  //     setUser(response);
  //   } catch (e) {
  //     // console.log('error in getting user details')
  //     return e;
  //   }
  // };
  // useEffect(() => {
  //   getUserProfile();
  // }, []);

  const getVenuesList = async () => {
    try {
      const storedUserData = localStorage.getItem("user_id");
      const iddata = JSON.parse(storedUserData);
      const response = await NonAuthService.get_venue_list_with_filter({
        category_id: selected,
        user_id: iddata,
      });
      const listOfSub = await NonAuthService.get_sub_category({
        category_id: selected,
      });
      setSubCatName(listOfSub);
      setProperties(response);
    } catch (E) {
      console.log(E);
    }
  };

  const getRentalServices = async () => {
    try {
      const storedUserData = localStorage.getItem("user_id");
      const iddata = JSON.parse(storedUserData);

      const response = await NonAuthService.getRentalServices({
        category_id: selected,
        user_id: iddata,
      });
      const listOfSub = await NonAuthService.get_sub_category({
        category_id: selected,
      });
      setSubCatName(listOfSub);
      setProperties(response);
    } catch (e) {
      console.log(e);
    }
  };

  const getEntertainment = async () => {
    try {
      const storedUserData = localStorage.getItem("user_id");
      const iddata = JSON.parse(storedUserData);
      const response = await NonAuthService.get_entertainment_list_with_filter({
        category_id: selected,
        user_id: iddata,
      });
      const listOfSub = await NonAuthService.get_sub_category({
        category_id: selected,
      });
      setSubCatName(listOfSub);
      setProperties(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (selected == 1) {
      getVenuesList();
    } else if (selected == 2) {
      setProperties(null);
      getEntertainment();
    } else if (selected == 3 || selected == 4) {
      setProperties(null);
      getRentalServices();
    }
  }, [selected]);
  const HandleView = (selected, id) => {
    navigate(`/details/${selected - 1}/${id}`);
  };

  const HandleEdit = (selected, id) => {
    if (selected - 1 == 0) {
      navigate("/venues", { state: { id } });
    } else if (selected - 1 == 1) {
      navigate("/Entertainment", { state: { id } });
    } else if (selected - 1 == 2) {
      navigate("/Rental", { state: { id } });
    } else {
      navigate("/Services", { state: { id } });
    }
  };

  const handlePermium = async (type, id, selected) => {
    let title, text, premiumValue, standardValue;

    if (type == "Premium") {
      title = "Switch to Standard Announcement?";
      text = "Are you sure you want to switch to a standard announcement?";
      premiumValue = "0";
      standardValue = "1";
    } else {
      title = "Switch to Premium Announcement?";
      text = "Are you sure you want to switch to a premium announcement?";
      premiumValue = "1";
      standardValue = "0";
    }

    Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, switch!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await NonAuthService.switchAnnouncementType({
            category_id: selected,
            property_id: id,
            is_standard: standardValue,
            is_premium: premiumValue,
          });

          // Assuming `properties` is a state variable and `setProperties` is a function to update it
          // const updatedProperties = properties.map((property) =>
          //   property.property_id === id
          //     ? { ...property, announcement_type: type }
          //     : property
          // );

          // Update the state with the modified array
          // setProperties(updatedProperties);

          Swal.fire({
            title: "Switched!",
            text: "Your announcement  has been successfully switched.",
            icon: "success",
          });
          if (selected == 1) {
            getVenuesList();
          } else if (selected == 2) {
            setProperties(null);
            getEntertainment();
          } else if (selected == 3 || selected == 4) {
            setProperties(null);
            getRentalServices();
          }
        } catch (error) {
          Swal.fire({
            title: "Oops",
            text:
              error.message ||
              "An error occurred while switching announcement type.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleDelete = async (selected, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await NonAuthService.delete_property({
            property_type: selected,
            property_id: id,
          });
          const updatedProperties = properties.filter(
            (property) => property.property_id !== id
          );

          // Update the state with the filtered array
          setProperties(updatedProperties);
          console.log(response);
          Swal.fire({
            title: "Deleted!",
            text: "Your Announcement has been deleted.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Oops",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };
  console.log(subCatName, "check daaaaa");
  console.log(properties, "check daaaaa");

  return (
    <div className=" mb-10">
      {/* {/ <AnnouncementCard properties={properties} /> /} */}
      {properties?.map((data, index) => {
        const matchingCat = subCatName.find((nemeCat) => {
          return nemeCat?.id == data?.sub_category_id;
        });
        console.log(matchingCat)

        return (
          <Card key={index} className="max-w-2xl mt-6 p-2">
            <div>
              <h3 className="font-con text-xl capitalize ">
                {data?.[`venue_name_${languagedata}`] ??
                  data?.[`entertainment_name_${languagedata}`] ??
                  data?.[`rental_and_service_name_${languagedata}`] ??
                  ""}
              </h3>{" "}
              {matchingCat && (
                <p className=" font-con text-sm text-[#352c80] ">
                  {matchingCat?.[`sub_category_name_${languagedata}`] ?? ""}
                </p>
              )}
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 mt-4 gap-2">
              <div className=" col-span-2">
                <img
                  className="w-full h-[160px] object-fill md:h-60"
                  src={
                    data.property_images
                      ? EndPoints.IMAGE_BASEURL + data.property_images
                      : empty
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-around gap-2">
                <div className="flex gap-3 justify-center items-center">
                  {React.createElement(FaEye, {
                    color: "#352C80",
                    size: 20,
                  })}
                  <Button
                    onClick={() => {
                      HandleView(selected, data.property_id);
                    }}
                    type="cardBtn"
                  >
                    {t("View")}
                  </Button>
                </div>

                <div className="flex gap-3 justify-center items-center">
                  {React.createElement(BsPencilSquare, {
                    color: "#352C80",
                    size: 20,
                  })}
                  <Button
                    onClick={() => HandleEdit(selected, data.property_id)}
                    type="cardBtn"
                  >
                    {t("Edit")}
                  </Button>
                </div>

                <div className="flex gap-3 justify-center items-center">
                  {React.createElement(RiDeleteBin6Fill, {
                    color: "#352C80",
                    size: 20,
                  })}
                  <Button
                    onClick={() => handleDelete(selected, data.property_id)}
                    type="cardBtn"
                  >
                    {t("Delete")}
                  </Button>
                </div>

                <div className="flex gap-3 justify-center items-center">
                  {React.createElement(FaCrown, {
                    color:
                      data?.premium_announcement == "1" ? "#FFD700" : "#352C80",
                    size: 20,
                  })}
                  {data?.premium_announcement == "1" ? (
                    <Button
                      onClick={() =>
                        handlePermium("Premium", data.property_id, selected)
                      }
                      type="cardBtn2"
                    >
                      {t("Premium Anouucment")}
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        handlePermium("Standard", data.property_id, selected)
                      }
                      type="cardBtn"
                    >
                      {t("Premium")}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MyProperties;
