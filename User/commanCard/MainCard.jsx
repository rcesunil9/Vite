import React from "react";
import { FaHeart } from "react-icons/fa";
import { EndPoints } from "../../api/EndPoints";
import empty from "../../../assets/empty.jpg";
import * as NonAuthService from "../../api/service/NonAuthService";
import { Link } from "react-router-dom";
import premiumStar from "../../../assets/Premiumstar 1.svg";
function MainCard({
  photoSrc,
  completdata,
  name,
  city,
  cattogryId,
  fav = false,
  onIconClick = null,
  to,
  distance = undefined ?? null,
  addresss = undefined ?? null
}) {
  const handleFavClick = () => {
    if (onIconClick) {
      onIconClick();
    }
  };
  console.log(parseInt(distance), "aaya kya distance");
  function splitStringBetweenCommas(inputString) {
    let startIndex = inputString.indexOf(",") + 2; // Finding the index of first comma and adding 2 to skip the space after comma
    let endIndex = inputString.indexOf(",", startIndex); // Finding the index of second comma
    let result = inputString.substring(startIndex, endIndex);
    return result;
  }

  return (
    <div className="relative">
      <Link to={to} target="_">
        <img
          className={`w-full h-56  object-fill ${
            distance ? "rounded-t-md" : "rounded-md"
          }  `}
          src={photoSrc}
          alt={name}
        />
      </Link>
      <div className="absolute top-0 right-0 mt-2 mr-3">
        <FaHeart
          onClick={handleFavClick}
          size={25}
          style={{ color: fav ? "crimson" : "#D9D9D9" }}
        />
      </div>
      <div className="py-2 px-2">
        <h3 className="text-lg font-semibold mb-1 text-black capitalize font-pop">
          {name}
        </h3>
        {/* <div className=" grid grid-cols-2 align-top "> */}
        {city ? (
          <span className="flex gap-1   items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#8D303A"
                d="M19 9A7 7 0 1 0 5 9c0 1.387.409 2.677 1.105 3.765h-.008L12 22l5.903-9.235h-.007A6.971 6.971 0 0 0 19 9m-7 3a3 3 0 1 1 0-6a3 3 0 0 1 0 6"
              />
            </svg>

            {splitStringBetweenCommas(city)}
          </span>
        ) : (
          <></>
        )}
        {distance !== null && distance !== undefined && (
          <span className="flex gap-1  items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#8D303A"
                d="M19 9A7 7 0 1 0 5 9c0 1.387.409 2.677 1.105 3.765h-.008L12 22l5.903-9.235h-.007A6.971 6.971 0 0 0 19 9m-7 3a3 3 0 1 1 0-6a3 3 0 0 1 0 6"
              />
            </svg>
            {parseInt(distance) == 0 ? "0" : parseInt(distance)} km away
          </span>
        )}
        {addresss !== null && addresss !== undefined && (
          <span className="flex gap-x-1  items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#8D303A"
                d="M19 9A7 7 0 1 0 5 9c0 1.387.409 2.677 1.105 3.765h-.008L12 22l5.903-9.235h-.007A6.971 6.971 0 0 0 19 9m-7 3a3 3 0 1 1 0-6a3 3 0 0 1 0 6"
              />
            </svg>
            {addresss}
          </span>
        )}
        {/* </div> */}
      </div>
      <div
        className={`absolute ${completdata?.venue_name_en ? "bottom-[50px]" : "bottom-[40px]" }  right-[-5px] ${
          completdata?.premium_announcement == "1" ? "" : "hidden"
        }`}
      >
        <img className="w-10 h-10" src={premiumStar} alt="premium" />
      </div>
    </div>
  );
}

export default MainCard;
