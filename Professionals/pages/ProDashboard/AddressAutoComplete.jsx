// AddressAutoComplete.js

import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId,
} from "react-places-autocomplete";

function AddressAutoComplete({ value, onSelect }) {
  const [address, setAddress] = useState(value ?? "");
  useEffect(() => {
    setAddress(value ?? "");
  }, [value]);
  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address, placeId) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        // console.log("Success", latLng);
        // console.log("lat log", latLng.lat, latLng.lng);
        onSelect({ address, latLng, placeId }); // Pass address, latLng, and placeId to the parent component
      })
      .catch((error) => console.error("Error", error));
  };
  // const getAddressFromLatLng = (lat, lng) => {
  //   getLatLng({ lat, lng })
  //     .then((latLng) => {
  //       geocodeByPlaceId(latLng.placeId)
  //         .then((results) => {
  //           setAddress(results[0].formatted_address);
  //           onSelect({ address: results[0].formatted_address, latLng, placeId: latLng.placeId });
  //         })
  //         .catch((error) => console.error("Error", error));
  //     })
  //     .catch((error) => console.error("Error", error));
  // };

  return (
    <div className="w-full">
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <textarea
              {...getInputProps({
                placeholder: "Address",
                type: "text",
                className:
                  "outline-none p-2 border rounded-md border-borde placeholder:text-placeholderText my-2 sm:w-[95%] w-[100%]",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    key={index}
                   
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                      onClick: () =>
                        handleSelect(
                          suggestion.description,
                          suggestion.placeId
                        ),
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default AddressAutoComplete;
