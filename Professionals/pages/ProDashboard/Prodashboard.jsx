import React, { useState, useContext, useEffect } from "react";
import Button from "../../../../ui/Button";
import { useTranslation } from "react-i18next";
import DataContext from "../../../../Context/DataContext";
import { useNavigate } from "react-router-dom";
import { useProFormDataContext } from "./proFormDataContext/ProFormDataContext";
import LanguageContext from "../../../../Context/LanguageContext";

function Prodashboard() {
  const { categoryData, subcategoryData } = useContext(DataContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const { proFormData, updateProFormFormData } = useProFormDataContext();
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { languagedata } = useContext(LanguageContext);
  
  useEffect(() => {
    console.log("Inside useEffect"); // Check if useEffect is triggered
    updateProFormFormData({
      category_id: "",
      sub_category_id: "",
      is_standard_announcement: "0",
      premium_announcement: "0",
      is_allow_booking_of_table: "0",
      is_allow_privatization_of_venue: "0",
      features_id: [],
      sub_feature_ids: [],
      sub_sub_feature_ids: [],
      event_category_ids: [],
    });
  }, []);

  const handleCategoryChange = (event) => {
    // console.log(event.target.value)
    setSelectedCategory(event.target.value);
    updateProFormFormData({
      ...proFormData,
      ["category_id"]: event.target.value,
    });
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
    updateProFormFormData({
      ...proFormData,
      ["sub_category_id"]: event.target.value,
    });
  };
  const handleNextClick = () => {
    // console.log(selectedCategory, "konsi aai")
    if (selectedCategory == "" || selectedSubcategory == "") {
      // Display an error message or alert if either category or subcategory is not selected
      setError(`${t("errorssssss")}`);
      return;
    } else {
      setError(null);
    }
    if (selectedCategory == "1") {
      navigate(`/venues`);
    } else if (selectedCategory == "2") {
      navigate("/Entertainment");
    } else if (selectedCategory == "3") {
      navigate("/Rental");
    } else if (selectedCategory == "4") {
      navigate("/Services");
    }
  };

  return (
    <div className="">
      <div className="text-[#8D303A] border-b-[1px] border-borde text-2xl font-con py-5 px-10">
        {t("createAnn")}
      </div>
      <div className="max-w-[1220px] px-10">
        <div className="max-w-sm ">
          <h3 className="my-4 text-xl font-con">{t("catSub")}</h3>
          <div className="flex flex-col font-pop gap-2">
            <label className="text-lg">{t("choiceBwCat")}</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border border-borde w-full rounded-md p-2 mt-2 outline-none"
            >
              <option value="">{t("Select")}</option>
              {categoryData.map((category) => (
                <option key={category.category_name_en} value={category.id}>
                  {category?.[`category_name_${languagedata}`]}
                </option>
              ))}
            </select>

            <label className="text-lg">{t("choiceBwSubcat")}</label>
            <select
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              className="border border-borde w-full rounded-md p-2 mt-2 outline-none"
            >
              {<option>{t("Select")}</option>}
              {subcategoryData &&
                subcategoryData.map((subcategory) => {
                  if (selectedCategory == subcategory.category_id) {
                    return (
                      <option
                        key={subcategory.sub_category_name_en}
                        value={subcategory.id}
                      >
                        {subcategory?.[`sub_category_name_${languagedata}`]}
                      </option>
                    );
                  }
                })}
            </select>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="flex justify-end pt-8">
          <Button onClick={handleNextClick} type="purpleButton">
            {t("next")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Prodashboard;
