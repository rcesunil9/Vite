import React from "react";
import { Card } from "@material-tailwind/react";
import Button from "../../../../ui/Button";
import { FaCrown, FaEye } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import cardPhoto from "../../../../assets/Rectangle103.png";
import cardPhoto2 from "../../../../assets/auth-background.jpeg";

const cardData = [
  {
    title: "Hotel Grand Safari",
    imageUrl: cardPhoto,
    buttons: [
       { icon: BsPencilSquare, text: "Edit" },
      { icon: RiDeleteBin6Fill, text: "Delete" },
      { icon: FaCrown, text: "Upgrade To Premium" },
    ],
  },
  {
    title: "Hotel Grand Safari",
    imageUrl: cardPhoto2,
    buttons: [
      { icon: FaEye, text: "View" },
      { icon: BsPencilSquare, text: "Edit" },
      { icon: RiDeleteBin6Fill, text: "Delete" },
      { icon: FaCrown, text: "Upgrade To Premium" },
    ],
  },

];

function AnnouncementCard() {
  return (
    <div>
      {cardData.map((data, index) => (
        <Card key={index} className="max-w-2xl mt-6 p-2">
          <div>
            <h3 className="font-con text-xl">{data.title}</h3>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 mt-4 gap-2">
            <div className=" col-span-2">
              <img className="w-full" src={data.imageUrl} alt="" />
            </div>
            <div className="grid grid-cols-1 ">
              {data.buttons.map((button, buttonIndex) => (
                <div
                  key={buttonIndex}
                  className="flex gap-3 justify-center items-center"
                >
                  {React.createElement(button.icon, {
                    color: "#352C80",
                    size: 20,
                  })}
                  <Button type="cardBtn">{button.text}</Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default AnnouncementCard;
