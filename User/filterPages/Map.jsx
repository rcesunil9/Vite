import React, { useState } from "react";
import {
  MapContainer,
  ScaleControl,
  TileLayer,
  ZoomControl,
  Marker,
  Popup,
} from "react-leaflet";
import { LatLng } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import MapOverlay from "./MapOverlay";
import LocationSvg from "../../../ui/LocationSvg";
import { useTranslation } from "react-i18next";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;
const Map = ({ location, setLocattion }) => {
  // const position = new LatLng(28.6139, 77.209);
  const [modalOpen, setModalOpen] = useState(false);
  const initialPosition = new LatLng(28.6139, 77.209);
  const [markerPosition, setMarkerPosition] = useState(
    location ?? initialPosition
  );
  const { t } = useTranslation();
  // console.log(markerPosition, "lat lang by map");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {/* <div className=" relative group "> */}
      <button
        disabled={!location}
        onClick={() => openModal()}
        className=" cursor-pointer "
        title={!location ? "Please select a location first" : ""}
      >
        <LocationSvg />
        <p className="text-[0.60rem] ">{t("Map View")}</p>
      </button>
      {/* {!location && (
          <div
            id="tooltip-default"
            role="tooltip"
            className="absolute z-10 px-3 py-2 top-[50%] hidden  group-hover:block text-sm font-medium text-white bg-black rounded-lg shadow-sm tooltip"
            // Adjust the distance between the input and the tooltip
          >
            <div className="relative">
              Please select a location first
              <div className="tooltip-arrow absolute w-3 h-3 bg-black border-t border-l border-r border-black transform rotate-45 bottom-full left-[1px] -translate-x-1/2"></div>
            </div>
          </div>
        )} */}
      {/* </div> */}
      {modalOpen && (
        <MapOverlay
          initialPosition={location}
          markerPosition={location}
          setMarkerPosition={setLocattion}
          closeModal={closeModal}
        />
      )}
      {/* <div className="w-full mt-2 relative">
        
        <MapContainer
          className="mapcontainer"
          attributionControl={false}
          center={markerPosition}
          zoom={10}
          style={{ height: "150px", width: "20vw", zIndex: "1" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={markerPosition} icon={DefaultIcon}></Marker>
        </MapContainer>
      </div> */}
    </>
  );
};

export default Map;
