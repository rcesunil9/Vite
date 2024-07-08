import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { AiOutlineCloudUpload } from "react-icons/ai";

const AddVideo = ({ onChange, maxget, setErrorMessage }) => {
  const [selectedVideos, setSelectedVideos] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files); // Convert FileList to array
    const totalSelected = selectedVideos.length + filesArray.length;
    if (totalSelected > 10) {
      if (setErrorMessage) {
        setErrorMessage("Maximum selection limit reached (10 videos)");
      }
      if (maxget) {
        maxget(true);
      }
      return;
    }
    setSelectedVideos((prevVideos) => [
      ...prevVideos,
      ...filesArray.slice(0, 10 - prevVideos.length),
    ]);
    onChange(filesArray);
  };

  const handleUploadClick = () => {
    document.getElementById("videoInput").click();
  };

  const handleRemoveVideo = (indexToRemove) => {
    setSelectedVideos((prevVideos) =>
      prevVideos.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <input
        id="videoInput"
        onChange={handleFileChange}
        style={{ display: "none" }}
        type="file"
        accept=".mp4, .avi, .mov, .mp3, .m4a"
        name=""
        multiple
      />
      <div
        className="flex w-[121px] h-[100px] items-center justify-center border border-borde rounded-md"
        onClick={handleUploadClick}
      >
        <AiOutlineCloudUpload color="#B3B3B3" size={32} />
      </div>
      {selectedVideos.map((item, index) => (
        <div key={index} className="h-[100px] w-[121px] relative">
          <IoMdCloseCircle
            className="absolute -top-2 -right-2 bg-white rounded-full"
            size={20}
            color="#8D303A"
            onClick={() => handleRemoveVideo(index)}
          />
          <video
            src={URL.createObjectURL(item)}
            className="h-full w-full rounded-sm object-cover"
            controls
          />
        </div>
      ))}
    </div>
  );
};

export default AddVideo;
